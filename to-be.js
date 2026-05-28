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

    const savedLang = localStorage.getItem('userLang') || 'ru';
    switchLang(savedLang);

    const base = {
        color: '#10b981',
        size: 2,
        path: 'grid',
        endPlug: 'arrow3'
    };

    // === 1. Прямые продажи → СОД ===
    new LeaderLine(
        document.getElementById('node-1'),
        document.getElementById('node-7'),
        { ...base, startSocket: 'right', endSocket: 'left' }
    );

    // === 2. РБ → СОД ===
    new LeaderLine(
        document.getElementById('node-4'),
        document.getElementById('node-8'),
        { ...base, startSocket: 'right', endSocket: 'left' }
    );

    // === 3. Вертикальная цепочка СОД ===
    const v = { ...base, startSocket: 'bottom', endSocket: 'top' };

    new LeaderLine(node-7, node-8, v);
    new LeaderLine(node-8, node-9, v);
    new LeaderLine(node-9, node-10, v);
    new LeaderLine(node-10, node-11, v);
    new LeaderLine(node-11, node-12, v);

    // === 4. Головной банк (вниз) ===
    new LeaderLine(
        document.getElementById('node-13'),
        document.getElementById('node-14'),
        v
    );

    // === 5. Возврат из головного в СОД ===
    new LeaderLine(
        document.getElementById('node-14'),
        document.getElementById('node-12'),
        {
            ...base,
            startSocket: 'bottom',
            endSocket: 'right'
        }
    );

    // === 6. Нижняя линия (возврат в РБ/Прямые) ===
    new LeaderLine(
        document.getElementById('node-12'),
        document.getElementById('node-6'),
        {
            ...base,
            startSocket: 'bottom',
            endSocket: 'right'
        }
    );

    new LeaderLine(
        document.getElementById('node-6'),
        document.getElementById('node-3'),
        {
            ...base,
            startSocket: 'left',
            endSocket: 'bottom'
        }
    );
};
