let currentLang = 'ru';

function setLang(lang) {
  currentLang = lang;
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

document.querySelectorAll('.lang-btn').forEach(btn => {
  btn.addEventListener('click', () => setLang(btn.dataset.lang));
});

function toggleTheme() {
  document.body.classList.toggle('light-mode');
}

let activeFilter = 'all';

function filterTable(type) {
  activeFilter = type;
  const table = document.getElementById('compare-table');
  const btnAll = document.getElementById('btn-all');
  const btnAdv = document.getElementById('btn-advantage');
  const btnGrowth = document.getElementById('btn-growth');
  [btnAll, btnAdv, btnGrowth].forEach(b => b.classList.remove('active'));
  if (type === 'all') btnAll.classList.add('active');
  if (type === 'advantage') btnAdv.classList.add('active');
  if (type === 'growth') btnGrowth.classList.add('active');
  table.classList.remove('mode-advantage', 'mode-growth');
  if (type === 'advantage') table.classList.add('mode-advantage');
  if (type === 'growth') table.classList.add('mode-growth');
}

filterTable('all');

const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 20);
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - 64, behavior: 'smooth' });
    }
  });
});

function toggleSwift(row) {
  const expanded = row.nextElementSibling;
  const isOpen = expanded.style.display !== 'none';
  expanded.style.display = isOpen ? 'none' : 'table-row';
  row.classList.toggle('open', !isOpen);
}
