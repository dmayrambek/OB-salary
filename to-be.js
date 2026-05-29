let currentLang = 'ru';

document.addEventListener('DOMContentLoaded', () => {

  /* ── Lang switcher ── */
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const lang = btn.dataset.lang;
      if (lang === currentLang) return;
      currentLang = lang;
      document.querySelectorAll('.lang-btn').forEach(b => b.classList.toggle('active', b.dataset.lang === lang));
      switchLang(lang);
    });
  });

  /* ── Entrance animation ── */
  animateEntrance();
});

function switchLang(lang) {
  document.querySelectorAll('[data-ru][data-en]').forEach(el => {
    el.textContent = el.dataset[lang];
  });
  document.documentElement.lang = lang;
}

function animateEntrance() {
  document.querySelectorAll('.step-card').forEach((card, i) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(8px)';
    card.style.transition = `opacity 0.35s ease ${i * 0.06}s, transform 0.35s ease ${i * 0.06}s`;
    requestAnimationFrame(() => requestAnimationFrame(() => {
      card.style.opacity = '1';
      card.style.transform = 'translateY(0)';
    }));
  });

  document.querySelectorAll('.results-block li').forEach((item, i) => {
    item.style.opacity = '0';
    item.style.transform = 'translateX(-8px)';
    item.style.transition = `opacity 0.4s ease ${0.6 + i * 0.12}s, transform 0.4s ease ${0.6 + i * 0.12}s`;
    requestAnimationFrame(() => requestAnimationFrame(() => {
      item.style.opacity = '1';
      item.style.transform = 'translateX(0)';
    }));
  });
}
