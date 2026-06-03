'use strict';
let currentLang = localStorage.getItem('siteLang') || 'ru';
let problemsOn = false;

document.addEventListener('DOMContentLoaded', () => {
  /* ── Восстанавливаем тему ── */
  const _isLight = localStorage.getItem('siteTheme') === 'light';
  if (_isLight) document.body.classList.add('light-mode');
  document.querySelectorAll('.theme-icon-dark').forEach(el => el.style.display = _isLight ? 'none' : '');
  document.querySelectorAll('.theme-icon-light').forEach(el => el.style.display = _isLight ? '' : 'none');

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
  // Показываем проблемы сразу при загрузке
  setTimeout(() => showProblems(), 100);
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


function showProblems() {
  problemsOn = true;
  const grid    = document.getElementById('asisGrid');
  const btn     = document.getElementById('btnProblems');
  const summary = document.getElementById('summaryBlock');
  grid.classList.add('problems-on');
  btn.classList.add('active');
  summary.classList.add('highlight');
  const btnSpan = btn.querySelector('span');
  if (btnSpan) {
    btnSpan.dataset.ru = 'Скрыть проблемы';
    btnSpan.dataset.en = 'Hide issues';
    btnSpan.textContent = currentLang === 'ru' ? 'Скрыть проблемы' : 'Hide issues';
  }
  document.querySelectorAll('.summary-item').forEach(el => el.classList.add('highlight'));
  document.querySelectorAll('.prob-card:not(.prob-card--spacer)').forEach(card => card.classList.add('visible'));
  setTimeout(syncHeights, 380);
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
  document.querySelectorAll('.theme-icon-dark').forEach(el => el.style.display = isLight ? 'none' : '');
  document.querySelectorAll('.theme-icon-light').forEach(el => el.style.display = isLight ? '' : 'none');
}
