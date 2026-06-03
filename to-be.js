'use strict';
let currentLang = localStorage.getItem('siteLang') || 'ru';

function toggleTheme() {
  const isLight = document.body.classList.toggle('light-mode');
  localStorage.setItem('siteTheme', isLight ? 'light' : 'dark');
  document.querySelectorAll('.theme-icon-dark').forEach(el => el.style.display = isLight ? 'none' : '');
  document.querySelectorAll('.theme-icon-light').forEach(el => el.style.display = isLight ? '' : 'none');
}

function applyTheme() {
  const isLight = localStorage.getItem('siteTheme') === 'light';
  if (isLight) document.body.classList.add('light-mode');
  document.querySelectorAll('.theme-icon-dark').forEach(el => el.style.display = isLight ? 'none' : '');
  document.querySelectorAll('.theme-icon-light').forEach(el => el.style.display = isLight ? '' : 'none');
}

document.addEventListener('DOMContentLoaded', () => {
  applyTheme();

  /* ── Применяем язык ── */
  document.querySelectorAll('.lang-btn').forEach(b =>
    b.classList.toggle('active', b.dataset.lang === currentLang));
  document.querySelectorAll('[data-ru][data-en]').forEach(el =>
    el.textContent = el.dataset[currentLang]);
  document.documentElement.lang = currentLang;

  /* ── Переключение языка ── */
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

  /* ── Entrance animation ── */
  document.querySelectorAll('.lane-item').forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(5px)';
    el.style.transition = `opacity .3s ease ${i * .04}s, transform .3s ease ${i * .04}s`;
    requestAnimationFrame(() => requestAnimationFrame(() => {
      el.style.opacity = '';
      el.style.transform = '';
    }));
  });
});
