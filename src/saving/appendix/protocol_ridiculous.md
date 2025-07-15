# Appendix: Ridiculous Protocol

This protocol delivers an ultra-secure *3-of-5* [multisig](../sovereignty/level-7.md) Bitcoin self-custody system using **five different [Signing-Devices](airgapped-computer.md)**: three SeedSigners and two Coldcard Qs (one per seed). It leverages an [airgap quarantine](../sovereignty/level-5.md), a [full node](../sovereignty/level-4.md) for verification, [metal seed backups](../sovereignty/level-6.md), and stringent [quarantine rules](../sovereignty/level-5.md) to provide unparalleled protection. By using distinct devices per seed and implementing advanced countermeasures, this protocol achieves [Level 11](../sovereignty/level-11.md) security.




---

## Secure Environment and Countermeasures

To safeguard against advanced threats, all QR code transfers must be conducted in a **secure environment** with the following countermeasures:

- **Secure Space**: A private, controlled room with no windows or cameras.
- **Shielded Environment**: A Faraday cage or shielded room to block electromagnetic emissions.
- **Privacy Filters**: Polarized screen protectors on all device screens to prevent optical eavesdropping.
- **White Noise Generators**: To mask acoustic signals during device operation.
- **Privacy Enclosure**: A lightproof booth for QR scanning to shield from external observation.
- **Camera Blockers**: Covers or tape to disable cameras on the [Transaction-Manager](airgapped-computer.md) when not in use.
- **Tamper-Evident Seals**: Applied to [Signing-Devices](airgapped-computer.md) when stored to detect unauthorized access.
- **Minimize Exposure**: Use dense QR codes and limit display time to reduce attack windows.

Regular firmware checks must be performed on all [Signing-Devices](airgapped-computer.md) using tools to detect anomalies (e.g., [Dark Skippy](https://darkskippy.com)).

---

## Setup

Establish your 3-of-5 [multisig](../sovereignty/level-7.md) wallet with five seeds created on dedicated [Signing-Devices](airgapped-computer.md) (one device per seed). Conduct this in a secluded, secure setting, maintaining airgaps and [quarantine procedures](../sovereignty/level-5.md).

??? info "1. Prepare Secure Environments"
    1. Acquire five [Signing-Devices](airgapped-computer.md): three SeedSigners and two Coldcard Qs, each for one seed.
    2. Set up a **secure space** for QR transfers: a private room with no windows or cameras, equipped with a Faraday cage, white noise generators, and a privacy enclosure.
    3. Install **privacy filters** on all [Signing-Device](airgapped-computer.md) and [Transaction-Manager](airgapped-computer.md) screens.
    4. Prepare **camera blockers** for the [Transaction-Manager](airgapped-computer.md).
    5. Obtain **tamper-evident seals** for the [Signing-Devices](airgapped-computer.md).
    6. Assemble the [Transaction-Manager](airgapped-computer.md) (Tails OS with persistent storage), linked to your [full node](level-4.md).
    7. Install Sparrow and [Dark Skippy](https://darkskippy.com) detection tools on Tails OS persistent storage.
    8. Authenticate and update software and firmware for all devices.

??? danger "2. Generate Seeds"
    1. Activate each airgapped [Signing-Device](airgapped-computer.md), one at a time.
    2. Generate a seed on each device (SeedSigner: Settings > Seeds > Generate Seed with [dice](dice.md); Coldcard Q: generate with dice). Ensure **privacy filters** are installed to protect displays.
    3. Jot the seed phrase on paper temporarily for confirmation.
    4. Validate the seed on the device display.
    5. Save as QR (SeedSigner: Export Seed QR; Coldcard Q: Export Seed QR).
    6. Repeat for all five seeds, powering off devices between steps. Label clearly (e.g., "Signing-Device-1", "Signing-Device-2").

??? danger "3. Backup to Metal"
    1. Stamp each seed onto durable [metal backups](../sovereignty/level-6.md).
    2. Cross-verify against the paper note.
    3. Incinerate the paper note.
    4. Store backups in distinct, secure sites with **tamper-evident seals**.

??? warning "4. Export ZPUBs to Transaction-Managers"
    1. On each [Signing-Device](airgapped-computer.md), load its seed and export ZPUB (SeedSigner: Export XPUB > Multisig; Coldcard Q: Export Wallet > Multisig).
    2. **Following secure QR transfer procedures**, convey ZPUBs via QR to the redundant [Transaction-Managers](airgapped-computer.md).
    3. Integrate ZPUBs into Sparrow for a 3-of-5 [multisig](../sovereignty/level-7.md) watch-only wallet.
    4. Comfirm wallet fingerprint and addresses match identically between the two Transaction-Managers.

??? danger "5. Validate Addresses for Future Deposits"
    1. Produce receive addresses in Sparrow.
    2. **Following secure QR transfer procedures**, relay addresses via QR to each [Signing-Device](airgapped-computer.md) for verification.
    3. Confirm derivation from ZPUB on each device.
    4. Confirm addresses match between the two Transaction-Managers.

??? info "6. Test Setup with Small Transaction"
    1. Transfer a small Bitcoin amount following the Deposit procedure.
    2. Observe confirmation on your [full nodes](../sovereignty/level-4.md).
    3. Transfer some Bitcoin following the Withdrawal procedure (sign with three devices).
    4. Validate the workflow and record issues, update the protocol as necessary.



---

## Deposit

Receive Bitcoin using unique, verified addresses confirmed through redundant [full nodes](../sovereignty/level-4.md).

??? info "1. Generate Receive Address"
    1. Start Sparrow on each [Transaction-Manager](airgapped-computer.md).
    2. Generate a new receive address from the [multisig](../sovereignty/level-7.md) descriptor.
    3. Confirm the exact same address and derivation path between the redundant Transaction-Managers.

??? danger "2. Verify Address on Airgapped Device"
    *Optional* -- used when no pre-verified address is available.
    1. **Following secure QR transfer procedures**, send address data via QR to at least three [Signing-Devices](airgapped-computer.md).
    2. Confirm ZPUB derivation on each device.

??? info "3. Share Address with Sender"
    1. Deliver the verified address securely.
    2. Await the transaction in Sparrow.

??? info "4. Monitor Incoming Transaction"
    1. Check the transaction on redundamt [full nodes](../sovereignty/level-4.md) or Sparrow.
    2. Await confirmations.




---

## Withdrawal

Spend Bitcoin via [multisig](../sovereignty/level-7.md) signing with three [Signing-Devices](airgapped-computer.md).

??? info "1. Create Unsigned Transaction"
    1. Open Sparrow on both [Transaction-Managers](airgapped-computer.md).
    2. Select UTXOs, define recipient and amount.
    3. Export the PSBT as QR.
    4. Confirm identical PSBTs between the two Transaction-Managers.

??? warning "2. Transfer Unsigned Transaction to Airgapped Device"
    1. **Following secure QR transfer procedures**, convey the PSBT via QR to each [Signing-Device](airgapped-computer.md).
    2. Load the PSBT on each device.

??? danger "3. Sign Transaction"
    1. On three [Signing-Devices](airgapped-computer.md), load the assigned seed and generate a partial signature.
    2. **Following secure QR transfer procedures**, export the partial PSBT as QR to both [Transaction-Managers](airgapped-computer.md).
    3. Power off devices to clear memory.

??? warning "4. Combine Signatures and Finalize Transaction"
    1. Merge the three partial signatures in Sparrow on both Transaction-Managers.
    2. Validate the finalized transaction.
    3. Confirm signed transactions are identical in all critical fields between the two redundant Transaction-Managers.

??? warning "5. Inspect Transaction"
    1. Use detection tools (for [Dark Skippy](https://darkskippy.com) type attacks) to scan for anomalies.
    2. If issues are detected, abort and investigate.

??? info "6. Broadcast Signed Transaction"
    1. Broadcast via your [full nodes](../sovereignty/level-4.md).
    2. Monitor confirmations.



---

## Check Balance

View balances without keys, using your [full nodes](../sovereignty/level-4.md).

??? info "1. Sync Watch-Only Wallet"
    1. Start Sparrow on both [Transaction-Managers](airgapped-computer.md).
    2. Connect each to the respective [full node](../sovereignty/level-4.md) and sync.

??? info "2. Query Balance for Multisig Addresses"
    1. Check the balance in Sparrow.
    3. Confirm the exact balance and transaction info between the two redundant nodes and Transaction-Managers.



---

## Recovery

Restore from backups if keys or devices are lost. Use new [Signing-Devices](airgapped-computer.md) for multiple recoveries.

??? info "1. Identify the Issue"
    1. Determine the recovery type (e.g., lost device).
    2. Retrieve [metal backups](../sovereignty/level-6.md).

??? danger "2. Retrieve Backups"
    1. Access backups from secure sites.
    2. Check tamper seals.

??? danger "3. Restore Keys on New Signing-Device"
    1. Input the backup seed on a new [Signing-Device](airgapped-computer.md) with **privacy filters** installed.
    2. Validate the restored wallet.

??? warning "4. Rebuild Multisig Wallet Descriptor"
    1. **Following secure QR transfer procedures**, export ZPUBs to the redundant [Transaction-Managers](airgapped-computer.md).
    2. Recreate the [multisig](../sovereignty/level-7.md) descriptor in Sparrow on both Transaction-Managers.

??? info "5. Test Recovery with Small Amount"
    1. Perform test transactions (Deposit and Withdrawal) to confirm functionality.


---

## Maintenance

??? danger "1. Verify Metal Backups"
    1. Inspect tamper-evident seals and metal condition.
    2. Test seeds on [Signing-Devices](airgapped-computer.md).

??? info "2. Update Software and Firmware"
    1. Check for updates and verify signatures.
    2. Update firmware in an airgapped environment.

??? info "3. Run Full Node Health Checks"
    1. Ensure blockchain sync and system health.

??? info "4. Simulate Full Protocol Run"
    1. Test the entire protocol with small amounts.
    2. Verify the secure environment and countermeasures.

??? info "5. Check Secure Environment"
    1. Ensure the shielded room, privacy filters, and white noise generators are functional.
    2. Inspect tamper-evident seals on [Signing-Devices](airgapped-computer.md).



---

This protocol achieves [Level 11 security](https://isbitcointrue.com/saving/sovereignty/level-11/) by integrating advanced countermeasures into a 3-of-5 [multisig](../sovereignty/level-7.md) setup, ensuring protection against even the most sophisticated threats.





































