# Fee Forecaster

This tool reveals the crippling cost of custodial fees on your Bitcoin wealth compared to self-sovereignty. 
Small fees compound into theft, undermining Bitcoin’s promise of freedom. Self-custody isn’t just empowering -- it’s financially essential.

<style>
    .input-container {
        padding: 20px;
        border: 1px solid var(--md-default-fg-color--light);
        border-radius: 8px;
        background: var(--md-default-bg-color);
        margin-bottom: 20px;
    }
    .input-group {
        display: flex;
        align-items: center;
        margin-bottom: 15px;
    }
    .input-wrapper {
        display: flex;
        align-items: stretch;
        border: 1px solid var(--md-default-fg-color--light);
        border-radius: 4px;
        background: var(--md-default-bg-color);
        transition: border-color 0.2s, box-shadow 0.2s;
    }
    .input-wrapper:hover {
        border-color: var(--md-primary-fg-color--light);
    }
    .input-wrapper:focus-within {
        border-color: var(--md-primary-fg-color);
        box-shadow: 0 0 5px rgba(var(--md-primary-fg-color--rgb), 0.3);
    }
    input[type="number"] {
        width: 100px;
        padding: 8px;
        border: none;
        font-size: 1em;
        color: var(--md-default-fg-color);
        outline: none;
        border-radius: 4px 0 0 4px;
    }
    .unit {
        padding: 0 8px;
        font-size: 1em;
        color: var(--md-default-fg-color);
        pointer-events: none;
        border-left: 1px solid var(--md-default-fg-color--light);
        background: rgba(var(--md-default-bg-color--rgb), 0.7);
        display: flex;
        align-items: center;
        border-radius: 0 4px 4px 0;
    }
    .input-container label {
        font-size: 1em;
        color: var(--md-default-fg-color);
        margin-left: 10px;
        margin-right: 10px;
    }
    .formatted-value {
        font-weight: bold;
        color: var(--md-primary-fg-color);
    }
    #error {
        margin-top: 10px;
        padding: 10px;
        border: 1px solid var(--md-typeset-color-error);
        border-radius: 4px;
        background: var(--md-default-bg-color);
        color: var(--md-typeset-color-error);
        font-size: 0.9em;
    }
    #results {
        margin-top: 20px;
    }
    #results .summary {
        display: grid;
        grid-template-columns: 1fr;
        gap: 10px;
        margin-bottom: 15px;
        padding: 10px;
        background: var(--md-default-bg-color--light);
        border-radius: 4px;
    }
    #results .summary p {
        margin: 0;
        font-size: 1.1em;
        font-weight: bold;
        color: var(--md-default-fg-color);
    }
    /* Ensure custodial cost dollar amount is red in both light/dark modes */
    .custodial-cost {
        color: var(--md-typeset-color-error, #dc3545) !important;
    }
    #results .text {
        font-size: 1em;
        line-height: 1.8;
        color: var(--md-default-fg-color);
    }
    #results strong {
        color: var(--md-default-fg-color--dark);
    }
    #chart {
        width: 100%;
        max-width: 600px;
        height: 300px;
        margin: 20px 0;
    }
</style>

<form id="calcForm" class="input-container">
    <div class="input-group">
        <div class="input-wrapper">
            <input type="number" id="initial" value="10000" step="1000" required aria-label="Initial">
            <span class="unit">$</span>
        </div>
        <label for="initial">Initial:</label>
        <span class="formatted-value" id="initialFormatted">$10,000</span>
    </div>
    
    <div class="input-group">
        <div class="input-wrapper">
            <input type="number" id="dca" value="10" step="10" min="0" required aria-label="DCA Amount">
            <span class="unit">$</span>
        </div>
        <label for="dca">DCA Amount:</label>
        <span class="formatted-value" id="dcaFormatted">$10</span>
    </div>
    
    <div class="input-group">
        <div class="input-wrapper">
            <input type="number" id="cagr" value="20" step="0.1" min="1" required aria-label="Estimated CAGR">
            <span class="unit">%</span>
        </div>
        <label for="cagr">Estimated CAGR:</label>
        <span class="formatted-value" id="cagrFormatted">20%</span>
    </div>
    
    <div class="input-group">
        <div class="input-wrapper">
            <input type="number" id="fee" value="1" step="0.1" min="0.1" required aria-label="Custodial Fee">
            <span class="unit">%</span>
        </div>
        <label for="fee">Custodial Fee:</label>
        <span class="formatted-value" id="feeFormatted">1.0%</span>
    </div>
    
    <div class="input-group">
        <div class="input-wrapper">
            <input type="number" id="duration" value="30" step="1" min="1" required aria-label="Duration">
            <span class="unit">yr</span>
        </div>
        <label for="duration">Duration:</label>
        <span class="formatted-value" id="durationFormatted">30</span>
    </div>
</form>

<div id="error" aria-live="polite"></div>
<div id="results"></div>

<script>
    // Format number as currency or percent
    function formatValue(value, type, isDCA = false, isFee = false, isWholeDollar = false) {
        const num = parseFloat(value);
        if (type === 'currency') {
            return '$' + num.toLocaleString('en-US', {
                minimumFractionDigits: isWholeDollar || (isDCA && Number.isInteger(num)) ? 0 : num % 1 !== 0 ? 2 : 0,
                maximumFractionDigits: isWholeDollar || (isDCA && Number.isInteger(num)) ? 0 : 2
            });
        } else if (type === 'percent') {
            return num.toFixed(isFee ? 1 : Number.isInteger(num) ? 0 : 1) + '%';
        } else {
            return num.toString();
        }
    }

    // Update formatted values next to inputs
    function updateFormattedValues() {
        document.getElementById('initialFormatted').textContent = formatValue(document.getElementById('initial').value, 'currency', false, false, true);
        document.getElementById('dcaFormatted').textContent = formatValue(document.getElementById('dca').value, 'currency', true);
        document.getElementById('cagrFormatted').textContent = formatValue(document.getElementById('cagr').value, 'percent', false);
        document.getElementById('feeFormatted').textContent = formatValue(document.getElementById('fee').value, 'percent', false, true);
        document.getElementById('durationFormatted').textContent = formatValue(document.getElementById('duration').value, 'number');
    }

    // Validate inputs
    function validateInputs() {
        const initial = parseFloat(document.getElementById('initial').value) || 0;
        const dca = parseFloat(document.getElementById('dca').value) || 0;
        const cagr = parseFloat(document.getElementById('cagr').value) || 0;
        const fee = parseFloat(document.getElementById('fee').value) || 0;
        const years = parseInt(document.getElementById('duration').value) || 0;

        const errors = [];
        if (initial <= 0) errors.push("Initial must be greater than 0");
        if (dca < 0) errors.push("DCA Amount must be greater than or equal to 0");
        if (cagr < 1) errors.push("Estimated CAGR must be greater than or equal to 1%");
        if (fee < 0.1) errors.push("Custodial Fee must be greater than or equal to 0.1%");
        if (years < 1) errors.push("Duration must be greater than or equal to 1 year");

        const errorDiv = document.getElementById('error');
        if (errors.length > 0) {
            errorDiv.innerHTML = `<p>${errors.join('<br>')}</p>`;
            return false;
        } else {
            errorDiv.innerHTML = '';
            return true;
        }
    }

    function calculate() {
        // Only proceed if inputs are valid
        if (!validateInputs()) {
            document.getElementById('results').innerHTML = '';
            return;
        }

        const initial = parseFloat(document.getElementById('initial').value) || 0.001;
        const dailyDCA = parseFloat(document.getElementById('dca').value) || 0;
        const cagr = parseFloat(document.getElementById('cagr').value) / 100 || 0.01;
        const fee = parseFloat(document.getElementById('fee').value) / 100 || 0.001;
        const years = parseInt(document.getElementById('duration').value) || 1;
        
        // Convert daily DCA to annual (365.25 days per year)
        const annualDCA = dailyDCA * 365.25;
        
        // Sovereign (0% fee):
        const sovereignLumpSum = initial * Math.pow(1 + cagr, years);
        const sovereignDCAValue = cagr > 0 ? annualDCA * (Math.pow(1 + cagr, years) - 1) / cagr : annualDCA * years;
        const sovereignTotal = sovereignLumpSum + sovereignDCAValue;
        
        // Custody (effective growth = cagr - fee):
        const effectiveCAGR = cagr - fee;
        const custodyLumpSum = initial * Math.pow(1 + effectiveCAGR, years);
        const custodyDCAValue = effectiveCAGR > 0 ? annualDCA * (Math.pow(1 + effectiveCAGR, years) - 1) / effectiveCAGR : annualDCA * years;
        const custodyTotal = custodyLumpSum + custodyDCAValue;
        
        // Lost value
        const lost = sovereignTotal - custodyTotal;
        const percentLost = sovereignTotal > 0 ? (lost / sovereignTotal) * 100 : 0;
        
        // Display results with summary and persuasive text
        const resultsDiv = document.getElementById('results');
        resultsDiv.innerHTML = `
            <div class="summary">
                <p>Sovereign Value: ${formatValue(sovereignTotal, 'currency', false, false, true)}</p>
                <p>Custodial Cost: <span class="custodial-cost">${formatValue(lost, 'currency', false, false, true)}</span> (${percentLost.toFixed(1)}%)</p>
            </div>
            <div id="chart-container"></div>
            <div class="text">
                <p>Starting with ${formatValue(initial, 'currency', false, false, true)} and a daily DCA of ${formatValue(dailyDCA, 'currency', true)} over ${formatValue(years, 'number')} years at a ${formatValue(cagr * 100, 'percent', false)} Bitcoin CAGR, a sovereign would amass a formidable ${formatValue(sovereignTotal, 'currency', false, false, true)}. This is the power of self-custody: complete control, zero compromise, and every satoshi working for you in a world returning to sound money.</p>
                <p>But choosing a custodian with a ${formatValue(fee * 100, 'percent', false, true)} annual fee?</p>
                <p>You’re not just losing money -- you’re <strong>paying ${formatValue(lost, 'currency', false, false, true)}</strong>, a devastating ${percentLost.toFixed(1)}% of your potential wealth, to dodge the responsibility of securing your own Bitcoin. This isn’t just a fee; it’s a betrayal of Bitcoin’s promise, trading your financial sovereignty for a false sense of security. Worse, you’re exposed to catastrophic risks -- hacks, bankruptcies, government seizures, or rehypothecation -- any of which could erase your wealth entirely. Why gamble your future with middlemen when you can hold your keys and own your destiny?</p>
                <p>Bitcoin is freedom. Choose sovereignty, or lose everything.</p>
            </div>
        `;
        
        // Graceful degradation: Check if Chart.js is loaded
        if (window.Chart) {
            // Add canvas to chart container
            const chartContainer = document.getElementById('chart-container');
            const canvas = document.createElement('canvas');
            canvas.id = 'chart';
            chartContainer.appendChild(canvas);
            
            // Get chart data
            const labels = [];
            const sovereignData = [];
            const custodialCostData = [];
            for (let year = 0; year <= years; year++) {
                // Sovereign
                const sovereignLumpSum = initial * Math.pow(1 + cagr, year);
                const sovereignDCAValue = cagr > 0 ? annualDCA * (Math.pow(1 + cagr, year) - 1) / cagr : annualDCA * year;
                const sovereignValue = sovereignLumpSum + sovereignDCAValue;
                sovereignData.push(sovereignValue);

                // Custodial
                const effectiveCAGR = cagr - fee;
                const custodyLumpSum = initial * Math.pow(1 + effectiveCAGR, year);
                const custodyDCAValue = effectiveCAGR > 0 ? annualDCA * (Math.pow(1 + effectiveCAGR, year) - 1) / effectiveCAGR : annualDCA * year;
                const custodyValue = custodyLumpSum + custodyDCAValue;

                // Custodial Cost
                custodialCostData.push(sovereignValue - custodyValue);

                labels.push(year);
            }

            // Draw chart if Chart.js is available
            new Chart(document.getElementById('chart'), {
                type: 'line',
                data: {
                    labels: labels,
                    datasets: [
                        { label: 'Sovereign Value', data: sovereignData, borderColor: '#28a745', fill: false },
                        { label: 'Custodial Cost', data: custodialCostData, borderColor: '#dc3545', fill: false }
                    ]
                },
                options: {
                    responsive: true,
                    scales: {
                        y: { 
                            title: { display: true, text: 'Value ($)' }, 
                            beginAtZero: true,
                            ticks: {
                                callback: function(value) {
                                    return '$' + (value / 1000).toLocaleString('en-US', {maximumFractionDigits: 0}) + 'K';
                                }
                            }
                        },
                        x: { title: { display: true, text: 'Years' } }
                    },
                    plugins: {
                        tooltip: {
                            callbacks: {
                                label: function(context) {
                                    let label = context.dataset.label || '';
                                    if (label) {
                                        label += ': ';
                                    }
                                    label += '$' + context.parsed.y.toLocaleString('en-US', {maximumFractionDigits: 0});
                                    return label;
                                }
                            }
                        }
                    }
                }
            });
        }
        
        // Update formatted values
        updateFormattedValues();
    }
    
    // Add event listeners to all inputs for auto-calculation
    document.querySelectorAll('#calcForm input').forEach(input => {
        input.addEventListener('input', calculate);
    });
    
    // Initial calculation and formatting on page load
    calculate();
</script>


























