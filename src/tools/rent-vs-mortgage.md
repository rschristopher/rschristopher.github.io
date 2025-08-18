# Rent vs Mortgage: Bitcoin Edition
Rent vs Buy calculators are very misleading (filled with fiat-minded assumptions), and are especially useless as we return to sound money. For example, most online "Rent vs Buy" calculators don't allow a high "savings" rate. Bitcoin's historic (and likely future) CAGR is disruptive to these fiat models.
Fortunately, Bitcoin can help us make sensible decisions with respect to home ownership.
This tool compares rent versus mortgage, with a simple goal of maximizing wealth thru Bitcoin. You'll find that with assumptions like 2% inflation, it's rarely better to buy than rent. But there other scenarios where a mortgage can help you to stack more sats (such as high inflation, low interest rates, high rents, etc).
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
        max-width: 600px;
        height: 300px;
        margin: 20px 0;
    }
    .section-header {
        font-size: 1.1em;
        font-weight: bold;
        color: var(--md-default-fg-color--dark);
        margin-bottom: 10px;
        margin-top: 20px;
        display: flex;
        align-items: center;
        text-align: center;
        width: 100%;
    }
    .section-header::before,
    .section-header::after {
        content: '';
        flex: 1;
        border-bottom: 1px solid var(--md-default-fg-color--light);
    }
    .section-header::before {
        margin-right: 0.5em;
    }
    .section-header::after {
        margin-left: 0.5em;
    }
</style>
!!! success "Current BTCUSD: <span id="btcPrice">???</span>"
<form id="calcForm" class="input-container">
    <div class="input-group">
        <div class="input-wrapper">
            <input type="number" id="monthlyRent" value="2800" step="100" min="0" required aria-label="Monthly Rent">
            <span class="unit">$</span>
        </div>
        <label for="monthlyRent">Monthly Rent:</label>
        <span class="formatted-value" id="monthlyRentFormatted">$2,800</span>
    </div>
   
    <div class="section-header">vs Mortgage</div>
    <div class="input-group">
        <div class="input-wrapper">
            <input type="number" id="homePrice" value="450000" step="1000" min="10000" required aria-label="Home Price">
            <span class="unit">$</span>
        </div>
        <label for="homePrice">Home Price:</label>
        <span class="formatted-value" id="homePriceFormatted">$450,000</span>
    </div>
   
    <div class="input-group">
        <div class="input-wrapper">
            <input type="number" id="downPayment" value="3" step="0.1" min="0" max="100" required aria-label="Down Payment">
            <span class="unit">%</span>
        </div>
        <label for="downPayment">Down Payment:</label>
        <span class="formatted-value" id="downPaymentFormatted">3%</span>
    </div>
   
    <div class="input-group">
        <div class="input-wrapper">
            <input type="number" id="pmiRate" value="0.50" step="0.1" min="0" required aria-label="PMI Rate">
            <span class="unit">%</span>
        </div>
        <label for="pmiRate">PMI Rate:</label>
        <span class="formatted-value" id="pmiRateFormatted">0.50%</span>
    </div>
   
    <div class="input-group">
        <div class="input-wrapper">
            <input type="number" id="mortgageRate" value="6.50" step="0.1" min="0" required aria-label="Mortgage Rate">
            <span class="unit">%</span>
        </div>
        <label for="mortgageRate">Mortgage Rate:</label>
        <span class="formatted-value" id="mortgageRateFormatted">6.50%</span>
    </div>
   
    <div class="input-group">
        <div class="input-wrapper">
            <input type="number" id="loanTerm" value="30" step="1" min="1" required aria-label="Loan Term">
            <span class="unit">yr</span>
        </div>
        <label for="loanTerm">Loan Term:</label>
        <span class="formatted-value" id="loanTermFormatted">30</span>
    </div>
   
    <div class="section-header">Ownership Costs</div>
    <div class="input-group">
        <div class="input-wrapper">
            <input type="number" id="propertyTax" value="1.25" step="0.01" min="0" required aria-label="Property Tax">
            <span class="unit">%</span>
        </div>
        <label for="propertyTax">Property Tax:</label>
        <span class="formatted-value" id="propertyTaxFormatted">1.25%</span>
    </div>
   
    <div class="input-group">
        <div class="input-wrapper">
            <input type="number" id="homeInsurance" value="1500" step="100" min="0" required aria-label="Home Insurance">
            <span class="unit">$</span>
        </div>
        <label for="homeInsurance">Home Insurance:</label>
        <span class="formatted-value" id="homeInsuranceFormatted">$1,500</span>
    </div>
   
    <div class="input-group">
        <div class="input-wrapper">
            <input type="number" id="maintenance" value="1" step="0.1" min="0" required aria-label="Maintenance">
            <span class="unit">%</span>
        </div>
        <label for="maintenance">Maintenance:</label>
        <span class="formatted-value" id="maintenanceFormatted">1%</span>
    </div>
    <div class="section-header">Economic Assumptions</div>
    <div class="input-group">
        <div class="input-wrapper">
            <input type="number" id="fiatInflation" value="2" step="0.1" min="0" required aria-label="Fiat Inflation">
            <span class="unit">%</span>
        </div>
        <label for="fiatInflation">Fiat Inflation:</label>
        <span class="formatted-value" id="fiatInflationFormatted">2%</span>
    </div>
   
    <div class="input-group">
        <div class="input-wrapper">
            <input type="number" id="btcCagr" value="20" step="0.1" min="1" required aria-label="BTCUSD CAGR">
            <span class="unit">%</span>
        </div>
        <label for="btcCagr">BTCUSD CAGR:</label>
        <span class="formatted-value" id="btcCagrFormatted">20%</span>
    </div>
   
</form>
<div id="error" aria-live="polite"></div>
<div id="results"></div>
<div id="rent_vs_mortgage_page" style="display:none;"></div>













