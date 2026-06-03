// ==========================================================================
// 🌍 МУЛЬТИЯЗЫЧНОСТЬ — единый ключ для всего сайта
// ==========================================================================
let currentLang = localStorage.getItem('siteLang') || 'ru';

function setLang(lang) {
  currentLang = lang;
  localStorage.setItem('siteLang', lang);

  document.querySelectorAll('[data-' + lang + ']').forEach(el => {
    const text = el.getAttribute('data-' + lang);
    if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
      el.placeholder = text;
    } else {
      el.innerHTML = text;
    }
  });

  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === lang);
  });

  document.documentElement.lang = lang;

  if (typeof window.updateSchemeLanguage === 'function') {
    window.updateSchemeLanguage();
  }
}

document.querySelectorAll('.lang-btn').forEach(btn => {
  btn.addEventListener('click', () => setLang(btn.dataset.lang));
});


// ==========================================================================
// 🎨 ТЕМА — сохраняем в localStorage
// ==========================================================================
function toggleTheme() {
  const isLight = document.body.classList.toggle('light-mode');
  localStorage.setItem('siteTheme', isLight ? 'light' : 'dark');
}


// ==========================================================================
// 🧭 НАВИГАЦИЯ И СКРОЛЛ
// ==========================================================================
const nav = document.getElementById('nav');
if (nav) {
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 20);
  });
}

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      window.scrollTo({
        top: target.getBoundingClientRect().top + window.scrollY - 64,
        behavior: 'smooth'
      });
    }
  });
});

function goTo(id) {
  const target = document.getElementById(id);
  if (target) {
    window.scrollTo({
      top: target.getBoundingClientRect().top + window.scrollY - 64,
      behavior: 'smooth'
    });
  }
}


// ==========================================================================
// 📊 ТАБЛИЦЫ
// ==========================================================================
function filterTable(type) {
  const table = document.getElementById('compare-table');
  if (!table) return;

  const btnAll = document.getElementById('btn-all');
  const btnAdv = document.getElementById('btn-advantage');
  const btnGrowth = document.getElementById('btn-growth');

  if (btnAll && btnAdv && btnGrowth) {
    [btnAll, btnAdv, btnGrowth].forEach(b => b.classList.remove('active'));
    if (type === 'all') btnAll.classList.add('active');
    if (type === 'advantage') btnAdv.classList.add('active');
    if (type === 'growth') btnGrowth.classList.add('active');
  } else if (btnAll && btnAdv) {
    [btnAll, btnAdv].forEach(b => b.classList.remove('active'));
    if (type === 'all') btnAll.classList.add('active');
    if (type === 'advantage') btnAdv.classList.add('active');
  }

  table.classList.remove('mode-advantage', 'mode-growth');
  if (type === 'advantage') table.classList.add('mode-advantage');
  if (type === 'growth') table.classList.add('mode-growth');
}

function toggleSwift(row) {
  const expanded = row.nextElementSibling;
  if (expanded) {
    const isOpen = expanded.style.display !== 'none';
    expanded.style.display = isOpen ? 'none' : 'table-row';
    row.classList.toggle('open', !isOpen);
  }
}


// ==========================================================================
// 🚀 ЗАПУСК
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {
  // Восстанавливаем тему
  if (localStorage.getItem('siteTheme') === 'light') {
    document.body.classList.add('light-mode');
  }
  // Восстанавливаем язык
  setLang(currentLang);
});
