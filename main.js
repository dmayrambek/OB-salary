// Инициализируем язык из памяти браузера или ставим по умолчанию 'ru'
let currentLang = localStorage.getItem('selectedPayrollLang') || 'ru';

function setLang(lang) {
  currentLang = lang;
  localStorage.setItem('selectedPayrollLang', lang); // Локальное сохранение выбора языка
  
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
}

// Слушатель событий для переключения языковых кнопок
document.querySelectorAll('.lang-btn').forEach(btn => {
  btn.addEventListener('click', () => setLang(btn.dataset.lang));
});

// Запуск перевода сразу после загрузки DOM дерева
document.addEventListener('DOMContentLoaded', () => {
  setLang(currentLang);
});

// Переключение светлой и темной темы оформления
function toggleTheme() {
  document.body.classList.toggle('light-mode');
}

// Фильтрация строк сравнительной таблицы маркетинга
function filterTable(type) {
  const table = document.getElementById('compare-table');
  if (!table) return; // Защита на случай, если таблицы нет на текущей странице

  const btnAll = document.getElementById('btn-all');
  const btnAdv = document.getElementById('btn-advantage');
  const btnGrowth = document.getElementById('btn-growth');
  
  if (btnAll && btnAdv && btnGrowth) {
    [btnAll, btnAdv, btnGrowth].forEach(b => b.classList.remove('active'));
    if (type === 'all') btnAll.classList.add('active');
    if (type === 'advantage') btnAdv.classList.add('active');
    if (type === 'growth') btnGrowth.classList.add('active');
  }
  
  table.classList.remove('mode-advantage', 'mode-growth');
  if (type === 'advantage') table.classList.add('mode-advantage');
  if (type === 'growth') table.classList.add('mode-growth');
}

// Интерактивное поведение навигационной панели при скролле
const nav = document.getElementById('nav');
if (nav) {
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 20);
  });
}

// Функция плавного скролла для якорных ссылок (если применимо)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - 64, behavior: 'smooth' });
    }
  });
});

// Логика разворачивания/сворачивания детализации SWIFT переводов
function toggleSwift(row) {
  const expanded = row.nextElementSibling;
  if (expanded) {
    const isOpen = expanded.style.display !== 'none';
    expanded.style.display = isOpen ? 'none' : 'table-row';
    row.classList.toggle('open', !isOpen);
  }
}

// Вспомогательная утилитарная функция навигации по ID
function goTo(id) {
  const target = document.getElementById(id);
  if (target) {
    window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - 64, behavior: 'smooth' });
  }
}
