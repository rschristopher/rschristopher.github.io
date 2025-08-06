# Sovereign Hashrate Calculator

This tool calculates the hashrate, power, and estimated number of miners needed to achieve a target number of Bitcoin blocks mined over a specified time period. 
Enter the target blocks, select the time interval, provide the expected network hashrate, your miner's hashrate, and efficiency to see the results update automatically.


<div class="hashrate-calculator-container">
    <div class="input-pair">
        <label for="blocks">Target blocks per:</label>
        <div class="input-group">
            <input type="number" id="blocks" value="1" min="1" oninput="calculateHashrate()" />
            <select id="interval" onchange="calculateHashrate()">
                <option value="day">Day</option>
                <option value="week">Week</option>
                <option value="month">Month</option>
                <option value="year">Year</option>
            </select>
        </div>
    </div>
    <div class="input-pair">
        <label for="networkHashrate">Expected network hashrate:</label>
        <div class="input-group">
            <input type="number" id="networkHashrate" value="1000" step="10" min="1" oninput="calculateHashrate()" />
            <span class="unit">EH/s</span>
        </div>
    </div>
    <div class="input-pair">
        <label for="minerHashrate">Miner hashrate:</label>
        <div class="input-group">
            <input type="number" id="minerHashrate" value="200" step="1" min="1" oninput="calculateHashrate()" />
            <span class="unit">TH/s</span>
        </div>
    </div>
    <div class="input-pair">
        <label for="efficiency">Efficiency:</label>
        <div class="input-group">
            <input type="number" id="efficiency" value="18" step="0.1" min="1" oninput="calculateHashrate()" />
            <span class="unit">J/TH</span>
        </div>
    </div>
    <div id="results"></div>
</div>

<style>
.hashrate-calculator-container {
    padding: 20px;
    background-color: var(--md-default-bg-color);
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    border: 1px solid var(--md-default-fg-color--light);
}
.hashrate-calculator-container .input-pair {
    display: flex;
    align-items: center;
    margin-bottom: 15px;
}
.hashrate-calculator-container label {
    text-align: right;
    width: 250px;
    margin-right: 10px;
    white-space: nowrap;
}
.hashrate-calculator-container .input-group {
    display: flex;
    align-items: center;
    gap: 10px;
}
.hashrate-calculator-container input,
.hashrate-calculator-container select {
    padding: 8px;
    border: 1px solid var(--md-default-fg-color--light);
    border-radius: 4px;
    font-size: 16px;
}
.hashrate-calculator-container input[type="number"] {
    width: 100px;
}
.hashrate-calculator-container .unit {
    font-weight: bold;
}
.hashrate-calculator-container #results {
    margin-top: 1em;
    background-color: var(--md-code-bg-color);
    padding: 10px;
    border-radius: 4px;
}
</style>

<script>
function calculateHashrate() {
  const blocks = parseFloat(document.getElementById('blocks').value);
  const interval = document.getElementById('interval').value;
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
  document.getElementById('results').innerHTML = `
    <p><strong>Required Hashrate:</strong> ${requiredHashrateEH.toFixed(3)} EH/s</p>
    <p><strong>Estimated Power Required:</strong> ${totalMW.toFixed(2)} MW</p>
    <p><strong>Miners Needed:</strong> ${Math.ceil(totalMiners).toLocaleString()}</p>
    <p><small>Based on ${minerTHs} TH/s @ ${efficiency} J/TH per miner.</small></p>
  `;
}
window.onload = calculateHashrate;
</script>



















