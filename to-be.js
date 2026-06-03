'use strict';
let currentLang = 'ru';
let advVisible = false;

function toggleAdvantages() {
  advVisible = !advVisible;
  const btn = document.getElementById('adv-btn');
  const btnText = document.getElementById('adv-btn-text');

  btn.classList.toggle('active', advVisible);

  // Обновляем текст кнопки
  const textRu = advVisible ? 'Скрыть преимущества' : 'Показать преимущества';
  const textEn = advVisible ? 'Hide advantages' : 'Show advantages';
  btnText.dataset.ru = textRu;
  btnText.dataset.en = textEn;
  btnText.textContent = currentLang === 'ru' ? textRu : textEn;

  // Для каждой группы шагов — показываем подсказку только на первом в группе
  const groups = {};
  document.querySelectorAll('.adv-item').forEach(item => {
    const group = item.dataset.advGroup;
    if (!groups[group]) groups[group] = [];
    groups[group].push(item);
  });

  document.querySelectorAll('.adv-item').forEach(item => {
    item.classList.toggle('adv-active', advVisible);
    // Удаляем старые подсказки
    const old = item.querySelector('.adv-hint');
    if (old) old.remove();
  });

  if (advVisible) {
    // Добавляем подсказку только к первому элементу каждой группы
    Object.values(groups).forEach(items => {
      const first = items[0];
      const hint = document.createElement('div');
      hint.className = 'adv-hint';
      hint.textContent = currentLang === 'ru'
        ? first.dataset.advRu
        : first.dataset.advEn;
      first.appendChild(hint);
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const lang = btn.dataset.lang;
      if (lang === currentLang) return;
      currentLang = lang;
      document.querySelectorAll('.lang-btn').forEach(b =>
        b.classList.toggle('active', b.dataset.lang === lang));
      document.querySelectorAll('[data-ru][data-en]').forEach(el =>
        el.textContent = el.dataset[lang]);
      document.documentElement.lang = lang;

      // Обновляем подсказки если открыты
      if (advVisible) {
        document.querySelectorAll('.adv-hint').forEach(hint => {
          const parent = hint.closest('.adv-item');
          hint.textContent = lang === 'ru' ? parent.dataset.advRu : parent.dataset.advEn;
        });
      }
    });
  });

  /* entrance animation */
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
