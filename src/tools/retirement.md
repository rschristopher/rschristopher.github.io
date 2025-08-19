# Retirement Calculator: Bitcoin Edition
This tool helps you plan your retirement using Bitcoin, showing when you can retire based on your savings, DCA, and growth estimates.
Bitcoin offers a path to financial independence, free from inflationary fiat systems. Hold your keys, secure your future.
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
        margin: 20px 0;
    }
</style>
!!! success "Current BTCUSD: <span id="btcPrice">???</span>"
<form id="calcForm" class="input-container">
    <div class="input-group">
        <div class="input-wrapper">
            <input type="number" id="age" value="35" step="1" min="18" required aria-label="Age">
            <span class="unit">yr</span>
        </div>
        <label for="age">Age:</label>
        <span class="formatted-value" id="ageFormatted">35</span>
    </div>
   
    <div class="input-group">
        <div class="input-wrapper">
            <input type="number" id="lifeExpectancy" value="97" step="1" min="19" required aria-label="Life Expectancy">
            <span class="unit">yr</span>
        </div>
        <label for="lifeExpectancy">Life Expectancy:</label>
        <span class="formatted-value" id="lifeExpectancyFormatted">97</span>
    </div>
   
    <div class="input-group">
        <div class="input-wrapper">
            <input type="number" id="initial" value="0.25" step="0.01" min="0" required aria-label="Initial">
            <span class="unit">₿</span>
        </div>
        <label for="initial">Initial:</label>
        <span class="formatted-value" id="initialFormatted">0.25 ₿</span>
    </div>
   
    <div class="input-group">
        <div class="input-wrapper">
            <input type="number" id="dca" value="30" step="1" min="0" required aria-label="DCA Amount">
            <span class="unit">$</span>
        </div>
        <label for="dca">DCA Amount:</label>
        <span class="formatted-value" id="dcaFormatted">$30</span>
    </div>
   
    <div class="input-group">
        <div class="input-wrapper">
            <input type="number" id="cagr" value="20" step="0.1" min="1" required aria-label="BTCUSD CAGR">
            <span class="unit">%</span>
        </div>
        <label for="cagr">BTCUSD CAGR:</label>
        <span class="formatted-value" id="cagrFormatted">20%</span>
    </div>
   
    <div class="input-group">
        <div class="input-wrapper">
            <input type="number" id="inflation" value="2" step="0.1" min="0" required aria-label="Fiat Inflation">
            <span class="unit">%</span>
        </div>
        <label for="inflation">Fiat Inflation:</label>
        <span class="formatted-value" id="inflationFormatted">2%</span>
    </div>
   
    <div class="input-group">
        <div class="input-wrapper">
            <input type="number" id="monthlyIncome" value="12000" step="100" min="1" required aria-label="Monthly Retirement Income">
            <span class="unit">$</span>
        </div>
        <label for="monthlyIncome">Monthly Retirement Income:</label>
        <span class="formatted-value" id="monthlyIncomeFormatted">$12,000</span>
    </div>
</form>
<div id="error" aria-live="polite"></div>
<div id="results"></div>
<div id="retirement_page" style="display:none;"></div>


