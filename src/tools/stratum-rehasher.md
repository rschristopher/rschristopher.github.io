# Stratum Rehasher

This tool reconstructs a Bitcoin block header from Stratum mining protocol parameters and computes the proof-of-work hash. Verify submissions or understand how mining pools communicate work to miners.

<style>
    .stratum-rehasher-input .input-container {
        padding: 20px;
        border: 1px solid var(--md-default-fg-color--light);
        border-radius: 8px;
        background: var(--md-default-bg-color);
        margin-bottom: 10px;
    }
    .stratum-rehasher-input .section-title {
        font-size: 1.2em;
        font-weight: bold;
        margin-bottom: 10px;
        color: var(--md-primary-fg-color);
        text-align: center;
    }
    .stratum-rehasher-input .input-group {
        display: flex;
        align-items: center;
        margin-bottom: 15px;
    }
    .stratum-rehasher-input .input-wrapper,
    .stratum-rehasher-assumptions .input-wrapper {
        display: flex;
        align-items: stretch;
        border: 1px solid var(--md-default-fg-color--light);
        border-radius: 4px;
        background: var(--md-default-bg-color);
        transition: border-color 0.2s, box-shadow 0.2s;
        flex-grow: 1;
    }
    .stratum-rehasher-input .input-wrapper:hover,
    .stratum-rehasher-assumptions .input-wrapper:hover {
        border-color: var(--md-primary-fg-color--light);
    }
    .stratum-rehasher-input .input-wrapper:focus-within,
    .stratum-rehasher-assumptions .input-wrapper:focus-within {
        border-color: var(--md-primary-fg-color);
        box-shadow: 0 0 5px rgba(var(--md-primary-fg-color--rgb), 0.3);
    }
    .stratum-rehasher-input input[type="text"],
    .stratum-rehasher-input textarea,
    .stratum-rehasher-assumptions input[type="number"] {
        width: 100%;
        padding: 8px;
        border: none;
        font-size: 1em;
        color: var(--md-default-fg-color);
        outline: none;
        font-family: monospace;
        border-radius: 4px;
    }
    .stratum-rehasher-input textarea {
        resize: vertical;
        min-height: 100px;
    }
    .stratum-rehasher-input .input-container label {
        font-size: 1em;
        color: var(--md-default-fg-color);
        margin-right: 10px;
        white-space: nowrap;
        width: 150px;
        text-align: right;
    }
    .stratum-rehasher-input #error {
        margin-top: 10px;
        padding: 10px;
        border: 1px solid var(--md-typeset-color-error);
        border-radius: 4px;
        background: var(--md-default-bg-color);
        color: var(--md-typeset-color-error);
        font-size: 0.9em;
    }
    .stratum-rehasher-input .short-input .input-wrapper {
        width: 120px;
        flex-grow: 0;
    }
    .stratum-rehasher-input .full-width {
        width: 100%;
    }
    .stratum-rehasher-assumptions .assumptions {
        font-weight: bold;
        margin-right: 10px;
    }
    .stratum-rehasher-assumptions .assumptions-line {
        display: flex;
        align-items: center;
        gap: 10px;
        margin-top: 15px;
    }
    .stratum-rehasher-assumptions .efficiency-group, .stratum-rehasher-assumptions .blocktime-group {
        display: inline-flex;
        align-items: center;
    }
    .stratum-rehasher-assumptions .efficiency-group .input-wrapper, .stratum-rehasher-assumptions .blocktime-group .input-wrapper {
        width: auto;
    }
    .stratum-rehasher-assumptions .efficiency-group input[type="number"], .stratum-rehasher-assumptions .blocktime-group input[type="number"] {
        width: 80px;
        border-radius: 4px 0 0 4px;
    }
    .stratum-rehasher-assumptions .efficiency-group .unit, .stratum-rehasher-assumptions .blocktime-group .unit {
        padding: 0 8px;
        font-size: 1em;
        color: var(--md-default-fg-color);
        border-left: 1px solid var(--md-default-fg-color--light);
        background: rgba(var(--md-default-bg-color--rgb), 0.7);
        display: flex;
        align-items: center;
        border-radius: 0 4px 4px 0;
    }
    .stratum-rehasher-assumptions a#mempoolLink {
        margin-left: 10px;
        font-size: 1em;
        color: var(--md-default-fg-color);
        text-decoration: none;
        font-weight: bold;
    }
</style>

<div class="stratum-rehasher-input">
    <div class="input-container">
        <div class="section-title">Stratum Handshake</div>
        <div class="input-group short-input">
            <label for="version_mask">VersionMask:</label>
            <div class="input-wrapper">
                <input type="text" id="version_mask" value="1fffe000">
            </div>
        </div>
        <div class="input-group short-input">
            <label for="extranonce1">Extranonce1:</label>
            <div class="input-wrapper">
                <input type="text" id="extranonce1" value="16ff430c">
            </div>
        </div>
    </div>

    <div class="input-container">
        <div class="section-title">Stratum Notify</div>
        <div class="input-group">
            <label for="prevhash">PrevHash:</label>
            <div class="input-wrapper">
                <input type="text" id="prevhash" value="89a2ee47526367552ae35048cc4669e7849280c10000e3f20000000000000000">
            </div>
        </div>
        <div class="input-group">
            <label for="coinbase1">Coinbase1:</label>
            <div class="input-wrapper">
                <input type="text" id="coinbase1" value="01000000010000000000000000000000000000000000000000000000000000000000000000ffffffff5a037cc10d1d506f7765726564206279204c75786f722054656368290050060da0666afabe6d6db524bb0f9f23870f3ac737bd006313fd5f9f0d581df66c7d4fe0fdbc2311aa1510000000000000000000024f0000000000000005ffffffff06220200000000000017a914bf73ad4cf3a107812bad3deb310611bee49a3c7987976eb8120000000017a914056adde53ebc396a1b3b678bb0d3a5c1">
            </div>
        </div>
        <div class="input-group">
            <label for="coinbase2">Coinbase2:</label>
            <div class="input-wrapper">
                <input type="text" id="coinbase2" value="0000000000266a24aa21a9edfcdc38544373d390a13c66cd34d916c7251eb8241dedc509dfd01dc00dfc396400000000000000002f6a2d434f524501a37cf4faa0758b26dca666f3e36d42fa15cc0106f459cc4ca322d298304ff163b2a360d756c5db840000000000000000296a277379735b1575729190af844c2577df96912ace53a6215f8c370f28c9f759938bacbfe45e461f0000000000000000002b6a2952534b424c4f434b3af5a573371160391f6b9647404a64d06c846a7b5afeabe0214dde481200751ee600000000">
            </div>
        </div>
        <div class="input-group">
            <label for="merkle_branches">MerkleBranches:</label>
            <div class="input-wrapper">
                <textarea id="merkle_branches">69c4cd2fbe495f131a4d3d12efd1928d39cb5873d2ae00a99e915012356587a0,714ab55320a31a17cce8149a0a6a0b5f7cec20ec007520d93a9cbdb2a6e740fe,e76fd336d045d20bcc8e3344d7c13906496083c75669fb7f22deff11adaa75dd,9a13b55e99fc77c96528137121c9cc5e711f411154f6be33f2895ea1405efa14,4d4da704b4a6e37fa925092809cad270e1ff3a13c893a99534dd77d040c9245f,6af9372c2c3c4541baabcf8a6068dae67047442008599fde91ce7503fd30bfe2,ef76babef4a0de795408182f469e4ef49b840571217cef15c7cbef2b95e7ca71,76dc6b72ea312e8950ccb38d765efe75e85829279058d97f85843a0feab31d5e,c30f71fb4dbb3b62ccb1450ffcb16933646541bad3d5ed4aa82a321279dfee40,af553f87335eb48983e9c6818dce18fcc7755b19563a946fc60be1a3726001e6,34a3f6d4ffa2ca564279192af166ba84b6bda9ca0e964b51d3edf3afc8ee36f5</textarea>
            </div>
        </div>
        <div class="input-group short-input">
            <label for="job_version">JobVersion:</label>
            <div class="input-wrapper">
                <input type="text" id="job_version" value="20000000">
            </div>
        </div>
        <div class="input-group short-input">
            <label for="nbits">Nbits:</label>
            <div class="input-wrapper">
                <input type="text" id="nbits" value="17023a04">
            </div>
        </div>
    </div>

    <div class="input-container">
        <div class="section-title">Stratum Submit</div>
        <div class="input-group">
            <label for="extranonce2">Extranonce2:</label>
            <div class="input-wrapper">
                <input type="text" id="extranonce2" value="87000000">
            </div>
        </div>
        <div class="input-group short-input">
            <label for="ntime">Ntime:</label>
            <div class="input-wrapper">
                <input type="text" id="ntime" value="684ffd22">
            </div>
        </div>
        <div class="input-group short-input">
            <label for="nonce">Nonce:</label>
            <div class="input-wrapper">
                <input type="text" id="nonce" value="4cea2482">
            </div>
        </div>
        <div class="input-group short-input">
            <label for="miner_version">MinerVersion:</label>
            <div class="input-wrapper">
                <input type="text" id="miner_version" value="13588000">
            </div>
        </div>
    </div>

    <div id="error" aria-live="polite"></div>

</div>

!!! success "rehash: <span id="reHash">???</span> <a href="https://mempool.space/block/???" target="_blank" id="mempoolLink">🔗</a>"
    <span id="reHashResults" class="stratum-rehasher-assumptions">...</span>

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

    function cleanHex(input) {
        return input.toLowerCase().replace(/[^0-9a-f]/g, "");
    }

    function cleanHexList(input) {
        return input.toLowerCase().replace(/[^0-9a-f,]/g, "");
    }

    function getNVersion(mask, jobVersion, minerVersion) {
        return ((parseInt(jobVersion, 16) & ~parseInt(mask, 16)) | (parseInt(minerVersion, 16) & parseInt(mask, 16))).toString(16);
    }

    async function getMerkleRoot(precursors) {
        const coinbase = precursors.cb1 + precursors.extranonce1 + precursors.extranonce2 + precursors.cb2;
        let merkleRoot = await sha256d(fromHexString(coinbase));
        for (const hash of precursors.merkleBranches) {
            merkleRoot = await sha256d(fromHexString(merkleRoot + hash));
        }
        return merkleRoot;
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

    MAX_TARGET = 0x00000000FFFFn * (2n ** (8n * (0x1Dn - 3n)));

    function getTargetFromBits(bits) {
        const exp = BigInt(parseInt(bits.substring(0, 2), 16));
        const mult = BigInt('0x' + bits.substring(2));
        return mult * (2n ** (8n * (exp - 3n)));
    }

    function getDifficultyFromTarget(target) {
        return MAX_TARGET / target;
    }

    function getDifficultyFromHash(hash) {
        const hash_num = BigInt('0x' + hash);
        if (hash_num === 0n) return 0n;
        return MAX_TARGET / hash_num;
    }

    units = ['', 'thousand', 'million', 'billion', 'trillion', 'quadrillion', 'quintillion', 'sextillion', 'septillion', 'octillion', 'nonillion'];

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

    powerUnits = ['W', 'kW', 'MW', 'GW', 'TW', 'PW'];
    energyUnits = ['Wh', 'kWh', 'MWh', 'GWh', 'TWh', 'PWh'];

    function formatPowerOrEnergy(value, unitArray) {
        let unitIndex = 0;
        while (value >= 1000 && unitIndex < unitArray.length - 1) {
            value /= 1000;
            unitIndex++;
        }
        return value.toFixed(2) + ' ' + unitArray[unitIndex];
    }

    function formatTime(minutes) {
        return Number.isInteger(minutes) ? minutes.toString() : minutes.toFixed(1);
    }

    function validateInputs() {
        return true;
    }

    async function calculate() {
        const reHash = document.getElementById('reHash');
        const mempoolLink = document.getElementById('mempoolLink');
        const reHashResults = document.getElementById('reHashResults');
        if (!reHash || !mempoolLink || !reHashResults) return;

        if (!validateInputs()) {
            reHash.innerHTML = '???';
            mempoolLink.href = 'https://mempool.space/block/???';
            reHashResults.innerHTML = '...';
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
        const target = getTargetFromBits(nbits);
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
        const formattedBlockTime = formatTime(blockTimeMinutes);

        let consumptionText;
        if (energy_wh < 1 || power_w < 1) {
            consumptionText = `With a Network Difficulty ${networkDiffFormatted}, the Bitcoin network likely consumed negligible electricity over ${formattedBlockTime} minutes in order to find this block, harnessing negligible electrical power.`;
        } else {
            consumptionText = `With a Network Difficulty ${networkDiffFormatted}, the Bitcoin network likely consumed about ${formattedEnergy} of electricity over ${formattedBlockTime} minutes in order to find this block, harnessing ${formattedPower} of electrical power.`;
        }

        reHash.innerHTML = blockHash;
        mempoolLink.href = `https://mempool.space/block/${blockHash}`;
        reHashResults.innerHTML = `
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
                        <input type="number" id="block_time" value="${blockTimeMinutes}" step="0.1" min="0">
                        <span class="unit">minutes</span>
                    </div>
                </div>
            </div>
        `;
        document.getElementById('efficiency').addEventListener('input', calculate);
        document.getElementById('block_time').addEventListener('input', calculate);
    }

    document.querySelectorAll('.stratum-rehasher-input input, .stratum-rehasher-input textarea').forEach(element => {
        element.addEventListener('input', calculate);
    });

    calculate();
</script>

