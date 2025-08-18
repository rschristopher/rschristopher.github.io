import { getBitcoinPrice } from '../btcusd.mjs';

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

async function updateBitcoinPriceSpan() {
    const btcPriceSpan = document.getElementById('btcPrice');
    if (btcPriceSpan) {
        btcPrice = await getBitcoinPrice();
        if (btcPrice !== null) {
            btcPriceSpan.textContent = `$${btcPrice.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
        } else {
            btcPriceSpan.textContent = 'unavailable';
        }
    }
}

async function calculate() {
    if (!validateInputs()) {
        document.getElementById('results').innerHTML = '';
        return;
    }
    if (btcPrice === null) {
        btcPrice = await getBitcoinPrice();
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
    updateFormattedValues();
}

// Run on initial load and every instant navigation change
document$.subscribe(async () => {
    if (document.getElementById('retirement_page')) {
        document.querySelectorAll('#calcForm input').forEach(input => {
            input.addEventListener('input', calculate);
        });
        await updateBitcoinPriceSpan();
        calculate();
    }
});

