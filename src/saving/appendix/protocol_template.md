# Appendix: Custom Protocol Template

This is a customizable template for creating your own [multisig](../sovereignty/level-7.md) Bitcoin self-custody protocol.
It assumes a generic [multisig](../sovereignty/level-7.md) setup (e.g., 2-of-3) with airgapped
Signing-Devices, a [full node](../sovereignty/level-4.md) for verification, [metal seed backups](../sovereignty/level-6.md), and
quarantine rules to prevent contamination between online and offline
environments. 

---

## Setup

This section covers the initial configuration of your [multisig](../sovereignty/level-7.md) wallet and keys.
Perform these steps in a secure, private environment. Ensure all devices are
airgapped where required, and use [quarantine procedures](../sovereignty/level-5.md) to avoid cross-
contamination.

??? info "1. Prepare Devices"
    1. Set up an [Airgapped-Computer](airgapped-computer.md) for offline operations.
    2. Set up a [Transaction-Manager](airgapped-computer.md), using Tails OS with persistent storage, connected to
       your [full node](../sovereignty/level-4.md).
    3. Review and prepare for the [quarantine rules in Level 5](../sovereignty/level-5.md).
    4. Verify all software and firmware: Download from official sources, check
       signatures, and ensure they are up-to-date.
    5. Prepare metal backup tools for seed phrases.
    6. *optional* install Sparrow on the Transaction-Manager via Tails OS with [persistent storage](https://danielpcostas.dev/installing-sparrow-wallet-on-tailsos-persistently/)

??? danger "2. Generate Seeds"
    1. Power on each airgapped Signing-Device (e.g., one per key in your
       [multisig](../sovereignty/level-7.md) setup).
    2. Generate a new seed phrase on each Signing-Device (e.g., using [dice](dice.md) rolls to ensure entropy).
    3. Write down the seed phrase temporarily on paper for verification.
    4. Confirm the seed phrase on the device to ensure accuracy.
    5. Repeat for each required key in your [multisig](../sovereignty/level-7.md) configuration (e.g., 3 devices for a 2-of-3 setup).

??? danger "3. Backup to Metal"
    1. Stamp each seed phrase onto durable [metal backups](../sovereignty/level-6.md).
    2. Verify the metal seed by comparing it to the temporary paper note.
    3. Destroy the temporary paper note (e.g., burn it).
    4. Store each metal backup in a separate, secure location.
    5. Use tamper-evident seals on storage containers.

??? warning "4. Export ZPUBs to Transaction-Manager"
    1. On each Signing-Device, export the extended public key (ZPUB for [multisig](../sovereignty/level-7.md)).
    2. Transfer the ZPUB data to your Transaction-Manager via [quarantine](../sovereignty/level-5.md) procedure.
    3. Import the ZPUB into your Transaction-Manager (Tails OS).
    4. Verify the wallet descriptor matches your intended configuration.

??? warning "5. Validate Addresses for Future Deposits"
    1. Generate several receive addresses in Electrum or Sparrow on Tails OS.
    2. Transfer the addresses to airgapped Signing-Devices via QR or USB for
       verification.
    3. On each Signing-Device, confirm the addresses derive from the correct ZPUB.
    4. Note any derivation paths or address types (e.g., P2WSH for [multisig](../sovereignty/level-7.md)).
    5. Store validated addresses in a secure, offline list for reference.

??? info "6. Test Setup with Small Transaction"
    1. Deposit a small amount of Bitcoin to a test address following the Deposit section below.
    2. Monitor confirmation on your [full node](../sovereignty/level-4.md).
    3. Attempt a small withdrawal following the Withdrawal section below.
    4. Verify the entire process works end-to-end.
    5. Document any issues and adjust the protocol as needed.




---

## Deposit

This section is for receiving Bitcoin securely. Always generate new addresses
to avoid reuse, and verify everything through your [full node](../sovereignty/level-4.md). Customize with specific sender instructions if needed.

??? info "1. Generate Address"
    1. Open Sparrow on the Transaction-Manager.
    2. Generate a new receive address from the [multisig](../sovereignty/level-7.md) descriptor.
    3. Label the address for tracking (e.g., "Deposit from Exchange - Date").
    4. Copy the address or create a QR code for easy sharing.

??? danger "2. Verify Address"
    *This step is optional, especially if you have already verified the address in the setup above -- if you're unsure, it's best to verify addresses before use.*
    
    1. Transfer the address (e.g., via QR code via [quarantine](../sovereignty/level-5.md) procedure) to each Signing-Device.
    2. On each device, confirm the address matches the expected derivation from your ZPUB.
    3. Ensure all required devices agree on the address validity.

??? info "3. Share Address with Sender"
    1. Provide the verified address to the sender via secure channel (e.g., encrypted message) in order to avoid public exposure of the address.
    2. Instruct the sender to double-check the address before sending.
    3. Note the expected amount and sender for reference.
    4. Wait for the transaction to appear.

??? info "4. Monitor Incoming Transaction"
    1. Use your [full node](../sovereignty/level-4.md) or Sparrow on Tails OS to scan for the transaction.
    2. Check transaction details: Amount, fees, and inputs.
    3. Wait for initial confirmation (e.g., 1 block).
    4. Monitor for RBF (Replace-By-Fee) flags if applicable.

??? info "5. Confirm"
    1. Wait for sufficient confirmations (e.g., 6 blocks for standard security).
    2. Verify the transaction on your [full node](../sovereignty/level-4.md) to ensure it's in a valid block on-chain.
    3. Verify balance following the Check Balance section below.


---

## Withdrawal

This section details spending Bitcoin via [multisig](../sovereignty/level-7.md) signing. Use this for
transfers or spends, ensuring all steps are followed to avoid errors. Customize with specific recipient details.

??? info "1. Create Unsigned Transaction"
    1. Open Sparrow on the Transaction-Manager.
    2. Select UTXOs to spend and specify recipient address(es) and amounts.
    3. Set appropriate fees based on mempool conditions (use your [full node](../sovereignty/level-4.md) for estimates).
    4. Generate the unsigned transaction (e.g., PSBT).
    5. Save the unsigned transaction to a sanitized USB or export as QR.

??? warning "2. Transfer Unsigned Transaction to Signing-Device"
    1. Follow all [Quarantine Rules](../sovereignty/level-5.md)
    2. Power on Signing-Devices (and Airgap-Conputer if applicable).
    3. Copy the unsigned transaction from the Transaction-Manager to each Signing-Device via [quarantine](../sovereignty/level-5.md) procedure.
    5. Inspect transaction details on the device screen (e.g., outputs, fees).

??? danger "3. Sign Transaction"
    1. On the first Signing-Device, review the transaction details. Abort if there's any problem or concern.
    2. Access the seed and sign the transaction, generating a partial signature.
    3. Export the partially signed transaction (e.g., to USB or QR).
    4. Repeat for each required key/device in your [multisig](../sovereignty/level-7.md).

??? warning "4. Finalize Transaction"
    1. Transfer all partial signatures back to the Transaction-Manager via
       [quarantine](../sovereignty/level-5.md).
    2. In Sparrow on Tails OS, combine the signatures into a fully signed transaction.
    3. Verify the final transaction is complete and valid.
    4. Check for any errors in signature combination.
    5. Save the signed transaction.

??? info "5. Broadcast Transaction"
    1. Connect to your [full node](../sovereignty/level-4.md) or a trusted broadcaster.
    2. Submit the signed transaction to the network.
    3. Monitor for acceptance into the mempool.
    4. Track confirmations on your [full node](../sovereignty/level-4.md).

---

## Check Balance

This section explains how to view balances without exposing keys. Always use
your own [full node](../sovereignty/level-4.md) for primary verification; external sources are optional and
for cross-checking only. Never expose your ZPUB publicly.

??? info "1. Sync Full Node"
    1. Open Sparrow on the Transaction-Manager.
    2. Ensure it's connected to your [full node](../sovereignty/level-4.md).
    3. Verify latest block hashes with public block explorers.

??? info "2. Query Balance"
    1. View the total balance in Sparrow on Tails OS (Transaction-Manager).
    2. List recent transactions for context.
    3. Calculate available spendable amount (accounting for fees).

??? info "3. Optional: Verify A Separate Full Node"
    1. If using a secondary [full node](../sovereignty/level-4.md), query the same addresses there.
    2. Compare balances and UTXOs for consistency.
    3. Investigate any discrepancies immediately.





---

## Recovery

This section covers restoring from backups or handling lost keys. Use this in
case of device failure, loss, or other issues. Test this process periodically. Customize with specific backup locations (e.g., "Contact Aunt Jane for Key 3").

??? info "1. Identify the Issue"
    1. Determine what needs recovery (e.g., lost key, damaged device, etc).
    2. Gather all available [metal backups](../sovereignty/level-6.md) and protocol documents.
    3. Assess if the [multisig](../sovereignty/level-7.md) threshold can still be met (e.g., 2-of-3 with one lost).
    4. If threshold can't be met, proceed to full seed recovery.
    5. Document the recovery attempt.

??? info "2. Retrieve Metal Backups"
    1. Access your metal backups.
    2. Check tamper-evident seals for integrity.
    3. Transcribe seeds from metal to temporary paper if needed.
    4. Verify transcription accuracy.
    5. Handle backups in a private, secure environment.

??? danger "3. Restore Keys on New Signing-Devices"
    1. Acquire new airgapped Signing-Devices (e.g., same model as original).
    2. Enter the seed phrase from backup on each device.
    3. Verify the restored wallet matches the original (e.g., check ZPUB).
    4. Regenerate any necessary data (e.g., export new ZPUBs if paths differ).
    5. Destroy temporary paper notes securely.

??? warning "4. Rebuild Multisig Wallet"
    1. Export XPUBs/ZPUBs from restored devices to the Transaction-Manager via
       [quarantine](../sovereignty/level-5.md).
    2. In Sparrow on Tails OS, recreate the [multisig](../sovereignty/level-7.md) descriptor.
    3. Verify it matches the original descriptor.
    4. Rescan the blockchain on your [full node](../sovereignty/level-4.md).
    5. Confirm all UTXOs are detected.

??? info "Test Recovery with Small Amount"
    1. Deposit a small test amount if possible.
    2. Follow the Withdrawal section to spend it.
    3. Ensure the recovered setup works fully.
    4. Update protocol documents with any changes.
    5. Store new backups if devices were replaced.

---

## Maintenance

This section outlines ongoing tasks to keep your protocol secure. Perform these
periodically (e.g., quarterly) to prevent issues. Customize schedules or tasks as needed.

??? info "1. Verify Metal Backups"
    1. Access backups in rotation (e.g., one per session).
    2. Check for damage or corrosion.
    3. Transcribe and verify a seed on a test device.
    4. Reseal and return to storage.
    5. Update locations if needed.

??? info "2. Update Software and Firmware"
    1. Check for updates on official sites.
    2. Verify signatures before installing.
    3. Update Sparrow on Tails OS and [full node](../sovereignty/level-4.md) first.
    4. For Signing-Devices, update firmware airgapped if possible.
    5. Test compatibility post-update.

??? info "3. Run and verify Full Node"
    1. Verify node synchronization with the blockchain.
    2. Check disk space, uptime, and connections.
    3. Prune if needed, but retain necessary data.
    4. Backup node configuration.
    5. Restart and monitor for errors.

??? info "Simulate Full Protocol Run"
    1. Perform a test deposit and withdrawal with minimal funds.
    2. Include recovery simulation (without actual loss).
    3. Time the process and note improvements.
    4. Involve heirs in a dry run if applicable.
    5. Update the protocol document with lessons learned.

---

## Inheritance

This section provides instructions for heirs or trusted parties to access funds.
Share this section securely with them in advance, but withhold sensitive
details like backup locations until needed. Customize with heir-specific roles.

??? info "Provide Overview to Heirs"
    1. Explain the [multisig](../sovereignty/level-7.md) setup and protocol basics to trusted parties (customize: "Brief family members on 2-of-3 setup").
    2. Share a redacted version of this document (e.g., without locations).
    3. Designate roles (e.g., who holds which key; customize: "Uncle Bob holds Key 3").
    4. Discuss legal aspects (e.g., wills, dead-man switches).
    5. Ensure heirs understand the importance of security.

??? info "Locate and Access Backups Securely"
    1. Provide clues or instructions for finding [metal backups](../sovereignty/level-6.md) (e.g., via
       lawyer or safe; customize: "Check my will for locations").
    2. Instruct on checking tamper seals.
    3. Advise using a secure environment for access.
    4. Recommend consulting a Bitcoin expert if needed.
    5. Warn against rushing or public exposure.

??? warning "Follow Setup/Recovery Steps as Needed"
    1. If keys are intact, follow the Setup section to initialize devices.
    2. For lost elements, use the Recovery section.
    3. Rebuild the Transaction-Manager (Tails OS) on a new Transaction-Manager.
    4. Verify everything through a [full node](../sovereignty/level-4.md).
    5. Test with a small transaction if possible.

??? danger "Execute a Withdrawal if Authorized"
    1. Gather required Signing-Devices and meet the [multisig](../sovereignty/level-7.md) threshold.
    2. Follow the Withdrawal section carefully.
    3. Send to a secure, heir-controlled address.
    4. Monitor and confirm the transaction.
    5. Document the process for records.


































