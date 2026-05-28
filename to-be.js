// ============================================================
// NODE DETAIL DATA
// ============================================================
const NODE_DATA = {
    t1: {
        ru: { points: ["Компания подаёт заявку на ЗПП самостоятельно через веб-портал", "Формы автоматически заполняются из CRM — минимум ручного труда", "Менеджер РБ получает уведомление в ЛК и подтверждает в 1 клик"] },
        en: { points: ["Company submits the payroll project application independently via web portal", "Forms are auto-populated from CRM — minimal manual effort required", "RB manager receives a notification in CC and confirms with 1 click"] }
    },
    t2: {
        ru: { points: ["Договор ЗПП подписывается через ЭЦП или OTP-подтверждение по SMS", "Физическое присутствие руководителя компании не требуется", "Документ автоматически сохраняется в СЭДО с временной меткой"] },
        en: { points: ["The payroll contract is signed via EDS or OTP SMS confirmation", "No physical presence of company management required", "Document is automatically saved in EDMS with a timestamp"] }
    },
    t3: {
        ru: { points: ["Бухгалтер загружает список сотрудников через стандартный шаблон ЛК", "Авто-валидация по базе СГДР в реальном времени — ошибки подсвечиваются сразу", "Данные передаются напрямую в СОД без промежуточных форматов"] },
        en: { points: ["Accountant uploads the employee list via a standard portal template", "Real-time auto-validation against the civil registry — errors highlighted instantly", "Data is transferred directly to SOD without intermediate formats"] }
    },
    tend: {
        ru: { points: ["Каждый сотрудник получает SMS или Push с реквизитами карты", "Активация карты выполняется самостоятельно через мобильное приложение", "Не требуется визит в банк — полностью дистанционный процесс"] },
        en: { points: ["Each employee receives an SMS or push notification with card details", "Card activation is self-service via the mobile application", "No branch visit required — fully remote process"] }
    },
    trb: {
        ru: { points: ["Менеджер РБ видит входящую заявку в своём ЛК", "Подтверждение заявки занимает 1 клик — без бумаг и визитов", "После подтверждения процесс запускается автоматически в СОД"] },
        en: { points: ["RB manager sees the incoming application in their client cabinet", "Application confirmation takes 1 click — no paperwork or site visits", "After confirmation, the process launches automatically in SOD"] }
    },
    trb2: {
        ru: { points: ["Менеджер РБ в реальном времени видит статус заведения ЗПП", "Автоматические уведомления при прохождении каждого этапа", "Нет необходимости звонить в СОД для уточнения статуса"] },
        en: { points: ["RB manager sees the payroll project setup status in real time", "Automatic notifications at each process stage completion", "No need to call SOD to check on the status"] }
    },
    t4: {
        ru: { points: ["Служебная записка полностью исключена из процесса", "BPM-система автоматически согласует условия ЗПП по заданным правилам", "Время согласования: секунды вместо 5–24 часов ожидания"] },
        en: { points: ["Internal memo is completely eliminated from the process", "The BPM system auto-approves WPP terms based on pre-set business rules", "Approval time: seconds instead of 5–24 hours of waiting"] }
    },
    t5: {
        ru: { points: ["Данные сотрудников автоматически проверяются по базе СГДР", "Ошибки в ФИО и паспортных данных выявляются до попадания в АБС", "Исключён ручной контроль качества данных операционистом"] },
        en: { points: ["Employee data is auto-validated against the civil registry (CIDR)", "Errors in names and passport data are caught before entering the CBS", "Manual data quality control by front-office staff is eliminated"] }
    },
    t6: {
        ru: { points: ["Пакетный API-запрос открывает счета для всех сотрудников одновременно", "Сотни записей обрабатываются за секунды без участия операциониста", "Операционное окно полностью свободно для обслуживания клиентов"] },
        en: { points: ["Bulk API request opens accounts for all employees simultaneously", "Hundreds of records processed in seconds without operator involvement", "The front-office counter is fully free for walk-in customer service"] }
    },
    t7: {
        ru: { points: ["Виртуальная карта выпускается мгновенно после открытия счёта", "Карта сразу доступна для оплат в мобильном приложении", "Физический пластик — опциональный заказ по желанию сотрудника"] },
        en: { points: ["Virtual card is issued instantly upon account opening", "Card is immediately available for payments via the mobile app", "Physical plastic card is an optional on-demand order per employee request"] }
    },
    t8: {
        ru: { points: ["Изготовление именных карт — только по явному запросу компании", "Очередь эмбоссирования больше не блокирует основной процесс", "Производство запускается параллельно с активацией виртуальных карт"] },
        en: { points: ["Named physical cards are produced only upon explicit company request", "The embossing queue no longer blocks the main process flow", "Production runs in parallel with virtual card activation"] }
    },
    t9: {
        ru: { points: ["Именные карты доставляются в СОД курьерской службой", "Доставка начинается только после полной активации виртуальных карт", "Сотрудники уже работают с виртуальными картами во время доставки"] },
        en: { points: ["Named cards are delivered to SOD via courier service", "Delivery starts only after all virtual cards are fully activated", "Employees are already using virtual cards during the delivery period"] }
    }
};

// ============================================================
// ARROW CONNECTIONS
// { from, to, color, label }
// color: 'green' | 'blue' | 'gold'
// ============================================================
const CONNECTIONS = [
    // Company → RB  (T1 → TRB): заявка поступила
    { from: 'node-t1',   to: 'node-trb',  color: 'green', label: { ru: 'Заявка', en: 'Request' } },
    // RB → SOD  (TRB → T4): авто-запуск
    { from: 'node-trb',  to: 'node-t4',   color: 'blue',  label: { ru: 'Запуск', en: 'Launch' } },
    // Company list → SOD validation  (T3 → T5)
    { from: 'node-t3',   to: 'node-t5',   color: 'green', label: { ru: 'Данные', en: 'Data' } },
    // SOD → HO  (T7 → T8): optional named cards
    { from: 'node-t7',   to: 'node-t8',   color: 'gold',  label: { ru: 'По запросу', en: 'On demand' } },
    // HO → SOD back  (T9 → T7)
    { from: 'node-t9',   to: 'node-t7',   color: 'gold',  label: null },
    // SOD → Company (T7 → TEND): card activated
    { from: 'node-t7',   to: 'node-tend', color: 'green', label: { ru: 'Активация', en: 'Activation' } },
    // SOD → RB (T7 → TRB2): status update
    { from: 'node-t7',   to: 'node-trb2', color: 'blue',  label: null },
];

// ============================================================
// LANGUAGE DATA
// ============================================================
const UI = {
    ru: {
        toMain:        '&#8592; На главную',
        pageTitle:     '&#128994; Целевой процесс (To Be)',
        lhCompany:     'Компания<br>Личный кабинет',
        lhRb:          'Розничный<br>бизнес (РБ)',
        lhSod:         'Служба операционной деятельности',
        lhHo:          'Головной банк',
        bsLabel:       'Сопровождение ЗПП',
        bsSublabel:    'Банк',
        bs1:           'Поддержка клиента 24/7',
        bs2:           'Автоматическое обслуживание счетов сотрудников и компаний',
        bs3:           'SWIFT переводы',
        benefitsTitle: 'Что получаем при работе с такой схемой?',
        bv1: '1 день',  bw1: 'было: 5–9 дней',              bl1: 'Полный цикл<br>от заявки до активации',
        bv2: '0',       bw2: 'было: 4 ручных шага',          bl2: 'Бумажных документов<br>и служебных записок',
        bv3: '85%',     bw3: 'было: 0%',                     bl3: 'Операций выполняются<br>автоматически',
        bv4: '&#8734;', bw4: 'было: очередь к операционисту',bl4: 'Масштабируемость<br>пакетной обработки',
        backAsIs: '&#8592; Текущий процесс (As Is)',
        backMain: '&#8592; На главную',
        nodes: {
            't1':   { dept: 'ЛК / CRM',               title: 'Т1. Онлайн-заявка на ЗПП' },
            't2':   { dept: 'ЛК / ЭЦП',               title: 'Т2. Электронное подписание договора' },
            't3':   { dept: 'ЛК / API СГДР',           title: 'Т3. Загрузка списка сотрудников' },
            'tend': { dept: 'Mobile / Push',            title: 'Карта активирована в приложении' },
            'trb':  { dept: 'ЛК / CRM',                title: 'Подтверждение заявки (1 клик)' },
            'trb2': { dept: 'ЛК',                      title: 'Мониторинг статуса в ЛК' },
            't4':   { dept: 'BPM / Авто-воркфлоу',     title: 'Т4. Авто-согласование условий ЗПП' },
            't5':   { dept: 'API СГДР / Валидация',    title: 'Т5. Авто-валидация данных сотрудников' },
            't6':   { dept: 'АБС API / Пакетная обработка', title: 'Т6. Пакетное открытие карточных счетов' },
            't7':   { dept: 'Процессинг / Instant',    title: 'Т7. Мгновенный выпуск виртуальных карт' },
            't8':   { dept: 'Эмбоссирование',          title: 'Т8. Изготовление именных карт' },
            't9':   { dept: 'Логистика',               title: 'Т9. Отправка именных карт в СОД' },
        },
        badge: 'AUTO'
    },
    en: {
        toMain:        '&#8592; Back to main',
        pageTitle:     '&#128994; Target Process (To Be)',
        lhCompany:     'Company<br>Client Cabinet',
        lhRb:          'Retail<br>Business (RB)',
        lhSod:         'Operational Services Department',
        lhHo:          'Head Office',
        bsLabel:       'Payroll Project Support',
        bsSublabel:    'Bank',
        bs1:           '24/7 Client Support',
        bs2:           'Automated account servicing for employees and companies',
        bs3:           'SWIFT transfers',
        benefitsTitle: 'What do we gain with this scheme?',
        bv1: '1 day',  bw1: 'was: 5–9 days',               bl1: 'Full cycle<br>from application to activation',
        bv2: '0',      bw2: 'was: 4 manual steps',          bl2: 'Paper documents<br>and internal memos',
        bv3: '85%',    bw3: 'was: 0%',                      bl3: 'Operations executed<br>automatically',
        bv4: '&#8734;',bw4: 'was: front-office queue',      bl4: 'Batch processing<br>scalability',
        backAsIs: '&#8592; Current Process (As Is)',
        backMain: '&#8592; Back to main',
        nodes: {
            't1':   { dept: 'CC / CRM',               title: 'T1. Online Application for WPP' },
            't2':   { dept: 'CC / EDS',               title: 'T2. Electronic Contract Signing' },
            't3':   { dept: 'CC / CIDR API',          title: 'T3. Employee List Upload' },
            'tend': { dept: 'Mobile / Push',          title: 'Card Activated in the App' },
            'trb':  { dept: 'CC / CRM',               title: 'Application Confirmation (1 click)' },
            'trb2': { dept: 'CC',                     title: 'Status Monitoring in CC' },
            't4':   { dept: 'BPM / Auto-workflow',    title: 'T4. Auto-Approval of WPP Terms' },
            't5':   { dept: 'CIDR API / Validation',  title: 'T5. Auto-Validation of Employee Data' },
            't6':   { dept: 'CBS API / Batch',        title: 'T6. Bulk Card Account Opening' },
            't7':   { dept: 'Processing / Instant',   title: 'T7. Instant Virtual Card Issuance' },
            't8':   { dept: 'Embossing',              title: 'T8. Named Card Production' },
            't9':   { dept: 'Logistics',              title: 'T9. Shipping Named Cards to SOD' },
        },
        badge: 'AUTO'
    }
};

// ============================================================
// STATE
// ============================================================
let currentLang   = 'ru';
let activeNodeKey = 't1';

// ============================================================
// LANGUAGE SWITCH
// ============================================================
function changeLang(lang) {
    currentLang = lang;
    document.querySelectorAll('.lang-btn').forEach(b => b.classList.remove('active'));
    document.getElementById('btn-' + lang).classList.add('active');

    const t = UI[lang];
    document.getElementById('txt-to-main').innerHTML    = t.toMain;
    document.getElementById('page-title').innerHTML     = t.pageTitle;
    document.getElementById('lh-company').innerHTML     = t.lhCompany;
    document.getElementById('lh-rb').innerHTML          = t.lhRb;
    document.getElementById('lh-sod').innerHTML         = t.lhSod;
    document.getElementById('lh-ho').innerHTML          = t.lhHo;
    document.getElementById('bs-label').textContent     = t.bsLabel;
    document.getElementById('bs-sublabel').textContent  = t.bsSublabel;
    document.getElementById('bs-1').textContent         = t.bs1;
    document.getElementById('bs-2').textContent         = t.bs2;
    document.getElementById('bs-3').textContent         = t.bs3;
    document.getElementById('benefits-title').textContent = t.benefitsTitle;

    ['1','2','3','4'].forEach(i => {
        document.getElementById('bv' + i).innerHTML = t['bv' + i];
        document.getElementById('bw' + i).textContent = t['bw' + i];
        document.getElementById('bl' + i).innerHTML = t['bl' + i];
    });

    document.getElementById('btn-back-as-is').innerHTML = t.backAsIs;
    document.getElementById('btn-back-main').innerHTML  = t.backMain;

    // Update node text
    Object.keys(t.nodes).forEach(key => {
        const d = t.nodes[key];
        const deptEl  = document.getElementById('nd-' + key + '-dept');
        const titleEl = document.getElementById('nd-' + key + '-title');
        if (deptEl)  deptEl.textContent  = d.dept;
        if (titleEl) titleEl.textContent = d.title;
    });

    // Update AUTO badges
    ['t4','t5','t6','t7'].forEach(k => {
        const el = document.getElementById('ba-' + k);
        if (el) el.textContent = t.badge;
    });

    // Redraw arrows with updated labels
    drawArrows();
}

// ============================================================
// NODE CLICK — show detail list below benefits
// ============================================================
function showDetail(key) {
    activeNodeKey = key;
    document.querySelectorAll('.tb-node').forEach(n => n.classList.remove('active'));
    const nodeEl = document.getElementById('node-' + key);
    if (nodeEl) nodeEl.classList.add('active');

    // Remove existing detail box
    const existing = document.getElementById('node-detail-box');
    if (existing) existing.remove();

    const data = NODE_DATA[key];
    if (!data) return;
    const pts = data[currentLang].points;

    const box = document.createElement('div');
    box.id = 'node-detail-box';
    box.style.cssText = `
        background: rgba(16,185,129,0.03);
        border: 0.5px solid rgba(16,185,129,0.18);
        border-radius: 16px;
        padding: 20px 24px;
        animation: fadeUp 0.3s ease;
    `;

    const style = document.createElement('style');
    style.textContent = `@keyframes fadeUp{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}`;
    document.head.appendChild(style);

    const ul = document.createElement('ul');
    ul.style.cssText = 'margin:0;padding:0;list-style:none;display:flex;flex-direction:column;gap:10px;';
    pts.forEach(p => {
        const li = document.createElement('li');
        li.style.cssText = 'font-size:0.86rem;color:#c8c8c8;line-height:1.5;padding-left:18px;position:relative;';
        li.innerHTML = '<span style="position:absolute;left:0;top:8px;width:5px;height:5px;background:#10b981;border-radius:50%;box-shadow:0 0 5px rgba(16,185,129,0.5);display:block;"></span>' + p;
        ul.appendChild(li);
    });
    box.appendChild(ul);

    // Insert before benefits-separator
    const sep = document.querySelector('.benefits-separator');
    sep.parentNode.insertBefore(box, sep);
}

// ============================================================
// SVG ARROW DRAWING
// ============================================================
function getCenter(el, containerRect) {
    const r = el.getBoundingClientRect();
    return {
        x: r.left + r.width / 2 - containerRect.left,
        y: r.top + r.height / 2 - containerRect.top,
        left:   r.left   - containerRect.left,
        right:  r.right  - containerRect.left,
        top:    r.top    - containerRect.top,
        bottom: r.bottom - containerRect.top,
        width:  r.width,
        height: r.height
    };
}

function drawArrows() {
    const svg = document.getElementById('arrows-svg');
    // Remove old arrows (keep defs)
    Array.from(svg.children).forEach(c => {
        if (c.tagName !== 'defs') c.remove();
    });

    const wrapper = document.getElementById('swimlane-wrapper');
    const cRect   = wrapper.getBoundingClientRect();

    CONNECTIONS.forEach(conn => {
        const fromEl = document.getElementById(conn.from);
        const toEl   = document.getElementById(conn.to);
        if (!fromEl || !toEl) return;

        const fr = getCenter(fromEl, cRect);
        const tr = getCenter(toEl,   cRect);

        const colorMap = {
            green: '#10b981',
            blue:  '#7dd3fc',
            gold:  '#fbbf24'
        };
        const markerId = 'arr-' + conn.color;
        const strokeColor = colorMap[conn.color] || '#10b981';

        let d, sx, sy, ex, ey;

        // Determine connection points based on relative position
        if (fr.right < tr.left - 10) {
            // from is left of to → exit right, enter left
            sx = fr.right; sy = fr.y;
            ex = tr.left;  ey = tr.y;
        } else if (fr.left > tr.right + 10) {
            // from is right of to → exit left, enter right
            sx = fr.left;  sy = fr.y;
            ex = tr.right; ey = tr.y;
        } else {
            // Same column or overlapping → bottom → top
            sx = fr.x; sy = fr.bottom;
            ex = tr.x; ey = tr.top;
        }

        const dx = Math.abs(ex - sx);
        const dy = Math.abs(ey - sy);
        const cp = Math.max(dx * 0.45, 40);

        if (Math.abs(sx - ex) > Math.abs(sy - ey)) {
            // Mostly horizontal — S-curve
            d = `M ${sx} ${sy} C ${sx + (ex > sx ? cp : -cp)} ${sy}, ${ex - (ex > sx ? cp : -cp)} ${ey}, ${ex} ${ey}`;
        } else {
            // Mostly vertical — gentle curve
            d = `M ${sx} ${sy} C ${sx} ${sy + dy * 0.5}, ${ex} ${ey - dy * 0.5}, ${ex} ${ey}`;
        }

        // Draw path
        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        path.setAttribute('d', d);
        path.setAttribute('stroke', strokeColor);
        path.setAttribute('stroke-width', '1.5');
        path.setAttribute('stroke-opacity', '0.65');
        path.setAttribute('fill', 'none');
        path.setAttribute('marker-end', `url(#${markerId})`);
        svg.appendChild(path);

        // Draw label if provided
        if (conn.label) {
            const labelText = conn.label[currentLang] || conn.label.ru;
            const midX = (sx + ex) / 2;
            const midY = (sy + ey) / 2 - 6;
            const bg = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
            const textWidth = labelText.length * 5.5 + 10;
            bg.setAttribute('x', midX - textWidth / 2);
            bg.setAttribute('y', midY - 8);
            bg.setAttribute('width', textWidth);
            bg.setAttribute('height', 14);
            bg.setAttribute('rx', 4);
            bg.setAttribute('fill', '#0A0A0A');
            bg.setAttribute('fill-opacity', '0.85');
            svg.appendChild(bg);

            const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
            text.setAttribute('x', midX);
            text.setAttribute('y', midY + 2);
            text.setAttribute('text-anchor', 'middle');
            text.setAttribute('class', 'arrow-label');
            text.setAttribute('fill', strokeColor);
            text.setAttribute('fill-opacity', '0.75');
            text.textContent = labelText;
            svg.appendChild(text);
        }
    });
}

// ============================================================
// RESIZE — redraw arrows
// ============================================================
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(drawArrows, 120);
});

// ============================================================
// INIT
// ============================================================
window.addEventListener('load', () => {
    changeLang('ru');
    // Show first node detail
    showDetail('t1');
    // Draw arrows after layout settles
    setTimeout(drawArrows, 200);
});
