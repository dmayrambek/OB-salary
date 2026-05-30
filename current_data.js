/* ==========================================================================
   CURRENT DATA — current_data.js
   О!Банк ЗП Проекты — Раздел "Текущие данные"
   ========================================================================== */

const TRANSLATIONS = {
    ru: {
        navMarketing:   'Маркетинг',
        navScheme:      'Текущая схема',
        navData:        'Текущие данные',
        navTz:          'ТЗ для отчётов',
        navSales:       'Продажи',
        eyebrow:        'Текущие данные',
        title:          'Что мы имеем сейчас',
        subtitle:       'По одному запросу мы получаем разные данные из разных источников — сравнить их невозможно без ручной работы',
        dateBadge:      'Март 2026',

        /* System report */
        sys_title:      'Отчёт из системы',
        sys_source:     'АБС Colvir + Superset',
        sys_badge:      'Автоматически',

        lbl_orgs:       'Уникальных организаций',
        lbl_with_deal:  'С договором ЗП проекта',
        lbl_no_deal:    'Без договора',
        lbl_visa:       'Карты VISA',
        lbl_elcard:     'Карты Elcard',
        lbl_employees:  'Данные по сотрудникам',
        lbl_deals_ec:   'Договоры Elcard',
        lbl_deals_visa: 'Договоры VISA (активных)',
        lbl_deals_visa_closed: 'закрытых',

        no_data:        'нет данных',
        note_cards:     'общее кол-во карт в отчёте, без разбивки по ЗП проектам',

        /* Manual report */
        man_title:      'Отчёт от ОСКП',
        man_source:     'ФОТ для бизнеса + Реестр',
        man_badge:      'Вручную',

        /* Mismatch */
        alert_title:    'Расхождение по организациям',
        alert_text:     '556 организаций в системе против 450 в отчёте ОСКП. 300 компаний есть только в системе, 194 — только у ОСКП. Совпадают лишь 256. Причина расхождения неизвестна.',

        /* Bottom info */
        info_text:      'Данных по сотрудникам нет ни в одном источнике. Известно что активных договоров 1 357 — но сколько сотрудников стоит за ними, не знает ни система, ни ОСКП.',

        /* CTA */
        cta_heading:    'Нужен единый автоматический отчёт',
        cta_sub:        'Мы подготовили техническое задание, которое решает все эти расхождения и даёт полную картину по ЗП проектам.',
        cta_btn:        'Смотреть ТЗ',
    },
    en: {
        navMarketing:   'Marketing',
        navScheme:      'Current Scheme',
        navData:        'Current Data',
        navTz:          'Report Specs',
        navSales:       'Sales',
        eyebrow:        'Current Data',
        title:          'What We Have Today',
        subtitle:       'A single inquiry yields different data from different sources — impossible to reconcile without manual effort',
        dateBadge:      'March 2026',

        sys_title:      'System Report',
        sys_source:     'ABS Colvir + Superset',
        sys_badge:      'Automated',

        lbl_orgs:       'Unique organisations',
        lbl_with_deal:  'With payroll agreement',
        lbl_no_deal:    'Without agreement',
        lbl_visa:       'VISA cards',
        lbl_elcard:     'Elcard cards',
        lbl_employees:  'Employee-level data',
        lbl_deals_ec:   'Elcard agreements',
        lbl_deals_visa: 'VISA agreements (active)',
        lbl_deals_visa_closed: 'closed',

        no_data:        'no data',
        note_cards:     'total cards in report — no breakdown by payroll project',

        man_title:      'OSKP Report',
        man_source:     'Payroll Fund + Registry',
        man_badge:      'Manual',

        alert_title:    'Organisation count mismatch',
        alert_text:     '556 organisations in the system vs 450 in the OSKP report. 300 companies exist only in the system, 194 only in OSKP. Only 256 match. Root cause unknown.',

        info_text:      'Neither source contains employee-level data. There are 1,357 active agreements — but how many employees stand behind them is unknown to both the system and OSKP.',

        cta_heading:    'A single automated report is needed',
        cta_sub:        'We have prepared a specification that resolves all these discrepancies and delivers a complete view of payroll projects.',
        cta_btn:        'View Specification',
    }
};

let currentLang = 'ru';

function applyLang(lang) {
    currentLang = lang;
    const t = TRANSLATIONS[lang];

    /* Nav */
    setText('nav-marketing', t.navMarketing);
    setText('nav-scheme',    t.navScheme);
    setText('nav-data',      t.navData);
    setText('nav-tz',        t.navTz);
    setText('nav-sales',     t.navSales);

    /* Section header */
    setText('section-eyebrow',   t.eyebrow);
    setText('section-title',     t.title);
    setText('section-subtitle',  t.subtitle);
    setText('date-badge-text',   t.dateBadge);

    /* System card */
    setText('sys-card-title',    t.sys_title);
    setText('sys-card-source',   t.sys_source);
    setText('sys-card-badge',    t.sys_badge);

    /* Manual card */
    setText('man-card-title',    t.man_title);
    setText('man-card-source',   t.man_source);
    setText('man-card-badge',    t.man_badge);

    /* Labels */
    document.querySelectorAll('[data-label]').forEach(el => {
        const key = el.getAttribute('data-label');
        if (t[key]) el.textContent = t[key];
    });

    /* No-data cells */
    document.querySelectorAll('[data-no-data]').forEach(el => {
        el.textContent = t.no_data;
    });

    /* Note */
    setText('note-cards', t.note_cards);

    /* Alert */
    setText('alert-title', t.alert_title);
    setText('alert-text',  t.alert_text);

    /* Info */
    setText('info-text-inner', t.info_text);

    /* CTA */
    setText('cta-heading', t.cta_heading);
    setText('cta-sub',     t.cta_sub);
    setText('cta-btn-text',t.cta_btn);

    /* Toggle buttons */
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
    });
}

function setText(id, value) {
    const el = document.getElementById(id);
    if (el && value !== undefined) el.textContent = value;
}

/* ==========================================================================
   COUNTER ANIMATION
   ========================================================================== */
function animateCounter(el, target, duration = 1000) {
    const start = performance.now();
    const isFloat = target % 1 !== 0;

    function update(now) {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const current = Math.round(eased * target);
        el.textContent = current.toLocaleString('ru-RU');
        if (progress < 1) requestAnimationFrame(update);
    }

    requestAnimationFrame(update);
}

function runCounters() {
    document.querySelectorAll('[data-count]').forEach(el => {
        const target = parseInt(el.getAttribute('data-count'), 10);
        animateCounter(el, target, 900);
    });
}

/* ==========================================================================
   INTERSECTION OBSERVER — trigger counters on scroll
   ========================================================================== */
function initObserver() {
    const section = document.getElementById('reports-grid');
    if (!section) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                runCounters();
                observer.disconnect();
            }
        });
    }, { threshold: 0.15 });

    observer.observe(section);
}

/* ==========================================================================
   INIT
   ========================================================================== */
document.addEventListener('DOMContentLoaded', () => {
    /* Language buttons */
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            applyLang(btn.getAttribute('data-lang'));
        });
    });

    /* Apply default language */
    applyLang('ru');

    /* Start counter animation */
    initObserver();
});
