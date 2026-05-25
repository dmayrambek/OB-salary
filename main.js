// ===== LANGUAGE SWITCH =====
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


// ===== TABLE FILTER =====
let activeFilter = 'all';

function filterTable(type) {
  activeFilter = type;

  const rows = document.querySelectorAll('#compare-table tbody tr');
  const dividers = document.querySelectorAll('.row-divider');
  const btnAll = document.getElementById('btn-all');
  const btnAdv = document.getElementById('btn-advantage');
  const btnGrowth = document.getElementById('btn-growth');

  // Reset button states
  [btnAll, btnAdv, btnGrowth].forEach(b => b.classList.remove('active'));
  if (type === 'all') btnAll.classList.add('active');
  if (type === 'advantage') btnAdv.classList.add('active');
  if (type === 'growth') btnGrowth.classList.add('active');

  rows.forEach(row => {
    const rowType = row.dataset.type;
    if (!rowType) return;

    row.classList.remove('highlighted', 'row-dimmed', 'hidden-row');

    if (type === 'all') {
      // Show all, no highlights
    } else if (type === 'advantage') {
      if (rowType === 'advantage') {
        row.classList.add('highlighted');
      } else if (rowType === 'growth' || rowType === 'neutral') {
        row.classList.add('row-dimmed');
      }
    } else if (type === 'growth') {
      if (rowType === 'growth') {
        row.classList.add('highlighted');
      } else if (rowType === 'advantage' || rowType === 'neutral') {
        row.classList.add('row-dimmed');
      }
    }
  });

  // Handle dividers visibility
  dividers.forEach(div => {
    div.classList.remove('hidden-row');
    if (type !== 'all') {
      div.classList.add('row-dimmed');
    } else {
      div.classList.remove('row-dimmed');
    }
  });
}

// Init: set "all" as active
filterTable('all');


// ===== NAV SCROLL BEHAVIOR =====
const nav = document.getElementById('nav');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
  // Scrolled class
  nav.classList.toggle('scrolled', window.scrollY > 20);

  // Active section highlight
  const sections = document.querySelectorAll('section[id]');
  let current = '';

  sections.forEach(section => {
    const sectionTop = section.offsetTop - 80;
    if (window.scrollY >= sectionTop) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.toggle('active', link.dataset.section === current);
  });
});


// ===== SMOOTH SCROLL FOR NAV LINKS =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = 64;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});
