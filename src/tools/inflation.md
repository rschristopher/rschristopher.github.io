# Actual Inflation Calculator

Inflation is a deeply misunderstood concept. Metrics like CPI obfuscate and in some cases outright hide what is obviously theft. 
The history of civilization settled on gold as money, so the fiat price of gold is particularly telling in just how much debasement we've suffered.

!!! quote "Henry Ford"
    It is well enough that people of the nation do not understand our banking and monetary system, for if they did, I believe there would be a revolution before tomorrow morning.

This tool calculates the real-world impact of inflation by comparing the value of reference assets over time (assets which were monetized). 
You can visualize how purchasing power erodes under fiat currency (most significantly after 1971). 
And you can see how, in the last quarter-century, [gold has outperformed the S&P500](?start=1999&end=2025&ref=gold) -- 
 under fiat, wealth transferred from gold to equities and real-estate, and is now finding it's way back to gold, and inevitably to Bitcoin.

<style>
    .input-container {
        padding: 20px;
        border-radius: 8px;
        background: var(--md-default-bg-color);
        margin-bottom: 20px;
    }
    .input-group {
        display: flex;
        flex-direction: column;
        margin-bottom: 15px;
    }
    .input-group-horizontal {
        display: flex;
        align-items: center;
        gap: 10px;
        flex-wrap: wrap;
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
    select, input[type="number"] {
        padding: 8px;
        border: none;
        font-size: 1em;
        color: var(--md-default-fg-color);
        outline: none;
        border-radius: 4px 0 0 4px;
    }
    select {
        width: 200px;
    }
    input[type="number"] {
        width: 150px;
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
    .input-cointainer label {
        font-size: 1em;
        color: var(--md-default-fg-color);
        margin-bottom: 10px;
        font-weight: bold;
    }
    #year-range-text {
        display: block;
        text-align: center;
        margin: 10px 0;
        font-weight: bold;
        color: var(--md-default-fg-color);
    }
    #year-range-slider {
        margin: 10px 0 20px;
        width: 100%;
    }
    #results strong {
        font-weight: bold;
        color: var(--md-default-fg-color);
    }
    #results small {
        font-size: 0.9em;
        color: var(--md-default-fg-color--light);
    }
    #results p.persuasive strong {
        color: var(--md-default-fg-color--dark);
    }
    #chart-container, #debasement-chart-container {
        margin: 20px 0;
    }
    .noUi-connect {
        background: #F7931A !important;
    }
    .noUi-handle {
        background: #F7931A !important;
        border: 2px solid var(--md-default-bg-color);
        box-shadow: none;
    }
    .noUi-tooltip {
        font-size: 12px;
        background: var(--md-default-fg-color);
        color: var(--md-default-bg-color);
        padding: 2px 6px;
        border-radius: 3px;
    }
</style>

<div class="input-container">
    <div id="chart-container">
        <canvas id="inflation-chart"></canvas>
    </div>
    <div class="input-group">
        <span id="year-range-text"></span>
        <div id="year-range-slider"></div>
    </div>
    <div class="input-group">
        <label id="price-label" for="asset-select">Reference Asset Price in 1960: $0</label>
        <div class="input-group-horizontal">
            <div class="input-wrapper">
                <select id="asset-select">
                    <option value="cash">$100 Bill</option>
                    <option value="gold">1oz Gold</option>
                    <option value="sfh">Single Family Home</option>
                    <option value="sp500">S&P 500 Share</option>
                </select>
            </div>
            <div class="input-wrapper">
                <input type="number" id="starting-price" step="0.01" min="0" value="0">
                <span class="unit">$</span>
            </div>
        </div>
    </div>
</div>

<h2>Fiat Debasement</h2>
<div id="results"></div>
<div id="debasement-chart-container">
    <canvas id="debasement-chart"></canvas>
</div>

<div id="inflation_page" style="display:none;"></div>

