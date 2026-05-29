'use strict';
let currentLang = 'ru';
let problemsOn = false;

document.addEventListener('DOMContentLoaded', () => {

  /* ── Язык ── */
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

  /* ── Entrance animation ── */
  document.querySelectorAll('.lane-item').forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(5px)';
    el.style.transition = `opacity .3s ease ${i * .03}s, transform .3s ease ${i * .03}s`;
    requestAnimationFrame(() => requestAnimationFrame(() => {
      el.style.opacity = '';
      el.style.transform = '';
    }));
  });

  /* ── Синхронизация высот gap-body со lane-body ──
     Каждая prob-card должна иметь ту же высоту что соответствующий lane-item
     чтобы проблемы были точно напротив своих строк ── */
  syncHeights();
  window.addEventListener('resize', syncHeights);
});

function syncHeights() {
  /* РБ: lane-items → gap1 prob-cards */
  alignGap('rbLane', 'gap1');
  /* СОЮФЛ: lane-items → gap2 prob-cards */
  alignGap('sodLane', 'gap2');
}

function alignGap(laneId, gapId) {
  const lane = document.getElementById(laneId);
  const gap  = document.getElementById(gapId);
  if (!lane || !gap) return;

  const items = lane.querySelectorAll('.lane-item');
  const cards = gap.querySelectorAll('.prob-card');

  items.forEach((item, i) => {
    if (cards[i]) {
      const h = item.getBoundingClientRect().height;
      cards[i].style.minHeight = h + 'px';
      cards[i].style.height    = h + 'px';
    }
  });
}

/* ── Показать / скрыть проблемы ── */
function toggleProblems() {
  problemsOn = !problemsOn;

  const grid    = document.getElementById('asisGrid');
  const btn     = document.getElementById('btnProblems');
  const summary = document.getElementById('summaryBlock');

  grid.classList.toggle('problems-on', problemsOn);
  btn.classList.toggle('active', problemsOn);
  summary.classList.toggle('highlight', problemsOn);

  /* текст кнопки */
  const btnSpan = btn.querySelector('span');
  if (btnSpan) {
    btnSpan.dataset.ru = problemsOn ? 'Скрыть проблемы' : 'Показать проблемы';
    btnSpan.dataset.en = problemsOn ? 'Hide issues'     : 'Show issues';
    btnSpan.textContent = problemsOn
      ? (currentLang === 'ru' ? 'Скрыть проблемы' : 'Hide issues')
      : (currentLang === 'ru' ? 'Показать проблемы' : 'Show issues');
  }

  /* подсветка summary items */
  document.querySelectorAll('.summary-item').forEach(el =>
    el.classList.toggle('highlight', problemsOn));

  /* показываем/скрываем prob-cards с задержкой */
  const cards = document.querySelectorAll('.prob-card:not(.prob-card--spacer)');
  cards.forEach((card, i) => {
    if (problemsOn) {
      card.style.transition = `opacity .25s ease ${i * 70}ms, transform .25s ease ${i * 70}ms`;
      requestAnimationFrame(() => requestAnimationFrame(() => {
        card.classList.add('visible');
      }));
    } else {
      card.style.transition = 'opacity .15s ease, transform .15s ease';
      card.classList.remove('visible');
    }
  });

  /* пересинхронизировать высоты после анимации grid */
  setTimeout(syncHeights, 380);
}
