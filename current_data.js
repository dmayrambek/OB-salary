const TRANSLATIONS = {
    ru: {
        navMarketing:'Маркетинг', navScheme:'Текущая схема', navData:'Текущие данные', navTz:'ТЗ для отчётов',
        eyebrow:'Текущие данные', title:'Что мы имеем сейчас',
        subtitle:'По одному запросу мы получаем разные данные из разных источников — сравнить их невозможно без ручной работы',
        dateBadge:'Март 2026',
        sys_title:'Отчёт из системы', sys_source:'АБС Colvir + Superset', sys_badge:'Автоматически',
        man_title:'Отчёт от ОСКП', man_source:'ФОТ для бизнеса + Реестр ЗП проектов', man_badge:'Вручную',
        grp_cards:'Карты', grp_orgs:'Организации', grp_employees:'Клиенты',
        grp_fot:'ФОТ для бизнеса', grp_registry:'Реестр ЗП проектов',
        lbl_visa:'Карты VISA', lbl_elcard:'Карты Elcard',
        lbl_orgs:'Уникальных организаций',
        lbl_with_deal:'С договором ЗП проекта', lbl_no_deal:'Без договора',
        lbl_deals_ec:'Договоры Elcard', lbl_deals_visa:'Договоры VISA',
        lbl_employees:'Данные по клиентам',
        no_data:'нет данных',
        note_cards:'общее кол-во карт в отчёте, без разбивки по ЗП проектам',
        sys_problem:'Нет разбивки карт по ЗП проектам. Нет данных по договорам и клиентам. Невозможно определить сколько из 556 организаций реально на ЗП проекте.',
        man_problem:'399 компаний в ФОТ расходятся с 1 340 уникальными компаниями в реестре. Данные внутри одного источника противоречат друг другу.',
        problems_title:'Общие проблемы',
        p1_title:'Нет данных по клиентам', p1_text:'Ни один из источников не содержит информацию о количестве клиентов на ЗП проектах.',
        p2_title:'Отсутствие единого отчёта', p2_text:'Данные двух источников расходятся. Без единой системы невозможно получить точный список компаний на ЗП проекте.',
        p3_title:'Отчёты формируются вручную', p3_text:'Отчёт от ОСКП ведётся в Excel вручную — высокий риск ошибок, расхождений и задержек при обновлении данных.',
        cta_heading:'Нужен единый автоматический отчёт',
        cta_sub:'Мы подготовили техническое задание, которое решает все эти расхождения и даёт полную картину по ЗП проектам.',
        cta_btn:'Смотреть ТЗ',
    },
    en: {
        navMarketing:'Marketing', navScheme:'Current Scheme', navData:'Current Data', navTz:'Report Specs',
        eyebrow:'Current Data', title:'What We Have Today',
        subtitle:'A single inquiry yields different data from different sources — impossible to reconcile without manual effort',
        dateBadge:'March 2026',
        sys_title:'System Report', sys_source:'ABS Colvir + Superset', sys_badge:'Automated',
        man_title:'OSKP Report', man_source:'Payroll Fund + Payroll Registry', man_badge:'Manual',
        grp_cards:'Cards', grp_orgs:'Organisations', grp_employees:'Clients',
        grp_fot:'Payroll Fund Data', grp_registry:'Payroll Project Registry',
        lbl_visa:'VISA cards', lbl_elcard:'Elcard cards',
        lbl_orgs:'Unique organisations',
        lbl_with_deal:'With payroll agreement', lbl_no_deal:'Without agreement',
        lbl_deals_ec:'Elcard agreements', lbl_deals_visa:'VISA agreements',
        lbl_employees:'Client-level data',
        no_data:'no data',
        note_cards:'total cards in report — no breakdown by payroll project',
        sys_problem:'No card breakdown by payroll project. No data on agreements or clients. Impossible to determine how many of the 556 organisations are actually on a payroll project.',
        man_problem:'399 companies in the payroll differ from 1,340 unique companies in the register. Data within a single source contradicts itself.',
        problems_title:'Key Problems',
        p1_title:'No client data', p1_text:'Neither source contains information about the number of clients covered by payroll projects.',
        p2_title:'No single unified report', p2_text:'Data from both sources diverges. Without a unified system it is impossible to obtain an accurate list of payroll project companies.',
        p3_title:'Reports are compiled manually', p3_text:'The OSKP report is maintained in Excel manually — high risk of errors, discrepancies and delays in data updates.',
        cta_heading:'A single automated report is needed',
        cta_sub:'We have prepared a specification that resolves all these discrepancies and delivers a complete view of payroll projects.',
        cta_btn:'View Specification',
    }
};

let currentLang = localStorage.getItem('siteLang') || 'ru';

function applyLang(lang) {
    currentLang = lang;
    localStorage.setItem('siteLang', lang);
    const t = TRANSLATIONS[lang];
    const map = {
        'section-eyebrow': t.eyebrow, 'section-title': t.title,
        'section-subtitle': t.subtitle, 'date-badge-text': t.dateBadge,
        'sys-card-title': t.sys_title, 'sys-card-source': t.sys_source, 'sys-card-badge': t.sys_badge,
        'man-card-title': t.man_title, 'man-card-source': t.man_source, 'man-card-badge': t.man_badge,
        'note-cards': t.note_cards,
        'sys-problem': t.sys_problem, 'man-problem': t.man_problem,
        'problems-title': t.problems_title,
        'p1-title': t.p1_title, 'p1-text': t.p1_text,
        'p2-title': t.p2_title, 'p2-text': t.p2_text,
        'p3-title': t.p3_title, 'p3-text': t.p3_text,
        'cta-heading': t.cta_heading, 'cta-sub': t.cta_sub, 'cta-btn-text': t.cta_btn,
    };
    Object.entries(map).forEach(([id, val]) => {
        const el = document.getElementById(id);
        if (el) el.textContent = val;
    });
    document.querySelectorAll('[data-label]').forEach(el => {
        const key = el.getAttribute('data-label');
        if (t[key]) el.textContent = t[key];
    });
    document.querySelectorAll('[data-no-data]').forEach(el => { el.textContent = t.no_data; });
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
    });
}

function animateCounter(el, target, duration = 1000) {
    const start = performance.now();
    function update(now) {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.round(eased * target).toLocaleString('ru-RU');
        if (progress < 1) requestAnimationFrame(update);
    }
    requestAnimationFrame(update);
}

function runCounters() {
    document.querySelectorAll('[data-count]').forEach(el => {
        animateCounter(el, parseInt(el.getAttribute('data-count'), 10), 1000);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    // Восстанавливаем тему
    if (localStorage.getItem('siteTheme') === 'light') {
        document.body.classList.add('light-mode');
    }

    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.addEventListener('click', () => applyLang(btn.getAttribute('data-lang')));
    });

    applyLang(currentLang);

    const grid = document.getElementById('reports-grid');
    if (grid) {
        const observer = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting) { runCounters(); observer.disconnect(); }
        }, { threshold: 0.15 });
        observer.observe(grid);
    }
});
