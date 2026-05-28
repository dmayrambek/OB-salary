// Функция рендера проблем в блок под схемой
function renderDetails(key) {
    const lang = currentLang || 'ru';
    const data = nodeData[key][lang];
    const container = document.getElementById('details-content');
    
    // Оформление проблем внутри блока problems-section
    container.innerHTML = `
        <div class="meta-zone">
            <div class="meta-dept">${data.dept}</div>
            <h2 class="meta-title">${data.title}</h2>
        </div>
        <div class="pain-box" style="margin-top:20px;">
            <h4>🚨 Проблемы</h4>
            <p>${data.pain}</p>
        </div>
        <div class="metrics-list" style="margin-top:20px; display:grid; grid-template-columns: 1fr 1fr 1fr; gap: 15px;">
            ${data.metrics.map(m => `
                <div class="metric-item">
                    <div class="metric-label">${m.label}</div>
                    <div class="metric-value">${m.value}</div>
                </div>
            `).join('')}
        </div>
    `;
}
