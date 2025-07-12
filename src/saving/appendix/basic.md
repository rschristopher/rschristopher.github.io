# Basic Protocol with SeedSigner

This protocol delivers a robust 2-of-3 multisig Bitcoin self-custody system
using a single SeedSigner as both Signing-Device and Airgapped-Computer. It
harnesses airgapping, a [full node](../sovereignty/level-4.md) for
verification, [metal seed backups](../sovereignty/level-6.md), and stringent
[quarantine rules](../sovereignty/level-5.md) to provide ironclad protection.
The SeedSigner's stateless nature—retaining seeds in memory alone—ensures
automatic clearance upon power-off, enabling secure role shifts without
persistent risks.

---

## Setup

Establish your 2-of-3 [multisig](../sovereignty/level-7.md) wallet with three
seeds created in sequence on one SeedSigner. Conduct this in a secluded, secure
setting, maintaining airgaps and [quarantine
procedures](../sovereignty/level-5.md).

???+ info "Prepare Secure Environments"
    1. Configure the SeedSigner for dual roles as Signing-Device and Airgapped-
       Computer.
    2. Assemble a Transaction-Manager for watch-only functions, linked to your
       [full node](../sovereignty/level-4.md).
    3. Observe [quarantine rules in Level 5](../sovereignty/level-5.md).
    4. Authenticate software and firmware: Pull from official repositories
       (e.g., SeedSigner GitHub), validate signatures, and update (compile OS
       from source where feasible; refer to [building
       guide](https://github.com/SeedSigner/seedsigner-os#-building)).
    5. Assemble tools for [metal backups](../sovereignty/level-6.md).
    6. Launch the Transaction-Manager with Tails OS per [Level 2: Your
       Keys](../sovereignty/level-2.md).
    7. Deploy Sparrow on the Transaction-Manager through Tails with [persistent
       storage](https://danielpcostas.dev/installing-sparrow-wallet-on-tailsos-persistently/).

???+ danger "Generate Keys on Signing-Device"
    1. Activate the airgapped SeedSigner.
    2. Access Settings > Seeds > Generate Seed; incorporate [dice](dice.md) for
       entropy (roll D6 as instructed; consult [dice verification
       guide](https://github.com/SeedSigner/seedsigner/blob/dev/docs/dice_verification.md)).
    3. Jot the seed phrase on paper temporarily for confirmation.
    4. Validate the seed on the SeedSigner display.
    5. Cycle through for three seeds, powering off between to erase memory.

???+ info "Backup Seeds to Metal"
    1. Etch each seed onto durable [metal backups](../sovereignty/level-6.md).
    2. Cross-verify against the paper note.
    3. Incinerate the paper note.
    4. Disperse backups to distinct secure sites (e.g., Seed 1 at residence,
       Seed 2 with kin, Seed 3 in vault).
    5. Affix tamper-evident seals.
    6. Sequentially load seeds on the SeedSigner, export as QR (Settings >
       Seeds > Export Seed QR), and safeguard the QR (see [Seed QR
       guide](https://github.com/SeedSigner/seedsigner/blob/dev/docs/seed_qr/README.md)); power off post-each.

???+ warning "Export ZPUBs to Transaction-Manager"
    1. Load each seed on the SeedSigner in turn and export ZPUB (Settings >
       Advanced > Export XPUB > Multisig, native SegWit); power off after each.
    2. Convey ZPUBs via [quarantine](../sovereignty/level-5.md) (QR display on
       SeedSigner, camera scan by Transaction-Manager).
    3. Integrate ZPUBs into Sparrow on Tails OS for the [multisig](../sovereignty/level-7.md)
       watch-only wallet.
    4. Confirm Sparrow's descriptor fits 2-of-3.

???+ info "Create and Verify Multisig Wallet Descriptor"
    1. Merge the three ZPUBs in Sparrow on Tails OS to form the
       [multisig](../sovereignty/level-7.md) descriptor (native SegWit, 2-of-3
       threshold).
    2. Store the descriptor safely (e.g., encrypted on persistent volume).
    3. Create a test receive address and validate it.
    4. Sync with your [full node](../sovereignty/level-4.md) to confirm
       Transaction-Manager (Tails OS) alignment.
    5. Archive the descriptor and ZPUBs offline.

???+ warning "Validate Addresses for Future Deposits"
    1. Produce receive addresses in Sparrow on Tails OS.
    2. Relay via QR to the SeedSigner for checks (load seeds as required).
    3. Affirm derivation from ZPUB on SeedSigner (Address Explorer).
    4. Record paths (e.g., m/84'/0'/0'/0 for native SegWit
       [multisig](../sovereignty/level-7.md)).
    5. Keep an offline roster of validated addresses.

???+ info "Test Setup with Small Transaction"
    1. Transfer a minor Bitcoin sum (e.g., 0.001 BTC) to a test address.
    2. Observe confirmation on your [full node](../sovereignty/level-4.md).
    3. Conduct a small withdrawal as below.
    4. Validate the full workflow (e.g., seamless signature merging in
       Sparrow).
    5. Record and rectify issues.

---

## Deposit

Receive Bitcoin safely. Use unique addresses each time, confirmed through your
[full node](../sovereignty/level-4.md).

???+ info "Generate Receive Address"
    1. Start Sparrow on the Transaction-Manager.
    2. Form a new receive address from the [multisig](../sovereignty/level-7.md)
       descriptor (Receive tab).
    3. Tag it (e.g., "Deposit from Exchange - Date").
    4. Copy securely.
    5. Optionally make a QR in Sparrow.

???+ warning "Verify Address on Airgapped Device"
    1. Send address data via QR to the SeedSigner.
    2. Confirm ZPUB derivation on SeedSigner (Address Explorer).
    3. Validate across seeds for multi-seed assurance.
    4. Provide signed message via QR if necessary.
    5. Cleanse media after.

???+ info "Share Address with Sender"
    1. Deliver the verified address securely (e.g., encrypted message).
    2. Advise double-checking pre-send.
    3. Shun public disclosure.
    4. Note anticipated amount and sender.
    5. Await appearance in Sparrow.

???+ info "Monitor Incoming Transaction"
    1. Scan for the transaction in your [full node](../sovereignty/level-4.md)
       or Sparrow on Tails OS.
    2. Examine details: amount, fees, inputs.
    3. Await first confirmation (e.g., 1 block).
    4. Track RBF flags.
    5. Log TXID.

???+ info "Confirm Finality"
    1. Await sufficient confirmations (e.g., 6 blocks).
    2. Affirm blockchain inclusion on your [full node](../sovereignty/level-4.md).
    3. Refresh balance in Transaction-Manager (Tails OS).
    4. Optionally cross-verify with another node.
    5. Log completed deposit.

---

## Withdrawal

Spend Bitcoin via [multisig](../sovereignty/level-7.md) signing. Adhere closely
to avoid mishaps.

???+ info "Create Unsigned Transaction"
    1. Open Sparrow on the Transaction-Manager.
    2. Choose UTXOs, define recipient and amount (Send tab).
    3. Set fees from [full node](../sovereignty/level-4.md) mempool data.
    4. Produce PSBT file.
    5. Export as QR.

???+ warning "Transfer Unsigned Transaction to Airgapped Device"
    1. Convey PSBT via [quarantine](../sovereignty/level-5.md) (QR on
       Transaction-Manager, SeedSigner scan).
    2. Bar Internet devices from vicinity.
    3. Confirm media cleanliness.
    4. Load PSBT on SeedSigner sans signing.
    5. Scrutinize details on screen (outputs, fees).

???+ danger "Sign Transaction on Required Signing-Device"
    1. Load first seed on SeedSigner (QR scan or manual entry).
    2. Approve transaction.
    3. Generate partial signature (Sign PSBT; see [multisig
       guide](https://github.com/SeedSigner/seedsigner/blob/dev/docs/multisig/README.md)).
    4. Export partial PSBT as QR.
    5. Power off SeedSigner to clear memory.
    6. Repeat for second seed (achieving 2-of-3 [multisig](../sovereignty/level-7.md)
       threshold).

???+ warning "Combine Signatures and Finalize Transaction"
    1. Return partial signatures to Transaction-Manager via
       [quarantine](../sovereignty/level-5.md) (SeedSigner QR scan).
    2. Merge in Sparrow on Tails OS for complete signature.
    3. Validate transaction in Sparrow.
    4. Inspect for signature issues.
    5. Preserve signed transaction.

???+ info "Broadcast Signed Transaction"
    1. Link to your [full node](../sovereignty/level-4.md) or trusted
       broadcaster in Sparrow.
    2. Submit to network.
    3. Watch mempool entry.
    4. Follow confirmations on [full node](../sovereignty/level-4.md).
    5. Record TXID and refresh records.

---

## Check Balance

View balances key-free. Prioritize your [full node](../sovereignty/level-4.md)
for verification; limit external tools.

???+ info "Sync Watch-Only Wallet or Full Node"
    1. Start Sparrow on Transaction-Manager.
    2. Connect to [full node](../sovereignty/level-4.md).
    3. Rescan/sync blockchain as required.
    4. Await complete sync.
    5. Mark unconfirmed transactions.

???+ info "Query Balance for Multisig Addresses"
    1. Examine total balance in Sparrow on Tails OS (Balance tab).
    2. Detail confirmed/unconfirmed UTXOs.
    3. Survey recent transactions.
    4. Compute spendable sum (fee-deducted).
    5. Log balance securely.

???+ info "Optional: Verify Against Separate Full Node"
    1. Query addresses on secondary [full node](../sovereignty/level-4.md).
    2. Match balances/UTXOs.
    3. Address mismatches promptly.
    4. Eschew public explorers.
    5. Avoid online ZPUB entry.

---

## Recovery

Restore from backups for key or device loss. Test routinely.

???+ info "Identify the Issue"
    1. Pinpoint recovery type (e.g., lost SeedSigner, device damage, wallet data
       erasure).
    2. Assemble [metal backups](../sovereignty/level-6.md) and protocol docs.
    3. Evaluate [multisig](../sovereignty/level-7.md) threshold viability
       (e.g., 2-of-3 post-loss).
    4. If untenable, advance to full seed restoration.
    5. Record attempt.

???+ info "Retrieve Metal Backups"
    1. Retrieve from secure sites (e.g., Key 1 from home safe).
    2. Examine tamper seals.
    3. Copy seeds to temporary paper if necessary.
    4. Confirm accuracy.
    5. Manage in seclusion.

???+ danger "Restore Keys on New Signing-Device"
    1. Procure new airgapped SeedSigner (original model).
    2. Input backup seed (Load Seed; QR scan or manual; see [Seed QR
       guide](https://github.com/SeedSigner/seedsigner/blob/dev/docs/seed_qr/README.md)).
    3. Validate restored wallet (e.g., ZPUB via Export XPUB).
    4. Reproduce data if paths vary (e.g., new ZPUBs).
    5. Shred temporary notes.

???+ warning "Rebuild Multisig Wallet Descriptor"
    1. Export ZPUBs from restored SeedSigner to Transaction-Manager via
       [quarantine](../sovereignty/level-5.md).
    2. Recreate [multisig](../sovereignty/level-7.md) descriptor in Sparrow on
       Tails OS with new ZPUBs.
    3. Align with original.
    4. Rescan blockchain on [full node](../sovereignty/level-4.md).
    5. Verify UTXOs in Sparrow.

???+ info "Test Recovery with Small Amount"
    1. Deposit test sum if viable.
    2. Withdraw as above.
    3. Affirm full operation.
    4. Revise docs.
    5. Add fresh backups.

---

## Maintenance

Sustain protocol integrity with regular tasks. Execute quarterly.

???+ info "Verify Metal Backups"
    1. Rotate access (one per session).
    2. Inspect damage/corrosion.
    3. Test transcription on SeedSigner.
    4. Reseal and stow.
    5. Refresh sites if required.

???+ info "Update Software and Firmware"
    1. Monitor SeedSigner GitHub updates.
    2. Authenticate signatures.
    3. Prioritize Sparrow on Tails OS and [full node](../sovereignty/level-4.md).
    4. Airgap-update SeedSigner firmware (source rebuild).
    5. Assess compatibility.

???+ info "Run Full Node Health Checks"
    1. Confirm blockchain sync.
    2. Evaluate disk, uptime, connections.
    3. Prune as necessary.
    4. Backup config.
    5. Restart and observe errors.

???+ info "Simulate Full Protocol Run"
    1. Test deposit/withdrawal with nominal funds.
    2. Mimic recovery (no loss).
    3. Time and refine.
    4. Include heirs in dry run if feasible.
    5. Amend protocol doc.




















































