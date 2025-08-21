# Stratum Rehasher

This tool reconstructs a Bitcoin block header from Stratum mining protocol parameters and computes the proof-of-work hash. Verify submissions or understand how mining pools communicate work to miners.

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
    input[type="text"], textarea {
        width: 100%;
        padding: 8px;
        border: none;
        font-size: 1em;
        color: var(--md-default-fg-color);
        outline: none;
        font-family: monospace;
    }
    textarea {
        resize: vertical;
        min-height: 100px;
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

<form id="stratumForm" class="input-container">
    <div class="input-group">
        <label for="version_mask">Version Mask:</label>
        <div class="input-wrapper">
            <input type="text" id="version_mask" value="1fffe000">
        </div>
    </div>
    <div class="input-group">
        <label for="extranonce1">Extranonce1:</label>
        <div class="input-wrapper">
            <input type="text" id="extranonce1">
        </div>
    </div>
    <div class="input-group">
        <label for="prevhash">Prevhash:</label>
        <div class="input-wrapper">
            <input type="text" id="prevhash">
        </div>
    </div>
    <div class="input-group">
        <label for="coinbase1">Coinbase1:</label>
        <div class="input-wrapper">
            <input type="text" id="coinbase1">
        </div>
    </div>
    <div class="input-group">
        <label for="coinbase2">Coinbase2:</label>
        <div class="input-wrapper">
            <input type="text" id="coinbase2">
        </div>
    </div>
    <div class="input-group">
        <label for="merkle_branches">Merkle Branches:</label>
        <div class="input-wrapper">
            <textarea id="merkle_branches"></textarea>
        </div>
    </div>
    <div class="input-group">
        <label for="job_version">Job Version:</label>
        <div class="input-wrapper">
            <input type="text" id="job_version">
        </div>
    </div>
    <div class="input-group">
        <label for="nbits">Nbits:</label>
        <div class="input-wrapper">
            <input type="text" id="nbits">
        </div>
    </div>
    <div class="input-group">
        <label for="extranonce2">Extranonce2:</label>
        <div class="input-wrapper">
            <input type="text" id="extranonce2">
        </div>
    </div>
    <div class="input-group">
        <label for="ntime">Ntime:</label>
        <div class="input-wrapper">
            <input type="text" id="ntime">
        </div>
    </div>
    <div class="input-group">
        <label for="nonce">Nonce:</label>
        <div class="input-wrapper">
            <input type="text" id="nonce">
        </div>
    </div>
    <div class="input-group">
        <label for="miner_version">Miner Version:</label>
        <div class="input-wrapper">
            <input type="text" id="miner_version">
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

    function hexSwapEndiannessWordwise(input, wordSize) {
        return splitEveryN(input, wordSize * 2).map(val => hexReverseByteOrder(val)).join("");
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

    async function getMerkleRoot(precursors) {
        const coinbase = precursors.cb1 + precursors.extranonce1 + precursors.extranonce2 + precursors.cb2;
        let merkleRoot = await sha256d(fromHexString(coinbase));
        for (const hash of precursors.merkleBranches) {
            merkleRoot = await sha256d(fromHexString(merkleRoot + hash));
        }
        return merkleRoot;
    }

    function cleanHex(input) {
        return input.toLowerCase().replace(/[^0-9a-f]/g, "");
    }

    function cleanHexList(input) {
        return input.toLowerCase().replace(/[^0-9a-f,]/g, "");
    }

    function getNVersion(mask, jobVersion, minerVersion) {
        return ((parseInt(jobVersion, 16) & ~parseInt(mask, 16)) | (parseInt(minerVersion, 16) & parseInt(mask, 16))).toString(16);
    }

    async function rehashFromRoot(blockHdr) {
        const blockHeader = [
            hexSwapEndiannessWordwise(blockHdr.nVersion, 4),
            hexSwapEndiannessWordwise(blockHdr.prevhash, 4),
            blockHdr.merkleRoot,
            hexSwapEndiannessWordwise(blockHdr.ntime, 4),
            hexSwapEndiannessWordwise(blockHdr.nbits, 4),
            hexSwapEndiannessWordwise(blockHdr.nonce, 4)
        ].join("");
        const hash = await sha256d(fromHexString(blockHeader));
        return hexReverseByteOrder(hash);
    }

    function validateInputs() {
        const fields = ['version_mask', 'extranonce1', 'prevhash', 'coinbase1', 'coinbase2', 'job_version', 'nbits', 'extranonce2', 'ntime', 'nonce', 'miner_version'];
        const errors = [];
        fields.forEach(field => {
            const value = document.getElementById(field).value.trim();
            if (!value) errors.push(`${field} is required`);
        });
        const merkleBranches = document.getElementById('merkle_branches').value.trim();
        if (!merkleBranches) errors.push('merkle_branches is required');
        const errorDiv = document.getElementById('error');
        if (errors.length > 0) {
            errorDiv.innerHTML = `<p>${errors.join('<br>')}</p>`;
            return false;
        } else {
            errorDiv.innerHTML = '';
            return true;
        }
    }

    async function calculate() {
        if (!validateInputs()) {
            document.getElementById('results').innerHTML = '';
            return;
        }
        const versionMask = cleanHex(document.getElementById('version_mask').value);
        const extranonce1 = cleanHex(document.getElementById('extranonce1').value);
        const prevhash = cleanHex(document.getElementById('prevhash').value);
        const cb1 = cleanHex(document.getElementById('coinbase1').value);
        const cb2 = cleanHex(document.getElementById('coinbase2').value);
        const merkleBranchesRaw = cleanHexList(document.getElementById('merkle_branches').value);
        const merkleBranches = merkleBranchesRaw.split(',').filter(Boolean);
        const jobVersion = cleanHex(document.getElementById('job_version').value);
        const nbits = cleanHex(document.getElementById('nbits').value);
        const extranonce2 = cleanHex(document.getElementById('extranonce2').value);
        const ntime = cleanHex(document.getElementById('ntime').value);
        const nonce = cleanHex(document.getElementById('nonce').value);
        const minerVersion = cleanHex(document.getElementById('miner_version').value);
        const merkleRoot = await getMerkleRoot({
            cb1,
            extranonce1,
            extranonce2,
            cb2,
            merkleBranches
        });
        const blockHash = await rehashFromRoot({
            merkleRoot,
            nVersion: getNVersion(versionMask, jobVersion, minerVersion),
            prevhash,
            nbits,
            ntime,
            nonce
        });
        const resultsDiv = document.getElementById('results');
        resultsDiv.innerHTML = `Block Hash: <strong>${blockHash}</strong>`;
    }

    document.querySelectorAll('#stratumForm input, #stratumForm textarea').forEach(element => {
        element.addEventListener('input', calculate);
    });

    calculate();
</script>

