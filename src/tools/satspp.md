# Sats Purchasing Power
This tool estimates the future purchasing power of satoshis (sats) for common goods. 
It uses current USD prices from 2025 CPI data and projects future prices in sats based on fiat inflation and BTCUSD growth (CAGR).

Ultimately, the finite supply of Bitcoin will drive prices downward (as an inverse measure of global economic output).
Fiat USD cannot scale the way a fixed and infinitely divisible monetary asset will, and will inevitably implode as all other fiat moneys have.

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
    input[type="number"], input[type="range"] {
        padding: 8px;
        border: none;
        font-size: 1em;
        color: var(--md-default-fg-color);
        outline: none;
    }
    input[type="number"] {
        width: 100px;
        border-radius: 4px 0 0 4px;
    }
    input[type="range"] {
        width: 200px;
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
    #projectedSats {
        font-size: 1em;
        line-height: 1.8;
        color: var(--md-default-fg-color);
    }
    #projectedSats strong {
        color: var(--md-default-fg-color--dark);
    }
</style>
!!! success "Current BTCUSD: <span id="btcPrice">???</span>"
<form id="calcForm" class="input-container">
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
            <input type="number" id="cagr" value="20" step="0.1" min="1" max="100" required aria-label="BTCUSD CAGR">
            <span class="unit">%</span>
        </div>
        <label for="cagr">BTCUSD CAGR:</label>
        <span class="formatted-value" id="cagrFormatted">20%</span>
    </div>
   
    <div class="input-group">
        <div class="input-wrapper">
            <input type="number" id="years" value="1" step="1" min="0" max="100" required aria-label="Years Ahead">
            <span class="unit">yr</span>
        </div>
        <label for="years">Years Ahead:</label>
        <span class="formatted-value" id="yearsFormatted">1</span>
    </div>
</form>
<div id="error" aria-live="polite"></div>
!!! example "Projected BTCUSD: <span id="projectedBtcPrice">???</span>"
    <div id="projectedSats">...</div>
<div id="satspp_page" style="display:none;"></div>

