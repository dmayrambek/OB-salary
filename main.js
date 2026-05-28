// ==========================================================================
// 🌍 МУЛЬТИЯЗЫЧНОСТЬ (ГЛОБАЛЬНОЕ УПРАВЛЕНИЕ RU / EN)
// ==========================================================================

// Инициализируем язык из памяти браузера или ставим по умолчанию 'ru'
let currentLang = localStorage.getItem('selectedPayrollLang') || 'ru';

function setLang(lang) {
  currentLang = lang;
  localStorage.setItem('selectedPayrollLang', lang); // Локальное сохранение выбора языка
  
  // Перевод всех статичных элементов верстки по дата-атрибутам
  document.querySelectorAll('[data-' + lang + ']').forEach(el => {
    const text = el.getAttribute('data-' + lang);
    if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
      el.placeholder = text;
    } else {
      el.innerHTML = text;
    }
  });
  
  // Переключение активного визуального класса у кнопок переключателя
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === lang);
  });
  
  document.documentElement.lang = lang;

  // 🔥 ИНТЕГРАЦИЯ ДЛЯ СХЕМЫ ПРОЦЕССОВ:
  // Если на текущей странице развернута схема и подключен scheme.js,
  // мы командуем ему мгновенно обновить контент боковой панели подробностей
  if (typeof window.updateSchemeLanguage === 'function') {
    window.updateSchemeLanguage();
  }
}

// Слушатель событий для переключения языковых кнопок в шапке
document.querySelectorAll('.lang-btn').forEach(btn => {
  btn.addEventListener('click', () => setLang(btn.dataset.lang));
});


// ==========================================================================
// 🎨 ИНТЕРФЕЙС И ОФОРМЛЕНИЕ (ТЕМЫ, НАВИГАЦИЯ, СКРОЛЛ)
// ==========================================================================

// Переключение светлой и темной темы оформления
function toggleTheme() {
  document.body.classList.toggle('light-mode');
}

// Интерактивное поведение навигационной панели при скролле
const nav = document.getElementById('nav');
if (nav) {
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 20);
  });
}

// Функция плавного скролла для якорных ссылок
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

// Вспомогательная утилитарная функция навигации по ID (клик по кнопкам-картам)
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
// 📊 ФУНКЦИОНАЛ ТАБЛИЦ (МАРКЕТИНГОВОЕ ИССЛЕДОВАНИЕ И SWIFT)
// ==========================================================================

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

// Логика разворачивания/сворачивания детализации корреспондентской сети SWIFT
function toggleSwift(row) {
  const expanded = row.nextElementSibling;
  if (expanded) {
    const isOpen = expanded.style.display !== 'none';
    expanded.style.display = isOpen ? 'none' : 'table-row';
    row.classList.toggle('open', !isOpen);
  }
}


// ==========================================================================
// 🚀 ЗАПУСК ПОСЛЕ ЗАГРУЗКИ СТРАНИЦЫ
// ==========================================================================

// Запуск перевода сразу после полной загрузки DOM дерева
document.addEventListener('DOMContentLoaded', () => {
  setLang(currentLang);
});
