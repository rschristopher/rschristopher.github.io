import { getBitcoinPrice, formatSats } from '../btcusd.mjs';

async function updatePrices() {
    const btcPrice = await getBitcoinPrice();
    const satsPerUsd = 100_000_000 / btcPrice;
    // Update Bitcoin price in the admonition title
    const btcPriceSpan = document.getElementById('btcPrice');
    if (btcPriceSpan) btcPriceSpan.textContent = `$${btcPrice.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    // Update prices for each service with full text including parentheses
    const coldStorageSats = document.getElementById('coldStorageSats');
    if (coldStorageSats) coldStorageSats.textContent = formatSats(1500 * satsPerUsd);
    const inheritanceSats = document.getElementById('inheritanceSats');
    if (inheritanceSats) inheritanceSats.textContent = formatSats(2500 * satsPerUsd);
    const retainerSats = document.getElementById('retainerSats');
    if (retainerSats) retainerSats.textContent = formatSats(1000 * satsPerUsd);
    const btcPaySats = document.getElementById('btcPaySats');
    if (btcPaySats) btcPaySats.textContent = formatSats(2000 * satsPerUsd);
    const lightningSats = document.getElementById('lightningSats');
    if (lightningSats) lightningSats.textContent = formatSats(3000 * satsPerUsd);
    const auditSats = document.getElementById('auditSats');
    if (auditSats) auditSats.textContent = formatSats(1500 * satsPerUsd);
    const trainingSats = document.getElementById('trainingSats');
    if (trainingSats) trainingSats.textContent = formatSats(500 * satsPerUsd);
    const asicSats = document.getElementById('asicSats');
    if (asicSats) asicSats.textContent = formatSats(500 * satsPerUsd);
    const miningWalkthroughSats = document.getElementById('miningWalkthroughSats');
    if (miningWalkthroughSats) miningWalkthroughSats.textContent = formatSats(1500 * satsPerUsd);
    const colocationSats = document.getElementById('colocationSats');
    if (colocationSats) colocationSats.textContent = formatSats(500 * satsPerUsd);
    const customDevSats = document.getElementById('customDevSats');
    if (customDevSats) customDevSats.textContent = formatSats(500 * satsPerUsd);
}

// Run on initial load and every instant navigation change
document$.subscribe(async () => {
    if (document.getElementById('prices_page')) {
        await updatePrices();
    }
});

