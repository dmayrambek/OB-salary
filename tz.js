/* ==========================================================================
   TZ PAGE — tz.js
   О!Банк ЗП Проекты — Техническое задание
   ========================================================================== */

const T = {
    ru: {
        eyebrow:      'Техническое задание',
        title:        'Отчёты по ЗП проектам',
        subtitle:     'Два отчёта которые дадут полную и актуальную картину по всем зарплатным проектам банка',

        once_num:     'Отчёт 01',
        once_title:   'Разовая выгрузка',
        once_desc:    'Детальный срез по всем компаниям и сотрудникам на выбранную дату. Позволяет получить полную картину по каждому ЗП проекту — от счёта компании до карточных операций каждого сотрудника.',

        once_b1_title: 'Полный список договоров',
        once_b1_text:  'Активные и закрытые, с датами и статусами',
        once_b2_title: 'Счета и остатки компаний',
        once_b2_text:  'Обороты Дт/Кт и остаток на конец периода',
        once_b3_title: 'Данные по сотрудникам',
        once_b3_text:  'Карта, зачисления, обороты, остаток по каждому',
        once_b4_title: 'База для аудита',
        once_b4_text:  'Сверка реестра ОСКП с реальностью системы',

        monthly_num:     'Отчёт 02',
        monthly_title:   'Ежемесячная выгрузка',
        monthly_desc:    'Накапливаемый отчёт который формируется каждый месяц автоматически. Даёт возможность отслеживать динамику по каждой компании — рост ФОТ, прирост карт, активность сотрудников.',

        monthly_b1_title: 'Динамика ФОТ',
        monthly_b1_text:  'Сумма зачислений по каждой компании помесячно',
        monthly_b2_title: 'Прирост карт',
        monthly_b2_text:  'Количество карт VISA и Elcard в динамике',
        monthly_b3_title: 'Обороты по картам',
        monthly_b3_text:  'Активность сотрудников — транзакции за месяц',
        monthly_b4_title: 'Сигналы риска',
        monthly_b4_text:  'Компании где ФОТ или активность резко упала',

        gives_label:  'Что нам это даст',
        btn_xlsx:     'Скачать в Excel',
        btn_close:    '✕',

        tbl_once_title:    'Разовая выгрузка — поля отчёта',
        tbl_monthly_title: 'Ежемесячная выгрузка — поля отчёта',

        col_field:   'Поле',
        col_content: 'Содержание',

        sec1: 'Раздел 1 — По счёту компании',
        sec2: 'Раздел 2 — По сотрудникам',

        btn_home:  '← Домой',
        btn_sales: 'Продажи и пакеты →',

        benefits_label: 'Что получаем',
    },
    en: {
        eyebrow:      'Specification',
        title:        'Payroll Project Reports',
        subtitle:     'Two reports that will provide a complete and up-to-date picture of all payroll projects in the bank',

        once_num:     'Report 01',
        once_title:   'One-time Export',
        once_desc:    'A detailed snapshot of all companies and employees at a selected date. Provides a complete view of each payroll project — from the company account to each employee\'s card transactions.',

        once_b1_title: 'Full list of agreements',
        once_b1_text:  'Active and closed, with dates and statuses',
        once_b2_title: 'Company accounts and balances',
        once_b2_text:  'Debit/credit turnover and end-of-period balance',
        once_b3_title: 'Employee data',
        once_b3_text:  'Card, credits, turnover, balance per employee',
        once_b4_title: 'Audit base',
        once_b4_text:  'Cross-check OSKP registry against system data',

        monthly_num:     'Report 02',
        monthly_title:   'Monthly Export',
        monthly_desc:    'An accumulating report generated automatically each month. Enables tracking of dynamics per company — payroll growth, card additions, employee activity.',

        monthly_b1_title: 'Payroll dynamics',
        monthly_b1_text:  'Monthly payroll amount per company',
        monthly_b2_title: 'Card growth',
        monthly_b2_text:  'Number of VISA and Elcard cards over time',
        monthly_b3_title: 'Card turnover',
        monthly_b3_text:  'Employee activity — transactions per month',
        monthly_b4_title: 'Risk signals',
        monthly_b4_text:  'Companies where payroll or activity dropped sharply',

        gives_label:  'What this gives us',
        btn_xlsx:     'Download Excel',
        btn_pdf:      'Download PDF',
        btn_close:    '✕',

        tbl_once_title:    'One-time Export — report fields',
        tbl_monthly_title: 'Monthly Export — report fields',

        col_field:   'Field',
        col_content: 'Description',

        sec1: 'Section 1 — Company Account',
        sec2: 'Section 2 — Employees',

        btn_home:  '← Home',
        btn_sales: 'Sales & Packages →',

        benefits_label: 'What we get',
    }
};

/* ==========================================================================
   TABLE DATA
   ========================================================================== */
const ONCE_ROWS = [
    { section: true,  ru: 'Раздел 1 — По счёту компании',   en: 'Section 1 — Company Account' },
    { ru_field: 'БИК филиала',              en_field: 'Branch BIC',            ru_content: 'БИК каждого филиала',                                          en_content: 'BIC of each branch' },
    { ru_field: 'Наименование филиала',     en_field: 'Branch Name',           ru_content: 'Полное название филиала',                                      en_content: 'Full name of the branch' },
    { ru_field: 'Наименование компании',    en_field: 'Company Name',          ru_content: 'Полное юридическое наименование',                              en_content: 'Full legal name of the company' },
    { ru_field: 'ИНН компании',             en_field: 'Company TIN',           ru_content: 'Идентификационный номер налогоплательщика',                    en_content: 'Tax identification number' },
    { ru_field: 'Счёт компании',            en_field: 'Company Account',       ru_content: 'Расчётный счёт компании',                                     en_content: 'Company settlement account' },
    { ru_field: 'Статус счёта',             en_field: 'Account Status',        ru_content: 'Открыт / Закрыт на конец периода',                            en_content: 'Open / Closed at end of period' },
    { ru_field: 'Дата договора',            en_field: 'Contract Date',         ru_content: 'Дата подписания договора ЗП проекта',                         en_content: 'Date of payroll agreement signing' },
    { ru_field: 'Дт оборот',               en_field: 'Debit Turnover',        ru_content: 'Сумма дебетовых операций за период',                          en_content: 'Total debit operations for the period' },
    { ru_field: 'Кт оборот',               en_field: 'Credit Turnover',       ru_content: 'Сумма кредитовых операций за период',                         en_content: 'Total credit operations for the period' },
    { ru_field: 'Остаток по счёту',         en_field: 'Account Balance',       ru_content: 'Остаток на расчётном счёте на конец периода',                 en_content: 'Balance on settlement account at end of period' },
    { section: true,  ru: 'Раздел 2 — По сотрудникам',      en: 'Section 2 — Employees' },
    { ru_field: 'БИК филиала',              en_field: 'Branch BIC',            ru_content: 'БИК филиала сотрудника',                                      en_content: 'Employee branch BIC' },
    { ru_field: 'Наименование компании',    en_field: 'Company Name',          ru_content: 'Компания-работодатель',                                       en_content: 'Employer company' },
    { ru_field: 'ИНН клиента',             en_field: 'Client TIN',            ru_content: 'ИНН сотрудника',                                              en_content: 'Employee tax number' },
    { ru_field: 'Номер карточного счёта',  en_field: 'Card Account Number',   ru_content: 'Счёт на который зачисляется зарплата',                        en_content: 'Account to which salary is credited' },
    { ru_field: 'Продукт',                 en_field: 'Product',               ru_content: 'Тип карты (VISA Salary, Elcard, HKB GOLD и др.)',             en_content: 'Card type (VISA Salary, Elcard, HKB GOLD etc.)' },
    { ru_field: 'Статус счёта',            en_field: 'Account Status',        ru_content: 'Открыт / Закрыт',                                            en_content: 'Open / Closed' },
    { ru_field: 'Сумма зачисления',        en_field: 'Credited Amount',       ru_content: 'Сумма зарплаты за период',                                   en_content: 'Salary amount for the period' },
    { ru_field: 'Обороты по карте',        en_field: 'Card Turnover',         ru_content: 'Суммарный объём транзакций за период',                       en_content: 'Total transaction volume for the period' },
    { ru_field: 'Остаток на карте',        en_field: 'Card Balance',          ru_content: 'Остаток на карточном счёте на конец периода',                en_content: 'Card account balance at end of period' },
    { ru_field: 'Банковские продукты',     en_field: 'Banking Products',      ru_content: 'Кредиты, депозиты и др. продукты клиента',                   en_content: 'Loans, deposits and other client products' },
];

const MONTHLY_ROWS = [
    { ru_field: 'БИК филиала',             en_field: 'Branch BIC',            ru_content: 'БИК каждого филиала',                                         en_content: 'BIC of each branch' },
    { ru_field: 'Наименование филиала',    en_field: 'Branch Name',           ru_content: 'Полное название филиала',                                     en_content: 'Full name of the branch' },
    { ru_field: 'Наименование компании',   en_field: 'Company Name',          ru_content: 'Полное юридическое наименование',                             en_content: 'Full legal name of the company' },
    { ru_field: 'ИНН компании',            en_field: 'Company TIN',           ru_content: 'Идентификационный номер налогоплательщика',                   en_content: 'Tax identification number' },
    { ru_field: 'Вид деятельности',        en_field: 'Type of Activity',      ru_content: 'Экономический вид деятельности компании',                    en_content: 'Economic type of activity' },
    { ru_field: 'Сектор экономики',        en_field: 'Economic Sector',       ru_content: 'Государственный или частный сектор',                         en_content: 'Public or private sector' },
    { ru_field: 'Дата договора',           en_field: 'Contract Date',         ru_content: 'Дата подписания договора ЗП проекта',                        en_content: 'Date of payroll agreement signing' },
    { ru_field: 'Статус счёта',            en_field: 'Account Status',        ru_content: 'Статус расчётного счёта на конец месяца',                    en_content: 'Account status at end of reporting month' },
    { ru_field: 'ФОТ за месяц',           en_field: 'Payroll (Month)',        ru_content: 'Общая сумма зачисленной зарплаты за месяц',                  en_content: 'Total salary amount credited for the month' },
    { ru_field: 'Остаток по счёту',        en_field: 'Account Balance',       ru_content: 'Остаток на расчётном счёте на конец месяца',                 en_content: 'Balance on settlement account at end of month' },
    { ru_field: 'Кол-во карт VISA',       en_field: 'VISA Cards Count',      ru_content: 'Действующие карты VISA сотрудников на конец месяца',          en_content: 'Active VISA cards of employees at end of month' },
    { ru_field: 'Кол-во карт Elcard',     en_field: 'Elcard Count',          ru_content: 'Действующие карты Elcard сотрудников на конец месяца',        en_content: 'Active Elcard cards of employees at end of month' },
    { ru_field: 'Обороты по картам',      en_field: 'Card Turnover',         ru_content: 'Суммарный объём транзакций по картам за месяц',              en_content: 'Total transaction volume on cards for the month' },
    { ru_field: 'Остатки на картах',      en_field: 'Card Balances',         ru_content: 'Остатки на карточных счетах сотрудников',                    en_content: 'Balances on employee card accounts' },
    { ru_field: 'Банковские продукты',    en_field: 'Banking Products',      ru_content: 'Кредиты, депозиты и др. продукты компании',                  en_content: 'Loans, deposits and other company products' },
];

/* ==========================================================================
   RENDER TABLE
   ========================================================================== */
function renderTable(rows, lang) {
    const t = T[lang];
    return `
        <table class="tz-table">
            <thead>
                <tr>
                    <th style="width:30%">${t.col_field}</th>
                    <th>${t.col_content}</th>
                </tr>
            </thead>
            <tbody>
                ${rows.map(row => {
                    if (row.section) {
                        return `<tr class="section-row"><td colspan="2">${lang === 'ru' ? row.ru : row.en}</td></tr>`;
                    }
                    return `<tr>
                        <td>${lang === 'ru' ? row.ru_field : row.en_field}</td>
                        <td>${lang === 'ru' ? row.ru_content : row.en_content}</td>
                    </tr>`;
                }).join('')}
            </tbody>
        </table>
    `;
}

/* ==========================================================================
   TOGGLE TABLE VIEWER
   ========================================================================== */
function toggleViewer(id) {
    const viewer = document.getElementById(id);
    if (!viewer) return;
    viewer.classList.toggle('open');
    const btn = viewer.previousElementSibling
        ? viewer.closest('.tz-card-body').querySelector('.btn-view') : null;
}

function closeViewer(id) {
    const viewer = document.getElementById(id);
    if (viewer) viewer.classList.remove('open');
}

/* ==========================================================================
   APPLY LANGUAGE
   ========================================================================== */
let currentLang = 'ru';

function applyLang(lang) {
    currentLang = lang;
    const t = T[lang];

    const ids = {
        'section-eyebrow':    t.eyebrow,
        'section-title':      t.title,
        'section-subtitle':   t.subtitle,
        'once-num':           t.once_num,
        'once-title':         t.once_title,
        'once-desc':          t.once_desc,
        'once-b1-title':      t.once_b1_title,
        'once-b1-text':       t.once_b1_text,
        'once-b2-title':      t.once_b2_title,
        'once-b2-text':       t.once_b2_text,
        'once-b3-title':      t.once_b3_title,
        'once-b3-text':       t.once_b3_text,
        'once-b4-title':      t.once_b4_title,
        'once-b4-text':       t.once_b4_text,
        'monthly-num':        t.monthly_num,
        'monthly-title':      t.monthly_title,
        'monthly-desc':       t.monthly_desc,
        'monthly-b1-title':   t.monthly_b1_title,
        'monthly-b1-text':    t.monthly_b1_text,
        'monthly-b2-title':   t.monthly_b2_title,
        'monthly-b2-text':    t.monthly_b2_text,
        'monthly-b3-title':   t.monthly_b3_title,
        'monthly-b3-text':    t.monthly_b3_text,
        'monthly-b4-title':   t.monthly_b4_title,
        'monthly-b4-text':    t.monthly_b4_text,
        'gives-label-once':       t.gives_label,
        'gives-label-monthly':    t.gives_label,
        'btn-xlsx-once':          t.btn_xlsx,
        'btn-pdf-once':           t.btn_pdf,
        'btn-xlsx-monthly':       t.btn_xlsx,
        'btn-pdf-monthly':        t.btn_pdf,
        'tbl-once-title':     t.tbl_once_title,
        'tbl-monthly-title':  t.tbl_monthly_title,
        'btn-home':           t.btn_home,
        'btn-sales':          t.btn_sales,
        'benefits-label-once':    t.benefits_label,
        'benefits-label-monthly': t.benefits_label,
    };

    Object.entries(ids).forEach(([id, val]) => {
        const el = document.getElementById(id);
        if (el) el.textContent = val;
    });

    /* Re-render tables */
    const onceBody  = document.getElementById('tbl-once-body');
    const monthBody = document.getElementById('tbl-monthly-body');
    if (onceBody)  onceBody.innerHTML  = renderTable(ONCE_ROWS,    lang);
    if (monthBody) monthBody.innerHTML = renderTable(MONTHLY_ROWS, lang);

    /* Lang buttons */
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
    });
}

/* ==========================================================================
   INIT
   ========================================================================== */
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.addEventListener('click', () => applyLang(btn.getAttribute('data-lang')));
    });
    applyLang('ru');
});
