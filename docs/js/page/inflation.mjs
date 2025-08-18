// Data
const data = {
    cpi: {1960:29.6,1961:29.9,1962:30.2,1963:30.6,1964:31.0,1965:31.5,1966:32.4,1967:33.4,1968:34.8,1969:36.7,1970:38.8,1971:40.5,1972:41.8,1973:44.4,1974:49.3,1975:53.8,1976:56.9,1977:60.6,1978:65.2,1979:72.6,1980:82.4,1981:90.9,1982:96.5,1983:99.6,1984:103.9,1985:107.6,1986:109.6,1987:113.6,1988:118.3,1989:124.0,1990:130.7,1991:136.2,1992:140.3,1993:144.5,1994:148.2,1995:152.4,1996:156.9,1997:160.5,1998:163.0,1999:166.6,2000:172.2,2001:177.1,2002:179.9,2003:184.0,2004:188.9,2005:195.3,2006:201.6,2007:207.3,2008:215.303,2009:214.537,2010:218.056,2011:224.939,2012:229.594,2013:232.957,2014:236.736,2015:237.017,2016:240.007,2017:245.120,2018:251.107,2019:255.657,2020:258.811,2021:270.970,2022:292.655,2023:304.702,2024:313.689,2025:323.05},
    gold: {1960:35.27,1961:35.25,1962:35.25,1963:35.25,1964:35.35,1965:35.12,1966:35.14,1967:35.15,1968:41.74,1969:41.09,1970:35.94,1971:40.8,1972:58.16,1973:97.32,1974:159.26,1975:161.02,1976:124.84,1977:147.71,1978:193.22,1979:306.68,1980:612.56,1981:459.94,1982:375.67,1983:424.35,1984:360.48,1985:317.26,1986:367.66,1987:446.46,1988:436.94,1989:381.44,1990:383.51,1991:362.11,1992:343.82,1993:359.77,1994:384.0,1995:384.17,1996:387.81,1997:331.02,1998:294.24,1999:278.98,2000:279.11,2001:271.04,2002:309.73,2003:363.38,2004:409.72,2005:444.74,2006:603.46,2007:695.39,2008:871.96,2009:972.35,2010:1224.53,2011:1571.52,2012:1668.98,2013:1411.23,2014:1266.4,2015:1160.06,2016:1250.8,2017:1257.12,2018:1269.23,2019:1392.5,2020:1770.25,2021:1799.63,2022:1800.09,2023:1943.05,2024:2389,2025:3351},
    sp500: {1960:58.03,1961:59.72,1962:69.07,1963:65.06,1964:76.45,1965:86.12,1966:93.32,1967:84.45,1968:95.04,1969:102.00,1970:90.31,1971:93.49,1972:103.30,1973:118.40,1974:96.11,1975:72.56,1976:96.86,1977:103.80,1978:90.25,1979:99.71,1980:110.90,1981:133.00,1982:117.30,1983:144.30,1984:166.40,1985:171.60,1986:208.20,1987:264.50,1988:250.50,1989:285.40,1990:339.97,1991:325.49,1992:416.08,1993:435.23,1994:472.99,1995:465.25,1996:614.42,1997:766.22,1998:963.36,1999:1248.77,2000:1425.59,2001:1335.63,2002:1140.21,2003:895.84,2004:1132.52,2005:1181.41,2006:1278.73,2007:1424.16,2008:1378.76,2009:865.58,2010:1123.58,2011:1282.62,2012:1300.58,2013:1480.40,2014:1822.36,2015:2028.18,2016:1918.60,2017:2275.12,2018:2789.80,2019:2607.39,2020:3278.20,2021:4573.82,2022:4396.64,2023:3960.66,2024:4804.49,2025:6373},
    sfh: {1960:19256.21,1961:19340.20,1962:19508.20,1963:19802.18,1964:20075.17,1965:20264.17,1966:20663.15,1967:20852.14,1968:21666.11,1969:22742.06,1970:24757.98,1971:26269.92,1972:27508.87,1973:27550.86,1974:29755.77,1975:32169.16,1976:34395.51,1977:38234.56,1978:43673.64,1979:50733.03,1980:56388.91,1981:60156.96,1982:62037.18,1983:63317.71,1984:66219.82,1985:69604.98,1986:75419.34,1987:82402.66,1988:88493.41,1989:94927.75,1990:97676.45,1991:96756.66,1992:98890.36,1993:101273.95,1994:104810.90,1995:107290.61,1996:110760.28,1997:113634.05,1998:118526.18,1999:125580.85,2000:134009.94,2001:143400.15,2002:152761.53,2003:164391.16,2004:178875.35,2005:197992.16,2006:213514.36,2007:217108.98,2008:200981.27,2009:184622.89,2010:181902.90,2011:174060.10,2012:174704.05,2013:186670.09,2014:196588.92,2015:206526.97,2016:218060.49,2017:231891.11,2018:246481.02,2019:258927.61,2020:274507.48,2021:317729.36,2022:375464.26,2023:386651.78,2024:416418,2025:422000}
};

// Global chart and slider variables
let chart = null;
let debasementChart = null;
let yearRangeSlider = null;

// Helpers
const formatAmount = n => (isFinite(n) && n !== null) ? Intl.NumberFormat().format(Math.round(n)) : '—';
const calcDebasement = (startVal, finalVal) => {
    if (!isFinite(startVal) || !isFinite(finalVal) || finalVal === 0 || startVal <= 0) return '—';
    const pct = (1 - (startVal / finalVal)) * 100;
    return `${Math.round(pct)}% ↘`;
};
const calcMaxDebasement = (startYear, endYear, startingPrice) => {
    const cpiAdjusted = startingPrice && data.cpi[startYear] ? startingPrice * (data.cpi[endYear] / data.cpi[startYear]) : 0;
    const sfhValue = startingPrice && data.sfh[startYear] ? (data.sfh[endYear] / data.sfh[startYear]) * startingPrice : 0;
    const goldValue = startingPrice && data.gold[startYear] ? (data.gold[endYear] / data.gold[startYear]) * startingPrice : 0;
    const sp500Value = startingPrice && data.sp500[startYear] ? (data.sp500[endYear] / data.sp500[startYear]) * startingPrice : 0;
    const debasements = [
        cpiAdjusted ? (1 - startingPrice / cpiAdjusted) * 100 : 0,
        sfhValue ? (1 - startingPrice / sfhValue) * 100 : 0,
        goldValue ? (1 - startingPrice / goldValue) * 100 : 0,
        sp500Value ? (1 - startingPrice / sp500Value) * 100 : 0
    ].filter(pct => isFinite(pct) && pct > 0);
    return debasements.length ? Math.max(...debasements) : 0;
};

// Main initialization function
function initializeInflationPage() {
    const inflationPage = document.getElementById('inflation_page');
    if (!inflationPage) return; // Guard: exit if not on inflation page

    const assetSelect = document.getElementById('asset-select');
    const startingPriceInput = document.getElementById('starting-price');
    const resultsDiv = document.getElementById('results');
    const chartCanvas = document.getElementById('inflation-chart');
    const debasementChartCanvas = document.getElementById('debasement-chart');
    const yearRangeText = document.getElementById('year-range-text');
    const priceLabel = document.getElementById('price-label');
    const yearRangeSliderElement = document.getElementById('year-range-slider');

    // Guard: exit if any critical DOM element is missing
    if (!assetSelect || !startingPriceInput || !resultsDiv || !chartCanvas || !debasementChartCanvas || !yearRangeText || !priceLabel || !yearRangeSliderElement) {
        console.log('Missing required DOM elements on inflation page');
        return;
    }

    const chartCtx = chartCanvas.getContext('2d');
    const debasementChartCtx = debasementChartCanvas.getContext('2d');
    if (!chartCtx || !debasementChartCtx) {
        console.log('Failed to get canvas context');
        return;
    }

    // Main calculation & render
    const calculateResults = (startYear, endYear) => {
        console.log('calculateResults called with:', { startYear, endYear });
        const startingPrice = parseFloat(startingPriceInput.value) || 0;
        const cpiAdjusted = startingPrice && data.cpi[startYear] ? startingPrice * (data.cpi[endYear] / data.cpi[startYear]) : 0;
        const sfhValue = startingPrice && data.sfh[startYear] ? (data.sfh[endYear] / data.sfh[startYear]) * startingPrice : 0;
        const goldValue = startingPrice && data.gold[startYear] ? (data.gold[endYear] / data.gold[startYear]) * startingPrice : 0;
        const sp500Value = startingPrice && data.sp500[startYear] ? (data.sp500[endYear] / data.sp500[startYear]) * startingPrice : 0;
        const cpiDebasement = startingPrice && cpiAdjusted ? Math.round((1 - startingPrice / cpiAdjusted) * 100) : 0;
        const maxDebasement = Math.round(calcMaxDebasement(startYear, endYear, startingPrice));
        priceLabel.textContent = `Reference Asset Price in ${startYear}: $${formatAmount(startingPrice)}`;
        resultsDiv.innerHTML = `
            <p class="persuasive">From ${startYear} to ${endYear} the official CPI reports claim ${cpiDebasement}% debasement of your wealth, however, the real loss in purchasing power is closer to ${maxDebasement}%. Fiat USD has silently eroded your savings, siphoning value into the hands of central banks and governments. Hard assets like gold and Bitcoin offer a shield against this relentless theft, preserving your wealth in a system designed to devalue it.</p>
            <p><strong>CPI Adjusted:</strong> $${formatAmount(cpiAdjusted)} <small>(${calcDebasement(startingPrice, cpiAdjusted)})</small></p>
            <p><strong>Single Family Home:</strong> $${formatAmount(sfhValue)} <small>(${calcDebasement(startingPrice, sfhValue)})</small></p>
            <p><strong>Gold:</strong> $${formatAmount(goldValue)} <small>(${calcDebasement(startingPrice, goldValue)})</small></p>
            <p><strong>S&P 500:</strong> $${formatAmount(sp500Value)} <small>(${calcDebasement(startingPrice, sp500Value)})</small></p>
        `;
    };

    // Update value chart
    const updateValueChart = (startYear, endYear) => {
        const startingPrice = parseFloat(startingPriceInput.value) || 0;
        const years = Object.keys(data.cpi).map(Number).filter(y => y >= startYear && y <= endYear);
        const cpiData = years.map(y => (data.cpi[y] / data.cpi[startYear]) * startingPrice);
        const goldData = years.map(y => (data.gold[y] / data.gold[startYear]) * startingPrice);
        const sfhData = years.map(y => (data.sfh[y] / data.sfh[startYear]) * startingPrice);
        const sp500Data = years.map(y => (data.sp500[y] / data.sp500[startYear]) * startingPrice);
        if (chart) chart.destroy();
        chart = new Chart(chartCtx, {
            type: 'line',
            data: {
                labels: years,
                datasets: [
                    { label: 'CPI Adjusted', data: cpiData, fill: true },
                    { label: 'Single Family Home', data: sfhData, fill: true },
                    { label: 'Gold', data: goldData, fill: true },
                    { label: 'S&P 500', data: sp500Data, fill: true }
                ]
            },
            options: {
                responsive: true,
                scales: {
                    x: { title: { display: true, text: 'Year' } },
                    y: {
                        title: { display: true, text: 'Value ($)' },
                        beginAtZero: false
                    }
                },
                plugins: {
                    legend: { display: window.innerWidth > 767, position: 'top' }
                }
            }
        });
    };

    // Update debasement chart (purchasing power %)
    const updateDebasementChart = (startYear, endYear) => {
        const years = Object.keys(data.cpi).map(Number).filter(y => y >= startYear && y <= endYear);
        const worstCaseData = years.map(y => {
            const cpi = (data.cpi[startYear] / data.cpi[y]) * 100;
            const gold = (data.gold[startYear] / data.gold[y]) * 100;
            const sfh = (data.sfh[startYear] / data.sfh[y]) * 100;
            const sp500 = (data.sp500[startYear] / data.sp500[y]) * 100;
            return Math.min(cpi, gold, sfh, sp500);
        });
        if (debasementChart) debasementChart.destroy();
        debasementChart = new Chart(debasementChartCtx, {
            type: 'line',
            data: {
                labels: years,
                datasets: [
                    {
                        label: 'Actual Fiat Purchasing Power',
                        data: worstCaseData,
                        fill: true,
                        borderColor: '#28a745',
                        backgroundColor: 'rgba(40, 167, 69, 0.2)'
                    }
                ]
            },
            options: {
                responsive: true,
                scales: {
                    x: { title: { display: true, text: 'Year' } },
                    y: {
                        title: { display: true, text: 'Purchasing Power (%)' },
                        beginAtZero: false,
                        max: 100,
                        min: 0
                    }
                },
                plugins: {
                    legend: { position: 'top' }
                }
            }
        });
    };

    // Update URL query params
    const updateQueryParams = (startYear, endYear) => {
        const params = new URLSearchParams();
        params.set('start', startYear);
        params.set('end', endYear);
        params.set('ref', assetSelect.value);
        params.set('refprice', parseFloat(startingPriceInput.value).toFixed(2));
        history.replaceState(null, '', `?${params.toString()}`);
        console.log('Query params updated:', params.toString());
    };

    // Load from query params
    function loadFromQueryParams() {
        console.log('loadFromQueryParams called');
        const params = new URLSearchParams(window.location.search);
        console.log('Parsed params object:', Object.fromEntries(params));
        const start = parseInt(params.get('start'), 10) || 1960;
        const end = parseInt(params.get('end'), 10) || 2025;
        const ref = params.get('ref') || 'cash';
        const refprice = parseFloat(params.get('refprice')) || (ref === 'cash' ? 100 : (data[ref][start] || 0));
        console.log('Validated params:', { start, end, ref, refprice });

        if (yearRangeSliderElement && window.noUiSlider) {
            yearRangeSlider = window.noUiSlider.create(yearRangeSliderElement, {
                start: [start, end],
                connect: true,
                step: 1,
                range: {
                    'min': 1960,
                    'max': 2025
                },
                behaviour: 'drag',
                tooltips: true,
                format: {
                    to: value => Math.round(value).toString(),
                    from: value => parseInt(value)
                }
            });
        } else {
            console.log('noUiSlider or slider element missing, skipping slider creation');
            return;
        }

        assetSelect.value = ref;
        startingPriceInput.value = refprice.toFixed(2);
        yearRangeText.textContent = `${start} - ${end}`;
        priceLabel.textContent = `Reference Asset Price in ${start}: $${formatAmount(refprice)}`;
        calculateResults(start, end);
        updateValueChart(start, end);
        updateDebasementChart(start, end);

        // Slider update listener
        yearRangeSlider.on('update', function (values) {
            const [startYear, endYear] = values.map(Number);
            console.log('Slider updated:', { startYear, endYear });
            if (startYear >= endYear) {
                yearRangeSlider.set([startYear, startYear + 1]);
                console.log('Adjusted endYear to:', startYear + 1);
                return;
            }
            yearRangeText.textContent = `${startYear} - ${endYear}`;
            const selectedAsset = assetSelect.value;
            startingPriceInput.value = selectedAsset === 'cash' ? '100.00' : (data[selectedAsset][startYear] || 0).toFixed(2);
            calculateResults(startYear, endYear);
            updateValueChart(startYear, endYear);
            updateDebasementChart(startYear, endYear);
            updateQueryParams(startYear, endYear);
        });
    }

    // Add event listeners
    assetSelect.addEventListener('change', () => {
        const [startYear, endYear] = yearRangeSlider.get().map(Number);
        const selectedAsset = assetSelect.value;
        startingPriceInput.value = selectedAsset === 'cash' ? '100.00' : (data[selectedAsset][startYear] || 0).toFixed(2);
        calculateResults(startYear, endYear);
        updateValueChart(startYear, endYear);
        updateDebasementChart(startYear, endYear);
        updateQueryParams(startYear, endYear);
    });

    startingPriceInput.addEventListener('input', () => {
        const [startYear, endYear] = yearRangeSlider.get().map(Number);
        calculateResults(startYear, endYear);
        updateValueChart(startYear, endYear);
        updateDebasementChart(startYear, endYear);
        updateQueryParams(startYear, endYear);
    });

    loadFromQueryParams();
}

// Handle page navigation and query parameter changes
function handlePageChange() {
    if (document.getElementById('inflation_page')) {
        if (chart) chart.destroy();
        if (debasementChart) debasementChart.destroy();
        if (yearRangeSlider) yearRangeSlider.destroy();
        initializeInflationPage();
    }
}

// Run on initial load and every instant navigation change
document$.subscribe(handlePageChange);

// Handle same-page query parameter changes
window.addEventListener('popstate', handlePageChange);

