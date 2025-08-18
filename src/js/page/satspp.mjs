import { getBitcoinPrice } from '../btcusd.mjs';

// Format number as currency, percent, or number
function formatValue(value, type, isWhole = false) {
    const num = parseFloat(value);
    if (type === 'currency') {
        return '$' + num.toLocaleString('en-US', {
            minimumFractionDigits: isWhole ? 0 : num % 1 !== 0 ? 2 : 0,
            maximumFractionDigits: isWhole ? 0 : 2
        });
    } else if (type === 'percent') {
        return num.toFixed(Number.isInteger(num) ? 0 : 1) + '%';
    } else if (type === 'sats') {
        return num.toLocaleString('en-US') + ' sats';
    } else {
        return num.toString();
    }
}

// Update formatted values next to inputs
function updateFormattedValues() {
    document.getElementById('inflationFormatted').textContent = formatValue(document.getElementById('inflation').value, 'percent');
    document.getElementById('cagrFormatted').textContent = formatValue(document.getElementById('cagr').value, 'percent');
    document.getElementById('yearsFormatted').textContent = formatValue(document.getElementById('years').value, 'number');
}

// Validate inputs
function validateInputs() {
    const inflation = parseFloat(document.getElementById('inflation').value) || 0;
    const cagr = parseFloat(document.getElementById('cagr').value) || 0;
    const years = parseInt(document.getElementById('years').value) || 0;
    const errors = [];
    if (inflation < 0) errors.push("Fiat Inflation must be greater than or equal to 0%");
    if (cagr < 1) errors.push("BTCUSD CAGR must be greater than or equal to 1%");
    if (cagr > 100) errors.push("BTCUSD CAGR must be less than or equal to 100%");
    if (years < 0 || years > 100) errors.push("Years Ahead must be between 0 and 100");
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

const items = [
    { name: 'Loaf of Bread', price: 1.86, unit: '' },
    { name: 'Gallon of Milk', price: 4.16, unit: '' },
    { name: 'Dozen Eggs', price: 4.00, unit: '' },
    { name: 'Pound of Ground Beef', price: 6.25, unit: '' },
    { name: 'Gallon of Gasoline', price: 3.15, unit: '' },
    { name: 'Pound of Bananas', price: 0.65, unit: '' },
    { name: 'Cup of Coffee', price: 3.50, unit: '' },
    { name: 'Movie Ticket', price: 15.00, unit: '' },
    { name: 'Haircut', price: 45.00, unit: '' },
    { name: 'Doctor Visit', price: 200.00, unit: '' },
    { name: 'Smartphone', price: 800.00, unit: '' },
    { name: 'One-Bedroom Rent (Monthly)', price: 1700.00, unit: '' }
];

const satUnits = [
    { singular: 'sat', plural: 'sats', factor: 1 },
    { singular: 'millisat', plural: 'millisats', factor: 1e3 },
    { singular: 'microsat', plural: 'microsats', factor: 1e6 },
    { singular: 'nanosat', plural: 'nanosats', factor: 1e9 },
    { singular: 'picosat', plural: 'picosats', factor: 1e12 },
    { singular: 'femtosat', plural: 'femtosats', factor: 1e15 },
    { singular: 'attosat', plural: 'attosats', factor: 1e18 },
    { singular: 'zeptosat', plural: 'zeptosats', factor: 1e21 },
    { singular: 'yoctosat', plural: 'yoctosats', factor: 1e24 }
];

function formatSats(satsFloat) {
    if (satsFloat === 0) {
        return '<strong>0</strong> <em>sats</em>';
    }
    let displayStr = '<strong>0</strong> <em>sats</em>';
    for (const unit of satUnits) {
        const amount = satsFloat * unit.factor;
        if (amount >= 1) {
            const roundedAmount = Math.round(amount);
            const amountFormatted = roundedAmount.toLocaleString('en-US');
            const unitName = (roundedAmount === 1) ? unit.singular : unit.plural;
            displayStr = `<strong>${amountFormatted}</strong> <em>${unitName}</em>`;
            break;
        }
    }
    return displayStr;
}

async function calculate() {
    if (!validateInputs()) {
        document.getElementById('projectedBtcPrice').textContent = '???';
        document.getElementById('projectedSats').innerHTML = '...';
        return;
    }
    if (btcPrice === null) {
        btcPrice = await getBitcoinPrice();
    }
    if (btcPrice === null) {
        document.getElementById('projectedBtcPrice').textContent = '???';
        document.getElementById('projectedSats').innerHTML = '...';
        return;
    }
    const inflation = parseFloat(document.getElementById('inflation').value) / 100;
    const cagr = parseFloat(document.getElementById('cagr').value) / 100;
    const years = parseInt(document.getElementById('years').value);
    
    const projectedBtcUsd = btcPrice * Math.pow(1 + cagr, years);
    const projectedText = projectedBtcUsd > 1e18 ? 'fiat has crashed' : formatValue(projectedBtcUsd, 'currency', true);
    
    let listHtml = '<ul>';
    
    items.forEach(item => {
        const futureUsd = item.price * Math.pow(1 + inflation, years);
        const futureSatsFloat = (futureUsd / projectedBtcUsd) * 1e8;
        const displayStr = formatSats(futureSatsFloat);
        const tooltip = `$${item.price.toFixed(2)} in 2025`;
        listHtml += `<li><span title="${tooltip}">${item.name}</span>: ${displayStr}</li>`;
    });
    
    listHtml += '</ul>';
    
    document.getElementById('projectedBtcPrice').textContent = projectedText;
    document.getElementById('projectedSats').innerHTML = `<p>Future Prices in Sats:</p>${listHtml}`;
    updateFormattedValues();
}

// Run on initial load and every instant navigation change
document$.subscribe(async () => {
    if (document.getElementById('satspp_page')) {
        document.querySelectorAll('#calcForm input').forEach(input => {
            input.addEventListener('input', calculate);
        });
        await updateBitcoinPriceSpan();
        calculate();
    }
});

