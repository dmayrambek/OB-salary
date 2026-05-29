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
    c.style.transform = 'translateY(8px)';
    c.style.transition = `opacity .35s ease ${i * .05}s, transform .35s ease ${i * .05}s`;
    requestAnimationFrame(() => requestAnimationFrame(() => {
      c.style.opacity = '1'; c.style.transform = 'translateY(0)';
    }));
  });

  // дать layout завершиться перед отрисовкой
  setTimeout(drawArrows, 120);
  window.addEventListener('resize', () => { setTimeout(drawArrows, 80); });
});

/* ── SVG helpers ─────────────────────────────────────── */
const NS   = 'http://www.w3.org/2000/svg';
const RED  = '#e8174a';
const BLUE = '#5b8cff';
const SW   = 2;
const AH   = 7; // arrowhead size

function svgEl(tag, attrs) {
  const el = document.createElementNS(NS, tag);
  Object.entries(attrs).forEach(([k, v]) => el.setAttribute(k, v));
  return el;
}

function arrowHead(svg, x1, y1, x2, y2, fill) {
  const dx = x2-x1, dy = y2-y1, len = Math.hypot(dx, dy) || 1;
  const ux = dx/len, uy = dy/len, nx = -uy, ny = ux;
  const bx = x2 - ux*AH, by = y2 - uy*AH;
  svg.appendChild(svgEl('polygon', {
    points: `${x2},${y2} ${bx+nx*AH*0.45},${by+ny*AH*0.45} ${bx-nx*AH*0.45},${by-ny*AH*0.45}`,
    fill
  }));
}

/* нарисовать ломаную линию со стрелкой в конце */
function polyLine(svg, pts, color) {
  const d = pts.map((p, i) => `${i ? 'L' : 'M'}${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(' ');
  svg.appendChild(svgEl('path', {
    d, stroke: color, 'stroke-width': SW, fill: 'none',
    'stroke-linejoin': 'round', 'stroke-linecap': 'round'
  }));
  const n = pts.length;
  arrowHead(svg, pts[n-2][0], pts[n-2][1], pts[n-1][0], pts[n-1][1], color);
}

/* ── MAIN ────────────────────────────────────────────── */
function drawArrows() {
  const svg = document.getElementById('arrowsSvg');
  const sl  = document.getElementById('swimlane');
  if (!svg || !sl) return;
  svg.innerHTML = '';

  const base = sl.getBoundingClientRect();

  /* получить координаты ячейки относительно swimlane */
  function rect(id) {
    const el = sl.querySelector(`[data-id="${id}"]`);
    if (!el) return null;
    const r = el.getBoundingClientRect();
    const x = r.left - base.left, y = r.top - base.top;
    return {
      x, y, w: r.width, h: r.height,
      cx: x + r.width / 2,
      cy: y + r.height / 2,
      T:  [x + r.width / 2, y],
      B:  [x + r.width / 2, y + r.height],
      L:  [x,               y + r.height / 2],
      R:  [x + r.width,     y + r.height / 2],
    };
  }

  const c = {};
  ['pp-attract','rb-attract','sod-agree','gb-instant',
   'sod-prep','gb-send',
   'pp-sign','rb-sign',
   'sod-list','sod-crm','sod-open',
   'pp-dist','rb-dist','sod-hand'].forEach(id => { c[id] = rect(id); });

  /* отступы для маршрутизации вне lanes */
  const RIGHT_MARGIN = base.width - 4; // правый край схемы
  const LEFT_MARGIN  = 4;              // левый край схемы
  const GAP = 14; // зазор между карточкой и линией

  /* ── 1. ПП Привлечение → СОД Согласование
         выходим из правого края pp-attract, идём вправо через rb-attract к sod-agree ── */
  polyLine(svg, [
    c['pp-attract'].R,
    [c['sod-agree'].L[0], c['pp-attract'].cy],
    c['sod-agree'].L,
  ], RED);

  /* ── 2. РБ Привлечение → СОД Согласование ── */
  polyLine(svg, [
    c['rb-attract'].R,
    c['sod-agree'].L,
  ], RED);

  /* ── 3. СОД Согласование → СОД Подготовка (вниз) ── */
  polyLine(svg, [ c['sod-agree'].B, c['sod-prep'].T ], RED);

  /* ── 4. СОД Подготовка → ПП Подписание (←)
         идём влево от sod-prep, маршрут по левому краю lane-1 ── */
  {
    const fy = c['sod-prep'].cy;
    const ty = c['pp-sign'].cy;
    // промежуточный X — левее колонки ПП
    const routeX = c['pp-sign'].x - GAP;
    polyLine(svg, [
      c['sod-prep'].L,
      [routeX, fy],
      [routeX, ty],
      c['pp-sign'].R,
    ], BLUE);
  }

  /* ── 5. СОД Подготовка → РБ Подписание (←) ── */
  {
    const fy = c['sod-prep'].cy;
    const ty = c['rb-sign'].cy;
    const routeX = c['rb-sign'].x - GAP * 0.6;
    polyLine(svg, [
      c['sod-prep'].L,
      [routeX, fy],
      [routeX, ty],
      c['rb-sign'].R,
    ], BLUE);
  }

  /* ── 6. СОД Подготовка → Приём списка (вниз) ── */
  polyLine(svg, [ c['sod-prep'].B, c['sod-list'].T ], RED);

  /* ── 7. Приём списка → Создание заявки (вниз) ── */
  polyLine(svg, [ c['sod-list'].B, c['sod-crm'].T ], RED);

  /* ── 8. Создание заявки → Открытие счетов (вниз) ── */
  polyLine(svg, [ c['sod-crm'].B, c['sod-open'].T ], RED);

  /* ── 9. Открытие счетов → ГБ Изготовление карт
         sod-open (col3 row6) → gb-instant (col4 row1)
         выходим вправо → идём по правому краю схемы вверх → входим справа в gb-instant ── */
  {
    const routeX = RIGHT_MARGIN - GAP;
    polyLine(svg, [
      c['sod-open'].R,
      [routeX, c['sod-open'].cy],
      [routeX, c['gb-instant'].cy],
      c['gb-instant'].R,
    ], RED);
  }

  /* ── 10. ГБ Изготовление → ГБ Отправка (вниз) ── */
  polyLine(svg, [ c['gb-instant'].B, c['gb-send'].T ], RED);

  /* ── 11. ГБ Отправка → СОД Передача Instant карт
          gb-send (col4 row2) → sod-hand (col3 row7)
          выходим вправо → идём вниз по правому краю → входим справа в sod-hand ── */
  {
    const routeX = RIGHT_MARGIN - GAP * 0.6;
    polyLine(svg, [
      c['gb-send'].R,
      [routeX, c['gb-send'].cy],
      [routeX, c['sod-hand'].cy],
      c['sod-hand'].R,
    ], RED);
  }

  /* ── 12. СОД Передача → РБ Раздача (←, та же строка) ── */
  polyLine(svg, [
    c['sod-hand'].L,
    c['rb-dist'].R,
  ], BLUE);

  /* ── 13. СОД Передача → ПП Раздача (←, та же строка, через rb-dist) ── */
  {
    const fy = c['sod-hand'].cy;
    const ty = c['pp-dist'].cy;
    const routeX = c['pp-dist'].x - GAP * 0.6;
    polyLine(svg, [
      c['sod-hand'].L,
      [routeX, fy],
      [routeX, ty],
      c['pp-dist'].R,
    ], BLUE);
  }
}
