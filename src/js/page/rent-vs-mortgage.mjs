import { getBitcoinPrice } from '../btcusd.mjs';

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
        await updateBitcoinPriceSpan();
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
            btcRent += monthlySaving / currentBtcPrice;
        } else if (monthlySaving < 0) {
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
    updateFormattedValues();
}

// Run on initial load and every instant navigation change
document$.subscribe(async () => {
    if (document.getElementById('rent_vs_mortgage_page')) {
        document.querySelectorAll('#calcForm input').forEach(input => {
            input.addEventListener('input', calculate);
        });
        await updateBitcoinPriceSpan();
        calculate();
    }
});

