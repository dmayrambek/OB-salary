function switchLang(lang) {
    document.querySelectorAll('[data-ru]').forEach(el => {
        if (el.id === 'benefits-list') {
            el.innerHTML = el.getAttribute('data-' + lang);
        } else {
            el.innerText = el.getAttribute('data-' + lang);
        }
    });
    localStorage.setItem('userLang', lang);
}

document.addEventListener('DOMContentLoaded', () => {
    const savedLang = localStorage.getItem('userLang') || 'ru';
    switchLang(savedLang);
});
