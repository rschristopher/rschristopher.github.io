<!-- 
Lord Jesus Christ, Son of God
Have mercy on me, a sinner
-->
# Sovereign Hashrate Planner

This tool calculates the hashrate, power, and estimated number of miners needed to achieve a target number of Bitcoin blocks mined over a specified time period.
Secure your sovereignty -- break free from centralized pools and mine blocks on your own terms.

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
        width: auto;
    }
    .input-wrapper:hover {
        border-color: var(--md-primary-fg-color--light);
    }
    .input-wrapper:focus-within {
        border-color: var(--md-primary-fg-color);
        box-shadow: 0 0 5px rgba(var(--md-primary-fg-color--rgb), 0.3);
    }
    input[type="number"] {
        width: 70px;
        padding: 6px;
        border: none;
        font-size: 0.9em;
        color: var(--md-default-fg-color);
        outline: none;
        border-radius: 4px 0 0 4px;
        flex: none;
    }
    select {
        padding: 6px;
        border: none;
        font-size: 0.9em;
        color: var(--md-default-fg-color);
        outline: none;
        background: var(--md-default-bg-color);
        border-radius: 0 4px 4px 0;
        flex: none;
        width: 80px;
    }
    .unit {
        padding: 0 6px;
        font-size: 0.9em;
        color: var(--md-default-fg-color);
        pointer-events: none;
        border-left: 1px solid var(--md-default-fg-color--light);
        background: var(--md-default-bg-color);
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 0 4px 4px 0;
        flex: none;
        width: 50px;
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
</style>

<form id="calcForm" class="input-container">
    <div class="input-group">
        <div class="input-wrapper">
            <input type="number" id="blocks" value="1" min="1" required aria-label="Blocks">
            <select id="interval" aria-label="Interval">
                <option value="day">Day</option>
                <option value="week">Week</option>
                <option value="month">Month</option>
                <option value="year">Year</option>
            </select>
        </div>
        <label for="blocks">:</label>
        <span class="formatted-value" id="blocksFormatted">1 day</span>
    </div>

    <hr />
    
    <div class="input-group">
        <div class="input-wrapper">
            <input type="number" id="networkHashrate" value="1000" step="10" min="10" required aria-label="Network Hashrate">
            <span class="unit">EH/s</span>
        </div>
        <label for="networkHashrate">Global HR:</label>
        <span class="formatted-value" id="networkHashrateFormatted">1000 EH/s</span>
    </div>
    
    <div class="input-group">
        <div class="input-wrapper">
            <input type="number" id="minerHashrate" value="200" step="1" min="1" required aria-label="Miner Hashrate">
            <span class="unit">TH/s</span>
        </div>
        <label for="minerHashrate">Miner HR:</label>
        <span class="formatted-value" id="minerHashrateFormatted">200 TH/s</span>
    </div>
    
    <div class="input-group">
        <div class="input-wrapper">
            <input type="number" id="efficiency" value="18" step="0.1" min="1" required aria-label="Efficiency">
            <span class="unit">J/TH</span>
        </div>
        <label for="efficiency">Efficiency:</label>
        <span class="formatted-value" id="efficiencyFormatted">18 J/TH</span>
    </div>
</form>

<div id="results"></div>

<script>
    // Format values
    function formatValue(value, unit) {
        const num = parseFloat(value);
        return num.toLocaleString('en-US', {minimumFractionDigits: Number.isInteger(num) ? 0 : 1, maximumFractionDigits: Number.isInteger(num) ? 0 : 1}) + ' ' + unit;
    }

    // Update formatted values next to inputs
    function updateFormattedValues() {
        const blocks = document.getElementById('blocks').value;
        const interval = document.getElementById('interval').options[document.getElementById('interval').selectedIndex].text.toLowerCase();
        const blockWord = blocks == 1 ? "block" : "blocks";
        document.getElementById('blocksFormatted').textContent = `${blocks} ${blockWord} per ${interval}`;
        
        const networkHashrate = document.getElementById('networkHashrate').value;
        document.getElementById('networkHashrateFormatted').textContent = formatValue(networkHashrate, 'EH/s');
        
        const minerHashrate = document.getElementById('minerHashrate').value;
        document.getElementById('minerHashrateFormatted').textContent = formatValue(minerHashrate, 'TH/s');
        
        const efficiency = document.getElementById('efficiency').value;
        document.getElementById('efficiencyFormatted').textContent = formatValue(efficiency, 'J/TH');
    }

    function calculateHashrate() {
        const blocks = parseFloat(document.getElementById('blocks').value);
        const intervalSelect = document.getElementById('interval');
        const interval = intervalSelect.options[intervalSelect.selectedIndex].text.toLowerCase();
        const networkHashrateEH = parseFloat(document.getElementById('networkHashrate').value);
        const minerTHs = parseFloat(document.getElementById('minerHashrate').value);
        const efficiency = parseFloat(document.getElementById('efficiency').value);
        const secondsPerBlock = 600;
        const intervalSeconds = {
            day: 86400,
            week: 604800,
            month: 2629746,
            year: 31556952
        };
        const totalTime = intervalSeconds[interval];
        const desiredBlocksPerSecond = blocks / totalTime;
        const baselineBlockRate = 1 / secondsPerBlock;
        const networkHashrateH = networkHashrateEH * 1e18;
        const requiredHashrateH = (desiredBlocksPerSecond / baselineBlockRate) * networkHashrateH;
        const requiredHashrateEH = requiredHashrateH / 1e18;
        const minerH = minerTHs * 1e12;
        const wattsPerMiner = minerTHs * efficiency;
        const totalMiners = requiredHashrateH / minerH;
        const totalWatts = totalMiners * wattsPerMiner;
        const totalMW = totalWatts / 1e6;

        const blockWord = blocks === 1 ? "block" : "blocks";

        const resultsDiv = document.getElementById('results');
        resultsDiv.innerHTML = `
            <div class="summary">
                <p>Required Hashrate: ${requiredHashrateEH.toFixed(3)} EH/s</p>
                <p>Estimated Power Required: ${totalMW.toFixed(2)} MW</p>
                <p>Miners Needed: ${Math.ceil(totalMiners).toLocaleString()} <small>(average ${minerTHs} TH/s @ ${efficiency} J/TH)</small></p>
            </div>
            <div class="text">
                <p>To secure ${blocks} ${blockWord} per-${interval} in a network of ${networkHashrateEH} EH/s, you will need to deploy ${Math.ceil(totalMiners).toLocaleString()} miners (with an average of ${minerTHs} TH/s and ${efficiency} J/TH efficiency), harnessing ${totalMW.toFixed(0)} MW of power. Embrace true sovereignty by mining independently, settling your own transactions, and fortifying Bitcoin's decentralized future.</p>
            </div>
        `;

        updateFormattedValues();
    }
    
    // Add event listeners to all inputs and select for auto-calculation
    document.querySelectorAll('#calcForm input, #calcForm select').forEach(element => {
        element.addEventListener('input', calculateHashrate);
        element.addEventListener('change', calculateHashrate);
    });
    
    // Initial calculation on page load
    calculateHashrate();
</script>























