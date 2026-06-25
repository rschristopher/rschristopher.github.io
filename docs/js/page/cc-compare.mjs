// Credit Card Comparator - mobile-first, live, $ focused

const CATEGORIES = [
    { key: 'everyday', label: 'Everyday / General' },
    { key: 'dining', label: 'Dining' },
    { key: 'flights_direct', label: 'Flights (direct)' },
    { key: 'hotels_direct', label: 'Hotels & Cars (direct)' },
    { key: 'portal', label: 'Portal travel' },
    { key: 'amazon', label: 'Amazon purchases' }
];

const DEFAULT_SPENDING = {
    everyday: 64900,
    dining: 12450,
    flights_direct: 8000,
    hotels_direct: 2000,
    portal: 2000,
    amazon: 15000
};

const BASE_FEES = {
    csr: 795,
    vx: 395,
    fold: 100,
    plat: 895,
    amazon: 0,
    apple: 0,
    ihg: 99
};

const AU_FEES = {
    csr: 195,
    vx: 125,
    plat: 195
};

const NEW_CARD_DEFAULT_MULTIPLIERS = {
    everyday: 2,
    dining: 2,
    flights_direct: 2,
    hotels_direct: 2,
    portal: 5,
    amazon: 2
};

let state = {
    spending: { ...DEFAULT_SPENDING },
    globalCpp: 1.0,
    cards: []
};

let nextCardId = 1;

// Load from sessionStorage if available
function loadState() {
    try {
        const saved = sessionStorage.getItem('ccCompareState');
        if (saved) {
            const parsed = JSON.parse(saved);
            if (parsed.spending) {
                state.spending = { ...DEFAULT_SPENDING, ...parsed.spending };
            }
            if (parsed.cards && parsed.cards.length > 0) {
                state.cards = parsed.cards;
                nextCardId = Math.max(...state.cards.map(c => parseInt(c.id) || 0)) + 1;
            }
        }
    } catch (e) {}
}

// Save to sessionStorage
function saveState() {
    try {
        sessionStorage.setItem('ccCompareState', JSON.stringify(state));
    } catch (e) {}
}

function createCardFromDef(def) {
    return {
        id: def.id,
        name: def.name,
        cost: def.cost,
        cppOverride: def.cppOverride !== undefined ? def.cppOverride : null,
        multipliers: { ...def.multipliers },
        girlMath: (def.girlMath || []).map(l => ({ ...l, minSpend: l.minSpend || 0 }))
    };
}

// Ensure the default cards exist (adds missing ones even if you have saved data).
// All defaults live in this one array; no per-feature migration code.
function ensureDefaultCards() {
    const defaultDefs = [
        {
            id: 'csr',
            name: 'Chase Sapphire Reserve',
            cost: BASE_FEES.csr + (AU_FEES.csr || 0),
            cppOverride: 1.5,
            multipliers: { everyday: 1, dining: 3, flights_direct: 4, hotels_direct: 4, portal: 8, amazon: 1 },
            girlMath: [
                { desc: "$300 annual travel credit", value: 300, prob: 95, minSpend: 0 },
                { desc: "Priority Pass + guests", value: 300, prob: 60, minSpend: 0 },
                { desc: "$300 Sapphire dining credits (OpenTable)", value: 300, prob: 50, minSpend: 0 },
                { desc: "$500 Southwest Airlines credit (requires $75k spend)", value: 500, prob: 40, minSpend: 75000 },
                { desc: "$250 Shops at Chase credit (requires $75k spend)", value: 250, prob: 35, minSpend: 75000 },
                { desc: "$250 select Chase Travel hotels credit", value: 250, prob: 70, minSpend: 0 }
            ]
        },
        {
            id: 'vx',
            name: 'Capital One Venture X',
            cost: BASE_FEES.vx + (AU_FEES.vx || 0),
            multipliers: { everyday: 2, dining: 2, flights_direct: 2, hotels_direct: 2, portal: 10, amazon: 2 },
            girlMath: [
                { desc: "$300 annual travel credit", value: 300, prob: 95, minSpend: 0 },
                { desc: "10k anniversary miles", value: 100, prob: 100, minSpend: 0 },
                { desc: "$200 Premier Collection hotel credit", value: 200, prob: 65, minSpend: 0 },
                { desc: "Lounge access value (Capital One + Priority Pass)", value: 150, prob: 55, minSpend: 0 }
            ]
        },
        {
            id: 'fold',
            name: 'Fold Bitcoin Credit Card',
            cost: BASE_FEES.fold,
            multipliers: { everyday: 1.5, dining: 1.5, flights_direct: 1.5, hotels_direct: 1.5, portal: 1.5, amazon: 1.5 },
            girlMath: [
                { desc: "Behavior bonus (DCA + pay w/ BTC)", value: 600, prob: 50, minSpend: 10000 }
            ]
        },
        {
            id: 'plat',
            name: 'American Express Platinum',
            cost: BASE_FEES.plat + (AU_FEES.plat || 0),
            multipliers: { everyday: 1, dining: 1, flights_direct: 5, hotels_direct: 1, portal: 5, amazon: 1 },
            girlMath: [
                { desc: "$200 airline fee credit", value: 200, prob: 80, minSpend: 0 },
                { desc: "Hotel + Uber + other credits", value: 300, prob: 55, minSpend: 0 }
            ]
        },
        {
            id: 'amazon',
            name: 'Amazon Prime Visa',
            cost: BASE_FEES.amazon,
            multipliers: { everyday: 1, dining: 2, flights_direct: 1, hotels_direct: 1, portal: 5, amazon: 5 },
            girlMath: [
                { desc: "Rotating Amazon promos", value: 150, prob: 40, minSpend: 3000 }
            ]
        },
        {
            id: 'apple',
            name: 'Apple Card',
            cost: BASE_FEES.apple,
            multipliers: { everyday: 2, dining: 2, flights_direct: 2, hotels_direct: 2, portal: 2, amazon: 2 },
            girlMath: []
        },
        {
            id: 'ihg',
            name: 'IHG One Rewards Premier',
            cost: BASE_FEES.ihg,
            multipliers: { everyday: 3, dining: 5, flights_direct: 5, hotels_direct: 10, portal: 5, amazon: 3 },
            girlMath: [
                { desc: "Annual free night / status perks", value: 400, prob: 70, minSpend: 15000 },
                { desc: "Hotel credit / dining", value: 120, prob: 60, minSpend: 5000 }
            ]
        }
    ];

    const existingById = new Map(state.cards.map(c => [c.id, c]));
    let added = false;

    for (const def of defaultDefs) {
        if (!existingById.has(def.id)) {
            state.cards.push(createCardFromDef(def));
            added = true;
        }
    }

    if (added) {
        saveState();
    }

    // Sync girlMath (and csr cpp default) for demo cards to current defs (so updates show without removing card)
    state.cards.forEach(card => {
        const def = defaultDefs.find(d => d.id === card.id);
        if (def && def.girlMath) {
            card.girlMath = def.girlMath.map(l => ({ ...l, minSpend: l.minSpend || 0 }));
        }
        if (def && def.cppOverride !== undefined && card.cppOverride == null) {
            card.cppOverride = def.cppOverride;
        }
    });
}


// Render formatted currency
function fmt(val) {
    return '$' + Math.abs(Math.round(val)).toLocaleString();
}

function computeSingleCardNet(card) {
    const cpp = (card.cppOverride != null) ? card.cppOverride : state.globalCpp;
    let totalPoints = 0;
    let totalSpend = 0;
    for (const cat of CATEGORIES) {
        const spend = state.spending[cat.key] || 0;
        const mult = card.multipliers[cat.key] || 1;
        totalPoints += spend * mult;
        totalSpend += spend;
    }
    const base = totalPoints * (cpp / 100);
    let girl = 0;
    for (const line of (card.girlMath || [])) {
        const ms = safeNum(line.minSpend);
        if (totalSpend >= ms) {
            const p = Math.max(0, Math.min(100, safeNum(line.prob)));
            girl += safeNum(line.value) * (p / 100);
        }
    }
    return Math.round(base + girl) - safeNum(card.cost);
}

function appendRateInput(container, cat, currentValue, onChange) {
    const wrap = document.createElement('div');
    wrap.style.display = 'flex';
    wrap.style.alignItems = 'center';

    const label = document.createElement('span');
    label.style.width = '68px';
    label.style.fontSize = '0.8em';
    label.textContent = cat.label;

    const inputWrap = document.createElement('div');
    inputWrap.className = 'input-wrapper';
    inputWrap.style.width = '72px';

    const inp = document.createElement('input');
    inp.type = 'number';
    inp.step = '0.1';
    inp.min = '0';
    inp.value = currentValue;
    inp.style.width = '100%';
    inp.style.padding = '4px 6px';
    inp.style.fontSize = '0.9em';

    const unit = document.createElement('span');
    unit.className = 'unit';
    unit.style.fontSize = '0.75em';
    unit.textContent = 'x';

    inputWrap.append(inp, unit);
    wrap.append(label, inputWrap);

    inp.oninput = () => onChange(safeNum(inp.value, 1));
    container.appendChild(wrap);
}

function getEffectiveRate(card, catKey) {
    const mult = card.multipliers[catKey] || 1;
    const cpp = (card.cppOverride != null) ? card.cppOverride : state.globalCpp;
    return mult * (cpp / 100);
}

function scoreCard(card, ci, alloc, assignedSpend) {
    const cpp = (card.cppOverride != null) ? card.cppOverride : state.globalCpp;
    let base = 0;
    for (const cat of CATEGORIES) {
        if (alloc[cat.key] === ci) {
            const mult = card.multipliers[cat.key] || 1;
            base += (state.spending[cat.key] || 0) * mult * (cpp / 100);
        }
    }
    let girl = 0;
    for (const line of (card.girlMath || [])) {
        const ms = safeNum(line.minSpend);
        if (assignedSpend[ci] >= ms) {
            const p = Math.max(0, Math.min(100, safeNum(line.prob)));
            girl += safeNum(line.value) * (p / 100);
        }
    }
    return base + girl;
}

function safeNum(val, def = 0) {
    const n = parseFloat(val);
    return isNaN(n) ? def : n;
}

// New multi-card solver
function computeBestSubset() {
    const n = state.cards.length;
    let best = { net: -Infinity, subsetIndices: [], alloc: {}, totalRewards: 0, totalFees: 0 };

    for (let mask = 0; mask < (1 << n); mask++) {
        const S = [];
        for (let i = 0; i < n; i++) if (mask & (1 << i)) S.push(i);
        if (S.length === 0) {
            if (0 > best.net) {
                best = { net: 0, subsetIndices: [], alloc: {}, totalRewards: 0, totalFees: 0 };
            }
            continue;
        }

        // Assign each category to best card in S by effective rate (earlier cards win on ties)
        const alloc = {};
        const assignedSpend = new Array(n).fill(0);
        for (const cat of CATEGORIES) {
            let bestIdx = -1;
            let bestRate = -1;
            for (const ci of S) {
                const rate = getEffectiveRate(state.cards[ci], cat.key);
                if (rate > bestRate || bestIdx === -1) {
                    bestRate = rate;
                    bestIdx = ci;
                }
            }
            if (bestIdx >= 0) {
                alloc[cat.key] = bestIdx;
                assignedSpend[bestIdx] += state.spending[cat.key] || 0;
            }
        }

        // Compute rewards and fees for the subset
        let totalRewards = 0;
        let totalFees = 0;
        for (const ci of S) {
            const card = state.cards[ci];
            totalRewards += scoreCard(card, ci, alloc, assignedSpend);
            totalFees += card.cost || 0;
        }

        const net = Math.round(totalRewards) - totalFees;
        if (net > best.net) {
            best = { net, subsetIndices: S.slice(), alloc, totalRewards, totalFees };
        }
    }
    return best;
}

// Render spending inputs + formatted values
function renderSpending() {
    const form = document.getElementById('spendingForm');
    if (!form) return;

    Object.keys(state.spending).forEach(key => {
        const input = document.getElementById(key);
        const fmtEl = document.getElementById(key + 'Formatted');
        if (input) {
            input.value = state.spending[key];
            input.oninput = () => {
                state.spending[key] = safeNum(input.value);
                if (fmtEl) fmtEl.textContent = fmt(state.spending[key]);
                saveState();
                renderAll();
            };
        }
        if (fmtEl) fmtEl.textContent = fmt(state.spending[key]);
    });
}

// Render global cpp
// Render one card panel (including its girl math)
function renderCard(card, container) {
    const div = document.createElement('div');
    div.className = 'card';
    div.innerHTML = `
        <div class="card-header">
            <input type="text" class="card-name" value="${card.name}" placeholder="Card title" title="Click to rename this card" style="font-weight:600; font-size:1.05em; background:transparent; width:70%; cursor:text;">
            <button class="remove-card" data-id="${card.id}">Remove</button>
        </div>

        <div class="input-group">
            <div class="input-wrapper">
                <input type="number" class="card-cost" value="${card.cost}" step="10" min="0">
                <span class="unit">$</span>
            </div>
            <label>Total annual cost</label>
        </div>

        <div style="margin: 12px 0 6px; font-size:0.9em; font-weight:600;">Earning Rates</div>
        <div class="multipliers" style="display:grid; grid-template-columns:1fr 1fr; gap:6px; font-size:0.85em;"></div>

        <div style="margin: 8px 0 6px; font-size:0.85em;">
            <span class="small-grey" data-toggle-cpp>[ ¢ per pt/mi (${ (card.cppOverride != null ? card.cppOverride : state.globalCpp).toFixed(2) }) ]</span>
            <span class="points-summary" style="margin-left: 8px; color: #666;"></span>
            <div class="cpp-override" style="display:none; margin-top:4px;">
                <div class="input-wrapper" style="width: fit-content;">
                    <input type="number" class="card-cpp" value="${card.cppOverride != null ? card.cppOverride : state.globalCpp}" step="0.1" min="0.5" style="width:80px;">
                    <span class="unit">¢</span>
                </div>
            </div>
        </div>

        <div style="margin-top:14px; font-weight:600; font-size:0.95em;">Girl Math (claimed value + probability you'll actually use)</div>
        <div class="girl-math-list"></div>
        <button class="add-girl-math" data-id="${card.id}">+ Girl Math</button>
    `;

    // Name
    const nameInput = div.querySelector('.card-name');
    nameInput.oninput = () => {
        card.name = nameInput.value;
        saveState();
        renderResults();
    };

    // Cost
    const costInput = div.querySelector('.card-cost');
    costInput.oninput = () => {
        card.cost = safeNum(costInput.value);
        saveState();
        renderResults();
    };

    // CPP override (per-card) + live points summary
    const cppInput = div.querySelector('.card-cpp');
    const toggleSpan = div.querySelector('[data-toggle-cpp]');
    const pointsSummary = div.querySelector('.points-summary');

    function computePoints() {
        let totalPoints = 0;
        for (const cat of CATEGORIES) {
            const spend = safeNum(state.spending[cat.key]);
            const mult = safeNum(card.multipliers[cat.key], 1);
            totalPoints += spend * mult;
        }
        const cpp = (card.cppOverride != null) ? card.cppOverride : state.globalCpp;
        const value = totalPoints * (cpp / 100);
        return {
            totalPoints: Math.round(totalPoints),
            value: Math.round(value)
        };
    }

    function updatePointsSummary() {
        if (!pointsSummary) return;
        const { totalPoints, value } = computePoints();
        pointsSummary.textContent = `x ${totalPoints.toLocaleString()} pts => ${fmt(value)}`;
    }
    updatePointsSummary();

    cppInput.oninput = () => {
        const v = safeNum(cppInput.value, state.globalCpp);
        if (Math.abs(v - state.globalCpp) < 0.001) {
            card.cppOverride = null;
        } else {
            card.cppOverride = v;
        }
        saveState();

        // Live update the toggle label value immediately
        if (toggleSpan) {
            const currentVal = card.cppOverride != null ? card.cppOverride : state.globalCpp;
            toggleSpan.textContent = `[ ¢ per pt/mi (${currentVal.toFixed(2)}) ]`;
        }
        updatePointsSummary();
        renderResults();
    };

    // Multipliers (compact)
    const multContainer = div.querySelector('.multipliers');
    CATEGORIES.forEach(cat => {
        const current = card.multipliers[cat.key] || 1;
        appendRateInput(multContainer, cat, current, (newVal) => {
            card.multipliers[cat.key] = newVal;
            saveState();
            renderResults();
            updatePointsSummary();
        });
    });

    // Girl math rows
    const girlList = div.querySelector('.girl-math-list');

    function renderGirlMathRows() {
        girlList.innerHTML = '';
        (card.girlMath || []).forEach((line, idx) => {
            const row = document.createElement('div');
            row.className = 'girl-math-row';

            const descIn = document.createElement('input');
            descIn.type = 'text';
            descIn.placeholder = 'Description (e.g. Priority Pass guests)';
            descIn.value = line.desc || '';

            const valWrap = document.createElement('div');
            valWrap.className = 'input-wrapper';
            valWrap.style.width = '100%';
            valWrap.innerHTML = `<input type="number" placeholder="120" value="${line.value || ''}" step="10" style="padding:4px 2px; font-size:0.9em;"><span class="unit" style="font-size:0.7em; padding:0 2px;">$</span>`;

            const probWrap = document.createElement('div');
            probWrap.className = 'input-wrapper';
            probWrap.style.width = '100%';
            probWrap.innerHTML = `<input type="number" placeholder="80" value="${line.prob || ''}" min="0" max="100" step="5" style="padding:4px 2px; font-size:0.9em;"><span class="unit" style="font-size:0.7em; padding:0 3px;">%</span>`;

            const delBtn = document.createElement('button');
            delBtn.style.cssText = 'background:none; border:none; color:#c00; font-size:1.1em; cursor:pointer;';
            delBtn.title = 'Remove';
            delBtn.textContent = '×';

            const valIn = valWrap.querySelector('input');
            const probIn = probWrap.querySelector('input');

            // Min spend: click label to reveal inline input on the *same row*.
            // Blur (or Enter) saves + reverts to "$Xk min" text. Esc cancels.
            const minContainer = document.createElement('div');
            minContainer.style.cssText = 'width:100%; min-width:0;';

            const minToggle = document.createElement('span');
            minToggle.className = 'small-grey';
            minToggle.style.cursor = 'pointer';
            minToggle.style.whiteSpace = 'nowrap';
            minToggle.style.display = 'inline-block';
            const ms = safeNum(line.minSpend);
            minToggle.textContent = ms >= 1000 ? `$${(ms/1000)}k min` : `$${ms} min`;

            const minEdit = document.createElement('span');
            minEdit.style.cssText = 'display:none; white-space:nowrap; width:100%;';
            minEdit.innerHTML = `
                <span class="input-wrapper" style="display:flex; width:100%;">
                    <input type="number" placeholder="0" value="${safeNum(line.minSpend)}" step="1000" style="width:100%; padding:1px 2px; font-size:0.72em; box-sizing:border-box;">
                    <span class="unit" style="font-size:0.6em; padding:0 1px;">$</span>
                </span>
            `;

            minContainer.append(minToggle, minEdit);

            const minIn = minEdit.querySelector('input');

            minToggle.onclick = () => {
                minToggle.style.display = 'none';
                minEdit.style.display = 'inline-block';
                setTimeout(() => {
                    minIn.focus();
                    minIn.select();
                }, 0);
            };

            minIn.onblur = () => {
                line.minSpend = safeNum(minIn.value);
                const ms = safeNum(line.minSpend);
                minToggle.textContent = ms >= 1000 ? `$${(ms/1000)}k min` : `$${ms} min`;
                minToggle.style.display = 'inline-block';
                minEdit.style.display = 'none';
                saveState();
                renderResults();
            };

            minIn.onkeydown = (e) => {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    minIn.blur();
                } else if (e.key === 'Escape') {
                    e.preventDefault();
                    // cancel: restore input value and exit without saving
                    minIn.value = safeNum(line.minSpend);
                    minToggle.style.display = 'inline-block';
                    minEdit.style.display = 'none';
                }
            };

            descIn.oninput = () => { line.desc = descIn.value; saveState(); renderResults(); };
            valIn.oninput = () => { line.value = safeNum(valIn.value); saveState(); renderResults(); };
            probIn.oninput = () => { line.prob = safeNum(probIn.value); saveState(); renderResults(); };
            delBtn.onclick = () => {
                card.girlMath.splice(idx, 1);
                saveState();
                renderGirlMathRows();
                renderResults();
            };

            row.append(descIn, valWrap, probWrap, minContainer, delBtn);
            girlList.appendChild(row);
        });
    }

    renderGirlMathRows();

    // Add girl math line
    div.querySelector('.add-girl-math').onclick = () => {
        if (!card.girlMath) card.girlMath = [];
        card.girlMath.push({ desc: '', value: 300, prob: 40, minSpend: 0 });
        saveState();
        renderGirlMathRows();
        renderResults();
    };

    // Remove card
    div.querySelector('.remove-card').onclick = () => {
        state.cards = state.cards.filter(c => c.id !== card.id);
        saveState();
        renderCards();
        renderResults();
    };

    // Simple toggle for per-card cpp override (no details/admonition)
    const toggle = div.querySelector('[data-toggle-cpp]');
    const overrideDiv = div.querySelector('.cpp-override');
    if (toggle && overrideDiv) {
        toggle.onclick = () => {
            overrideDiv.style.display = (overrideDiv.style.display === 'none' || overrideDiv.style.display === '') ? 'block' : 'none';
        };
    }

    container.appendChild(div);
}

function renderCards() {
    const container = document.getElementById('cardsContainer');
    if (!container) return;
    container.innerHTML = '';

    state.cards.forEach(card => {
        renderCard(card, container);
    });
}

function renderResults() {
    const container = document.getElementById('resultsContainer');
    const otherContainer = document.getElementById('otherCardsContainer');
    if (!container) return;
    container.innerHTML = '';
    if (otherContainer) otherContainer.innerHTML = '';

    const result = computeBestSubset();

    const wrapper = document.createElement('div');

    // Compute details for subset
    const catSpend = {};
    CATEGORIES.forEach(c => { catSpend[c.key] = state.spending[c.key] || 0; });
    const assignedSpend = new Array(state.cards.length).fill(0);
    for (const cat of CATEGORIES) {
        const ci = result.alloc[cat.key];
        if (ci != null) assignedSpend[ci] += catSpend[cat.key];
    }

    const used = [];
    result.subsetIndices.forEach((ci) => {
        const card = state.cards[ci];
        let allocated = 0;
        const catsForThis = [];
        for (const cat of CATEGORIES) {
            if (result.alloc[cat.key] === ci) {
                allocated += catSpend[cat.key];
                catsForThis.push(cat.label);
            }
        }
        const rewards = Math.round( scoreCard(card, ci, result.alloc, assignedSpend) );
        const fee = card.cost || 0;
        const netContrib = rewards - fee;
        const detail = { card, allocated, catsForThis, rewards, fee, netContrib, ci };
        if (allocated > 0) {
            used.push(detail);
        }
        // 0-alloc cards from best subset go to Other Cards (not main list)
    });

    if (result.net <= 0 && result.subsetIndices.length === 0) {
        const msg = document.createElement('div');
        msg.style.cssText = 'padding:16px; border:1px solid #ccc; border-radius:8px; background:#fff3cd; color:#664d03;';
        msg.textContent = 'No cards justified—fees exceed benefits.';
        wrapper.appendChild(msg);
    } else {
        const recGrid = document.createElement('div');
        recGrid.className = 'results-grid';

        used.forEach((d) => {
            const el = document.createElement('div');
            el.className = 'result-card winner';
            el.innerHTML = `
                <div style="font-weight:600; margin-bottom:4px;">${d.card.name || 'Untitled Card'}</div>
                <div><strong>Allocated:</strong> ${fmt(d.allocated)}</div>
                <div><strong>Expected rewards:</strong> ${fmt(d.rewards)}</div>
                <div>Fee: <strong>-${fmt(d.fee)}</strong></div>
                <div class="likely">Net contribution: <strong>${fmt(d.netContrib)}</strong></div>
                <div style="margin-top:4px; font-size:0.85em; color:#666;">Categories: ${d.catsForThis.join(', ') || 'none'}</div>
            `;
            recGrid.appendChild(el);
        });

        wrapper.appendChild(recGrid);

        // Total value big and green
        const totalDiv = document.createElement('div');
        totalDiv.style.cssText = 'font-size:1.5em; color:#2e7d32; font-weight:700; margin:12px 0 2px;';
        totalDiv.textContent = fmt(result.net);
        wrapper.appendChild(totalDiv);

        // Small grey breakdown under the net total: total spend volume + effective net reward rate (after fees, incl. qualified perks)
        const totalSpend = CATEGORIES.reduce((sum, c) => sum + (state.spending[c.key] || 0), 0);
        const effRate = totalSpend > 0 ? (result.net / totalSpend * 100) : 0;
        const spendText = totalSpend >= 1000 ? '$' + Math.round(totalSpend / 1000) + 'k' : fmt(totalSpend);
        const breakdown = document.createElement('div');
        breakdown.style.cssText = 'font-size:0.82em; color:#666; margin-bottom:12px;';
        breakdown.textContent = `${spendText} of spending, ${effRate.toFixed(1)}% reward`;
        wrapper.appendChild(breakdown);
    }

    container.appendChild(wrapper);

    // Other Cards content (### header comes from page markdown for clean two sections)
    const usedCis = new Set(used.map(d => d.ci));
    const notUsed = state.cards.filter((c, i) => !usedCis.has(i));
    if (otherContainer && notUsed.length > 0) {
        notUsed.forEach(card => {
            const el = document.createElement('div');
            el.className = 'result-card';
            const maxVal = computeSingleCardNet(card);
            let html = `
                <div style="font-weight:600; margin-bottom:2px;">${card.name || 'Untitled Card'}</div>
                <div style="font-size:0.9em; color:#666;">Maximum possible value: ${fmt(maxVal)}</div>
            `;
            // Possible net positive benefits from girl math (full spend) if > fee
            let totalSpend = 0;
            for (const cat of CATEGORIES) {
                totalSpend += state.spending[cat.key] || 0;
            }
            let girl = 0;
            for (const line of (card.girlMath || [])) {
                const ms = safeNum(line.minSpend);
                if (totalSpend >= ms) {
                    const p = Math.max(0, Math.min(100, safeNum(line.prob)));
                    girl += safeNum(line.value) * (p / 100);
                }
            }
            const perkNet = Math.round(girl) - safeNum(card.cost);
            if (perkNet > 0) {
                html += `<div style="font-size:0.9em; color:#666;">Possible net positive benefits: ${fmt(perkNet)}</div>`;
            }
            el.innerHTML = html;
            otherContainer.appendChild(el);
        });
    }

    // Hide the Other Cards heading when there is nothing to list (keeps only relevant sections)
    if (otherContainer) {
        const heading = otherContainer.previousElementSibling;
        if (heading && /^H[1-6]$/.test(heading.tagName) && /other/i.test(heading.textContent || '')) {
            heading.style.display = notUsed.length > 0 ? '' : 'none';
        }
    }
}

function renderAll() {
    renderSpending();
    renderCards();
    renderResults();
}

function initAddCard() {
    const btn = document.getElementById('addCardBtn');
    if (!btn) return;

    btn.onclick = () => {
        const newCard = {
            id: 'custom' + (nextCardId++),
            name: '',
            cost: 0,
            cppOverride: null,
            multipliers: { ...NEW_CARD_DEFAULT_MULTIPLIERS },
            girlMath: []
        };
        state.cards.push(newCard);
        saveState();
        renderCards();
        renderResults();

        // Auto-focus and select the name input on the newly added card
        // so the user can immediately type the title (as requested)
        const cardsContainer = document.getElementById('cardsContainer');
        if (cardsContainer && cardsContainer.lastElementChild) {
            const newCardDiv = cardsContainer.lastElementChild;
            const nameInput = newCardDiv.querySelector('.card-name');
            if (nameInput) {
                nameInput.focus();
                nameInput.select();
            }
        }
    };
}

function init() {
    loadState();
    ensureDefaultCards();

    // Initial render
    renderAll();
    initAddCard();

    // Global listeners for spending & cpp already wired inside render functions
    // Save on any future change is handled inside the individual handlers

    // Make sure we save when leaving or on visibility change (belt & suspenders)
    document.addEventListener('visibilitychange', saveState);
}

document$.subscribe(() => {
    const page = document.getElementById('cc_compare_page');
    if (page) {
        init();
    }
});
