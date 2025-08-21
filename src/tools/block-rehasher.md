# Block Rehasher

This tool takes a 80-byte Bitcoin block header in hex format, computes its proof-of-work hash, and calculates the difficulty from the nbits field. Verify block validity or explore mining difficulty.

<div class="block-rehasher-tool">

<style>
    .block-rehasher-tool .input-container {
        padding: 20px;
        border: 1px solid var(--md-default-fg-color--light);
        border-radius: 8px;
        background: var(--md-default-bg-color);
        margin-bottom: 20px;
    }
    .block-rehasher-tool .section-title {
        font-size: 1.2em;
        font-weight: bold;
        margin-bottom: 10px;
        color: var(--md-primary-fg-color);
        text-align: center;
    }
    .block-rehasher-tool .input-group {
        display: flex;
        align-items: center;
        margin-bottom: 15px;
    }
    .block-rehasher-tool .input-wrapper {
        display: flex;
        align-items: stretch;
        border: 1px solid var(--md-default-fg-color--light);
        border-radius: 4px;
        background: var(--md-default-bg-color);
        transition: border-color 0.2s, box-shadow 0.2s;
        flex-grow: 1;
    }
    .block-rehasher-tool .input-wrapper:hover {
        border-color: var(--md-primary-fg-color--light);
    }
    .block-rehasher-tool .input-wrapper:focus-within {
        border-color: var(--md-primary-fg-color);
        box-shadow: 0 0 5px rgba(var(--md-primary-fg-color--rgb), 0.3);
    }
    .block-rehasher-tool input[type="text"], .block-rehasher-tool textarea {
        width: 100%;
        padding: 8px;
        border: none;
        font-size: 1em;
        color: var(--md-default-fg-color);
        outline: none;
        font-family: monospace;
        border-radius: 4px;
    }
    .block-rehasher-tool textarea {
        resize: vertical;
        min-height: 100px;
    }
    .block-rehasher-tool .input-container label {
        font-size: 1em;
        color: var(--md-default-fg-color);
        margin-right: 10px;
        white-space: nowrap;
        width: 150px;
        text-align: right;
    }
    .block-rehasher-tool #error {
        margin-top: 10px;
        padding: 10px;
        border: 1px solid var(--md-typeset-color-error);
        border-radius: 4px;
        background: var(--md-default-bg-color);
        color: var(--md-typeset-color-error);
        font-size: 0.9em;
    }
    .block-rehasher-tool #results {
        margin-top: 20px;
        padding: 20px;
        background: var(--md-default-bg-color--light);
        border-radius: 8px;
    }
    .block-rehasher-tool #results strong {
        color: var(--md-primary-fg-color);
    }
    .block-rehasher-tool #summary {
        margin-top: 10px;
        font-size: 1em;
        line-height: 1.6;
        color: var(--md-default-fg-color);
    }
    .block-rehasher-tool .short-input .input-wrapper {
        width: 120px;
        flex-grow: 0;
    }
    .block-rehasher-tool .full-width {
        width: 100%;
    }
    .block-rehasher-tool .hash-section {
        display: flex;
        align-items: center;
        margin-bottom: 10px;
    }
    .block-rehasher-tool .hash-section .hash-input {
        display: flex;
        width: 100%;
        border: 1px solid var(--md-default-fg-color--light);
        border-radius: 4px;
        background: var(--md-default-bg-color);
    }
    .block-rehasher-tool .hash-section input {
        flex-grow: 1;
        border: none;
        padding: 8px;
        font-family: monospace;
        background: transparent;
        color: var(--md-default-fg-color);
    }
    .block-rehasher-tool .hash-section .link-unit {
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
    .block-rehasher-tool .hash-section .link-unit a {
        color: var(--md-default-fg-color);
        text-decoration: none;
        font-weight: bold;
    }
    .block-rehasher-tool .efficiency-group, .block-rehasher-tool .blocktime-group {
        display: flex;
        align-items: center;
        width: auto;
    }
    .block-rehasher-tool .assumptions {
        font-weight: bold;
        margin-top: 15px;
    }
    .block-rehasher-tool .assumptions-line {
        display: flex;
        align-items: center;
        gap: 10px;
    }
    .block-rehasher-tool .efficiency-group .input-wrapper, .block-rehasher-tool .blocktime-group .input-wrapper {
        display: flex;
        align-items: stretch;
        border: 1px solid var(--md-default-fg-color--light);
        border-radius: 4px;
        background: var(--md-default-bg-color);
        transition: border-color 0.2s, box-shadow 0.2s;
        width: auto;
        flex-grow: 0;
    }
    .block-rehasher-tool .efficiency-group input[type="number"], .block-rehasher-tool .blocktime-group input[type="number"] {
        width: 80px;
        padding: 8px;
        border: none;
        font-size: 1em;
        color: var(--md-default-fg-color);
        outline: none;
        border-radius: 4px 0 0 4px;
        font-family: monospace;
    }
    .block-rehasher-tool .efficiency-group .unit, .block-rehasher-tool .blocktime-group .unit {
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
</style>

<div class="input-container">
    <div class="section-title">Block Header Hex (Little-Endian)</div>
    <div class="input-group">
        <div class="input-wrapper full-width">
            <textarea id="block_header"></textarea>
        </div>
    </div>

    <div class="section-title">Header Fields (Big-Endian)</div>
    <div class="input-group short-input">
        <label for="version">Version:</label>
        <div class="input-wrapper">
            <input type="text" id="version" maxlength="8">
        </div>
    </div>
    <div class="input-group">
        <label for="prev_hash">Previous Hash:</label>
        <div class="input-wrapper">
            <input type="text" id="prev_hash" maxlength="64">
        </div>
    </div>
    <div class="input-group">
        <label for="merkle_root">Merkle Root:</label>
        <div class="input-wrapper">
            <input type="text" id="merkle_root" maxlength="64">
        </div>
    </div>
    <div class="input-group short-input">
        <label for="timestamp">Timestamp:</label>
        <div class="input-wrapper">
            <input type="text" id="timestamp" maxlength="8">
        </div>
    </div>
    <div class="input-group short-input">
        <label for="bits">Bits:</label>
        <div class="input-wrapper">
            <input type="text" id="bits" maxlength="8">
        </div>
    </div>
    <div class="input-group short-input">
        <label for="nonce">Nonce:</label>
        <div class="input-wrapper">
            <input type="text" id="nonce" maxlength="8">
        </div>
    </div>
</div>

<div id="error" aria-live="polite"></div>
<div id="results"></div>

</div>

<script>
    let updating = false;

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

    const MAX_TARGET = 0x00000000FFFFn * (2n ** (8n * (0x1Dn - 3n)));

    function getTargetFromBits(bits_le) {
        const bits_be = hexReverseByteOrder(bits_le);
        const exp = BigInt(parseInt(bits_be.substring(0, 2), 16));
        const mult = BigInt('0x' + bits_be.substring(2));
        return mult * (2n ** (8n * (exp - 3n)));
    }

    function getDifficultyFromTarget(target) {
        return MAX_TARGET / target;
    }

    function getDifficultyFromHash(hash_be) {
        const hash_num = BigInt('0x' + hash_be);
        if (hash_num === 0n) return 0n;
        return MAX_TARGET / hash_num;
    }

    const units = [
        '', 'thousand', 'million', 'billion', 'trillion', 'quadrillion',
        'quintillion', 'sextillion', 'septillion', 'octillion', 'nonillion'
    ];

    function formatBigIntWithWords(bigNum) {
        if (bigNum < 1000n) return bigNum.toString();
        let unitIndex = 0;
        let fractional = 0n;
        let integer = bigNum;
        while (integer >= 1000n && unitIndex < units.length - 1) {
            fractional = integer % 1000n;
            integer /= 1000n;
            unitIndex++;
        }
        let result = integer.toString();
        if (fractional > 0n) {
            const fracStr = fractional.toString().padStart(3, '0').slice(0, 2).replace(/0+$/, '');
            if (fracStr) result += '.' + fracStr;
        }
        if (unitIndex > 0) result += ' ' + units[unitIndex];
        return result;
    }

    const powerUnits = ['W', 'kW', 'MW', 'GW', 'TW', 'PW'];
    const energyUnits = ['Wh', 'kWh', 'MWh', 'GWh', 'TWh', 'PWh'];

    function formatPowerOrEnergy(value, unitArray) {
        let unitIndex = 0;
        while (value >= 1000 && unitIndex < unitArray.length - 1) {
            value /= 1000;
            unitIndex++;
        }
        return value.toFixed(2) + ' ' + unitArray[unitIndex];
    }

    function updateFromFields() {
        if (updating) return;
        updating = true;
        const version_be = cleanHex(document.getElementById('version').value).padStart(8, '0').slice(-8);
        const prev_be = cleanHex(document.getElementById('prev_hash').value).padStart(64, '0').slice(-64);
        const merkle_be = cleanHex(document.getElementById('merkle_root').value).padStart(64, '0').slice(-64);
        const timestamp_be = cleanHex(document.getElementById('timestamp').value).padStart(8, '0').slice(-8);
        const bits_be = cleanHex(document.getElementById('bits').value).padStart(8, '0').slice(-8);
        const nonce_be = cleanHex(document.getElementById('nonce').value).padStart(8, '0').slice(-8);
        const version_le = hexReverseByteOrder(version_be);
        const prev_le = hexReverseByteOrder(prev_be);
        const merkle_le = hexReverseByteOrder(merkle_be);
        const timestamp_le = hexReverseByteOrder(timestamp_be);
        const bits_le = hexReverseByteOrder(bits_be);
        const nonce_le = hexReverseByteOrder(nonce_be);
        const fullHeader = version_le + prev_le + merkle_le + timestamp_le + bits_le + nonce_le;
        document.getElementById('block_header').value = fullHeader;
        updating = false;
        calculate();
        updateURL(fullHeader);
    }

    function updateFromHeader() {
        if (updating) return;
        updating = true;
        let header = cleanHex(document.getElementById('block_header').value);
        if (header.length !== 160) {
            updating = false;
            return;
        }
        document.getElementById('version').value = hexReverseByteOrder(header.substring(0, 8));
        document.getElementById('prev_hash').value = hexReverseByteOrder(header.substring(8, 72));
        document.getElementById('merkle_root').value = hexReverseByteOrder(header.substring(72, 136));
        document.getElementById('timestamp').value = hexReverseByteOrder(header.substring(136, 144));
        document.getElementById('bits').value = hexReverseByteOrder(header.substring(144, 152));
        document.getElementById('nonce').value = hexReverseByteOrder(header.substring(152, 160));
        updating = false;
        calculate();
        updateURL(header);
    }

    function validateInputs() {
        const headerValue = cleanHex(document.getElementById('block_header').value);
        if (headerValue.length !== 160) {
            document.getElementById('error').innerHTML = '<p>Block header must be exactly 160 hex characters (80 bytes)</p>';
            return false;
        }
        const efficiency = parseFloat(document.getElementById('efficiency')?.value ?? "20");
        if (isNaN(efficiency) || efficiency <= 0) {
            document.getElementById('error').innerHTML = '<p>Efficiency must be a positive number</p>';
            return false;
        }
        const blockTimeMinutes = parseFloat(document.getElementById('block_time')?.value ?? "10");
        if (isNaN(blockTimeMinutes) || blockTimeMinutes <= 0) {
            document.getElementById('error').innerHTML = '<p>Block time must be a positive number</p>';
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
        const blockHeader = cleanHex(document.getElementById('block_header').value);
        const blockHash = hexReverseByteOrder(await sha256d(fromHexString(blockHeader)));
        const bits_le = blockHeader.substring(144, 152);
        const target = getTargetFromBits(bits_le);
        const networkDiffBig = getDifficultyFromTarget(target);
        const hashDiffBig = getDifficultyFromHash(blockHash);
        const networkDiffFormatted = formatBigIntWithWords(networkDiffBig);
        const hashDiffFormatted = formatBigIntWithWords(hashDiffBig);

        let efficiency = parseFloat(document.getElementById('efficiency')?.value ?? "20");
        let blockTimeMinutes = parseFloat(document.getElementById('block_time')?.value ?? "10");

        const two32 = 4294967296n;
        const blockTimeSeconds = BigInt(Math.round(blockTimeMinutes * 60));
        const hashrate_hs = (networkDiffBig * two32) / blockTimeSeconds;
        const hashrate_ths = Number(hashrate_hs / 1000000000000n);

        const power_w = hashrate_ths * efficiency;

        const time_hours = blockTimeMinutes / 60;
        const energy_wh = power_w * time_hours;

        const formattedPower = formatPowerOrEnergy(power_w, powerUnits);
        const formattedEnergy = formatPowerOrEnergy(energy_wh, energyUnits);
        const formattedBlockTime = blockTimeMinutes.toFixed(1);

        const resultsDiv = document.getElementById('results');
        resultsDiv.innerHTML = `
            <div class="hash-section">
                <div class="hash-input">
                    <input type="text" value="${blockHash}" readonly>
                    <div class="link-unit">
                        <a href="https://mempool.space/block/${blockHash}" target="_blank">🔗</a>
                    </div>
                </div>
            </div>
            Difficulty: ${hashDiffFormatted}<br><br>
            With a Network Difficulty ${networkDiffFormatted}, the Bitcoin network likely consumed about ${formattedEnergy} of electricity over ${formattedBlockTime} minutes in order to find this block, harnessing ${formattedPower} of electrical power.<br>
            <div class="assumptions">Assumptions:</div>
            <div class="assumptions-line">
                <div class="efficiency-group">
                    <div class="input-wrapper">
                        <input type="number" id="efficiency" value="${efficiency}" step="0.1" min="0">
                        <span class="unit">W/TH</span>
                    </div>
                </div>
                and
                <div class="blocktime-group">
                    <div class="input-wrapper">
                        <input type="number" id="block_time" value="${blockTimeMinutes}" step="0.1" min="0">
                        <span class="unit">min</span>
                    </div>
                </div>
            </div>
        `;
        document.getElementById('efficiency').addEventListener('input', calculate);
        document.getElementById('block_time').addEventListener('input', calculate);
    }

    function updateURL(header) {
        const newUrl = new URL(window.location);
        if (header.length === 160) {
            newUrl.searchParams.set('blockheader', header);
        } else {
            newUrl.searchParams.delete('blockheader');
        }
        history.replaceState(null, '', newUrl);
    }

    const fields = ['version', 'prev_hash', 'merkle_root', 'timestamp', 'bits', 'nonce'];
    fields.forEach(id => {
        document.getElementById(id).addEventListener('input', updateFromFields);
    });
    document.getElementById('block_header').addEventListener('input', updateFromHeader);

    // Load from query param on page load
    function loadFromQuery() {
        const params = new URLSearchParams(window.location.search);
        const blockheader = params.get('blockheader');
        if (blockheader && cleanHex(blockheader).length === 160) {
            document.getElementById('block_header').value = blockheader;
            updateFromHeader();
        }
    }

    loadFromQuery();
</script>

