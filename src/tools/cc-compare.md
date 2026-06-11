# Credit Card Comparator

This tool helps you fairly compare premium rewards cards based on your actual expected spending, real earning rates, annual costs, and an honest assessment of the "extra" benefits.

!!! warning "All figures on this page are annual (per year)."

<div id="cc_compare_page" style="display:none;"></div>

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
        margin-bottom: 12px;
        flex-wrap: wrap;
    }
    .formatted-and-label {
        margin-left: 8px;
        white-space: nowrap;
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
    input[type="number"], input[type="text"] {
        padding: 8px;
        border: none;
        font-size: 1em;
        color: var(--md-default-fg-color);
        outline: none;
        background: transparent;
    }
    .unit {
        padding: 0 8px;
        font-size: 0.95em;
        color: var(--md-default-fg-color);
        pointer-events: none;
        border-left: 1px solid var(--md-default-fg-color--light);
        background: rgba(var(--md-default-bg-color--rgb), 0.7);
        display: flex;
        align-items: center;
        border-radius: 0 4px 4px 0;
    }
    .input-container label {
        font-size: 0.95em;
        color: var(--md-default-fg-color);
    }
    .formatted-value {
        font-weight: bold;
        color: var(--md-primary-fg-color);
    }
    .section-header {
        font-size: 1.05em;
        font-weight: 600;
        color: var(--md-default-fg-color--dark);
        margin: 18px 0 8px;
        padding-bottom: 4px;
        border-bottom: 1px solid var(--md-default-fg-color--light);
    }
    .card {
        border: 1px solid var(--md-default-fg-color--light);
        border-radius: 8px;
        padding: 16px;
        margin-bottom: 16px;
        background: var(--md-default-bg-color);
    }
    .card-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 12px;
    }
    .card-name {
        font-weight: 600;
        font-size: 1.05em;
    }
    .remove-card {
        background: none;
        border: none;
        color: var(--md-typeset-color-error);
        cursor: pointer;
        font-size: 0.9em;
    }
    .girl-math-row {
        display: grid;
        grid-template-columns: 1fr 90px 82px 28px;
        gap: 8px;
        align-items: center;
        margin-bottom: 8px;
    }
    @media (max-width: 480px) {
        .girl-math-row {
            grid-template-columns: 1fr 70px 70px 24px;
            gap: 6px;
        }
    }
    .girl-math-row input {
        width: 100%;
        padding: 6px;
        border: 1px solid var(--md-default-fg-color--light);
        border-radius: 4px;
        font-size: 0.95em;
    }
    .add-girl-math {
        margin-top: 8px;
        padding: 6px 12px;
        background: var(--md-primary-fg-color);
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        font-size: 0.9em;
    }
    .results-grid {
        display: grid;
        grid-template-columns: 1fr;
        gap: 16px;
        margin-top: 12px;
    }
    @media (min-width: 700px) {
        .results-grid {
            grid-template-columns: 1fr 1fr;
        }
    }
    .result-card {
        border: 1px solid var(--md-default-fg-color--light);
        border-radius: 8px;
        padding: 16px;
        background: var(--md-default-bg-color);
    }
    .result-card.winner {
        border-color: var(--md-primary-fg-color);
        box-shadow: 0 0 0 2px rgba(var(--md-primary-fg-color--rgb), 0.15);
    }
    .result-card .likely {
        font-size: 1.35em;
        font-weight: 700;
        margin: 6px 0;
    }
    .result-card .range {
        font-size: 0.9em;
        color: var(--md-default-fg-color);
    }
    .delta {
        font-weight: 600;
        color: var(--md-primary-fg-color);
    }
    .small-grey {
        color: #888;
        font-size: 0.82em;
        cursor: pointer;
        user-select: none;
    }
    .small-grey:hover {
        text-decoration: underline;
    }

    .cpp-override .input-wrapper {
        width: fit-content;
        max-width: 120px;
    }

    .card-name {
        border: none;
        background: transparent;
        padding: 2px 0;
        margin: 0;
        font: inherit;
        border-bottom: 1px dotted #888;
        transition: border-color 0.1s;
    }
    .card-name:hover {
        border-bottom: 1px solid #666;
    }
    .card-name:focus {
        border-bottom: 1px solid var(--md-primary-fg-color);
        outline: none;
    }
</style>

### 1. Expected Spending (shared)

<form id="spendingForm" class="input-container">
    <div class="input-group">
        <div class="input-wrapper">
            <input type="number" id="everyday" value="79900" step="100" min="0">
            <span class="unit">$ / yr</span>
        </div>
        <div class="formatted-and-label">
            <span class="formatted-value" id="everydayFormatted">$79,900</span>
            <label for="everyday">Everyday / General purchases</label>
        </div>
    </div>

    <div class="input-group">
        <div class="input-wrapper">
            <input type="number" id="dining" value="12450" step="100" min="0">
            <span class="unit">$ / yr</span>
        </div>
        <div class="formatted-and-label">
            <span class="formatted-value" id="diningFormatted">$12,450</span>
            <label for="dining">Dining (restaurants, delivery, etc.)</label>
        </div>
    </div>

    <div class="input-group">
        <div class="input-wrapper">
            <input type="number" id="flights_direct" value="8000" step="100" min="0">
            <span class="unit">$ / yr</span>
        </div>
        <div class="formatted-and-label">
            <span class="formatted-value" id="flights_directFormatted">$8,000</span>
            <label for="flights_direct">Flights booked directly</label>
        </div>
    </div>

    <div class="input-group">
        <div class="input-wrapper">
            <input type="number" id="hotels_direct" value="2000" step="100" min="0">
            <span class="unit">$ / yr</span>
        </div>
        <div class="formatted-and-label">
            <span class="formatted-value" id="hotels_directFormatted">$2,000</span>
            <label for="hotels_direct">Hotels &amp; car rentals booked directly</label>
        </div>
    </div>

    <div class="input-group">
        <div class="input-wrapper">
            <input type="number" id="portal" value="2000" step="100" min="0">
            <span class="unit">$ / yr</span>
        </div>
        <div class="formatted-and-label">
            <span class="formatted-value" id="portalFormatted">$2,000</span>
            <label for="portal">Travel booked through issuer portal</label>
        </div>
    </div>
</form>



### 2. Cards

Use the probabilities in Girl Math honestly -- they turn optimistic claims into expected value.

<div id="cardsContainer"></div>

<button id="addCardBtn" style="padding:8px 16px; border-radius:4px; border:1px solid var(--md-primary-fg-color); background:transparent; color:var(--md-primary-fg-color); cursor:pointer; margin-bottom:20px;">
    + Add another card
</button>

---

Comparison

<div id="resultsContainer"></div>
