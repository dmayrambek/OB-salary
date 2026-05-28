// scheme.js — только данные схемы и логика кликов по блокам

const nodeData = {
    node1: {
        ru: {
            dept: "Отдел розничного бизнеса (РБ)",
            title: "О1. Привлечение клиента",
            pain: "Низкий уровень автоматизации первичного контакта. Презентация возможностей ЗПП происходит вручную специалистами выездных групп, без применения сквозных цифровых воронок.",
            metrics: [
                { label: "Ответственное лицо", value: "Менеджер РБ / СОЮФЛ" },
                { label: "Срок выполнения", value: "От 1 до 3 рабочих дней" },
                { label: "Основной риск", value: "Человеческий фактор при первичной оценке потенциала компании" }
            ]
        },
        en: {
            dept: "Retail Business Department (RB)",
            title: "O1. Client Acquisition",
            pain: "Low automation level for initial contact. Payroll project presentations are delivered manually by field sales teams without end-to-end digital sales funnels.",
            metrics: [
                { label: "Responsible party", value: "RB Manager / Branch Officer" },
                { label: "Processing time", value: "1 to 3 business days" },
                { label: "Key risk", value: "Human error in initial company potential assessment" }
            ]
        }
    },
    node2: {
        ru: {
            dept: "Отдел розничного бизнеса (РБ)",
            title: "О2. Подписание договора ЗПП",
            pain: "Классический бумажный документооборот. Требует физического присутствия руководства компании и сбора «живых» подписей и печатей на бумажных бланках тарифов.",
            metrics: [
                { label: "Формат обмена", value: "Физические оригиналы документов" },
                { label: "Трудозатраты", value: "Выезд курьера или личный визит директора в офис" },
                { label: "Статус автоматизации", value: "0% (Полностью ручной контроль версий)" }
            ]
        },
        en: {
            dept: "Retail Business Department (RB)",
            title: "O2. Contract Signing",
            pain: "Traditional paper-based workflow. Requires physical presence of company executives, collecting 'wet' signatures and physical stamps on paper tariff forms.",
            metrics: [
                { label: "Exchange format", value: "Physical original documents" },
                { label: "Labor effort", value: "Courier dispatch or CEO personal visit to the branch" },
                { label: "Automation status", value: "0% (Fully manual version control)" }
            ]
        }
    },
    node3: {
        ru: {
            dept: "Отдел розничного бизнеса (РБ)",
            title: "О3. Прием списка сотрудников",
            pain: "Бухгалтерия присылает анкеты и паспорта сотрудников в разнородных форматах (сканы, Excel-файлы, бумажные копии). Полное отсутствие автоматической верификации данных на входе.",
            metrics: [
                { label: "Канал передачи", value: "Email / Флеш-носители" },
                { label: "Проблема", value: "Высокий риск опечаток в ФИО и номерах паспортов" },
                { label: "Влияние на процесс", value: "Каждая ошибка дублирует время проверки вдвое" }
            ]
        },
        en: {
            dept: "Retail Business Department (RB)",
            title: "O3. Receiving Employee Lists",
            pain: "The company's accounting sends forms and passport copies in fragmented formats (scans, Excel files, paper copies). Total absence of automated data validation at entry point.",
            metrics: [
                { label: "Transmission channel", value: "Email / USB flash drives" },
                { label: "Issue", value: "High risk of typos in full names and passport numbers" },
                { label: "Process impact", value: "Each typo doubles the verification time" }
            ]
        }
    },
    node4: {
        ru: {
            dept: "Отдел розничного бизнеса (РБ)",
            title: "О4. Служебная записка на заведение ЗПП",
            pain: "⚠️ КРИТИЧЕСКАЯ ТОЧКА БЮРОКРАТИИ. Вместо прямой передачи данных в карточный отдел, формируется бумажная или электронная внутренняя служебная записка для согласования параметров проекта.",
            metrics: [
                { label: "Маршрут", value: "РБ ➔ Начальник управления ➔ Карточный отдел ГБ" },
                { label: "Потеря времени", value: "От 5 до 24 часов чистого ожидания визы" },
                { label: "Блокирующий фактор", value: "Процесс заведения карт не начнется до подписи СЗ" }
            ]
        },
        en: {
            dept: "Retail Business Department (RB)",
            title: "O4. Internal Memo for Project Setup",
            pain: "⚠️ CRITICAL BUREAUCRACY NODE. Instead of direct data transfer to the card center, a manual internal memo is created to approve project parameters across departments.",
            metrics: [
                { label: "Routing", value: "RB ➔ Head of Department ➔ HO Card Center" },
                { label: "Time loss", value: "5 to 24 hours of pure waiting for approval" },
                { label: "Blocking factor", value: "Card setup process cannot start without memo signature" }
            ]
        }
    },
    node5: {
        ru: {
            dept: "Сектор обслуживания ФЛ и ЮЛ (СОЮФЛ)",
            title: "О5. Открытие карточных счетов",
            pain: "⚠️ ОПЕРАЦИОННЫЙ СТУПОР. Операционист филиала вручную вбивает данные каждого сотрудника из списка в АБС для открытия счетов. При списках от 100+ человек процесс парализует работу операционного окна.",
            metrics: [
                { label: "Режим работы", value: "Ручной массовый ввод данных в систему" },
                { label: "Трудоемкость", value: "До 15-20 минут на одного сотрудника" },
                { label: "Внутренний конфликт", value: "Отвлекает ресурсы от обслуживания текущего потока клиентов" }
            ]
        },
        en: {
            dept: "Branch Retail Operations (SOYUFL)",
            title: "O5. Card Account Opening",
            pain: "⚠️ OPERATIONAL STUPOR. Branch front-officer manually inputs every employee's data into the core banking system. With lists of 100+ clients, this completely paralyzes the branch counter operation.",
            metrics: [
                { label: "Operation mode", value: "Manual bulk data entry into CBS" },
                { label: "Processing effort", value: "Up to 15-20 minutes per individual employee" },
                { label: "Internal conflict", value: "Diverts resources away from walk-in customer service" }
            ]
        }
    },
    node6: {
        ru: {
            dept: "Отдел сопровождения карточных продуктов (ГБ)",
            title: "О6. Изготовление именных карт",
            pain: "Процесс эмбоссирования и привязки счетов жестко привязан к мощностям Головного банка. Возникает технологическая очередь при массовых заявках от нескольких филиалов одновременно.",
            metrics: [
                { label: "Локация", value: "Головной Банк" },
                { label: "Тип продукта", value: "Строго пластиковые именные карты" },
                { label: "Зависимость", value: "Ограничено суточной пропускной способностью эмбоссера" }
            ]
        },
        en: {
            dept: "Card Product Support Department (HO)",
            title: "O6. Personalized Card Production",
            pain: "The embossing and account linking process is tightly bound to Head Office technical hardware. A technological bottleneck forms when multiple branches submit bulk requests simultaneously.",
            metrics: [
                { label: "Location", value: "Head Office (HO)" },
                { label: "Product type", value: "Strictly physical personalized plastic cards" },
                { label: "Dependency", value: "Limited by daily machine embossing throughput capacity" }
            ]
        }
    },
    node7: {
        ru: {
            dept: "Головной Банк (ГБ)",
            title: "О7. Отправка карт в филиал",
            pain: "⚠️ ЛОГИСТИЧЕСКИЙ РАЗРЫВ. Изготовленный пластик физически упаковывается в инкассаторские сумки или курьерскую службу и отправляется наземными или авиамаршрутами в регионы КР.",
            metrics: [
                { label: "Способ доставки", value: "Физическая инкассация / Логистика" },
                { label: "Потеря времени", value: "От 2 до 4 рабочих дней (в зависимости от удаленности региона)" },
                { label: "Форс-мажоры", value: "Задержки рейсов, погодные условия, риски утери посылок" }
            ]
        },
        en: {
            dept: "Head Office (HO)",
            title: "O7. Shipping Cards to Branch",
            pain: "⚠️ LOGISTICAL GAP. Fabricated plastic cards are physically sealed into cash transit bags or courier packages and delivered by ground or air routes to the KR regions.",
            metrics: [
                { label: "Delivery method", value: "Physical cash collection services / Logistics" },
                { label: "Time loss", value: "2 to 4 business days (depending on regional remoteness)" },
                { label: "Force majeure", value: "Flight delays, severe weather conditions, loss of transit packages" }
            ]
        }
    },
    node8: {
        ru: {
            dept: "Отдел розничного бизнеса (РБ)",
            title: "О8. Передача карт организации",
            pain: "Менеджер собирает коробки с пластиком, ПИН-конверты и едет на предприятие, где лично под подпись выдает карты сотрудникам, собирая обратные расписки.",
            metrics: [
                { label: "Формат выдачи", value: "Оффлайн, ручная сверка лиц и подписей" },
                { label: "Итог текущей схемы", value: "Общий цикл от привлечения до активации: 5–9 дней" }
            ]
        },
        en: {
            dept: "Retail Business Department (RB)",
            title: "O8. Delivering Cards to Organization",
            pain: "The manager packs up boxes with plastics and PIN envelopes, travels to the corporate client premises, and personally hands over cards to employees in exchange for physical receipts.",
            metrics: [
                { label: "Distribution format", value: "Offline, face-to-face identity and signature match" },
                { label: "Current scheme result", value: "Total lifecycle from acquisition to card activation: 5–9 days" }
            ]
        }
    }
};

let activeNodeKey = 'node1';

// Функция отрисовки панели подробностей (считывает currentLang из main.js)
function renderDetails(key) {
    const lang = (typeof currentLang !== 'undefined') ? currentLang : 'ru'; 
    const data = nodeData[key][lang];
    const container = document.getElementById('details-content');
    if (!container) return; // Защита, если мы на другой странице
    
    let metricsHTML = data.metrics.map(m => `
        <div class="metric-item">
            <div class="metric-label">${m.label}</div>
            <div class="metric-value">${m.value}</div>
        </div>
    `).join('');

    const painHeader = lang === 'ru' ? 'Проблемы и узкие места' : 'Bottlenecks & Pain Points';

    container.innerHTML = `
        <div class="meta-zone">
            <div class="meta-dept">${data.dept}</div>
            <div class="meta-title">${data.title}</div>
        </div>
        <div class="pain-box">
            <h4>${painHeader}</h4>
            <p>${data.pain}</p>
        </div>
        <div class="metrics-list">
            ${metricsHTML}
        </div>
    `;
}

// Вызывается при клике по узлу
function showDetails(nodeId, element) {
    activeNodeKey = nodeId;
    document.querySelectorAll('.node-card').forEach(card => card.classList.remove('active'));
    element.classList.add('active');
    renderDetails(nodeId);
}

// Экспортируем функцию в глобальное окно, чтобы main.js мог вызывать её при смене RU/EN
window.updateSchemeLanguage = function() {
    renderDetails(activeNodeKey);
};

// Запуск первичного рендера сразу после загрузки DOM
document.addEventListener("DOMContentLoaded", () => {
    if (document.getElementById('details-content')) {
        renderDetails('node1');
    }
});
