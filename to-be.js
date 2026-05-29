'use strict';
let currentLang = 'ru';

document.addEventListener('DOMContentLoaded', () => {
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

  document.querySelectorAll('.step-card').forEach((c, i) => {
    c.style.opacity = '0';
    c.style.transform = 'translateY(6px)';
    c.style.transition = `opacity .3s ease ${i*.05}s,transform .3s ease ${i*.05}s`;
    requestAnimationFrame(() => requestAnimationFrame(() => {
      c.style.opacity = '1'; c.style.transform = 'translateY(0)';
    }));
  });

  setTimeout(draw, 200);
  window.addEventListener('resize', () => setTimeout(draw, 100));
});

/* ── SVG helpers ───────────────────────────────────── */
const NS  = 'http://www.w3.org/2000/svg';
const RED = '#e8174a';
const BLU = '#5b8cff';
const SW  = 2;
const AH  = 7;

function mk(tag, a) {
  const el = document.createElementNS(NS, tag);
  Object.entries(a).forEach(([k,v]) => el.setAttribute(k,v));
  return el;
}

function arrowHead(svg, x1,y1, x2,y2, fill) {
  const dx=x2-x1, dy=y2-y1, d=Math.hypot(dx,dy)||1;
  const ux=dx/d, uy=dy/d, nx=-uy, ny=ux;
  const bx=x2-ux*AH, by=y2-uy*AH;
  svg.appendChild(mk('polygon',{
    points:`${x2},${y2} ${bx+nx*AH*.44},${by+ny*AH*.44} ${bx-nx*AH*.44},${by-ny*AH*.44}`,
    fill
  }));
}

function line(svg, pts, color) {
  const d = pts.map((p,i) => `${i?'L':'M'}${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(' ');
  svg.appendChild(mk('path',{
    d, stroke:color, 'stroke-width':SW, fill:'none',
    'stroke-linejoin':'round', 'stroke-linecap':'round'
  }));
  const n = pts.length;
  arrowHead(svg, pts[n-2][0],pts[n-2][1], pts[n-1][0],pts[n-1][1], color);
}

/* ── MAIN ──────────────────────────────────────────── */
function draw() {
  const svg  = document.getElementById('svgArrows');
  const wrap = svg?.parentElement;
  if (!svg || !wrap) return;
  svg.innerHTML = '';

  const base = wrap.getBoundingClientRect();

  function rc(id) {
    const el = wrap.querySelector(`[data-id="${id}"]`);
    if (!el) return null;
    const b = el.getBoundingClientRect();
    const x = b.left - base.left, y = b.top - base.top;
    return {
      x, y, w:b.width, h:b.height,
      cx: x+b.width/2,  cy: y+b.height/2,
      T:  [x+b.width/2, y],
      B:  [x+b.width/2, y+b.height],
      L:  [x,            y+b.height/2],
      R:  [x+b.width,    y+b.height/2],
    };
  }

  const IDS = ['pp-attract','rb-attract','sod-agree','gb-instant',
               'pp-sign','rb-sign','sod-prep','gb-send',
               'sod-list','sod-crm','sod-open',
               'pp-dist','rb-dist','sod-hand'];
  const c = {};
  IDS.forEach(id => { c[id] = rc(id); });
  if (!c['pp-attract']) return;

  const W = base.width;
  const RPAD = 14; // отступ от правого края для огибающей

  /* ══ КРАСНЫЕ — прямой поток ══════════════════════════

     1. ПП Привлечение → СОД Согласование
        (горизонт вправо, проходим через РБ по той же cy) */
  line(svg, [
    c['pp-attract'].R,
    [c['sod-agree'].L[0], c['pp-attract'].cy],
    c['sod-agree'].L
  ], RED);

  /* 2. РБ Привлечение → СОД Согласование */
  line(svg, [c['rb-attract'].R, c['sod-agree'].L], RED);

  /* 3. СОД Согласование ↓ Подготовка */
  line(svg, [c['sod-agree'].B, c['sod-prep'].T], RED);

  /* 4. СОД Подготовка ↓ Приём списка */
  line(svg, [c['sod-prep'].B, c['sod-list'].T], RED);

  /* 5. Приём ↓ Создание заявки */
  line(svg, [c['sod-list'].B, c['sod-crm'].T], RED);

  /* 6. Создание заявки ↓ Открытие счетов */
  line(svg, [c['sod-crm'].B, c['sod-open'].T], RED);

  /* 7. Открытие счетов → ГБ Изготовление
        sod-open и gb-instant на РАЗНЫХ строках.
        Маршрут: выход вправо из sod-open → вверх по правому краю → вход справа в gb-instant */
  {
    const rx = W - RPAD;
    line(svg, [
      c['sod-open'].R,
      [rx, c['sod-open'].cy],
      [rx, c['gb-instant'].cy],
      c['gb-instant'].R
    ], RED);
  }

  /* 8. ГБ Изготовление ↓ Отправка в СОД */
  line(svg, [c['gb-instant'].B, c['gb-send'].T], RED);

  /* 9. ГБ Отправка → СОД Передача карт
        gb-send и sod-hand на РАЗНЫХ строках.
        Маршрут: выход вправо → вниз по правому краю → вход справа в sod-hand */
  {
    const rx = W - RPAD/2;
    line(svg, [
      c['gb-send'].R,
      [rx, c['gb-send'].cy],
      [rx, c['sod-hand'].cy],
      c['sod-hand'].R
    ], RED);
  }

  /* ══ СИНИЕ — обратные стрелки ════════════════════════

     10. СОД Подготовка → РБ Подписание (← горизонт, та же строка) */
  line(svg, [c['sod-prep'].L, c['rb-sign'].R], BLU);

  /* 11. СОД Подготовка → ПП Подписание (← горизонт, та же строка) */
  line(svg, [
    c['sod-prep'].L,
    [c['pp-sign'].R[0], c['sod-prep'].cy],
    c['pp-sign'].R
  ], BLU);

  /* 12. СОД Передача → РБ Раздача (← горизонт, та же строка) */
  line(svg, [c['sod-hand'].L, c['rb-dist'].R], BLU);

  /* 13. СОД Передача → ПП Раздача (← горизонт, та же строка) */
  line(svg, [
    c['sod-hand'].L,
    [c['pp-dist'].R[0], c['sod-hand'].cy],
    c['pp-dist'].R
  ], BLU);
}
