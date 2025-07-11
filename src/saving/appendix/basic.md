# Basic Protocol with SeedSigner

This protocol delivers a robust 2-of-3 multisig Bitcoin self-custody system
using **three dedicated SeedSigners** (one per seed) as both Signing-Devices
and Airgapped-Computers. 
It harnesses an [airgap quarantine](../soverignty/level-5.md),
a [full node](../sovereignty/level-4.md) for verification,
[metal seed backups](../sovereignty/level-6.md),
 and stringent [quarantine rules](../sovereignty/level-5.md) to provide ironclad protection.
The SeedSigner's stateless nature—*retaining seeds in memory alone*—ensures
automatic data clearing upon power-off, enabling secure role shifts without
persistent risks. 
By using dedicated devices per seed, this variant defends
against advanced firmware attacks like [Dark Skippy](https://darkskippy.com),
 where a compromised device could leak seeds via signatures.

---

## Setup

Establish your 2-of-3 [multisig](../sovereignty/level-7.md) wallet with three
seeds created in sequence on **dedicated SeedSigners** (one device per seed).
Conduct this in a secluded, secure setting, maintaining airgaps and
[quarantine procedures](../sovereignty/level-5.md). This separation ensures
that a compromise of one device affects only one seed, preserving multisig
security.

???+ info "Prepare Secure Environments"
    1. Configure **three separate SeedSigners** for dual roles as
       Signing-Device and Airgapped-Computer, each dedicated to one seed.
    2. Assemble a Transaction-Manager (Tails OS with persistent storage) for watch-only functions, linked to your
       [full node](../sovereignty/level-4.md).
    3. *Optional*, install [Dark Skippy](https://darkskippy.com) detection tools and other related tools to verify transactions
       (install on Tails OS persistent storage).
    4. Familiarize yourself with [quarantine rules](../sovereignty/level-5.md).
    5. Authenticate software and firmware: Pull from official repositories, validate signatures, and update (compile OS
       from source where feasible; refer to [building
       guide](https://github.com/SeedSigner/seedsigner-os#-building)).
    6. Assemble tools for [metal backups](../sovereignty/level-6.md).
    7. Deploy Sparrow on the Transaction-Manager through Tails with
       [persistent
       storage](https://danielpcostas.dev/installing-sparrow-wallet-on-tailsos-persistently/).

???+ danger "Generate Keys on Dedicated Signing-Devices"
    1. Activate each airgapped SeedSigner one at a time.
    2. On the first SeedSigner, access Settings > Seeds > Generate Seed;
       incorporate [dice](dice.md) for entropy (roll D6 as instructed; consult
       [dice verification
       guide](https://github.com/SeedSigner/seedsigner/blob/dev/docs/dice_verification.md)).
       Do not generate additional seeds on the same device to avoid potential entropy manipulation.
    3. Jot the seed phrase on paper temporarily for confirmation.
    4. Validate the seed on the SeedSigner display.
    5. Export as QR (Settings > Seeds > Export Seed QR), and safeguard the QR (see [Seed QR
       guide](https://github.com/SeedSigner/seedsigner/blob/dev/docs/seed_qr/README.md)).
    6. Repeat for the second and third seeds on their dedicated SeedSigners,
       powering off each between steps to erase memory. Label devices clearly
       (e.g., "SeedSigner #1 for Seed 1").

???+ info "Backup Seeds to Metal"
    1. Etch each seed onto durable [metal backups](../sovereignty/level-6.md).
    2. Cross-verify against the paper note.
    3. Incinerate the paper note.
    4. Store backups to distinct and secure sites (e.g., Seed 1 at residence,
       Seed 2 with kin, Seed 3 in vault).
    5. Affix tamper-evident seals.

???+ warning "Export ZPUBs to Transaction-Manager"
    1. On each dedicated SeedSigner, load its assigned seed and export ZPUB
       (Settings > Advanced > Export XPUB > Multisig, native SegWit).
    2. Convey ZPUBs via [quarantine](../sovereignty/level-5.md) (QR display
       on SeedSigner, camera scan by Transaction-Manager).
    3. Integrate ZPUBs into Sparrow on Transaction-Manager (Tails OS) for a
       [multisig](../sovereignty/level-7.md) watch-only wallet.
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
    2. Relay via QR to each dedicated SeedSigner for checks (load assigned
       seed as required).
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
[full node](../sovereignty/level-4.md). No changes needed here, as deposits
don't involve signing.

???+ info "Generate Receive Address"
    1. Start Sparrow on the Transaction-Manager.
    2. Form a new receive address from the
       [multisig](../sovereignty/level-7.md) descriptor (Receive tab).
    3. Tag it (e.g., "Deposit from Exchange - Date").
    4. Copy securely.
    5. Optionally make a QR in Sparrow.

???+ warning "Verify Address on Airgapped Device"
    1. Send address data via QR to the dedicated SeedSigners (verify on at
       least two for redundancy).
    2. Confirm ZPUB derivation on each SeedSigner (Address Explorer).
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

???+ info "Confirm Finality"
    1. Await sufficient confirmations (e.g., 3 blocks).
    2. Affirm blockchain inclusion on your [full node](../sovereignty/level-4.md).
    3. Refresh balance in Transaction-Manager (Tails OS).
    4. Optionally cross-verify with another node.
    5. Log completed deposit.





---

## Withdrawal

Spend Bitcoin via [multisig](../sovereignty/level-7.md) signing. 
Adhere closely to avoid mishaps. 
Use dedicated SeedSigners for each partial signature to prevent cross-seed leakage.

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
    4. Load PSBT on each dedicated SeedSigner sans signing.
    5. Scrutinize details on screen (outputs, fees).

???+ danger "Sign Transaction on Required Signing-Device"
    1. On the first dedicated SeedSigner, load its assigned seed (QR scan or
       manual entry).
    2. Approve transaction.
    3. Generate partial signature (Sign PSBT; see [multisig
       guide](https://github.com/SeedSigner/seedsigner/blob/dev/docs/multisig/README.md)).
    4. Export partial PSBT as QR (to Transaction-Manager).
    5. Power off SeedSigner to clear memory.
    6. Repeat for the second seed on its dedicated SeedSigner (achieving
       2-of-3 [multisig](../sovereignty/level-7.md) threshold). 

???+ warning "Combine Signatures and Finalize Transaction"
    1. Return partial signatures to Transaction-Manager via
       [quarantine](../sovereignty/level-5.md) (SeedSigner QR scan).
    2. Merge in Sparrow on Tails OS for complete signature.
    3. Validate transaction in Sparrow.

???+ warning "Inspect Transaction"
    1. Before broadcasting, export the signed transaction hex in Sparrow.
    2. Use installed detection tools (e.g., from [Dark Skippy](https://darkskippy.com/)) to scan
       the transaction for signs of Dark Skippy attacks, such as leaked seed
       data in signatures.
    3. If anomalies detected, abort, investigate devices, and rebuild firmware.
    4. Proceed only if clear.

???+ info "Broadcast Signed Transaction"
    1. Link to your [full node](../sovereignty/level-4.md) or trusted broadcaster in Sparrow.
    2. Submit to network.
    3. Watch mempool entry.
    4. Follow confirmations on [full node](../sovereignty/level-4.md).
    5. Record TXID and refresh records.

---

## Check Balance

View balances key-free. Prioritize your [full node](../sovereignty/level-4.md)
for verification; limit external tools. No changes needed.

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

Restore from backups for key or device loss. Test routinely. Use new dedicated
devices if recovering multiple seeds.

???+ info "Identify the Issue"
    1. Pinpoint recovery type (e.g., lost SeedSigner, device damage, wallet
       data erasure).
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
    1. Procure new airgapped SeedSigner(s) (one per recovered seed if
       multiple).
    2. Input backup seed (Load Seed; QR scan or manual; see [Seed QR
       guide](https://github.com/SeedSigner/seedsigner/blob/dev/docs/seed_qr/README.md)).
    3. Validate restored wallet (e.g., ZPUB via Export XPUB).
    4. Reproduce data if paths vary (e.g., new ZPUBs).
    5. Shred temporary notes.

???+ warning "Rebuild Multisig Wallet Descriptor"
    1. Export ZPUBs from restored SeedSigner(s) to Transaction-Manager via
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

Sustain protocol integrity with regular tasks. Execute quarterly. Include
device-specific checks.

???+ info "Verify Metal Backups"
    1. Rotate access (one per session).
    2. Inspect damage/corrosion.
    3. Test transcription on dedicated SeedSigner.
    4. Reseal and stow.
    5. Refresh sites if required.

???+ info "Update Software and Firmware"
    1. Monitor SeedSigner GitHub updates, including any anti-exfil
       implementations.
    2. Authenticate signatures.
    3. Prioritize Sparrow on Tails OS and
       [full node](../sovereignty/level-4.md).
    4. Airgap-update each SeedSigner firmware (source rebuild and verify).
    5. Assess compatibility.

???+ info "Run Full Node Health Checks"
    1. Confirm blockchain sync.
    2. Evaluate disk, uptime, connections.
    3. Prune as necessary.
    4. Backup config.
    5. Restart and observe errors.

???+ info "Simulate Full Protocol Run"
    1. Test deposit/withdrawal with nominal funds using all dedicated devices.
    2. Mimic recovery (no loss).
    3. Time and refine.
    4. Include heirs in dry run if feasible.
    5. Amend protocol doc.




















































