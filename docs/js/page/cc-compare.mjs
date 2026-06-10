// Credit Card Comparator - mobile-first, live, $ focused

const CATEGORIES = [
    { key: 'everyday', label: 'Everyday / General' },
    { key: 'dining', label: 'Dining' },
    { key: 'flights_direct', label: 'Flights (direct)' },
    { key: 'hotels_direct', label: 'Hotels & Cars (direct)' },
    { key: 'portal', label: 'Portal travel' }
];

let state = {
    spending: {
        everyday: 50000,
        dining: 23000,
        flights_direct: 8000,
        hotels_direct: 2000,
        portal: 2000
    },
    globalCpp: 1.8,
    cards: []
};

let nextCardId = 1;
let nextGirlId = 1;

// Load from localStorage if available
function loadState() {
    try {
        const saved = localStorage.getItem('ccCompareState');
        if (saved) {
            const parsed = JSON.parse(saved);
            if (parsed.spending) state.spending = { ...state.spending, ...parsed.spending };
            if (parsed.cards && parsed.cards.length > 0) {
                state.cards = parsed.cards;
                // Re-assign ids to avoid collisions
                nextCardId = Math.max(...state.cards.map(c => parseInt(c.id) || 0)) + 1;
            }
        }
    } catch (e) {}
}

// Save to localStorage
function saveState() {
    try {
        localStorage.setItem('ccCompareState', JSON.stringify(state));
    } catch (e) {}
}

// Ensure the four default cards exist (adds missing ones like Amex Plat or Fold even if you have saved data)
function ensureDefaultCards() {
    const defaultDefs = [
        {
            id: 'csr',
            name: 'Chase Sapphire Reserve',
            cost: 990,
            multipliers: { everyday: 1, dining: 3, flights_direct: 4, hotels_direct: 4, portal: 8 },
            girlMath: [
                { desc: "Priority Pass Guests", value: 120, prob: 80 }
            ]
        },
        {
            id: 'vx',
            name: 'Capital One Venture X',
            cost: 395,
            cppOverride: 1.85,
            multipliers: { everyday: 2, dining: 2, flights_direct: 2, hotels_direct: 2, portal: 7 },
            girlMath: [
                { desc: "Premier Collection", value: 200, prob: 50 }
            ]
        },
        {
            id: 'fold',
            name: 'Fold Bitcoin Credit Card',
            cost: 0,
            multipliers: { everyday: 1.5, dining: 1.5, flights_direct: 1.5, hotels_direct: 1.5, portal: 1.5 },
            girlMath: [
                { desc: "Behavior bonus (DCA + pay w/ BTC) on first $24k/yr equiv", value: 600, prob: 50 }
            ]
        },
        {
            id: 'plat',
            name: 'American Express Platinum',
            cost: 895,
            multipliers: { everyday: 1, dining: 1, flights_direct: 5, hotels_direct: 5, portal: 5 },
            girlMath: [
                { desc: "Airline fee credit", value: 200, prob: 80 },
                { desc: "Hotel credit", value: 100, prob: 70 },
                { desc: "Uber credits", value: 200, prob: 60 }
            ]
        }
    ];

    const existingById = new Map(state.cards.map(c => [c.id, c]));
    let added = false;

    for (const def of defaultDefs) {
        if (!existingById.has(def.id)) {
            state.cards.push({
                id: def.id,
                name: def.name,
                cost: def.cost,
                cppOverride: null,
                multipliers: { ...def.multipliers },
                girlMath: def.girlMath.map(l => ({ ...l }))
            });
            added = true;
        }
    }

    if (added) {
        saveState();
    }
}

// Calculate rewards value + net for one card
function calculateCard(card) {
    const globalCpp = state.globalCpp;
    const cpp = (card.cppOverride != null) ? card.cppOverride : globalCpp;

    let totalPoints = 0;
    for (const cat of CATEGORIES) {
        const spend = state.spending[cat.key] || 0;
        const mult = card.multipliers[cat.key] || 1;
        totalPoints += spend * mult;
    }

    const rewardsValue = totalPoints * (cpp / 100);
    const baseNet = rewardsValue - card.cost;

    // Girl math
    let girlExpected = 0;
    let girlMax = 0;
    for (const line of (card.girlMath || [])) {
        const v = parseFloat(line.value) || 0;
        const p = Math.max(0, Math.min(100, parseFloat(line.prob) || 0));
        girlExpected += v * (p / 100);
        girlMax += v;
    }

    const likelyNet = baseNet + girlExpected;
    const minNet = baseNet;
    const maxNet = baseNet + girlMax;

    return {
        rewardsValue: Math.round(rewardsValue),
        baseNet: Math.round(baseNet),
        girlExpected: Math.round(girlExpected),
        likelyNet: Math.round(likelyNet),
        minNet: Math.round(minNet),
        maxNet: Math.round(maxNet)
    };
}

// Render formatted currency
function fmt(val) {
    return '$' + Math.abs(val).toLocaleString();
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
                state.spending[key] = parseFloat(input.value) || 0;
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

        <div>
            <span class="small-grey" data-toggle-cpp>[ ¢ per point/mile (${ (card.cppOverride != null ? card.cppOverride : state.globalCpp).toFixed(2) }) ]</span>
            <div class="cpp-override" style="display:none; margin-top:4px;">
                <div class="input-wrapper">
                    <input type="number" class="card-cpp" value="${card.cppOverride != null ? card.cppOverride : state.globalCpp}" step="0.1" min="0.5" style="width:80px;">
                    <span class="unit">¢</span>
                </div>
            </div>
        </div>

        <div style="margin: 12px 0 6px; font-size:0.9em; font-weight:600;">Earning rates (multipliers per year)</div>
        <div class="multipliers" style="display:grid; grid-template-columns:1fr 1fr; gap:6px; font-size:0.85em;"></div>

        <div style="margin-top:14px; font-weight:600; font-size:0.95em;">Girl Math — annual claimed value + probability you'll actually use it in a typical year</div>
        <div class="girl-math-list"></div>
        <button class="add-girl-math" data-id="${card.id}">+ Add benefit line</button>
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
        card.cost = parseFloat(costInput.value) || 0;
        saveState();
        renderResults();
    };

    // CPP override (per-card)
    const cppInput = div.querySelector('.card-cpp');
    const toggleSpan = div.querySelector('[data-toggle-cpp]');

    cppInput.oninput = () => {
        const v = parseFloat(cppInput.value);
        if (isNaN(v) || Math.abs(v - state.globalCpp) < 0.001) {
            card.cppOverride = null;
        } else {
            card.cppOverride = v;
        }
        saveState();
        renderResults();

        // Live update the toggle label value immediately
        if (toggleSpan) {
            const currentVal = card.cppOverride != null ? card.cppOverride : state.globalCpp;
            toggleSpan.textContent = `[ ¢ per point/mile (${currentVal.toFixed(2)}) ]`;
        }
    };

    // For Venture X, default to a higher value reflecting transfer potential (e.g. 1.85)
    // This is only for new cards; existing saved data uses what user set or global
    if (card.id === 'vx' && card.cppOverride === null) {
        // Do not auto-set here to avoid overriding user choice; user sets via the toggle
    }

    // Multipliers (compact)
    const multContainer = div.querySelector('.multipliers');
    CATEGORIES.forEach(cat => {
        const wrap = document.createElement('div');
        wrap.style.display = 'flex';
        wrap.style.alignItems = 'center';
        wrap.innerHTML = `
            <span style="width:68px; font-size:0.8em;">${cat.label}</span>
            <div class="input-wrapper" style="width:62px;">
                <input type="number" step="0.5" min="0" value="${card.multipliers[cat.key]}" style="width:100%; padding:4px 6px; font-size:0.9em;">
                <span class="unit" style="font-size:0.75em;">x</span>
            </div>
        `;
        const inp = wrap.querySelector('input');
        inp.oninput = () => {
            card.multipliers[cat.key] = parseFloat(inp.value) || 1;
            saveState();
            renderResults();
        };
        multContainer.appendChild(wrap);
    });

    // Explanatory note for Fold (self-contained info on rewards structure)
    if (card.id === 'fold') {
        const noteDiv = document.createElement('div');
        noteDiv.style.fontSize = '0.75em';
        noteDiv.style.color = '#666';
        noteDiv.style.marginTop = '6px';
        noteDiv.innerHTML = 'Base 1.5% back in BTC flat on all spend (no cap). Up to ~4% total on first $2k/mo via Auto-Stack!/DCA or Direct-to-Bitcoin (+ up to 0.5% pay statement w/ BTC from Fold). Model extra bonuses in Girl Math.';
        multContainer.after(noteDiv);
    }

    // Explanatory note for Amex Platinum
    if (card.id === 'plat') {
        const noteDiv = document.createElement('div');
        noteDiv.style.fontSize = '0.75em';
        noteDiv.style.color = '#666';
        noteDiv.style.marginTop = '6px';
        noteDiv.innerHTML = '5x on flights (direct or Amex Travel, up to $500k/yr) and prepaid hotels via Amex Travel. 1x elsewhere. Many statement credits (airline $200, hotel, Uber, etc.) — model in Girl Math. Strong lounge access.';
        multContainer.after(noteDiv);
    }

    // Girl math rows
    const girlList = div.querySelector('.girl-math-list');

    function renderGirlMathRows() {
        girlList.innerHTML = '';
        (card.girlMath || []).forEach((line, idx) => {
            const row = document.createElement('div');
            row.className = 'girl-math-row';
            row.innerHTML = `
                <input type="text" placeholder="Description (e.g. Priority Pass guests)" value="${line.desc || ''}">
                <div class="input-wrapper" style="width:100%;">
                    <input type="number" placeholder="120" value="${line.value || ''}" step="10" style="padding:4px 2px; font-size:0.9em;">
                    <span class="unit" style="font-size:0.7em; padding:0 2px;">$</span>
                </div>
                <div class="input-wrapper" style="width:100%;">
                    <input type="number" placeholder="80" value="${line.prob || ''}" min="0" max="100" step="5" style="padding:4px 2px; font-size:0.9em;">
                    <span class="unit" style="font-size:0.7em; padding:0 3px;">%</span>
                </div>
                <button style="background:none; border:none; color:#c00; font-size:1.1em; cursor:pointer;" title="Remove">×</button>
            `;

            const descIn = row.children[0];
            const valWrapper = row.children[1];
            const valIn = valWrapper.querySelector('input');
            const probWrapper = row.children[2];
            const probIn = probWrapper.querySelector('input');
            const delBtn = row.children[3];

            descIn.oninput = () => { line.desc = descIn.value; saveState(); renderResults(); };
            valIn.oninput = () => { line.value = parseFloat(valIn.value) || 0; saveState(); renderResults(); };
            probIn.oninput = () => { line.prob = parseFloat(probIn.value) || 0; saveState(); renderResults(); };
            delBtn.onclick = () => {
                card.girlMath.splice(idx, 1);
                saveState();
                renderGirlMathRows();
                renderResults();
            };

            girlList.appendChild(row);
        });
    }

    renderGirlMathRows();

    // Add girl math line
    div.querySelector('.add-girl-math').onclick = () => {
        if (!card.girlMath) card.girlMath = [];
        card.girlMath.push({ desc: '', value: 300, prob: 40 });
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
    if (!container) return;
    container.innerHTML = '';

    const grid = document.createElement('div');
    grid.className = 'results-grid';

    const calcs = state.cards.map(card => ({
        card,
        calc: calculateCard(card)
    }));

    // Sort by likely net descending for stack ranking
    calcs.sort((a, b) => b.calc.likelyNet - a.calc.likelyNet);

    calcs.forEach(({ card, calc }, index) => {
        const rank = index + 1;
        const rankLabel = `${rank}${rank === 1 ? 'st' : rank === 2 ? 'nd' : rank === 3 ? 'rd' : 'th'}`;
        const isFirst = rank === 1;
        const rankColor = isFirst ? '#2e7d32' : '#555';

        const el = document.createElement('div');
        el.className = `result-card${isFirst ? ' winner' : ''}`;
        el.innerHTML = `
            <div style="font-weight:600; margin-bottom:4px; display:flex; align-items:center; gap:8px;">
                <span style="background:${rankColor}; color:white; padding:2px 8px; border-radius:12px; font-size:0.75em; font-weight:700; white-space:nowrap;">${rankLabel}</span>
                ${card.name || 'Untitled Card'}
            </div>
            <div><strong>Rewards value:</strong> ${fmt(calc.rewardsValue)}</div>
            <div>Annual cost: <strong>-${fmt(card.cost)}</strong></div>
            <div>Girl math (expected): <strong>+${fmt(calc.girlExpected)}</strong></div>
            <div class="likely">Likely Value: <strong>${fmt(calc.likelyNet)}</strong></div>
            <div class="range">Range (girl math 0% → 100%): ${fmt(calc.minNet)} — ${fmt(calc.maxNet)}</div>
            ${isFirst ? '<div style="margin-top:6px; font-size:0.85em; color:#2e7d32; font-weight:600;">🏆 Winner</div>' : ''}
        `;
        grid.appendChild(el);
    });

    container.appendChild(grid);
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
            multipliers: { everyday: 2, dining: 2, flights_direct: 2, hotels_direct: 2, portal: 5 },
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

    // Force-clean old default card names that had parentheticals (from previous saved state)
    let cleaned = false;
    state.cards.forEach(card => {
        if (card.id === 'csr' && card.name && card.name.includes('(')) {
            card.name = 'Chase Sapphire Reserve';
            cleaned = true;
        }
        if (card.id === 'vx' && card.name && card.name.includes('(')) {
            card.name = 'Capital One Venture X';
            cleaned = true;
        }
        if (card.id === 'fold' && card.name && card.name.includes('(')) {
            card.name = 'Fold Bitcoin Credit Card';
            cleaned = true;
        }
        if (card.id === 'plat' && card.name && card.name.includes('(')) {
            card.name = 'American Express Platinum';
            cleaned = true;
        }
    });
    if (cleaned) {
        saveState();
    }

    // Ensure Premier Collection girl math line for Venture X (even with existing saved data)
    // and set a sensible per-card cpp override (1.85¢) reflecting transfer value if not already set by user
    const vxCard = state.cards.find(c => c.id === 'vx');
    if (vxCard) {
        if (!vxCard.girlMath) vxCard.girlMath = [];
        const hasPremier = vxCard.girlMath.some(line => line.desc && line.desc.includes('Premier'));
        if (!hasPremier) {
            vxCard.girlMath.push({ desc: "Premier Collection", value: 200, prob: 50 });
            saveState();
        }
        if (vxCard.cppOverride === null || vxCard.cppOverride === undefined) {
            vxCard.cppOverride = 1.85;
            saveState();
        }
    }

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
