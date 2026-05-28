// 1. Функция языка
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

// 2. ВСЯ логика стрелок ТОЛЬКО ЗДЕСЬ
window.onload = () => {

    // язык
    const savedLang = localStorage.getItem('userLang') || 'ru';
    switchLang(savedLang);

    const base = {
        color: '#10b981',
        size: 2,
        path: 'grid',
        endPlug: 'arrow3'
    };

    // 🔥 ВАЖНО: сначала получаем элементы
    const n1 = document.getElementById('node-1');
    const n4 = document.getElementById('node-4');
    const n7 = document.getElementById('node-7');
    const n8 = document.getElementById('node-8');
    const n9 = document.getElementById('node-9');
    const n10 = document.getElementById('node-10');
    const n11 = document.getElementById('node-11');
    const n12 = document.getElementById('node-12');
    const n13 = document.getElementById('node-13');
    const n14 = document.getElementById('node-14');
    const n6 = document.getElementById('node-6');
    const n3 = document.getElementById('node-3');

    // 1. Прямые → СОД
    new LeaderLine(n1, n7, {
        ...base,
        startSocket: 'right',
        endSocket: 'left'
    });

    // 2. РБ → СОД
    new LeaderLine(n4, n8, {
        ...base,
        startSocket: 'right',
        endSocket: 'left'
    });

    // 3. Вертикаль СОД
    const v = { ...base, startSocket: 'bottom', endSocket: 'top' };

    new LeaderLine(n7, n8, v);
    new LeaderLine(n8, n9, v);
    new LeaderLine(n9, n10, v);
    new LeaderLine(n10, n11, v);
    new LeaderLine(n11, n12, v);

    // 4. Головной банк
    new LeaderLine(n13, n14, v);

    // 5. Возврат в СОД
    new LeaderLine(n14, n12, {
        ...base,
        startSocket: 'bottom',
        endSocket: 'right'
    });

    // 6. Нижний возврат
    new LeaderLine(n12, n6, {
        ...base,
        startSocket: 'bottom',
        endSocket: 'right'
    });

    new LeaderLine(n6, n3, {
        ...base,
        startSocket: 'left',
        endSocket: 'bottom'
    });
};
