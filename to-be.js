function switchLang(lang) {
    document.querySelectorAll('[data-ru]').forEach(el => {
        // Если это наш список преимуществ, обновляем innerHTML (там тэги <li>)
        if (el.id === 'benefits-list') {
            el.innerHTML = el.getAttribute('data-' + lang);
        } else {
            // Для остальных элементов просто меняем текст
            el.innerText = el.getAttribute('data-' + lang);
        }
    });
    localStorage.setItem('userLang', lang);
}

window.onload = () => {
    // 1. Применяем язык
    const savedLang = localStorage.getItem('userLang') || 'ru';
    switchLang(savedLang);

    // 2. Рисуем стрелки
    const lineConfig = { color: '#10b981', size: 2, path: 'grid', endPlug: 'arrow3' };
    
    // Подключение стрелок (связи блоков)
    new LeaderLine(document.getElementById('node-1'), document.getElementById('node-7'), lineConfig);
    new LeaderLine(document.getElementById('node-5'), document.getElementById('node-8'), lineConfig);
    new LeaderLine(document.getElementById('node-14'), document.getElementById('node-12'), lineConfig);
};
