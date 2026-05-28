function switchLang(lang) {
    document.querySelectorAll('[data-ru]').forEach(el => {
        el.innerText = el.getAttribute('data-' + lang);
    });
    localStorage.setItem('userLang', lang);
}

document.addEventListener('DOMContentLoaded', () => {
    const savedLang = localStorage.getItem('userLang') || 'ru';
    switchLang(savedLang);
});
