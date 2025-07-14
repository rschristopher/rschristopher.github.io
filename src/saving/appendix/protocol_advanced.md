# Advanced Protocol with Multisig Signing Devices

This protocol delivers a robust *2-of-3* [multisig](../sovereignty/level-7.md) Bitcoin self-custody system using **three different [Signing-Devices](airgapped-computer.md)**: two SeedSigners and one Coldcard Q (one per seed). It harnesses an [airgap quarantine](../sovereignty/level-5.md), a [full node](../sovereignty/level-4.md) for verification, [metal seed backups](../sovereignty/level-6.md), and stringent [quarantine rules](../sovereignty/level-5.md) to provide ironclad protection. By using distinct devices per seed, this protocol achieves [Level 9](../sovereignty/level-9.md) fault tolerance, defending against advanced firmware attacks like [Dark Skippy](https://darkskippy.com), where a compromised device could leak seeds via signatures.

---

## Setup

Establish your 2-of-3 [multisig](../sovereignty/level-7.md) wallet with three seeds created in sequence on your Signing-Devices (one device per seed). Conduct this in a secluded, secure setting, maintaining airgaps and [quarantine procedures](../sovereignty/level-5.md). This separation ensures that a compromise of one device affects only one seed, preserving multisig security.

??? info "1. Prepare Secure Environments"
    1. Acquire SeedSigners and one Coldcard Q for dual roles as [Signing-Device](airgapped-computer.md) and Airgapped-Computers. *Label as necessary*.
    2. Assemble a Transaction-Manager (Tails OS with persistent storage) for watch-only functions, linked to your [full node](level-4.md). If desired, install Sparrow on the Transaction-Manager through Tails with [persistent storage](https://danielpcostas.dev/installing-sparrow-wallet-on-tailsos-persistently/).
    3. *Optional*, install [Dark Skippy](https://darkskippy.com) detection tools and other related tools to verify transactions (install on Tails OS persistent storage).
    4. Familiarize yourself with [quarantine rules](../sovereignty/level-5.md).
    5. Authenticate software and firmware: Pull from official repositories, validate signatures, and update (compile OS from source where feasible; refer to [SeedSigner building guide](https://github.com/SeedSigner/seedsigner-os#-building) or [Coldcard documentation](https://coldcard.com/docs/)).
    6. Prepare tools for [metal backups](../sovereignty/level-6.md).

??? danger "2. Generate Seeds"
    1. Activate each airgapped [Signing-Device](airgapped-computer.md) (two SeedSigners and one Coldcard Q), one at a time.
    2. On the first SeedSigner, access Settings > Seeds > Generate Seed; incorporate [dice](dice.md) for entropy (roll D6 as instructed; consult [dice verification guide](https://github.com/SeedSigner/seedsigner/blob/dev/docs/dice_verification.md)). For the Coldcard Q, generate a seed using dice (see [Coldcard seed creation](https://coldcard.com/docs/)). Do not generate additional seeds on the same device to avoid potential entropy manipulation.
    3. Jot the seed phrase on paper temporarily for confirmation.
    4. Validate the seed on the device display (SeedSigner or Coldcard Q).
    5. Save as QR (SeedSigner: Settings > Seeds > Export Seed QR; Coldcard Q: Export Seed QR). Safeguard the QR (see [Seed QR guide](https://github.com/SeedSigner/seedsigner/blob/dev/docs/seed_qr/README.md) or [Coldcard QR export](https://coldcard.com/docs/)).
    6. Repeat for the second and third seeds on their respective devices (second SeedSigner and Coldcard Q), powering off each between steps to erase memory. Label devices clearly (e.g., "Signing-Device-1", "Signing-Device-2").

??? danger "3. Backup to Metal"
    1. Stamp each seed onto durable [metal backups](../sovereignty/level-6.md).
    2. Cross-verify against the paper note.
    3. Incinerate the paper note.
    4. Store backups to distinct and secure sites (e.g., Seed 1 at residence, Seed 2 with kin, Seed 3 in vault).
    5. Affix tamper-evident seals.

??? warning "4. Export ZPUBs to Transaction-Manager"
    1. On each [Signing-Device](airgapped-computer.md), load its assigned seed and export ZPUB (SeedSigner: Settings > Advanced > Export XPUB > Multisig, native SegWit; Coldcard Q: Export Wallet > Multisig, native SegWit).
    2. Convey ZPUBs via [quarantine](../sovereignty/level-5.md) (QR display on device, camera scan by Transaction-Manager).
    3. Integrate ZPUBs into Sparrow on Transaction-Manager (Tails OS) for a [multisig](../sovereignty/level-7.md) watch-only wallet.
    4. Confirm Sparrow's descriptor fits 2-of-3.

??? danger "5. Validate Addresses for Future Deposits"
    1. Produce receive addresses in Sparrow on Tails OS.
    2. Relay via QR to each [Signing-Device](airgapped-computer.md) for checks (load assigned seed as required).
    3. Affirm derivation from ZPUB on each device (SeedSigner: Address Explorer; Coldcard Q: Address Explorer).
    4. Record paths (e.g., m/84'/0'/0'/0 for native SegWit [multisig](../sovereignty/level-7.md)).
    5. Keep an offline roster of validated addresses.

??? info "6. Test Setup with Small Transaction"
    1. Transfer a small Bitcoin amount following the Deposit procedure below.
    2. Observe confirmation on your [full node](../sovereignty/level-4.md).
    3. Transfer some Bitcoin following the Withdrawal procedure below.
    4. Validate the full workflow (e.g., seamless signature merging in Sparrow).
    5. Record issues and update protocol as needed.

---

## Deposit

Receive Bitcoin safely. Use unique addresses each time, confirmed through your [full node](../sovereignty/level-4.md). No signatures needed here, as deposits don't involve signing.

??? info "1. Generate Receive Address"
    1. Start Sparrow on the Transaction-Manager.
    2. Form a new receive address from the [multisig](../sovereignty/level-7.md) descriptor (Receive tab).
    3. Tag it (e.g., "Deposit from Exchange - Date").
    4. Copy securely.
    5. Optionally make a QR in Sparrow.

??? danger "2. Verify Address on Airgapped Device"
    This step is *optional* -- used only when you do not have a pre-verified receive address available.
    
    1. Send address data via QR to the [Signing-Devices](airgapped-computer.md) (verify on at least two for redundancy).
    2. Confirm ZPUB derivation on each device (SeedSigner: Address Explorer; Coldcard Q: Address Explorer).
    3. Validate across seeds for multi-seed assurance.

??? info "3. Share Address with Sender"
    1. Deliver the verified address securely (e.g., encrypted message).
    2. Advise double-checking pre-send.
    3. Avoid public disclosure.
    4. Note anticipated amount and sender.
    5. Await appearance in Sparrow.

??? info "4. Monitor Incoming Transaction"
    1. Scan for the transaction in your [full node](../sovereignty/level-4.md) or Sparrow on Tails OS.
    2. Examine details: amount, fees, inputs.
    3. Await first confirmation (e.g., 1 block).

??? info "5. Confirm Finality"
    1. Await sufficient confirmations (e.g., 3 blocks).
    2. Affirm blockchain inclusion on your [full node](../sovereignty/level-4.md).
    3. Refresh balance in Transaction-Manager (Tails OS).
    4. Optionally cross-verify with another node.

---

## Withdrawal

Spend Bitcoin via [multisig](../sovereignty/level-7.md) signing. Adhere closely to avoid mishaps. 
Use Signing-Device-1 and Signing-Device-2 for each partial signature to prevent cross-seed leakage.

??? info "1. Create Unsigned Transaction"
    1. Open Sparrow on the Transaction-Manager.
    2. Choose UTXOs, define recipient and amount (Send tab).
    3. Set fees from [full node](../sovereignty/level-4.md) mempool data.
    4. Produce PSBT file.
    5. Export as QR.

??? warning "2. Transfer Unsigned Transaction to Airgapped Device"
    1. Convey PSBT via [quarantine](../sovereignty/level-5.md) (QR on Transaction-Manager, scan by SeedSigner or Coldcard Q).
    2. Ban Internet devices from vicinity.
    3. Load PSBT on each [Signing-Device](airgapped-computer.md) sans signing.
    4. Scrutinize details on screen (outputs, fees).

??? danger "3. Sign Transaction"
    1. On the first [Signing-Device](airgapped-computer.md) (e.g., SeedSigner #1), load its assigned seed (QR scan or manual entry).
    2. Approve transaction.
    3. Generate partial signature (SeedSigner: Sign PSBT; Coldcard Q: Sign PSBT; see [multisig guide](https://github.com/SeedSigner/seedsigner/blob/dev/docs/multisig/README.md) or [Coldcard multisig](https://coldcard.com/docs/multisig)).
    4. Export partial PSBT as QR (to Transaction-Manager).
    5. Power off the device to clear memory.
    6. Repeat for the second seed on its [Signing-Device](airgapped-computer.md) (e.g., Coldcard Q or SeedSigner, achieving 2-of-3 [multisig](../sovereignty/level-7.md) threshold).

??? warning "4. Combine Signatures and Finalize Transaction"
    1. Return partial signatures to Transaction-Manager via [quarantine](../sovereignty/level-5.md) (device QR scan).
    2. Merge in Sparrow on Tails OS for finalized signature.
    3. Validate transaction in Sparrow.

??? warning "5. Inspect Transaction"
    1. Before broadcasting, export the signed transaction hex in Sparrow.
    2. Use installed detection tools (e.g., from [Dark Skippy](https://darkskippy.com/)) to scan the transaction for signs of Dark Skippy attacks, such as leaked seed data in signatures.
    3. If anomalies detected, abort, investigate devices, and rebuild firmware as needed.

??? info "6. Broadcast Signed Transaction"
    1. Link to your [full node](../sovereignty/level-4.md) or trusted broadcaster in Sparrow.
    2. Submit to network.
    3. Watch mempool entry.
    4. Follow confirmations on [full node](../sovereignty/level-4.md).

---

## Check Balance

View balances key-free. Prioritize your [full node](../sovereignty/level-4.md) for verification.

??? info "1. Sync Watch-Only Wallet"
    1. Start Sparrow on Transaction-Manager.
    2. Connect to [full node](../sovereignty/level-4.md).
    3. Await complete sync.
    4. Mark unconfirmed transactions.

??? info "2. Query Balance for Multisig Addresses"
    1. Examine total balance in Sparrow on Tails OS (Balance tab).
    2. Detail confirmed/unconfirmed UTXOs.
    3. Survey recent transactions.

??? info "3. Optional: Verify Against Separate Full Node"
    1. Query addresses on secondary [full node](../sovereignty/level-4.md).
    2. Match balances/UTXOs with the primary node.

---

## Recovery

Restore from backups for key or device loss. Test routinely. Use new [Signing-Devices](airgapped-computer.md) if recovering multiple seeds.

??? info "1. Identify the Issue"
    1. Pinpoint recovery type (e.g., lost SeedSigner or Coldcard Q, device damage, wallet data erasure).
    2. Assemble [metal backups](../sovereignty/level-6.md) and protocol docs.
    3. Evaluate [multisig](../sovereignty/level-7.md) threshold viability (e.g., 2-of-3 post-loss).
    4. If untenable, advance to full seed restoration.
    5. Record attempt.

??? danger "2. Retrieve Backups"
    1. Retrieve from secure sites (e.g., Seed 1 from home safe).
    2. Examine tamper seals.
    3. Copy seeds to temporary paper if necessary.
    4. Confirm accuracy.
    5. Manage in seclusion.

??? danger "3. Restore Keys on New Signing-Device"
    1. Procure new airgapped [Signing-Device](airgapped-computer.md) (SeedSigner or Coldcard Q, one per recovered seed if multiple).
    2. Input backup seed (SeedSigner: Load Seed; QR scan or manual; Coldcard Q: Import Seed; see [Seed QR guide](https://github.com/SeedSigner/seedsigner/blob/dev/docs/seed_qr/README.md) or [Coldcard seed import](https://coldcard.com/docs/)).
    3. Validate restored wallet (e.g., ZPUB via Export XPUB).
    4. Reproduce data if paths vary (e.g., new ZPUBs).
    5. Shred temporary notes.

??? warning "4. Rebuild Multisig Wallet Descriptor"
    1. Export ZPUBs from restored [Signing-Device](airgapped-computer.md) to Transaction-Manager via [quarantine](../sovereignty/level-5.md).
    2. Recreate [multisig](../sovereignty/level-7.md) descriptor in Sparrow on Tails OS with new ZPUBs.
    3. Rescan blockchain on [full node](../sovereignty/level-4.md).
    4. Verify UTXOs in Sparrow.

??? info "5. Test Recovery with Small Amount"
    1. Deposit test sum if viable.
    2. Withdraw as above.
    3. Confirm full operation.
    4. Revise protocol doc as needed.

---

## Maintenance

Sustain protocol integrity with regular tasks. Include device-specific checks.

??? danger "1. Verify Metal Backups"
    At least monthly you should inspect the tamper-evident seals, and every few years inspect the metal and reseal.

    1. Inspect damage/corrosion.
    2. Test seed on dedicated [Signing-Device](airgapped-computer.md).
    3. Reseal and stow.

??? info "2. Update Software and Firmware"
    1. Monitor SeedSigner and Coldcard GitHub updates, including any anti-exfil implementations.
    2. Authenticate signatures.
    3. Prioritize Sparrow on Tails OS and [full node](../sovereignty/level-4.md).
    4. Airgap-update each [Signing-Device](airgapped-computer.md) firmware (source rebuild and verify).
    5. Assess compatibility.

??? info "3. Run Full Node Health Checks"
    1. Confirm blockchain sync.
    2. Evaluate disk, uptime, connections.
    3. Prune as necessary.
    4. Backup config.
    5. Restart and observe errors.

??? info "4. Simulate Full Protocol Run"
    1. Test deposit/withdrawal with nominal funds using all devices.
    2. Mimic recovery (no loss).
    3. Time and refine.
    4. Include heirs in dry run if feasible.
    5. Amend protocol doc, as needed.










































