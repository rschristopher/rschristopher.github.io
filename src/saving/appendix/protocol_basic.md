# Basic Protocol with SeedSigner

This protocol outlines a basic *single-signature* Bitcoin self-custody system using a [SeedSigner](https://seedsigner.com), 
 enhanced by [airgap quarantine](../sovereignty/level-5.md) and a [full node](../sovereignty/level-4.md) for verification.
This fully implements all required aspects of [Level-6](../sovereignty/level-6.md) security,
 and can easily be adapted to [Level-7](../sovereignty/level-7.md) multisig.

---

## Setup

Establish your single-signature wallet with a SeedSigner in a secure, airgapped environment.

??? info "1. Prepare Secure Environment"
    1. Configure a SeedSigner for use as both the signing device and airgapped computer.
    2. Set up a Transaction-Manager (e.g., Tails OS with persistent storage) connected to your [full node](../sovereignty/level-4.md).
    3. Familiarize yourself with basic [quarantine rules](../sovereignty/level-5.md).

??? danger "2. Generate Seed"
    1. Power on the SeedSigner and navigate to Settings > Seeds > Generate Seed.
    2. Optionally, enhance entropy by using dice (consult the [dice verification guide](https://github.com/SeedSigner/seedsigner/blob/dev/docs/dice_verification.md)).
    3. Temporarily record the seed phrase on paper.
    4. Verify the seed phrase on the SeedSigner display.
    5. Export the seed as a QR code (Settings > Seeds > Export Seed QR).

??? danger "3. Backup to Metal"
    1. Stampe the seed phrase onto a durable [metal backup](../sovereignty/level-6.md).
    2. Cross-verify the transcription with the paper record.
    3. Securely destroy the paper record.
    4. Store the metal backup in a safe and private location.

??? warning "4. Export ZPUB to Transaction-Manager"
    1. On the SeedSigner, export the ZPUB (Settings > Advanced > Export XPUB > Single Sig, native SegWit).
    2. Display the ZPUB as a QR code on the SeedSigner.
    3. Scan the QR code with the Transaction-Manager to import the ZPUB.
    4. In Sparrow on the Transaction-Manager, create a watch-only wallet using the ZPUB.

??? warning "5. Validate Addresses"
    1. Generate a receive address in Sparrow.
    2. Transfer the address to the SeedSigner via QR code.
    3. On the SeedSigner, verify the address derivation (Address Explorer).

---

## Deposit

Receive Bitcoin securely using verified addresses.

??? info "1. Generate Receive Address"
    1. Open Sparrow on the Transaction-Manager and create a new receive address.

??? warning "2. Verify Address on SeedSigner"
    1. Display the address as a QR code on the Transaction-Manager.
    2. Scan and confirm the address on the SeedSigner.

??? info "3. Share and Monitor"
    1. Share the verified address with the sender securely.
    2. Monitor the transaction in Sparrow via your [full node](../sovereignty/level-4.md).

---

## Withdrawal

Spend Bitcoin by signing transactions with your SeedSigner.

??? info "1. Create Unsigned Transaction"
    1. Open Sparrow on the Transaction-Manager.
    2. Select UTXOs, specify recipient and amount.
    3. Set an appropriate fee based on network conditions.
    4. Generate the PSBT and export it as a QR code.

??? danger "2. Sign Transaction with SeedSigner"
    1. Power on the SeedSigner and load the seed if necessary.
    2. Scan the PSBT QR code from the Transaction-Manager.
    3. Review transaction details on the SeedSigner display.
    4. Sign the transaction and export it as a QR code.

??? warning "3. Broadcast Signed Transaction"
    1. Scan the signed transaction QR code with the Transaction-Manager.
    2. In Sparrow, finalize and broadcast the transaction.
    3. Monitor confirmation via your [full node](../sovereignty/level-4.md).

---

## Check Balance

View your Bitcoin balance without needing the SeedSigner.

??? info "1. Sync Watch-Only Wallet"
    1. Open Sparrow on the Transaction-Manager.
    2. Connect to your [full node](../sovereignty/level-4.md) and sync.
    3. View your balance and transaction history.

---

## Recovery

Restore your wallet in case of loss or damage.

??? danger "1. Retrieve Backup"
    1. Access your [metal backup](../sovereignty/level-6.md) from its secure location.
    2. Inspect for any signs of tampering or damage.

??? danger "2. Restore Seed"
    1. If necessary, acquire a new SeedSigner.
    2. Enter the seed phrase (Load Seed via QR or manual entry).
    3. Verify by exporting the ZPUB and comparing to records.

??? warning "3. Rebuild Watch-Only Wallet"
    1. Export the ZPUB to the Transaction-Manager via QR code.
    2. In Sparrow, create a new watch-only wallet with the ZPUB.
    3. Rescan the blockchain to identify your UTXOs.

---

## Maintenance

Ensure ongoing security and functionality.

??? danger "1. Verify Metal Backup"
    1. Periodically inspect the metal backup for damage.
    2. Test the seed by entering it into the SeedSigner and verifying the ZPUB.

??? info "2. Update Software"
    1. Check for updates to SeedSigner firmware and Sparrow software.
    2. Verify the authenticity of updates before installation.

??? info "3. Full Node Health"
    1. Ensure your [full node](../sovereignty/level-4.md) is synchronized.
    2. Monitor performance and address any issues promptly.


















































