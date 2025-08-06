# Prices
<!--
Lord Jesus Christ, Son of the Living God
Have mercy on me
a sinner
-->
**Straightforward. Transparent. No bullshit**

You don’t need us to use Bitcoin well -- but if you want one-on-one support, we offer it at competitive, transparent pricing. We charge based on time and scope, not complexity. Pricing below gives examples of what typical engagements look like.

!!! warning "Fiat Volatility: 1 BTC = 100M sats = <span id="btcPrice"></span>"
    Fiat currencies are extremely volatile and unstable, distorting price discovery in every market; and until Bitcoin becomes a global [unit of account](bitcoin-as-money/unit-of-account.md) we will do our best to provide fair prices for services (payable in Bitcoin).

---

## Self Custody
For clients who want help with self custody, inheritance planning, and securing their keys.

**Cold Storage Setup** – *from $1,500 <span id="coldStorageSats"></span>*  
Custom vault design (single-sig or multisig), signing device setup, airgap quarantine, and backup strategies.

**Inheritance Planning** – *from $2,500 <span id="inheritanceSats"></span>*  
Walkthrough of key handoff, survivorship design, protocol docs, and family onboarding.

**Ongoing Support Retainer** – *from $1,000 <span id="retainerSats"></span>/month*  
Ongoing access, quarterly check-ins, and emergency coordination help.

---

## Payments

**BTCPay Server Setup** – *from $2,000 <span id="btcPaySats"></span>*  
Self-hosted deployment, payment flows, staff walkthrough.

**Lightning Node & Channel Strategy** – *from $3,000 <span id="lightningSats"></span>*  
Node setup, routing design, and liquidity support.

**Infrastructure Review / Audit** – *$1,500 flat <span id="auditSats"></span>*  
Review existing setup, identify risks, and propose improvements.

**Team Training & SOPs** – *$500 <span id="trainingSats"></span> per hour or project based*  
Workshops and documentation tailored to your operational needs.

---

## Mining

**ASIC Acquisition & Setup Guidance** – *$500 <span id="asicSats"></span> per hour*  
We help you choose hardware, firmware, pool, and layout strategy.

**Residential Mining Walkthrough** – *from $1,500 <span id="miningWalkthroughSats"></span>*  
Includes electrical, physical, and monitoring setup overview.

**Colocation Planning Session** – *$500 <span id="colocationSats"></span> per hour*  
Cover contracts, hosting risks, remote monitoring, and ROI modeling.

We don’t sell miners. We help you use them well and become a true [sovereign](pow/sovereignty/index.md).

---

## Custom Projects
Bespoke software, dashboards, scripting, or integration work is available in limited capacity.

**Custom Development** – *$500 <span id="customDevSats"></span> per hour or project-based*  
All code is client-owned, documented, and open-source friendly.

---

## FAQ

**Do you offer flat-fee packages?**  
Yes — for custody setups, BTCPay deployments, and small engagements.

**Can you work with multisig I already started?**  
Absolutely. We’re happy to review or refine an existing setup.

**Do you ever take custody or hold client keys?**  
No. Never.

**Do you charge more if the amount held is high?**  
No. Pricing is based on scope, not assets. In fact, do not ever disclose your exact assets, that's between you and your loved ones, never with us.

**Is your pricing negotiable?**  
If you’re working on something aligned with our mission, reach out. We care more about helping the right people than maxing out invoices.

**Can I pay in Bitcoin or sats?**  
Yes! We accept payments in Bitcoin (via on-chain or Lightning). Sats prices are shown for convenience and updated dynamically based on market rates. Contact us for payment details.

---

*Not Sure What You Need?*  
Start with a consultation. We’ll help you scope it.

<div style="text-align: center; margin: 2em 0;">
  <a href="/about/contact/" class="md-button md-button--primary">
    Request a Consultation
  </a>
</div>

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
            console.log(`${apiFetchers[index].name} price: $${result.value.toFixed(2)}`);
            successfulPrices.push(result.value);
        } else {
            console.log(`${apiFetchers[index].name} failed: ${result.status === 'rejected' ? result.reason : 'Invalid price or zero'}`);
        }
    });
    
    console.log(`Number of successful API responses: ${successfulPrices.length}`);
    if (successfulPrices.length === 0) {
        throw new Error('All API fetches failed');
    }
    
    // Average the successful prices
    const averagePrice = successfulPrices.reduce((sum, price) => sum + price, 0) / successfulPrices.length;
    console.log(`Final averaged price: $${averagePrice.toFixed(2)}`);
    return averagePrice;
}

function formatSats(sats) {
    // Round to nearest 10,000
    const roundedSats = Math.round(sats / 10000) * 10000;
    if (roundedSats < 1000000) {
        // Display in thousands (e.g., 892,000 sats -> "892K")
        return `(${Math.round(roundedSats / 1000)}K sats)`;
    }
    // Display in millions (e.g., 2,680,000 sats -> "2.68M")
    return `(${(roundedSats / 1000000).toFixed(2)}M sats)`;
}

async function updatePrices() {
    try {
        const btcPrice = await fetchBitcoinPrice();
        const satsPerUsd = 100_000_000 / btcPrice; // 1 BTC = 100M sats

        // Update Bitcoin price in the admonition title
        document.getElementById('btcPrice').textContent = `$${btcPrice.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

        // Update prices for each service with full text including parentheses
        document.getElementById('coldStorageSats').textContent = formatSats(1500 * satsPerUsd);
        document.getElementById('inheritanceSats').textContent = formatSats(2500 * satsPerUsd);
        document.getElementById('retainerSats').textContent = formatSats(1000 * satsPerUsd);
        document.getElementById('btcPaySats').textContent = formatSats(2000 * satsPerUsd);
        document.getElementById('lightningSats').textContent = formatSats(3000 * satsPerUsd);
        document.getElementById('auditSats').textContent = formatSats(1500 * satsPerUsd);
        document.getElementById('trainingSats').textContent = formatSats(500 * satsPerUsd);
        document.getElementById('asicSats').textContent = formatSats(500 * satsPerUsd);
        document.getElementById('miningWalkthroughSats').textContent = formatSats(1500 * satsPerUsd);
        document.getElementById('colocationSats').textContent = formatSats(500 * satsPerUsd);
        document.getElementById('customDevSats').textContent = formatSats(500 * satsPerUsd);
    } catch (error) {
        console.error('Error fetching Bitcoin price:', error);
        // Leave spans empty on error for graceful degradation
        document.querySelectorAll('span[id$="Sats"]').forEach(span => span.textContent = '');
        document.getElementById('btcPrice').textContent = 'unavailable';
    }
}

document.getElementById('btcPrice').textContent = '???';

// Call on page load
updatePrices();
// setInterval(updatePrices, 300_000); // Commented out to disable periodic refresh
</script>





