'use strict';
let currentLang = localStorage.getItem('siteLang') || 'ru';
let problemsOn = false;

document.addEventListener('DOMContentLoaded', () => {
  /* ── Восстанавливаем тему ── */
  if (localStorage.getItem('siteTheme') === 'light') {
    document.body.classList.add('light-mode');
  }

  /* ── Язык ── */
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const lang = btn.dataset.lang;
      if (lang === currentLang) return;
      currentLang = lang;
      localStorage.setItem('siteLang', lang);
      document.querySelectorAll('.lang-btn').forEach(b =>
        b.classList.toggle('active', b.dataset.lang === lang));
      document.querySelectorAll('[data-ru][data-en]').forEach(el =>
        el.textContent = el.dataset[lang]);
      document.documentElement.lang = lang;
    });
  });

  /* ── Применяем сохранённый язык ── */
  document.querySelectorAll('.lang-btn').forEach(b =>
    b.classList.toggle('active', b.dataset.lang === currentLang));
  document.querySelectorAll('[data-ru][data-en]').forEach(el =>
    el.textContent = el.dataset[currentLang]);
  document.documentElement.lang = currentLang;

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

  syncHeights();
  window.addEventListener('resize', syncHeights);
});

function syncHeights() {
  alignGap('rbLane', 'gap1');
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
      cards[i].style.height    = '';
      cards[i].style.minHeight = '';
      const rowH  = item.getBoundingClientRect().height;
      const cardH = cards[i].scrollHeight;
      cards[i].style.minHeight = Math.max(rowH, cardH) + 'px';
    }
  });
}

function toggleProblems() {
  problemsOn = !problemsOn;
  const grid    = document.getElementById('asisGrid');
  const btn     = document.getElementById('btnProblems');
  const summary = document.getElementById('summaryBlock');
  grid.classList.toggle('problems-on', problemsOn);
  btn.classList.toggle('active', problemsOn);
  summary.classList.toggle('highlight', problemsOn);

  const btnSpan = btn.querySelector('span');
  if (btnSpan) {
    btnSpan.dataset.ru = problemsOn ? 'Скрыть проблемы' : 'Показать проблемы';
    btnSpan.dataset.en = problemsOn ? 'Hide issues'     : 'Show issues';
    btnSpan.textContent = problemsOn
      ? (currentLang === 'ru' ? 'Скрыть проблемы' : 'Hide issues')
      : (currentLang === 'ru' ? 'Показать проблемы' : 'Show issues');
  }

  document.querySelectorAll('.summary-item').forEach(el =>
    el.classList.toggle('highlight', problemsOn));

  const cards = document.querySelectorAll('.prob-card:not(.prob-card--spacer)');
  cards.forEach(card => {
    if (problemsOn) card.classList.add('visible');
    else card.classList.remove('visible');
  });

  setTimeout(syncHeights, 380);
}

/* ── Переключение темы (доступно на этой странице тоже) ── */
function toggleTheme() {
  const isLight = document.body.classList.toggle('light-mode');
  localStorage.setItem('siteTheme', isLight ? 'light' : 'dark');
}
