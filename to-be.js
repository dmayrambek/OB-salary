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
    c.style.transition = `opacity .3s ease ${i * .04}s, transform .3s ease ${i * .04}s`;
    requestAnimationFrame(() => requestAnimationFrame(() => {
      c.style.opacity = '1'; c.style.transform = 'translateY(0)';
    }));
  });

  setTimeout(drawArrows, 200);
  window.addEventListener('resize', () => setTimeout(drawArrows, 100));
});

/* ── helpers ─────────────────────────────────────────── */
const NS  = 'http://www.w3.org/2000/svg';
const RED = '#e8174a';
const BLU = '#5b8cff';
const SW  = 2;
const AH  = 7;

function mk(tag, attrs) {
  const el = document.createElementNS(NS, tag);
  Object.entries(attrs).forEach(([k, v]) => el.setAttribute(k, v));
  return el;
}

function arrowHead(svg, x1, y1, x2, y2, fill) {
  const dx = x2-x1, dy = y2-y1, d = Math.hypot(dx,dy)||1;
  const ux = dx/d, uy = dy/d, nx = -uy, ny = ux;
  const bx = x2-ux*AH, by = y2-uy*AH;
  svg.appendChild(mk('polygon', {
    points: `${x2},${y2} ${bx+nx*AH*.44},${by+ny*AH*.44} ${bx-nx*AH*.44},${by-ny*AH*.44}`,
    fill
  }));
}

function poly(svg, pts, color, dash=false) {
  const d = pts.map((p,i) => `${i?'L':'M'}${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(' ');
  const el = mk('path', {d, stroke:color, 'stroke-width':SW, fill:'none', 'stroke-linejoin':'round', 'stroke-linecap':'round'});
  if (dash) el.setAttribute('stroke-dasharray','5,3');
  svg.appendChild(el);
  const n = pts.length;
  arrowHead(svg, pts[n-2][0], pts[n-2][1], pts[n-1][0], pts[n-1][1], color);
}

/* ── main ────────────────────────────────────────────── */
function drawArrows() {
  const svg = document.getElementById('arrowsSvg');
  const sl  = document.getElementById('swimlane');
  if (!svg || !sl) return;
  svg.innerHTML = '';

  const base = sl.getBoundingClientRect();

  /* координаты ячейки относительно swimlane */
  function rc(id) {
    const el = sl.querySelector(`[data-id="${id}"]`);
    if (!el) return null;
    const b = el.getBoundingClientRect();
    const x = b.left - base.left, y = b.top - base.top;
    const w = b.width, h = b.height;
    return {
      x, y, w, h,
      cx: x+w/2, cy: y+h/2,
      T:  [x+w/2,  y    ],
      B:  [x+w/2,  y+h  ],
      L:  [x,      y+h/2],
      R:  [x+w,    y+h/2],
    };
  }

  const IDS = ['pp-attract','rb-attract','sod-agree','gb-instant',
               'pp-sign','rb-sign','sod-prep','gb-send',
               'sod-list','sod-crm','sod-open',
               'pp-dist','rb-dist','sod-hand'];
  const c = {};
  IDS.forEach(id => { c[id] = rc(id); });
  if (!c['pp-attract']) return;

  const W = base.width;   // полная ширина схемы
  const RPAD = 12;        // отступ от правого края для огибающей линии

  /* ── 1. ПП Привлечение → СОД Согласование (row2, →) ── */
  poly(svg, [c['pp-attract'].R, [c['sod-agree'].x, c['pp-attract'].cy], c['sod-agree'].L], RED);

  /* ── 2. РБ Привлечение → СОД Согласование (row2, →) ── */
  poly(svg, [c['rb-attract'].R, c['sod-agree'].L], RED);

  /* ── 3. СОД Согласование ↓ Подготовка (col3, row2→row3) ── */
  poly(svg, [c['sod-agree'].B, c['sod-prep'].T], RED);

  /* ── 4. СОД Подготовка → ПП Подписание (row3, ←, горизонтально) ── */
  poly(svg, [c['sod-prep'].L, [c['pp-sign'].x+c['pp-sign'].w, c['sod-prep'].cy], c['pp-sign'].R], BLU);

  /* ── 5. СОД Подготовка → РБ Подписание (row3, ←, горизонтально) ── */
  poly(svg, [c['sod-prep'].L, c['rb-sign'].R], BLU);

  /* ── 6. СОД Подготовка ↓ Приём списка (col3, вниз) ── */
  poly(svg, [c['sod-prep'].B, c['sod-list'].T], RED);

  /* ── 7. Приём ↓ Создание заявки (col3) ── */
  poly(svg, [c['sod-list'].B, c['sod-crm'].T], RED);

  /* ── 8. Создание заявки ↓ Открытие счетов (col3) ── */
  poly(svg, [c['sod-crm'].B, c['sod-open'].T], RED);

  /* ── 9. Открытие счетов → ГБ Изготовление карт
     sod-open (row6) → gb-instant (row2)
     Маршрут: выход RIGHT → идём по правому краю схемы ВВЕРХ → вход RIGHT в gb-instant ── */
  {
    const rx = W - RPAD;
    poly(svg, [
      c['sod-open'].R,
      [rx, c['sod-open'].cy],
      [rx, c['gb-instant'].cy],
      c['gb-instant'].R,
    ], RED);
  }

  /* ── 10. ГБ Изготовление ↓ ГБ Отправка (col4, row2→row3) ── */
  poly(svg, [c['gb-instant'].B, c['gb-send'].T], RED);

  /* ── 11. ГБ Отправка → СОД Передача карт
     gb-send (row3) → sod-hand (row8)
     Маршрут: выход RIGHT → идём по правому краю ВНИЗ → вход RIGHT в sod-hand ── */
  {
    const rx = W - RPAD/2;
    poly(svg, [
      c['gb-send'].R,
      [rx, c['gb-send'].cy],
      [rx, c['sod-hand'].cy],
      c['sod-hand'].R,
    ], RED);
  }

  /* ── 12. СОД Передача → РБ Раздача (row8, ←, прямо) ── */
  poly(svg, [c['sod-hand'].L, c['rb-dist'].R], BLU);

  /* ── 13. СОД Передача → ПП Раздача (row8, ←, через rb-dist) ── */
  poly(svg, [c['sod-hand'].L, [c['pp-dist'].x+c['pp-dist'].w, c['sod-hand'].cy], c['pp-dist'].R], BLU);
}
