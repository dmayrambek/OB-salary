/* ─── to-be.js ─ O!Bank ЗПП To-Be ─────────────────────── */
'use strict';

let currentLang = 'ru';

document.addEventListener('DOMContentLoaded', () => {
  /* lang switcher */
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const lang = btn.dataset.lang;
      if (lang === currentLang) return;
      currentLang = lang;
      document.querySelectorAll('.lang-btn').forEach(b =>
        b.classList.toggle('active', b.dataset.lang === lang));
      document.querySelectorAll('[data-ru][data-en]').forEach(el =>
        el.textContent = el.dataset[lang]);
      document.documentElement.lang = lang;
    });
  });

  /* entrance */
  document.querySelectorAll('.step-card').forEach((c, i) => {
    c.style.opacity = '0';
    c.style.transform = 'translateY(8px)';
    c.style.transition = `opacity .35s ease ${i * .05}s, transform .35s ease ${i * .05}s`;
    requestAnimationFrame(() => requestAnimationFrame(() => {
      c.style.opacity = '1'; c.style.transform = 'translateY(0)';
    }));
  });

  requestAnimationFrame(() => requestAnimationFrame(drawArrows));
  window.addEventListener('resize', drawArrows);
});

/* ── HELPERS ──────────────────────────────────────────── */
const SVG_NS = 'http://www.w3.org/2000/svg';
const ACCENT  = '#e8174a';
const BLUE    = '#5b8cff';
const SW      = 1.8;   // stroke-width
const AH      = 6;     // arrowhead half-base
const GAP     = 18;    // routing clearance outside lanes

function cel(tag, attrs) {
  const el = document.createElementNS(SVG_NS, tag);
  Object.entries(attrs).forEach(([k,v]) => el.setAttribute(k, v));
  return el;
}

/* draw an arrowhead pointing toward (x2,y2) from (x1,y1) */
function arrowhead(svg, x1,y1,x2,y2, fill) {
  const dx=x2-x1, dy=y2-y1, len=Math.hypot(dx,dy)||1;
  const ux=dx/len, uy=dy/len, nx=-uy, ny=ux;
  const ax=x2-ux*AH, ay=y2-uy*AH;
  svg.appendChild(cel('polygon',{
    points:`${x2},${y2} ${ax+nx*(AH/2)},${ay+ny*(AH/2)} ${ax-nx*(AH/2)},${ay-ny*(AH/2)}`,
    fill
  }));
}

/* polyline + arrowhead at last segment end */
function polyArrow(svg, pts, stroke, dashed=false) {
  const d = pts.map((p,i)=>`${i?'L':'M'}${p[0]},${p[1]}`).join(' ');
  const path = cel('path',{d, stroke, 'stroke-width':SW, fill:'none', 'stroke-linejoin':'round'});
  if (dashed) path.setAttribute('stroke-dasharray','5,3');
  svg.appendChild(path);
  const n=pts.length;
  arrowhead(svg, pts[n-2][0],pts[n-2][1], pts[n-1][0],pts[n-1][1], stroke);
}

/* ── DRAW ─────────────────────────────────────────────── */
function drawArrows() {
  const svg = document.getElementById('arrowsSvg');
  if (!svg) return;
  svg.innerHTML = '';

  const sl = document.getElementById('swimlane');
  const base = sl.getBoundingClientRect();

  /* collect cell rects */
  const C = {};
  sl.querySelectorAll('[data-id]').forEach(el => {
    const r = el.getBoundingClientRect();
    const x = r.left - base.left, y = r.top - base.top;
    C[el.dataset.id] = {
      x, y, w: r.width, h: r.height,
      cx: x + r.width/2,  cy: y + r.height/2,
      top: y,              bottom: y + r.height,
      left: x,             right: x + r.width,
    };
  });

  /* shorthand */
  const A = ACCENT, B = BLUE;

  /*
    Legend of entry/exit points on a cell rect:
      T = top center
      B = bottom center
      L = left center
      R = right center
  */
  const T = id => [C[id].cx, C[id].top];
  const Bo= id => [C[id].cx, C[id].bottom];
  const L = id => [C[id].left,  C[id].cy];
  const R = id => [C[id].right, C[id].cy];

  if (!C['pp-attract']) return; // layout not ready

  /* ── 1. ПП Привлечение ──→ СОД Согласование
          Exit right of pp-attract, enter left of sod-agree
          Both on row-1, so straight horizontal with small elbow to clear rb-attract ── */
  polyArrow(svg, [
    R('pp-attract'),
    // pass through / over rb-attract (same row) by going slightly above
    [C['rb-attract'].cx, C['pp-attract'].cy],
    R('rb-attract'),
    L('sod-agree'),
  ], A);

  /* ── 2. РБ Привлечение ──→ СОД Согласование (direct right) ── */
  polyArrow(svg, [ R('rb-attract'), L('sod-agree') ], A);

  /* ── 3. СОД Согласование ──↓── СОД Подготовка договора ── */
  polyArrow(svg, [ Bo('sod-agree'), T('sod-prep') ], A);

  /* ── 4 & 5. СОД Подготовка ──← ПП Подписание + РБ Подписание
          Exit left of sod-prep, route left then down then right to each card ── */

  // to ПП-sign (col1, row3) — exit left sod-prep, go hard left, then down to row3, then right into pp-sign
  {
    const fx = C['sod-prep'].left, fy = C['sod-prep'].cy;
    const tx = C['pp-sign'].right, ty = C['pp-sign'].cy;
    const midX = C['pp-sign'].left - GAP;  // route left of lane-1
    polyArrow(svg, [
      [fx, fy],
      [midX, fy],
      [midX, ty],
      [tx, ty],
    ], B);
  }

  // to РБ-sign (col2, row3)
  {
    const fx = C['sod-prep'].left, fy = C['sod-prep'].cy;
    const tx = C['rb-sign'].right,  ty = C['rb-sign'].cy;
    const midX = C['rb-sign'].left - GAP*0.5;
    polyArrow(svg, [
      [fx, fy],
      [midX, fy],
      [midX, ty],
      [tx, ty],
    ], B);
  }

  /* ── 6. СОД Подготовка ──↓── Приём списка ── */
  polyArrow(svg, [ Bo('sod-prep'), T('sod-list') ], A);

  /* ── 7. Приём списка ──↓── Создание заявки ── */
  polyArrow(svg, [ Bo('sod-list'), T('sod-crm') ], A);

  /* ── 8. Создание заявки ──↓── Открытие счетов ── */
  polyArrow(svg, [ Bo('sod-crm'), T('sod-open') ], A);

  /* ── 9. Открытие счетов ──→ ГБ Изготовление карт
          sod-open is row-6, gb-instant is row-1
          Route: exit right of sod-open → go right outside lane-4 → go up to row-1 → enter right of gb-instant ── */
  {
    const fx = C['sod-open'].right, fy = C['sod-open'].cy;
    const tx = C['gb-instant'].right, ty = C['gb-instant'].cy;
    const routeX = tx + GAP;
    polyArrow(svg, [
      [fx, fy],
      [routeX, fy],
      [routeX, ty],
      [tx, ty],
    ], A);
  }

  /* ── 10. ГБ Изготовление ──↓── ГБ Отправка в СОД ── */
  polyArrow(svg, [ Bo('gb-instant'), T('gb-send') ], A);

  /* ── 11. ГБ Отправка ──→ СОД Передача Instant карт
           gb-send is row-2, sod-hand is row-7
           Route: exit right of gb-send → go right → go down to row-7 → enter right of sod-hand ── */
  {
    const fx = C['gb-send'].right, fy = C['gb-send'].cy;
    const tx = C['sod-hand'].right, ty = C['sod-hand'].cy;
    const routeX = fx + GAP;
    polyArrow(svg, [
      [fx, fy],
      [routeX, fy],
      [routeX, ty],
      [tx, ty],
    ], A);
  }

  /* ── 12 & 13. СОД Передача ──← ПП Раздача + РБ Раздача
         sod-hand → pp-dist and rb-dist (same row-7) — exit left of sod-hand ── */
  polyArrow(svg, [ L('sod-hand'), R('rb-dist') ], B);

  polyArrow(svg, [
    L('sod-hand'),
    [C['rb-dist'].left - GAP*0.5, C['sod-hand'].cy],
    [C['rb-dist'].left - GAP*0.5, C['pp-dist'].cy],
    R('pp-dist'),
  ], B);
}
