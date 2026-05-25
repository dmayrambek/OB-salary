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

let activeFilter = 'all';

function filterTable(type) {
  activeFilter = type;
  const rows = document.querySelectorAll('#compare-table tbody tr');
  const dividers = document.querySelectorAll('.row-divider');
  const btnAll = document.getElementById('btn-all');
  const btnAdv = document.getElementById('btn-advantage');
  const btnGrowth = document.getElementById('btn-growth');

  [btnAll, btnAdv, btnGrowth].forEach(b => b.classList.remove('active'));
  if (type === 'all') btnAll.classList.add('active');
  if (type === 'advantage') btnAdv.classList.add('active');
  if (type === 'growth') btnGrowth.classList.add('active');

  rows.forEach(row => {
    const rowType = row.dataset.type;
    if (!rowType) return;
    row.classList.remove('highlighted', 'row-dimmed', 'hidden-row');
    if (type === 'advantage' && rowType === 'advantage') row.classList.add('highlighted');
    if (type === 'growth' && rowType === 'growth') row.classList.add('highlighted');
  });

  dividers.forEach(div => {
    div.classList.remove('hidden-row', 'row-dimmed');
    if (type !== 'all') div.classList.add('row-dimmed');
  });
}

filterTable('all');

const nav = document.getElementById('nav');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 20);
  const sections = document.querySelectorAll('section[id]');
  let current = '';
  sections.forEach(section => {
    if (window.scrollY >= section.offsetTop - 80) current = section.getAttribute('id');
  });
  navLinks.forEach(link => {
    link.classList.toggle('active', link.dataset.section === current);
  });
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
