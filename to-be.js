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
    c.style.transition = `opacity .3s ease ${i*.04}s,transform .3s ease ${i*.04}s`;
    requestAnimationFrame(() => requestAnimationFrame(() => {
      c.style.opacity = '1'; c.style.transform = 'translateY(0)';
    }));
  });

  setTimeout(drawArrows, 150);
  window.addEventListener('resize', () => setTimeout(drawArrows, 80));
});

/* ─── SVG helpers ─────────────────────────────────────── */
const NS  = 'http://www.w3.org/2000/svg';
const RED = '#e8174a';
const BLU = '#5b8cff';
const SW  = 2;
const AH  = 7;

function mk(tag, attrs) {
  const el = document.createElementNS(NS, tag);
  Object.entries(attrs).forEach(([k,v]) => el.setAttribute(k,v));
  return el;
}

function head(svg, x1,y1, x2,y2, fill) {
  const dx=x2-x1, dy=y2-y1, d=Math.hypot(dx,dy)||1;
  const ux=dx/d, uy=dy/d, nx=-uy, ny=ux;
  const bx=x2-ux*AH, by=y2-uy*AH;
  svg.appendChild(mk('polygon',{
    points:`${x2},${y2} ${bx+nx*AH*.45},${by+ny*AH*.45} ${bx-nx*AH*.45},${by-ny*AH*.45}`,
    fill
  }));
}

/* ломаная линия со стрелкой в конце */
function arrow(svg, pts, color) {
  const d = pts.map((p,i)=>`${i?'L':'M'}${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(' ');
  svg.appendChild(mk('path',{d,stroke:color,'stroke-width':SW,fill:'none','stroke-linejoin':'round','stroke-linecap':'round'}));
  const n=pts.length;
  head(svg, pts[n-2][0],pts[n-2][1], pts[n-1][0],pts[n-1][1], color);
}

/* ─── DRAW ─────────────────────────────────────────────── */
function drawArrows() {
  const svg = document.getElementById('arrowsSvg');
  const sl  = document.getElementById('swimlane');
  if (!svg||!sl) return;
  svg.innerHTML = '';

  const base = sl.getBoundingClientRect();

  function r(id) {
    const el = sl.querySelector(`[data-id="${id}"]`);
    if (!el) return null;
    const b = el.getBoundingClientRect();
    const x=b.left-base.left, y=b.top-base.top;
    return {
      x,y,w:b.width,h:b.height,
      cx:x+b.width/2, cy:y+b.height/2,
      T:[x+b.width/2, y],
      B:[x+b.width/2, y+b.height],
      L:[x,           y+b.height/2],
      R:[x+b.width,   y+b.height/2],
    };
  }

  const c={};
  ['pp-attract','rb-attract','sod-agree','gb-instant',
   'sod-prep','gb-send','pp-sign','rb-sign',
   'sod-list','sod-crm','sod-open',
   'pp-dist','rb-dist','sod-hand'
  ].forEach(id=>{ c[id]=r(id); });

  if(!c['pp-attract']) return;

  /* ── Вертикальные стрелки внутри СОД (col3) ── */
  // Согласование → Подготовка
  arrow(svg, [c['sod-agree'].B, c['sod-prep'].T], RED);
  // Подготовка → (пустые строки) → Приём списка
  // Нет промежуточных — идёт вниз через пустые ячейки
  arrow(svg, [c['sod-prep'].B, c['sod-list'].T], RED);
  // Приём → Создание заявки
  arrow(svg, [c['sod-list'].B, c['sod-crm'].T], RED);
  // Создание заявки → Открытие счетов
  arrow(svg, [c['sod-crm'].B, c['sod-open'].T], RED);

  /* ── Вертикальные внутри ГБ (col4) ── */
  // Изготовление → Отправка
  arrow(svg, [c['gb-instant'].B, c['gb-send'].T], RED);

  /* ── ПП Привлечение → СОД Согласование (горизонтально вправо, row1) ── */
  // Пересекает rb-attract — идём по cy pp-attract → сod-agree.L
  arrow(svg, [
    c['pp-attract'].R,
    [c['sod-agree'].L[0], c['pp-attract'].cy],
    c['sod-agree'].L
  ], RED);

  /* ── РБ Привлечение → СОД Согласование (горизонтально вправо, row1) ── */
  arrow(svg, [c['rb-attract'].R, c['sod-agree'].L], RED);

  /* ── СОД Открытие счетов → ГБ Изготовление карт
        sod-open = row6/col3, gb-instant = row1/col4
        Прямая стрелка вправо НЕ работает (разные строки).
        Маршрут: выход вправо из sod-open → вдоль правого края → вверх до row1 → вход справа в gb-instant ── */
  {
    const ROUTE_X = base.width - 10; // правый край схемы
    arrow(svg, [
      c['sod-open'].R,
      [ROUTE_X, c['sod-open'].cy],
      [ROUTE_X, c['gb-instant'].cy],
      c['gb-instant'].R,
    ], RED);
  }

  /* ── ГБ Отправка → СОД Передача Instant карт
        gb-send = row2/col4, sod-hand = row7/col3
        Маршрут: выход вправо → вниз до row7 → вход справа в sod-hand ── */
  {
    const ROUTE_X = base.width - 10;
    arrow(svg, [
      c['gb-send'].R,
      [ROUTE_X, c['gb-send'].cy],
      [ROUTE_X, c['sod-hand'].cy],
      c['sod-hand'].R,
    ], RED);
  }

  /* ── СОД Подготовка → РБ Подписание (←, row2→row3)
        Горизонтально влево из sod-prep.L → вход с правой стороны rb-sign
        Но строки разные — нужен elbow через левый край col2 ── */
  arrow(svg, [
    c['sod-prep'].L,
    [c['rb-sign'].R[0], c['sod-prep'].cy],
    c['rb-sign'].R
  ], BLU);

  /* ── СОД Подготовка → ПП Подписание (←, row2→row3) ── */
  arrow(svg, [
    c['sod-prep'].L,
    [c['pp-sign'].R[0], c['sod-prep'].cy],
    c['pp-sign'].R
  ], BLU);

  /* ── СОД Передача → РБ Раздача (←, row7, та же строка) ── */
  arrow(svg, [c['sod-hand'].L, c['rb-dist'].R], BLU);

  /* ── СОД Передача → ПП Раздача (←, row7, через rb-dist) ── */
  arrow(svg, [
    c['sod-hand'].L,
    [c['pp-dist'].R[0], c['sod-hand'].cy],
    c['pp-dist'].R
  ], BLU);
}
