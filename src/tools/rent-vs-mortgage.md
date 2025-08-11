# Rent vs Mortgage -- Bitcoin Edition

Rent vs Buy calculators are very misleading (filled with fiat-minded assumptions), and are especially useless as we return to sound money. For example, most online "Rent vs Buy" calculators don't allow a high "savings" rate. Bitcoin's historic (and likely future) CAGR is disruptive to these fiat models.

Fortunately, Bitcoin can help us make sensible decisions with respect to home ownership.
This tool compares rent versus mortgage, with a simple goal of maximizing wealth thru Bitcoin. You'll find that with assumptions like 2% inflation, it's rarely better to buy than rent. But you'll find many scenarios where a mortgage can help you to stack more sats (such as high inflation, low interest rates, high rents, etc).

<style>
    .md-content {
        padding: 20px;
    }
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
    label {
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
    .section-header {
        font-size: 1.1em;
        font-weight: bold;
        color: var(--md-default-fg-color--dark);
        margin-bottom: 10px;
        margin-top: 20px;
        display: flex;
        align-items: center;
        text-align: center;
        width: 100%;
    }
    .section-header::before,
    .section-header::after {
        content: '';
        flex: 1;
        border-bottom: 1px solid var(--md-default-fg-color--light);
    }
    .section-header::before {
        margin-right: 0.5em;
    }
    .section-header::after {
        margin-left: 0.5em;
    }
</style>

!!! success "Current BTCUSD: <span id="btcPrice">???</span>"

<form id="calcForm" class="input-container">
    <div class="input-group">
        <div class="input-wrapper">
            <input type="number" id="monthlyRent" value="2800" step="100" min="0" required aria-label="Monthly Rent">
            <span class="unit">$</span>
        </div>
        <label for="monthlyRent">Monthly Rent:</label>
        <span class="formatted-value" id="monthlyRentFormatted">$2,800</span>
    </div>
    
    <div class="section-header">vs Mortgage</div>
    <div class="input-group">
        <div class="input-wrapper">
            <input type="number" id="homePrice" value="450000" step="1000" min="10000" required aria-label="Home Price">
            <span class="unit">$</span>
        </div>
        <label for="homePrice">Home Price:</label>
        <span class="formatted-value" id="homePriceFormatted">$450,000</span>
    </div>
    
    <div class="input-group">
        <div class="input-wrapper">
            <input type="number" id="downPayment" value="3" step="0.1" min="0" max="100" required aria-label="Down Payment">
            <span class="unit">%</span>
        </div>
        <label for="downPayment">Down Payment:</label>
        <span class="formatted-value" id="downPaymentFormatted">3%</span>
    </div>
    
    <div class="input-group">
        <div class="input-wrapper">
            <input type="number" id="pmiRate" value="0.50" step="0.1" min="0" required aria-label="PMI Rate">
            <span class="unit">%</span>
        </div>
        <label for="pmiRate">PMI Rate:</label>
        <span class="formatted-value" id="pmiRateFormatted">0.50%</span>
    </div>
    
    <div class="input-group">
        <div class="input-wrapper">
            <input type="number" id="mortgageRate" value="6.50" step="0.1" min="0" required aria-label="Mortgage Rate">
            <span class="unit">%</span>
        </div>
        <label for="mortgageRate">Mortgage Rate:</label>
        <span class="formatted-value" id="mortgageRateFormatted">6.50%</span>
    </div>
    
    <div class="input-group">
        <div class="input-wrapper">
            <input type="number" id="loanTerm" value="30" step="1" min="1" required aria-label="Loan Term">
            <span class="unit">yr</span>
        </div>
        <label for="loanTerm">Loan Term:</label>
        <span class="formatted-value" id="loanTermFormatted">30</span>
    </div>
    
    <div class="section-header">Ownership Costs</div>
    <div class="input-group">
        <div class="input-wrapper">
            <input type="number" id="propertyTax" value="1.25" step="0.01" min="0" required aria-label="Property Tax">
            <span class="unit">%</span>
        </div>
        <label for="propertyTax">Property Tax:</label>
        <span class="formatted-value" id="propertyTaxFormatted">1.25%</span>
    </div>
    
    <div class="input-group">
        <div class="input-wrapper">
            <input type="number" id="homeInsurance" value="1500" step="100" min="0" required aria-label="Home Insurance">
            <span class="unit">$</span>
        </div>
        <label for="homeInsurance">Home Insurance:</label>
        <span class="formatted-value" id="homeInsuranceFormatted">$1,500</span>
    </div>
    
    <div class="input-group">
        <div class="input-wrapper">
            <input type="number" id="maintenance" value="1" step="0.1" min="0" required aria-label="Maintenance">
            <span class="unit">%</span>
        </div>
        <label for="maintenance">Maintenance:</label>
        <span class="formatted-value" id="maintenanceFormatted">1%</span>
    </div>
    <div class="section-header">Economic Assumptions</div>
    <div class="input-group">
        <div class="input-wrapper">
            <input type="number" id="fiatInflation" value="2" step="0.1" min="0" required aria-label="Fiat Inflation">
            <span class="unit">%</span>
        </div>
        <label for="fiatInflation">Fiat Inflation:</label>
        <span class="formatted-value" id="fiatInflationFormatted">2%</span>
    </div>
    
    <div class="input-group">
        <div class="input-wrapper">
            <input type="number" id="btcCagr" value="20" step="0.1" min="1" required aria-label="BTCUSD CAGR">
            <span class="unit">%</span>
        </div>
        <label for="btcCagr">BTCUSD CAGR:</label>
        <span class="formatted-value" id="btcCagrFormatted">20%</span>
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

    // Format number as currency, percent, or number
    function formatValue(value, type, isWholeDollar = false) {
        const num = parseFloat(value);
        if (type === 'currency') {
            return '$' + Math.round(num).toLocaleString('en-US');
        } else if (type === 'percent') {
            return num.toFixed(Number.isInteger(num) ? 0 : 2) + '%';
        } else {
            return num.toLocaleString('en-US');
        }
    }

    // Update formatted values next to inputs
    function updateFormattedValues() {
        document.getElementById('monthlyRentFormatted').textContent = formatValue(document.getElementById('monthlyRent').value, 'currency');
        document.getElementById('homePriceFormatted').textContent = formatValue(document.getElementById('homePrice').value, 'currency', true);
        document.getElementById('downPaymentFormatted').textContent = formatValue(document.getElementById('downPayment').value, 'percent');
        document.getElementById('pmiRateFormatted').textContent = formatValue(document.getElementById('pmiRate').value, 'percent');
        document.getElementById('mortgageRateFormatted').textContent = formatValue(document.getElementById('mortgageRate').value, 'percent');
        document.getElementById('loanTermFormatted').textContent = formatValue(document.getElementById('loanTerm').value, 'number');
        document.getElementById('fiatInflationFormatted').textContent = formatValue(document.getElementById('fiatInflation').value, 'percent');
        document.getElementById('btcCagrFormatted').textContent = formatValue(document.getElementById('btcCagr').value, 'percent');
        document.getElementById('propertyTaxFormatted').textContent = formatValue(document.getElementById('propertyTax').value, 'percent');
        document.getElementById('homeInsuranceFormatted').textContent = formatValue(document.getElementById('homeInsurance').value, 'currency', true);
        document.getElementById('maintenanceFormatted').textContent = formatValue(document.getElementById('maintenance').value, 'percent');
    }

    // Validate inputs
    function validateInputs() {
        const homePrice = parseFloat(document.getElementById('homePrice').value) || 0;
        const downPayment = parseFloat(document.getElementById('downPayment').value) || 0;
        const pmiRate = parseFloat(document.getElementById('pmiRate').value) || 0;
        const mortgageRate = parseFloat(document.getElementById('mortgageRate').value) || 0;
        const loanTerm = parseInt(document.getElementById('loanTerm').value) || 0;
        const monthlyRent = parseFloat(document.getElementById('monthlyRent').value) || 0;
        const fiatInflation = parseFloat(document.getElementById('fiatInflation').value) || 0;
        const btcCagr = parseFloat(document.getElementById('btcCagr').value) || 0;
        const propertyTax = parseFloat(document.getElementById('propertyTax').value) || 0;
        const homeInsurance = parseFloat(document.getElementById('homeInsurance').value) || 0;
        const maintenance = parseFloat(document.getElementById('maintenance').value) || 0;

        const errors = [];
        if (homePrice < 10000) errors.push("Home Price must be at least $10,000");
        if (downPayment < 0 || downPayment > 100) errors.push("Down Payment must be between 0% and 100%");
        if (pmiRate < 0) errors.push("PMI Rate must be at least 0%");
        if (mortgageRate < 0) errors.push("Mortgage Rate must be at least 0%");
        if (loanTerm < 1) errors.push("Loan Term must be at least 1 year");
        if (monthlyRent < 0) errors.push("Monthly Rent must be at least $0");
        if (fiatInflation < 0) errors.push("Fiat Inflation must be at least 0%");
        if (btcCagr < 1) errors.push("BTCUSD CAGR must be at least 1%");
        if (propertyTax < 0) errors.push("Property Tax must be at least 0%");
        if (homeInsurance < 0) errors.push("Home Insurance must be at least $0");
        if (maintenance < 0) errors.push("Maintenance must be at least 0%");

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

    function calculateMortgagePayment(principal, annualRate, years) {
        const monthlyRate = annualRate / 12 / 100;
        const months = years * 12;
        if (monthlyRate === 0) return principal / months;
        return principal * (monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1);
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

        const homePriceVal = parseFloat(document.getElementById('homePrice').value);
        const downPaymentPercent = parseFloat(document.getElementById('downPayment').value);
        const pmiRateVal = parseFloat(document.getElementById('pmiRate').value) / 100;
        const mortgageRateVal = parseFloat(document.getElementById('mortgageRate').value);
        const loanTermVal = parseInt(document.getElementById('loanTerm').value);
        const monthlyRentVal = parseFloat(document.getElementById('monthlyRent').value);
        const fiatInflationVal = parseFloat(document.getElementById('fiatInflation').value) / 100;
        const btcCagrVal = parseFloat(document.getElementById('btcCagr').value) / 100;
        const propertyTaxVal = parseFloat(document.getElementById('propertyTax').value) / 100;
        const homeInsuranceVal = parseFloat(document.getElementById('homeInsurance').value);
        const maintenanceVal = parseFloat(document.getElementById('maintenance').value) / 100;

        const downPayment = homePriceVal * (downPaymentPercent / 100);
        const loanAmount = homePriceVal - downPayment;
        const mortgageMonthly = calculateMortgagePayment(loanAmount, mortgageRateVal, loanTermVal);

        let pmiMonthlyInitial = 0;
        if (downPaymentPercent < 20) {
            pmiMonthlyInitial = (loanAmount * pmiRateVal) / 12;
        }
        const mortgageBaseInitial = mortgageMonthly + pmiMonthlyInitial;
        const taxMonthlyInitial = propertyTaxVal / 12 * homePriceVal;
        const maintMonthlyInitial = maintenanceVal / 12 * homePriceVal;
        const insMonthlyInitial = homeInsuranceVal / 12;
        const expensesInitial = taxMonthlyInitial + maintMonthlyInitial + insMonthlyInitial;
        const buyTotalInitial = mortgageBaseInitial + expensesInitial;

        let btcRent = downPayment / btcPrice;
        let btcBuy = 0;
        let remainingLoan = loanAmount;
        let currentHomeValue = homePriceVal;
        let currentRent = monthlyRentVal;
        let currentInsMonthly = homeInsuranceVal / 12;
        let currentBtcPrice = btcPrice;

        let rentExpenses = [];
        let mortgageExpenses = [];
        let years = [];

        const months = loanTermVal * 12;
        let annualRentExpense = 0;
        let annualMortgageExpense = 0;
        for (let month = 1; month <= months; month++) {
            currentBtcPrice = btcPrice * Math.pow(1 + (btcCagrVal / 12), month);
            currentHomeValue = homePriceVal * Math.pow(1 + (fiatInflationVal / 12), month);
            currentRent = monthlyRentVal * Math.pow(1 + (fiatInflationVal / 12), month);
            currentInsMonthly = (homeInsuranceVal / 12) * Math.pow(1 + (fiatInflationVal / 12), month);

            // Buy monthly costs
            const taxMonthly = propertyTaxVal / 12 * currentHomeValue;
            const maintMonthly = maintenanceVal / 12 * currentHomeValue;
            const insMonthly = currentInsMonthly;
            let mortgageThisMonth = 0;
            let interest = 0;
            let principal = 0;
            if (remainingLoan > 0) {
                interest = remainingLoan * (mortgageRateVal / 100 / 12);
                principal = mortgageMonthly - interest;
                if (principal > remainingLoan) {
                    principal = remainingLoan;
                    mortgageThisMonth = interest + principal;
                } else {
                    mortgageThisMonth = mortgageMonthly;
                }
                remainingLoan -= principal;
                if (remainingLoan < 0) remainingLoan = 0;
            }
            let pmiMonthly = 0;
            if (downPaymentPercent < 20) {
                pmiMonthly = (loanAmount * pmiRateVal) / 12;
            }
            const buyMonthlyTotal = mortgageThisMonth + taxMonthly + insMonthly + maintMonthly + pmiMonthly;

            const monthlySaving = buyMonthlyTotal - currentRent;

            if (monthlySaving > 0) {
                // Renting saves money this month, invest in rent scenario
                btcRent += monthlySaving / currentBtcPrice;
            } else if (monthlySaving < 0) {
                // Buying saves money this month, invest in buy scenario
                btcBuy += (-monthlySaving) / currentBtcPrice;
            }

            annualRentExpense += currentRent;
            annualMortgageExpense += buyMonthlyTotal;

            if (month % 12 === 0) {
                rentExpenses.push(annualRentExpense);
                mortgageExpenses.push(annualMortgageExpense);
                years.push(month / 12);
                annualRentExpense = 0;
                annualMortgageExpense = 0;
            }
        }

        const finalBtcPrice = btcPrice * Math.pow(1 + (btcCagrVal / 12), months);
        const homeEquity = currentHomeValue - remainingLoan;
        const houseWorthBtc = (homeEquity / finalBtcPrice).toFixed(4);
        btcBuy += homeEquity / finalBtcPrice;

        const difference = btcRent - btcBuy;
        const absDifference = Math.abs(difference).toFixed(4);
        const rentBtc = btcRent.toFixed(4);
        const buyBtc = btcBuy.toFixed(4);
        let text = '';
        if (difference > 0) {
            text = `Based on the above inputs, it would be better to rent rather than mortgage as that would allow you to accumulate ${rentBtc} ₿, which is ${absDifference} ₿ more than had you bought a house (worth ${houseWorthBtc} ₿ after ${loanTermVal} years of fiat debasement).`;
        } else {
            text = `Based on the above inputs, it would be better to mortgage rather than rent as this would allow you to stack more sats, you would gain an additional ${absDifference} ₿ on top of the equity of the house (worth ${houseWorthBtc} ₿ after ${loanTermVal} years).`;
        }

        // Display results
        const resultsDiv = document.getElementById('results');
        resultsDiv.innerHTML = `
            <div class="summary">
                <p>Mortgage: ${formatValue(mortgageBaseInitial, 'currency')} per month, equity: ${houseWorthBtc} ₿</p>
                <p>Rent: ${formatValue(monthlyRentVal, 'currency')} to ${formatValue(currentRent, 'currency')} per month</p>
                <hr />
                <p>${difference > 0 ? 'Renting' : 'Buying'} wins by ${absDifference} ₿, total saved: ${rentBtc} ₿</p>
            </div>
            <div id="chart-container"></div>
            <div class="text">
                <p>${text}</p>
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
                    labels: years,
                    datasets: [
                        { label: 'Rent Expenses', data: rentExpenses, borderColor: '#28a745', fill: false },
                        { label: 'Mortgage Expenses', data: mortgageExpenses, borderColor: '#007bff', fill: false }
                    ]
                },
                options: {
                    responsive: true,
                    scales: {
                        y: { 
                            title: { display: true, text: 'Annual Expenses ($)' }, 
                            beginAtZero: true,
                            ticks: {
                                callback: function(value) {
                                    return '$' + value.toLocaleString();
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
                                    label += '$' + context.parsed.y.toLocaleString();
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















