// Функция переключения языков
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

// Отрисовка стрелок
window.onload = () => {
    // Язык
    const savedLang = localStorage.getItem('userLang') || 'ru';
    switchLang(savedLang);

    // Конфиг для "бизнес-стрелок" (прямые линии)
    const lineConfig = { 
        color: '#10b981', 
        size: 2, 
        path: 'grid',      // Делает линии строго горизонтальными/вертикальными
        endPlug: 'arrow3', // Красивая стрелка
        startSocket: 'right', 
        endSocket: 'left' 
    };

    // 1. Связи из Прямых продаж и РБ в СОД
    new LeaderLine(document.getElementById('node-1'), document.getElementById('node-7'), lineConfig);
    new LeaderLine(document.getElementById('node-4'), document.getElementById('node-8'), lineConfig);

    // 2. Последовательность внутри СОД (вертикальные стрелки)
    const vConfig = { ...lineConfig, startSocket: 'bottom', endSocket: 'top' };
    new LeaderLine(document.getElementById('node-7'), document.getElementById('node-8'), vConfig);
    new LeaderLine(document.getElementById('node-8'), document.getElementById('node-9'), vConfig);
    new LeaderLine(document.getElementById('node-9'), document.getElementById('node-10'), vConfig);
    new LeaderLine(document.getElementById('node-10'), document.getElementById('node-11'), vConfig);
    new LeaderLine(document.getElementById('node-11'), document.getElementById('node-12'), vConfig);

    // 3. Связь Головного банка с СОД
    new LeaderLine(document.getElementById('node-13'), document.getElementById('node-14'), vConfig);
    new LeaderLine(document.getElementById('node-14'), document.getElementById('node-12'), { ...lineConfig, startSocket: 'bottom', endSocket: 'right' });
};
