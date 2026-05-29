// to-be.js — O!Bank ЗПП To-Be scheme interactions

let currentLang = 'ru';

document.addEventListener('DOMContentLoaded', () => {

  /* ── Lang switcher ── */
  const langBtns = document.querySelectorAll('.lang-btn');
  langBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const lang = btn.dataset.lang;
      if (lang === currentLang) return;
      currentLang = lang;
      langBtns.forEach(b => b.classList.toggle('active', b.dataset.lang === lang));
      switchLang(lang);
    });
  });

  /* ── Draw SVG elbow arrows ── */
  drawElbowArrows();

  /* ── Staggered entrance animation ── */
  animateEntrance();

});

/**
 * Switch all [data-ru] / [data-en] elements to the selected language.
 * Works on any element with both attributes.
 */
function switchLang(lang) {
  document.querySelectorAll('[data-ru][data-en]').forEach(el => {
    el.textContent = el.dataset[lang];
  });
  document.documentElement.lang = lang;
}

/**
 * Draws a vertical SVG down-arrow inside each [data-elbow] slot.
 */
function drawElbowArrows() {
  document.querySelectorAll('[data-elbow]').forEach(el => {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('width', '20');
    svg.setAttribute('height', '40');
    svg.setAttribute('viewBox', '0 0 20 40');
    svg.style.cssText = 'display:block;margin:0 auto;';

    const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line.setAttribute('x1', '10'); line.setAttribute('y1', '0');
    line.setAttribute('x2', '10'); line.setAttribute('y2', '32');
    line.setAttribute('stroke', '#e8174a');
    line.setAttribute('stroke-width', '2');

    const arrow = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
    arrow.setAttribute('points', '5,30 15,30 10,40');
    arrow.setAttribute('fill', '#e8174a');

    svg.appendChild(line);
    svg.appendChild(arrow);
    el.appendChild(svg);
  });
}

/**
 * Staggered fade-in for step cards and result list items.
 */
function animateEntrance() {
  document.querySelectorAll('.step-card').forEach((card, i) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(10px)';
    card.style.transition = `opacity 0.4s ease ${i * 0.08}s, transform 0.4s ease ${i * 0.08}s`;
    requestAnimationFrame(() => requestAnimationFrame(() => {
      card.style.opacity = '1';
      card.style.transform = 'translateY(0)';
    }));
  });

  document.querySelectorAll('.results-block li').forEach((item, i) => {
    item.style.opacity = '0';
    item.style.transform = 'translateX(-8px)';
    item.style.transition = `opacity 0.4s ease ${0.5 + i * 0.12}s, transform 0.4s ease ${0.5 + i * 0.12}s`;
    requestAnimationFrame(() => requestAnimationFrame(() => {
      item.style.opacity = '1';
      item.style.transform = 'translateX(0)';
    }));
  });
}
