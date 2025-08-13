# Retirement Calculator: Bitcoin Edition

This tool helps you plan your retirement using Bitcoin, showing when you can retire based on your savings, DCA, and growth estimates. 
Bitcoin offers a path to financial independence, free from inflationary fiat systems. Hold your keys, secure your future.

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

!!! success "Current BTCUSD: <span id="btcPrice">???</span>"

<form id="calcForm" class="input-container">
    <div class="input-group">
        <div class="input-wrapper">
            <input type="number" id="age" value="35" step="1" min="18" required aria-label="Age">
            <span class="unit">yr</span>
        </div>
        <label for="age">Age:</label>
        <span class="formatted-value" id="ageFormatted">35</span>
    </div>
    
    <div class="input-group">
        <div class="input-wrapper">
            <input type="number" id="lifeExpectancy" value="97" step="1" min="19" required aria-label="Life Expectancy">
            <span class="unit">yr</span>
        </div>
        <label for="lifeExpectancy">Life Expectancy:</label>
        <span class="formatted-value" id="lifeExpectancyFormatted">97</span>
    </div>
    
    <div class="input-group">
        <div class="input-wrapper">
            <input type="number" id="initial" value="0.25" step="0.01" min="0" required aria-label="Initial">
            <span class="unit">₿</span>
        </div>
        <label for="initial">Initial:</label>
        <span class="formatted-value" id="initialFormatted">0.25 ₿</span>
    </div>
    
    <div class="input-group">
        <div class="input-wrapper">
            <input type="number" id="dca" value="30" step="1" min="0" required aria-label="DCA Amount">
            <span class="unit">$</span>
        </div>
        <label for="dca">DCA Amount:</label>
        <span class="formatted-value" id="dcaFormatted">$30</span>
    </div>
    
    <div class="input-group">
        <div class="input-wrapper">
            <input type="number" id="cagr" value="20" step="0.1" min="1" required aria-label="BTCUSD CAGR">
            <span class="unit">%</span>
        </div>
        <label for="cagr">BTCUSD CAGR:</label>
        <span class="formatted-value" id="cagrFormatted">20%</span>
    </div>
    
    <div class="input-group">
        <div class="input-wrapper">
            <input type="number" id="inflation" value="2" step="0.1" min="0" required aria-label="Fiat Inflation">
            <span class="unit">%</span>
        </div>
        <label for="inflation">Fiat Inflation:</label>
        <span class="formatted-value" id="inflationFormatted">2%</span>
    </div>
    
    <div class="input-group">
        <div class="input-wrapper">
            <input type="number" id="monthlyIncome" value="12000" step="100" min="1" required aria-label="Monthly Retirement Income">
            <span class="unit">$</span>
        </div>
        <label for="monthlyIncome">Monthly Retirement Income:</label>
        <span class="formatted-value" id="monthlyIncomeFormatted">$12,000</span>
    </div>
</form>

<div id="error" aria-live="polite"></div>
<div id="results"></div>

<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
<script>
    async function fetchBitcoinPrice() {
        const apiFetchers = [
            { name: 'CoinGecko', fetcher: () => fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd')
                .then(res => res.json())
                .then(data => data.bitcoin.usd) },
            { name: 'Blockchain.info', fetcher: () => fetch('https://blockchain.info/ticker')
                .then(res => res.json())
                .then(data => data.USD.last) },
            { name: 'Kraken', fetcher: () => fetch('https://api.kraken.com/0/public/Ticker?pair=XXBTZUSD')
                .then(res => res.json())
                .then(data => parseFloat(data.result.XXBTZUSD.c[0])) },
            { name: 'Coinpaprika', fetcher: () => fetch('https://api.coinpaprika.com/v1/tickers/btc-bitcoin')
                .then(res => res.json())
                .then(data => data.quotes.USD.price) },
            { name: 'Gemini', fetcher: () => fetch('https://api.gemini.com/v1/pubticker/btcusd')
                .then(res => res.json())
                .then(data => parseFloat(data.last)) }
        ];

        const results = await Promise.allSettled(apiFetchers.map(api => api.fetcher()));
        
        const successfulPrices = [];
        results.forEach((result, index) => {
            if (result.status === 'fulfilled' && !isNaN(result.value) && result.value > 0) {
                successfulPrices.push(result.value);
            }
        });
        
        if (successfulPrices.length === 0) {
            throw new Error('All API fetches failed');
        }
        
        // Average the successful prices
        const averagePrice = successfulPrices.reduce((sum, price) => sum + price, 0) / successfulPrices.length;
        return averagePrice;
    }

    // Format number as currency, percent, or btc
    function formatValue(value, type, isDCA = false, isFee = false, isWholeDollar = false) {
        const num = parseFloat(value);
        if (type === 'currency') {
            return '$' + num.toLocaleString('en-US', {
                minimumFractionDigits: isWholeDollar || (isDCA && Number.isInteger(num)) ? 0 : num % 1 !== 0 ? 2 : 0,
                maximumFractionDigits: isWholeDollar || (isDCA && Number.isInteger(num)) ? 0 : 2
            });
        } else if (type === 'percent') {
            return num.toFixed(isFee ? 1 : Number.isInteger(num) ? 0 : 1) + '%';
        } else if (type === 'btc') {
            return num.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 8}) + ' ₿';
        } else {
            return num.toString();
        }
    }

    // Update formatted values next to inputs
    function updateFormattedValues() {
        document.getElementById('ageFormatted').textContent = formatValue(document.getElementById('age').value, 'number');
        document.getElementById('lifeExpectancyFormatted').textContent = formatValue(document.getElementById('lifeExpectancy').value, 'number');
        document.getElementById('initialFormatted').textContent = formatValue(document.getElementById('initial').value, 'btc');
        document.getElementById('dcaFormatted').textContent = formatValue(document.getElementById('dca').value, 'currency', true);
        document.getElementById('cagrFormatted').textContent = formatValue(document.getElementById('cagr').value, 'percent');
        document.getElementById('inflationFormatted').textContent = formatValue(document.getElementById('inflation').value, 'percent');
        document.getElementById('monthlyIncomeFormatted').textContent = formatValue(document.getElementById('monthlyIncome').value, 'currency');
    }

    // Validate inputs
    function validateInputs() {
        const age = parseInt(document.getElementById('age').value) || 0;
        const lifeExpectancy = parseInt(document.getElementById('lifeExpectancy').value) || 0;
        const initial = parseFloat(document.getElementById('initial').value) || 0;
        const dca = parseFloat(document.getElementById('dca').value) || 0;
        const cagr = parseFloat(document.getElementById('cagr').value) || 0;
        const inflation = parseFloat(document.getElementById('inflation').value) || 0;
        const monthlyIncome = parseFloat(document.getElementById('monthlyIncome').value) || 0;

        const errors = [];
        if (age < 18) errors.push("Age must be at least 18");
        if (lifeExpectancy <= age) errors.push("Life Expectancy must be greater than Age");
        if (initial < 0) errors.push("Initial must be greater than or equal to 0");
        if (dca < 0) errors.push("DCA Amount must be greater than or equal to 0");
        if (cagr < 1) errors.push("Estimated BTCUSD CAGR must be greater than or equal to 1%");
        if (inflation < 0) errors.push("Fiat Inflation must be greater than or equal to 0%");
        if (monthlyIncome <= 0) errors.push("Monthly Retirement Income must be greater than 0");

        const errorDiv = document.getElementById('error');
        if (errors.length > 0) {
            errorDiv.innerHTML = `<p>${errors.join('<br>')}</p>`;
            return false;
        } else {
            errorDiv.innerHTML = '';
            return true;
        }
    }

    let btcPrice = null;

    async function updateBitcoinPrice() {
        try {
            btcPrice = await fetchBitcoinPrice();
            document.getElementById('btcPrice').textContent = `$${btcPrice.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
        } catch (error) {
            console.error('Error fetching Bitcoin price:', error);
            document.getElementById('btcPrice').textContent = 'unavailable';
            btcPrice = null;
        }
    }

    async function calculate() {
        if (!validateInputs()) {
            document.getElementById('results').innerHTML = '';
            return;
        }
        if (btcPrice === null) {
            document.getElementById('results').innerHTML = '';
            return;
        }

        const age = parseInt(document.getElementById('age').value);
        const lifeExpectancy = parseInt(document.getElementById('lifeExpectancy').value);
        const initial = parseFloat(document.getElementById('initial').value);
        const dcaDaily = parseFloat(document.getElementById('dca').value);
        const annualDCA = dcaDaily * 365.25;
        const cagr = parseFloat(document.getElementById('cagr').value) / 100;
        const inflation = parseFloat(document.getElementById('inflation').value) / 100;
        const monthlyIncome = parseFloat(document.getElementById('monthlyIncome').value);

        let minRaYears = lifeExpectancy - age;
        let minRa = lifeExpectancy;
        let savingsBtc = 0;
        let savingsUsd = 0;
        let btcusdRa = 0;
        let monthlyBtcRa = 0;
        let btcOverTime = [];
        let ages = [];

        for (let testRaYears = 0; testRaYears <= (lifeExpectancy - age); testRaYears++) {
            let B = initial;
            let price = btcPrice;
            for (let t = 1; t <= testRaYears; t++) {
                price *= (1 + cagr);
                let buyBtc = annualDCA / price;
                B += buyBtc;
            }
            let BRetire = B;
            let priceRetire = price;

            // Calculate required BTC at retirement for withdrawals
            let BRequired = 0;
            let n = lifeExpectancy - age - testRaYears;
            let priceCurrent = priceRetire;
            for (let j = 1; j <= n; j++) {
                let annualRequired = 12 * monthlyIncome * Math.pow(1 + inflation, testRaYears + j - 1);
                let withdrawBtc = annualRequired / priceCurrent;
                BRequired += withdrawBtc;
                priceCurrent *= (1 + cagr);
            }

            if (BRetire >= BRequired) {
                minRaYears = testRaYears;
                minRa = age + testRaYears;
                savingsBtc = BRetire;
                savingsUsd = BRetire * priceRetire;
                btcusdRa = priceRetire;
                let annualRequired1 = 12 * monthlyIncome * Math.pow(1 + inflation, minRaYears);
                monthlyBtcRa = (annualRequired1 / 12) / priceRetire;
                break;
            }
        }

        // Simulate for chart with variable withdrawals
        let B = initial;
        let price = btcPrice;
        btcOverTime.push(B);
        ages.push(age);
        // Accumulation phase
        for (let t = 1; t <= minRaYears; t++) {
            price *= (1 + cagr);
            let buyBtc = annualDCA / price;
            B += buyBtc;
            btcOverTime.push(B);
            ages.push(age + t);
        }
        // Retirement phase
        let n = lifeExpectancy - age - minRaYears;
        let priceCurrent = btcusdRa;
        for (let j = 1; j <= n; j++) {
            let annualRequired = 12 * monthlyIncome * Math.pow(1 + inflation, minRaYears + j - 1);
            let withdrawBtc = annualRequired / priceCurrent;
            B -= withdrawBtc;
            btcOverTime.push(B);
            ages.push(age + minRaYears + j);
            priceCurrent *= (1 + cagr);
        }

        // Display results
        const resultsDiv = document.getElementById('results');
        resultsDiv.innerHTML = `
            <div class="summary">
                <p>Minimum Time to Retire: ${minRaYears} years (${minRa}yo)</p>
                <p>Savings: ${formatValue(savingsBtc, 'btc')} (${formatValue(savingsUsd, 'currency', false, false, true)})</p>
                <p>BTCUSD at Retirement: ${formatValue(btcusdRa, 'currency', false, false, true)}</p>
            </div>
            <div id="chart-container"></div>
            <div class="text">
                <p>Working for ${minRaYears} years and retiring at age ${minRa}, and with an estimated ${formatValue(cagr * 100, 'percent')} BTCUSD CAGR, you'll have saved ${formatValue(savingsBtc, 'btc')}. With fiat inflation at ${formatValue(inflation * 100, 'percent')}, your monthly retirement income of ${formatValue(monthlyIncome, 'currency')} (today's dollars) will be covered by selling approximately ${monthlyBtcRa.toFixed(8)} ₿ monthly at the projected BTCUSD of ${formatValue(btcusdRa, 'currency', false, false, true)} at retirement.</p>
            </div>
        `;

        // Graceful degradation: Check if Chart.js is loaded
        if (window.Chart) {
            // Add canvas to chart container
            const chartContainer = document.getElementById('chart-container');
            const canvas = document.createElement('canvas');
            canvas.id = 'chart';
            chartContainer.appendChild(canvas);
            
            // Draw chart if Chart.js is available
            new Chart(document.getElementById('chart'), {
                type: 'line',
                data: {
                    labels: ages,
                    datasets: [
                        { label: 'Bitcoin Holdings', data: btcOverTime, borderColor: '#f7931a', fill: false }
                    ]
                },
                options: {
                    responsive: true,
                    scales: {
                        y: { 
                            title: { display: true, text: 'Bitcoin (₿)' }, 
                            beginAtZero: true,
                            ticks: {
                                callback: function(value) {
                                    return value.toFixed(2);
                                }
                            }
                        },
                        x: { title: { display: true, text: 'Age (years)' } }
                    },
                    plugins: {
                        tooltip: {
                            callbacks: {
                                label: function(context) {
                                    let label = context.dataset.label || '';
                                    if (label) {
                                        label += ': ';
                                    }
                                    label += context.parsed.y.toFixed(4) + ' ₿';
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
    updateBitcoinPrice().then(() => calculate());
</script>



