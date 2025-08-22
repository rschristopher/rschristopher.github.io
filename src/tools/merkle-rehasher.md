# Merkle Rehasher

This tool computes the Merkle root from a list of transaction IDs (TXIDs). Enter TXIDs in any format (JSON, comma-separated, copy-pasted from a website, etc.), just make sure they're in network byte order (big-endian), as they would appear in block explorers, and the tool will parse them automatically.

<style>
    .merkle-rehasher-input .input-container {
        padding: 20px;
        background: var(--md-default-bg-color);
        margin-bottom: 10px;
    }
    .merkle-rehasher-input .input-group {
        display: flex;
        align-items: center;
        margin-bottom: 15px;
    }
    .merkle-rehasher-input .input-wrapper {
        display: flex;
        align-items: stretch;
        border: 1px solid var(--md-default-fg-color--light);
        border-radius: 4px;
        background: var(--md-default-bg-color);
        transition: border-color 0.2s, box-shadow 0.2s;
        flex-grow: 1;
    }
    .merkle-rehasher-input .input-wrapper:hover {
        border-color: var(--md-primary-fg-color--light);
    }
    .merkle-rehasher-input .input-wrapper:focus-within {
        border-color: var(--md-primary-fg-color);
        box-shadow: 0 0 5px rgba(var(--md-primary-fg-color--rgb), 0.3);
    }
    .merkle-rehasher-input textarea {
        width: 100%;
        padding: 8px;
        border: none;
        font-size: 1em;
        color: var(--md-default-fg-color);
        outline: none;
        font-family: monospace;
        border-radius: 4px;
        resize: vertical;
        min-height: 200px;
    }
    .merkle-rehasher-input #error {
        margin-top: 10px;
        padding: 10px;
        border: 1px solid var(--md-typeset-color-error);
        border-radius: 4px;
        background: var(--md-default-bg-color);
        color: var(--md-typeset-color-error);
        font-size: 0.9em;
    }
    .merkle-rehasher-assumptions .assumptions {
        font-weight: bold;
        margin-top: 15px;
    }
    .merkle-rehasher-assumptions .assumptions-line {
        display: flex;
        align-items: center;
        gap: 10px;
    }
    .merkle-rehasher-assumptions .efficiency-group, .merkle-rehasher-assumptions .blocktime-group {
        display: flex;
        align-items: center;
        width: auto;
    }
    .merkle-rehasher-assumptions .efficiency-group .input-wrapper, .merkle-rehasher-assumptions .blocktime-group .input-wrapper {
        display: flex;
        align-items: stretch;
        border: 1px solid var(--md-default-fg-color--light);
        border-radius: 4px;
        background: var(--md-default-bg-color);
        transition: border-color 0.2s, box-shadow 0.2s;
        width: auto;
        flex-grow: 0;
    }
    .merkle-rehasher-assumptions .efficiency-group input[type="number"], .merkle-rehasher-assumptions .blocktime-group input[type="number"] {
        width: 80px;
        padding: 8px;
        border: none;
        font-size: 1em;
        color: var(--md-default-fg-color);
        outline: none;
        border-radius: 4px 0 0 4px;
        font-family: monospace;
    }
    .merkle-rehasher-assumptions .efficiency-group .unit, .merkle-rehasher-assumptions .blocktime-group .unit {
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
    .merkle-rehasher-assumptions .hash-section {
        display: flex;
        align-items: center;
        margin-bottom: 10px;
    }
    .merkle-rehasher-assumptions .hash-section .hash-input {
        display: flex;
        width: 100%;
        border: 1px solid var(--md-default-fg-color--light);
        border-radius: 4px;
        background: var(--md-default-bg-color);
    }
    .merkle-rehasher-assumptions .hash-section input {
        flex-grow: 1;
        border: none;
        padding: 8px;
        font-family: monospace;
        background: transparent;
        color: var(--md-default-fg-color);
    }
    .merkle-rehasher-assumptions .hash-section .link-unit {
        padding: 0 8px;
        font-size: 1em;
        color: var(--md-default-fg-color);
        pointer-events: auto;
        border-left: 1px solid var(--md-default-fg-color--light);
        background: rgba(var(--md-default-bg-color--rgb), 0.7);
        display: flex;
        align-items: center;
        border-radius: 0 4px 4px 0;
    }
    .merkle-rehasher-assumptions .hash-section .link-unit a {
        color: var(--md-default-fg-color);
        text-decoration: none;
        font-weight: bold;
    }
</style>

<div class="merkle-rehasher-input">

<div class="input-container">
    <div class="input-group">
        <div class="input-wrapper full-width">
            <textarea id="txids"></textarea>
        </div>
    </div>
</div>

<div id="error" aria-live="polite"></div>

</div>

!!! success "Found <span id="txidsCount">0</span> txids"
    <div id="txidsList" style="overflow: auto; max-height: 200px; font-family: monospace;"></div>

<div id="merkleRootSection" style="margin-top: 20px; font-family: monospace;">Merkle Root (network byte order): <strong id="merkleRoot">???</strong></div>

<script>
    function splitEveryN(input, n) {
        return input.split("").reduce((acc, cur) => {
            if (acc[acc.length - 1].length < n) {
                acc[acc.length - 1].push(cur);
            } else {
                acc.push([cur]);
            }
            return acc;
        }, [[]]).map(group => group.join(""));
    }

    function hexReverseByteOrder(input) {
        return splitEveryN(input, 2).reverse().join("");
    }

    async function sha256d(input) {
        const firstHash = await crypto.subtle.digest("SHA-256", input);
        const secondHash = await crypto.subtle.digest("SHA-256", firstHash);
        const hashArray = Array.from(new Uint8Array(secondHash));
        return hashArray.map(b => b.toString(16).padStart(2, "0")).join("");
    }

    function fromHexString(input) {
        return new Uint8Array(splitEveryN(input, 2).map(byte => parseInt(byte, 16)));
    }

    async function calculateMerkleRoot(txids) {
        if (txids.length === 0) return "";
        let leaves = txids.map(txid => hexReverseByteOrder(txid));
        while (leaves.length > 1) {
            let newLevel = [];
            for (let i = 0; i < leaves.length; i += 2) {
                let left = leaves[i];
                let right = (i + 1 < leaves.length) ? leaves[i + 1] : left;
                let combined = left + right;
                let hash = await sha256d(fromHexString(combined));
                newLevel.push(hash);
            }
            leaves = newLevel;
        }
        return hexReverseByteOrder(leaves[0]);
    }

    function validateInputs() {
        const txidsValue = document.getElementById('txids').value.trim();
        if (!txidsValue) {
            document.getElementById('error').innerHTML = '<p>TXIDs are required</p>';
            return false;
        }
        document.getElementById('error').innerHTML = '';
        return true;
    }

    async function calculate() {
        if (!validateInputs()) {
            document.getElementById('txidsCount').innerHTML = '0';
            document.getElementById('txidsList').innerHTML = '';
            document.getElementById('merkleRoot').innerHTML = '???';
            return;
        }
        const inputText = document.getElementById('txids').value.toLowerCase();
        const txids = [];
        const regex = /[0-9a-f]{64}/g;
        let match;
        while ((match = regex.exec(inputText)) !== null) {
            txids.push(match[0]);
        }
        const merkleRoot = await calculateMerkleRoot(txids);
        document.getElementById('txidsCount').innerHTML = txids.length.toLocaleString();
        document.getElementById('txidsList').innerHTML = txids.map(txid => `<div>${txid}</div>`).join('');
        document.getElementById('merkleRoot').innerHTML = merkleRoot;
    }

    document.getElementById('txids').addEventListener('input', calculate);

    calculate();
</script>

