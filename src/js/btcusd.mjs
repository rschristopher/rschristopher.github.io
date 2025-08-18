export const apiFetchers = [
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

async function internalFetchBitcoinPrice() {
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

let fetchingPromise = null;

export async function getBitcoinPrice() {
    const cacheKeyPrice = 'btcPriceCache';
    const cacheKeyTimestamp = 'btcPriceTimestamp';
    const cacheDurationMs = 5 * 60 * 1000; // 5 minutes

    // Check for valid cache
    const cachedPrice = sessionStorage.getItem(cacheKeyPrice);
    const cachedTimestamp = sessionStorage.getItem(cacheKeyTimestamp);
    if (cachedPrice && cachedTimestamp) {
        const ageMs = Date.now() - parseInt(cachedTimestamp, 10);
        if (ageMs < cacheDurationMs) {
            console.log(`Using cached BTC price: $${parseFloat(cachedPrice).toFixed(2)} (age: ${Math.floor(ageMs / 1000)} seconds)`);
            return parseFloat(cachedPrice);
        } else {
            console.log('BTC price cache is stale; fetching fresh data.');
        }
    } else {
        console.log('No BTC price cache found; fetching fresh data.');
    }

    // Guard against concurrent fetches
    if (!fetchingPromise) {
        fetchingPromise = internalFetchBitcoinPrice()
            .then(averagePrice => {
                // Cache the new price and timestamp
                sessionStorage.setItem(cacheKeyPrice, averagePrice.toString());
                sessionStorage.setItem(cacheKeyTimestamp, Date.now().toString());
                fetchingPromise = null; // Reset for future fetches
                return averagePrice;
            })
            .catch(error => {
                fetchingPromise = null; // Reset on error
                throw error;
            });
    }
    return fetchingPromise;
}

export function formatSats(sats) {
    // Round to nearest 10,000
    const roundedSats = Math.round(sats / 10000) * 10000;
    if (roundedSats < 1000000) {
        // Display in thousands (e.g., 892,000 sats -> "892K")
        return `(${Math.round(roundedSats / 1000)}K sats)`;
    }
    // Display in millions (e.g., 2,680,000 sats -> "2.68M")
    return `(${(roundedSats / 1000000).toFixed(2)}M sats)`;
}

// Background refresh every 5 min to keep cache fresh (runs site-wide, but only fetches if stale)
//setInterval(async () => {
//    await getBitcoinPrice();  // This will check cache and fetch only if needed
//}, 300000);

