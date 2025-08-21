# Merkle Rehasher

This tool computes the Merkle root from a list of transaction IDs (TXIDs). Enter TXIDs as hex strings, one per line, to reconstruct the Merkle root used in Bitcoin block headers.

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
        flex-grow: 1;
    }
    .input-wrapper:hover {
        border-color: var(--md-primary-fg-color--light);
    }
    .input-wrapper:focus-within {
        border-color: var(--md-primary-fg-color);
        box-shadow: 0 0 5px rgba(var(--md-primary-fg-color--rgb), 0.3);
    }
    textarea {
        width: 100%;
        padding: 8px;
        border: none;
        font-size: 1em;
        color: var(--md-default-fg-color);
        outline: none;
        font-family: monospace;
        resize: vertical;
        min-height: 200px;
    }
    .input-container label {
        font-size: 1em;
        color: var(--md-default-fg-color);
        margin-right: 10px;
        white-space: nowrap;
        width: 150px;
        text-align: right;
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
        padding: 10px;
        background: var(--md-default-bg-color--light);
        border-radius: 4px;
        font-family: monospace;
        word-break: break-all;
    }
    #results strong {
        color: var(--md-primary-fg-color);
    }
</style>

<form id="merkleForm" class="input-container">
    <div class="input-group">
        <label for="txids">TXIDs (one per line):</label>
        <div class="input-wrapper">
            <textarea id="txids"></textarea>
        </div>
    </div>
</form>

<div id="error" aria-live="polite"></div>
<div id="results"></div>

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

    function cleanHex(input) {
        return input.toLowerCase().replace(/[^0-9a-f]/g, "");
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
            document.getElementById('results').innerHTML = '';
            return;
        }
        const txidsRaw = document.getElementById('txids').value.split('\n').map(line => cleanHex(line.trim())).filter(Boolean);
        const merkleRoot = await calculateMerkleRoot(txidsRaw);
        const resultsDiv = document.getElementById('results');
        resultsDiv.innerHTML = `Merkle Root: <strong>${merkleRoot}</strong>`;
    }

    document.getElementById('txids').addEventListener('input', calculate);

    calculate();
</script>

