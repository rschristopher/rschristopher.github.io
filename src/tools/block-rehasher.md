# Block Rehasher

This tool re-hashes an 80-byte Bitcoin block header in hex format. You can test with real block headers, such as <a target="_self" href="?blockheader=00601727aaf94cd662ee542a36c9057f4911e04abe1f13fd51fc00000000000000000000f3674e33b908d6725c160e1d670651b2829e7543b2a7399bd127911feb11387aa4059d68b32c021736431e4a">909909</a> or the <a target="_self" href="?blockheader=010000006fe28c0ab6f1b372c1a6a246ae63f74f931e8365e15a089c68d6190000000000982051fd1e4ba744bbbe680e1fee14677ba1a3c3540bf7b1cdb606e857233e0e61bc6649ffff001d01e36299">genesis block</a>.

<style>
.block-rehasher-input .input-container {
    padding: 20px;
    border: 1px solid var(--md-default-fg-color--light);
    border-radius: 8px;
    background: var(--md-default-bg-color);
    margin-bottom: 10px;
}
.block-rehasher-input .section-title {
    font-size: 1.2em;
    font-weight: bold;
    margin-bottom: 10px;
    color: var(--md-primary-fg-color);
    text-align: center;
}
.block-rehasher-input .input-group {
    display: flex;
    align-items: center;
    margin-bottom: 15px;
}
.block-rehasher-input .input-wrapper,
.block-rehasher-assumptions .input-wrapper {
    display: flex;
    align-items: stretch;
    border: 1px solid var(--md-default-fg-color--light);
    border-radius: 4px;
    background: var(--md-default-bg-color);
    transition: border-color 0.2s, box-shadow 0.2s;
    flex-grow: 1;
}
.block-rehasher-input .input-wrapper:hover,
.block-rehasher-assumptions .input-wrapper:hover {
    border-color: var(--md-primary-fg-color--light);
}
.block-rehasher-input .input-wrapper:focus-within,
.block-rehasher-assumptions .input-wrapper:focus-within {
    border-color: var(--md-primary-fg-color);
    box-shadow: 0 0 5px rgba(var(--md-primary-fg-color--rgb), 0.3);
}
.block-rehasher-input input[type="text"],
.block-rehasher-input textarea,
.block-rehasher-assumptions input[type="number"] {
    width: 100%;
    padding: 8px;
    border: none;
    font-size: 1em;
    color: var(--md-default-fg-color);
    outline: none;
    font-family: monospace;
    border-radius: 4px;
}
.block-rehasher-input textarea {
    resize: vertical;
    min-height: 100px;
}
.block-rehasher-input .input-container label {
    font-size: 1em;
    color: var(--md-default-fg-color);
    margin-right: 10px;
    white-space: nowrap;
    width: 150px;
    text-align: right;
}
.block-rehasher-input #error {
    margin-top: 10px;
    padding: 10px;
    border: 1px solid var(--md-typeset-color-error);
    border-radius: 4px;
    background: var(--md-default-bg-color);
    color: var(--md-typeset-color-error);
    font-size: 0.9em;
}
.block-rehasher-input .short-input .input-wrapper {
    width: 120px;
    flex-grow: 0;
}
.block-rehasher-input .full-width {
    width: 100%;
}
.block-rehasher-assumptions .assumptions-line {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-top: 15px;
}
.block-rehasher-assumptions .assumptions {
    font-weight: bold;
    margin-right: 10px;
}
.block-rehasher-assumptions .efficiency-group,
.block-rehasher-assumptions .blocktime-group {
    display: inline-flex;
    align-items: center;
}
.block-rehasher-assumptions .efficiency-group .input-wrapper,
.block-rehasher-assumptions .blocktime-group .input-wrapper {
    width: auto;
}
.block-rehasher-assumptions .efficiency-group input[type="number"],
.block-rehasher-assumptions .blocktime-group input[type="number"] {
    width: 80px;
    border-radius: 4px 0 0 4px;
}
.block-rehasher-assumptions .efficiency-group .unit,
.block-rehasher-assumptions .blocktime-group .unit {
    padding: 0 8px;
    font-size: 1em;
    color: var(--md-default-fg-color);
    border-left: 1px solid var(--md-default-fg-color--light);
    background: rgba(var(--md-default-bg-color--rgb), 0.7);
    display: flex;
    align-items: center;
    border-radius: 0 4px 4px 0;
}
.block-rehasher-assumptions a#mempoolLink {
    margin-left: 10px;
    font-size: 1em;
    color: var(--md-default-fg-color);
    text-decoration: none;
    font-weight: bold;
}
</style>

<div class="block-rehasher-input">
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
</div>

!!! success "rehash: <span id="reHash">???</span> <a href="https://mempool.space/block/???" target="_blank" id="mempoolLink">🔗</a>"
    <span id="reHashResults" class="block-rehasher-assumptions">...</span>

<script>
let updating = false;

function cleanHex(input = '') {
    return input.toLowerCase().replace(/[^0-9a-f]/g, "");
}

function splitEveryN(input, n) {
    return input.match(new RegExp(`.{1,${n}}`, 'g')) || [];
}

function hexReverseByteOrder(input) {
    return splitEveryN(input, 2).reverse().join("");
}

async function sha256d(input) {
    const firstHash = await crypto.subtle.digest("SHA-256", input);
    const secondHash = await crypto.subtle.digest("SHA-256", firstHash);
    return Array.from(new Uint8Array(secondHash))
        .map(b => b.toString(16).padStart(2, "0")).join("");
}

function fromHexString(input) {
    return new Uint8Array(splitEveryN(input, 2).map(byte => parseInt(byte, 16)));
}

const MAX_TARGET = 0x00000000FFFFn * (2n ** (8n * (0x1Dn - 3n)));

function getTargetFromBits(bits_le) {
    const bits_be = hexReverseByteOrder(bits_le);
    const exp = BigInt(parseInt(bits_be.slice(0, 2), 16));
    const mantissa = BigInt('0x' + bits_be.slice(2));
    return mantissa * (2n ** (8n * (exp - 3n)));
}

function getDifficultyFromTarget(target) {
    return target ? MAX_TARGET / target : 0n;
}

function getDifficultyFromHash(hash_be) {
    const hash_num = BigInt('0x' + hash_be);
    return hash_num ? MAX_TARGET / hash_num : 0n;
}

function formatNumberWithUnits(num) {
    if (num < 1000n) return num.toString();
    const units = ['', 'thousand', 'million', 'billion', 'trillion', 'quadrillion', 'quintillion'];
    let unitIndex = 0, fractional = 0n, integer = num;
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
    return unitIndex > 0 ? result + ' ' + units[unitIndex] : result;
}

function formatPower(value) {
    const units = ['W', 'kW', 'MW', 'GW', 'TW', 'PW'];
    let unitIndex = 0;
    while (value >= 1000 && unitIndex < units.length - 1) {
        value /= 1000;
        unitIndex++;
    }
    return value.toFixed(2) + ' ' + units[unitIndex];
}

function formatTime(minutes) {
    return Number.isInteger(minutes) ? minutes.toString() : minutes.toFixed(1);
}

function validateInputs() {
    const blockHeader = document.getElementById('block_header');
    const error = document.getElementById('error');
    if (!blockHeader || !error) return false;

    const header = cleanHex(blockHeader.value);
    if (header.length !== 160) {
        error.innerHTML = '<p>Block header must be exactly 160 hex characters (80 bytes)</p>';
        return false;
    }

    const efficiency = parseFloat(document.getElementById('efficiency')?.value || 20);
    if (efficiency <= 0) {
        error.innerHTML = '<p>Efficiency must be a positive number</p>';
        return false;
    }

    const blockTime = parseFloat(document.getElementById('block_time')?.value || 10);
    if (blockTime <= 0) {
        error.innerHTML = '<p>Block time must be a positive number</p>';
        return false;
    }

    error.innerHTML = '';
    return { header, efficiency, blockTime };
}

async function calculate() {
    const reHash = document.getElementById('reHash');
    const mempoolLink = document.getElementById('mempoolLink');
    const results = document.getElementById('reHashResults');
    if (!reHash || !mempoolLink || !results) return;

    const inputs = validateInputs();
    if (!inputs) {
        reHash.innerHTML = '???';
        mempoolLink.href = 'https://mempool.space/block/???';
        results.innerHTML = '...';
        return;
    }

    const { header, efficiency, blockTime } = inputs;
    const blockHash = hexReverseByteOrder(await sha256d(fromHexString(header)));
    const bits_le = header.slice(144, 152);
    const target = getTargetFromBits(bits_le);
    const networkDiff = getDifficultyFromTarget(target);
    const hashDiff = getDifficultyFromHash(blockHash);
    const networkDiffFormatted = formatNumberWithUnits(networkDiff);
    const hashDiffFormatted = formatNumberWithUnits(hashDiff);

    const blockTimeSeconds = BigInt(Math.round(blockTime * 60));
    const hashrate_ths = Number((networkDiff * 4294967296n) / blockTimeSeconds) / 1e12;
    const power_w = hashrate_ths * efficiency;
    const energy_wh = power_w * (blockTime / 60);

    const formattedPower = formatPower(power_w);
    const formattedEnergy = formatPower(energy_wh);
    const formattedBlockTime = formatTime(blockTime);

    const consumptionText = (energy_wh < 1 || power_w < 1)
        ? `With a Network Difficulty ${networkDiffFormatted}, the Bitcoin network likely consumed negligible electricity over ${formattedBlockTime} minutes in order to find this block, harnessing negligible electrical power.`
        : `With a Network Difficulty ${networkDiffFormatted}, the Bitcoin network likely consumed about ${formattedEnergy} of electricity over ${formattedBlockTime} minutes in order to find this block, harnessing ${formattedPower} of electrical power.`;

    reHash.innerHTML = blockHash;
    mempoolLink.href = `https://mempool.space/block/${blockHash}`;
    results.innerHTML = `
        Difficulty: ${hashDiffFormatted}<br><br>
        ${consumptionText}<br><br>
        <div class="assumptions-line">
            <span class="assumptions">Assumptions:</span>
            <div class="efficiency-group">
                <div class="input-wrapper">
                    <input type="number" id="efficiency" value="${efficiency}" step="0.1" min="0">
                    <span class="unit">W/TH</span>
                </div>
            </div>
            and
            <div class="blocktime-group">
                <div class="input-wrapper">
                    <input type="number" id="block_time" value="${blockTime}" step="0.1" min="0">
                    <span class="unit">minutes</span>
                </div>
            </div>
        </div>
    `;
    document.getElementById('efficiency').addEventListener('input', calculate);
    document.getElementById('block_time').addEventListener('input', calculate);
}

function updateFromFields() {
    if (updating) return;
    updating = true;
    const fields = ['version', 'prev_hash', 'merkle_root', 'timestamp', 'bits', 'nonce'];
    const pads = [8, 64, 64, 8, 8, 8];
    const fullHeader = fields
        .map((id, i) => {
            const value = cleanHex(document.getElementById(id).value).padStart(pads[i], '0').slice(-pads[i]);
            return hexReverseByteOrder(value);
        })
        .join('');
    document.getElementById('block_header').value = fullHeader;
    updateURL(fullHeader);
    calculate();
    updating = false;
}

function updateFromHeader() {
    if (updating) return;
    updating = true;
    const blockHeader = document.getElementById('block_header');
    if (!blockHeader) {
        updating = false;
        return;
    }
    const header = cleanHex(blockHeader.value);
    if (header.length !== 160) {
        document.getElementById('error').innerHTML = '<p>Block header must be exactly 160 hex characters (80 bytes)</p>';
        document.getElementById('reHash').innerHTML = '???';
        document.getElementById('mempoolLink').href = 'https://mempool.space/block/???';
        document.getElementById('reHashResults').innerHTML = '...';
        updating = false;
        return;
    }
    const slices = [0, 8, 72, 136, 144, 152, 160];
    const ids = ['version', 'prev_hash', 'merkle_root', 'timestamp', 'bits', 'nonce'];
    ids.forEach((id, i) => {
        const element = document.getElementById(id);
        if (element) {
            element.value = hexReverseByteOrder(header.slice(slices[i], slices[i + 1]));
        }
    });
    calculate();
    updating = false;
}

function updateURL(header) {
    const url = new URL(window.location);
    if (header.length === 160) {
        url.searchParams.set('blockheader', header);
    } else {
        url.searchParams.delete('blockheader');
    }
    history.replaceState(null, '', url);
}

document.addEventListener('DOMContentLoaded', () => {
    const blockHeader = document.getElementById('block_header');
    const reHash = document.getElementById('reHash');
    const mempoolLink = document.getElementById('mempoolLink');
    const results = document.getElementById('reHashResults');
    if (!blockHeader || !reHash || !mempoolLink || !results) return;

    const params = new URLSearchParams(window.location.search);
    const blockheader = params.get('blockheader');
    blockHeader.value = (blockheader && cleanHex(blockheader).length === 160)
        ? blockheader
        : '00601727aaf94cd662ee542a36c9057f4911e04abe1f13fd51fc00000000000000000000f3674e33b908d6725c160e1d670651b2829e7543b2a7399bd127911feb11387aa4059d68b32c021736431e4a';

    ['version', 'prev_hash', 'merkle_root', 'timestamp', 'bits', 'nonce'].forEach(id => {
        const element = document.getElementById(id);
        if (element) element.addEventListener('input', updateFromFields);
    });
    blockHeader.addEventListener('input', updateFromHeader);

    updateFromHeader();
});
</script>

