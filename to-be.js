const translations = {
    ru: {
        directSales: "Прямые продажи",
        retail: "Розничный бизнес",
        operations: "Служба операционной деятельности",
        headBank: "Головной банк",

        client: "Привлечение клиента",
        contract: "Подписание договора ЗПП",

        o1: "Согласование условий",
        o2: "Подготовка договора",
        o3: "Прием документов",
        o4: "Создание заявки",
        o5: "Открытие счетов",
        o6: "Передача карт",

        h1: "Изготовление карт",
        h2: "Отправка карт",

        futureTitle: "TO-BE модель",
        f1: "Единый канал для взаимодействия",
        f2: "Автоматизированный процесс"
    },

    en: {
        directSales: "Direct Sales",
        retail: "Retail Business",
        operations: "Operations Department",
        headBank: "Head Office",

        client: "Client Acquisition",
        contract: "Contract Signing",

        o1: "Terms Approval",
        o2: "Contract Preparation",
        o3: "Document Collection",
        o4: "Request Creation",
        o5: "Account Opening",
        o6: "Card Distribution",

        h1: "Card Production",
        h2: "Card Delivery",

        futureTitle: "TO-BE Model",
        f1: "Single interaction channel",
        f2: "Automated process"
    }
};

function setLang(lang) {
    document.querySelectorAll("[data-key]").forEach(el => {
        const key = el.getAttribute("data-key");
        el.textContent = translations[lang][key];
    });
}

// стартовый язык
setLang("ru");
