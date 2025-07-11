# Appendix: Custom Protocol Template

This is a customizable template for creating your own multisig Bitcoin self-custody protocol.
It assumes a generic multisig setup (e.g., 2-of-3) with airgapped
Signing-Devices, a full node for verification, metal seed backups, and
quarantine rules to prevent contamination between online and offline
environments. 

All steps adhere strictly to the quarantine rules in [Level 5: Airgap Quarantine](../sovereignty/level-5.md).

To customize this template:

- Replace generic steps with specifics for your setup, such as hardware (e.g., SeedSigner for all keys in a 2-of-3 multisig).
- Add personal details, like "Retrieve the metal backup from Uncle Bob's safe deposit box."
- Adjust for your threat model, e.g., more quarantine steps if needed.
- Link to relevant sections in this site for deeper guidance, such as [Level 2: Your Keys](../sovereignty/level-2.md).

Always follow [Level 7: Multisig Protocols](../sovereignty/level-7.md) principles: Use airgapped Signing-Devices for signing, verify
everything through your own [full node](../sovereignty/level-4.md), store seeds on durable metal backups,
and maintain strict separation between online (watching/broadcasting) and
offline (signing) processes.

---

## Setup

This section covers the initial configuration of your multisig wallet and keys.
Perform these steps in a secure, private environment. Ensure all devices are
airgapped where required, and use quarantine procedures to avoid cross-
contamination. Customize by specifying your hardware (e.g., "Use SeedSigner for Key 1").

???+ info "Prepare Secure Environments"
    1. Set up an [Airgapped-Computer](airgapped-computer.md) or device for offline operations. This
       should never connect to the internet.
    2. Prepare a separate Transaction-Manager for watch-only tasks, connected to
       your [full node](../sovereignty/level-4.md).
    3. Establish quarantine rules: Use USB drives or QR codes for data transfer
       between online and offline environments, and sanitize them after each
       use.
    4. Verify all software and firmware: Download from official sources, check
       signatures, and ensure they are up-to-date.
    5. Prepare metal backup tools for seed phrases.

???+ danger "Generate Keys on Signing-Devices"
    1. Power on each airgapped Signing-Device (e.g., one per key in your
       multisig setup; customize: "Use SeedSigner for Key 1, Coldcard for Key 2").
    2. Generate a new seed phrase on each device, following the manufacturer's
       instructions for entropy (e.g., using [dice](dice.md) rolls if supported).
    3. Write down the seed phrase temporarily on paper for verification.
    4. Confirm the seed phrase on the device to ensure accuracy.
    5. Repeat for each required key in your multisig configuration (e.g., 3
       devices for a 2-of-3 setup).

???+ info "Backup Seeds to Metal"
    1. Transcribe each seed phrase onto durable [metal backups](../sovereignty/level-6.md) (e.g., stainless
       steel plates).
    2. Verify the transcription by comparing it to the temporary paper note.
    3. Destroy the temporary paper note securely (e.g., burn it).
    4. Store each metal backup in a separate, secure location (e.g., safety
       deposit boxes or hidden safes; customize: "Key 1 with Uncle Bob").
    5. Use tamper-evident seals on storage containers.

???+ warning "Export XPUBs/ZPUBs for Watch-Only Wallet"
    1. On each airgapped Signing-Device, export the extended public key (XPUB
       or ZPUB for multisig, depending on your address type).
    2. Transfer the XPUB/ZPUB data to a sanitized USB drive or display as a QR
       code.
    3. Move the data to your Transaction-Manager via quarantine (e.g., scan QR or
       copy from USB).
    4. Import the XPUBs/ZPUBs into your watch-only wallet software (e.g.,
       Sparrow or Electrum) to create the multisig descriptor.
    5. Verify the wallet descriptor matches your intended configuration.

???+ info "Create and Verify Multisig Wallet Descriptor"
    1. In your watch-only software, combine the XPUBs/ZPUBs to generate the
       multisig script or descriptor.
    2. Save the descriptor securely (e.g., encrypted file on your
       Transaction-Manager).
    3. Generate a test receive address and verify it matches expectations.
    4. Connect to your [full node](../sovereignty/level-4.md) to ensure the watch-only wallet syncs
       correctly.
    5. Document the descriptor and XPUBs/ZPUBs in your protocol notes.

???+ warning "Validate Addresses for Future Deposits"
    1. Generate several receive addresses in your watch-only software.
    2. Transfer the addresses to airgapped Signing-Devices via QR or USB for
       verification.
    3. On each Signing-Device, confirm the addresses derive from the correct
       XPUB/ZPUB.
    4. Note any derivation paths or address types (e.g., P2WSH for multisig).
    5. Store validated addresses in a secure, offline list for reference.

???+ info "Test Setup with Small Transaction"
    1. Deposit a small amount of Bitcoin to a test address.
    2. Monitor confirmation on your [full node](../sovereignty/level-4.md).
    3. Attempt a small withdrawal following the Withdrawal section below.
    4. Verify the entire process works end-to-end.
    5. Document any issues and adjust the protocol as needed.

---

## Deposit

This section handles receiving Bitcoin securely. Always generate new addresses
to avoid reuse, and verify everything through your [full node](../sovereignty/level-4.md). Customize with specific sender instructions if needed.

???+ info "Generate Receive Address"
    1. Open your watch-only wallet software on the Transaction-Manager.
    2. Generate a new receive address from the multisig descriptor.
    3. Label the address for tracking (e.g., "Deposit from Exchange - Date").
    4. Copy the address securely.
    5. Optionally, create a QR code for easy sharing.

???+ warning "Verify Address on Airgapped Devices"
    1. Transfer the address data (e.g., via QR or USB) to each airgapped
       Signing-Device.
    2. On each device, confirm the address matches the expected derivation from
       your XPUB/ZPUB.
    3. Ensure all required keys agree on the address validity.
    4. Return confirmation data if needed (e.g., signed message).
    5. Sanitize transfer media after use.

???+ info "Share Address with Sender"
    1. Provide the verified address to the sender via secure channel (e.g.,
       encrypted message).
    2. Instruct the sender to double-check the address before sending.
    3. Avoid public exposure of the address.
    4. Note the expected amount and sender for reference.
    5. Wait for the transaction to appear.

???+ info "Monitor Incoming Transaction"
    1. Use your [full node](../sovereignty/level-4.md) or watch-only software to scan for the transaction.
    2. Check transaction details: Amount, fees, and inputs.
    3. Wait for initial confirmation (e.g., 1 block).
    4. Monitor for RBF (Replace-By-Fee) flags if applicable.
    5. Log the transaction ID (TXID) in your records.

???+ info "Confirm Finality"
    1. Wait for sufficient confirmations (e.g., 6 blocks for standard security).
    2. Verify the transaction on your [full node](../sovereignty/level-4.md) to ensure it's in the
       blockchain.
    3. Update your watch-only wallet balance.
    4. Optionally, check against a separate full node for redundancy.
    5. Document the deposit as complete.

---

## Withdrawal

This section details spending Bitcoin via multisig signing. Use this for
transfers or spends, ensuring all steps are followed to avoid errors. Customize with specific recipient details.

???+ info "Create Unsigned Transaction"
    1. Open your watch-only wallet software on the Transaction-Manager.
    2. Select UTXOs to spend and specify recipient address(es) and amounts.
    3. Set appropriate fees based on mempool conditions (use your [full node](../sovereignty/level-4.md) for
       estimates).
    4. Generate the unsigned transaction (e.g., PSBT file).
    5. Save the unsigned transaction to a sanitized USB or export as QR.

???+ warning "Transfer Unsigned Transaction to Airgapped Devices"
    1. Move the unsigned transaction data to each airgapped Signing-Device via
       quarantine (e.g., USB or QR).
    2. Ensure no internet-connected devices are nearby.
    3. Verify the transfer media is clean before insertion.
    4. Load the transaction on the device without signing yet.
    5. Inspect transaction details on the device screen (e.g., outputs, fees).

???+ danger "Sign Transaction on Each Required Signing-Device"
    1. On the first Signing-Device, review and approve the transaction details.
    2. Sign the transaction, generating a partial signature.
    3. Export the partially signed transaction (e.g., to USB or QR).
    4. Repeat for each required key/device in your multisig threshold (e.g., 2
       out of 3; customize: "Sign with SeedSigner Key 1 first").
    5. Ensure devices remain airgapped throughout.

???+ warning "Combine Signatures and Finalize Transaction"
    1. Transfer all partial signatures back to the Transaction-Manager via
       quarantine.
    2. In your watch-only software, combine the signatures into a fully signed
       transaction.
    3. Verify the final transaction is complete and valid.
    4. Check for any errors in signature combination.
    5. Save the signed transaction.

???+ info "Broadcast Signed Transaction"
    1. Connect to your [full node](../sovereignty/level-4.md) or a trusted broadcaster.
    2. Submit the signed transaction to the network.
    3. Monitor for acceptance into the mempool.
    4. Track confirmations on your [full node](../sovereignty/level-4.md).
    5. Log the TXID and update records.

---

## Check Balance

This section explains how to view balances without exposing keys. Always use
your own [full node](../sovereignty/level-4.md) for primary verification; external sources are optional and
for cross-checking only. Never expose your ZPUB publicly.

???+ info "Sync Watch-Only Wallet or Full Node"
    1. Open your watch-only software on the Transaction-Manager.
    2. Ensure it's connected to your [full node](../sovereignty/level-4.md).
    3. Rescan or sync the blockchain if needed.
    4. Wait for full synchronization.
    5. Note any unconfirmed transactions.

???+ info "Query Balance for Multisig Addresses"
    1. View the total balance in your watch-only wallet.
    2. Break down by confirmed and unconfirmed UTXOs.
    3. List recent transactions for context.
    4. Calculate available spendable amount (accounting for fees).
    5. Document the balance in your secure logs.

???+ info "Optional: Verify Against Separate Full Node"
    1. If using a secondary [full node](../sovereignty/level-4.md), query the same addresses there.
    2. Compare balances and UTXOs for consistency.
    3. Investigate any discrepancies immediately.
    4. Avoid public block explorers unless absolutely necessary.
    5. Never input your ZPUB into online tools.

---

## Recovery

This section covers restoring from backups or handling lost keys. Use this in
case of device failure, loss, or other issues. Test this process periodically. Customize with specific backup locations (e.g., "Contact Aunt Jane for Key 3").

???+ info "Identify the Issue"
    1. Determine what needs recovery (e.g., lost key, damaged device, full
       wallet rebuild).
    2. Gather all available [metal backups](../sovereignty/level-6.md) and protocol documents.
    3. Assess if the multisig threshold can still be met (e.g., 2-of-3 with one
       lost).
    4. If threshold can't be met, proceed to full seed recovery.
    5. Document the recovery attempt.

???+ info "Retrieve Metal Backups"
    1. Access your secure storage locations (customize: "Retrieve Key 1 from Uncle Bob").
    2. Check tamper-evident seals for integrity.
    3. Transcribe seeds from metal to temporary paper if needed.
    4. Verify transcription accuracy.
    5. Handle backups in a private, secure environment.

???+ danger "Restore Keys on New Signing-Devices"
    1. Acquire new airgapped Signing-Devices (e.g., same model as original; customize: "Buy new SeedSigner").
    2. Enter the seed phrase from backup on each device.
    3. Verify the restored wallet matches the original (e.g., check XPUB/ZPUB).
    4. Regenerate any necessary data (e.g., export new XPUBs if paths differ).
    5. Destroy temporary paper notes securely.

???+ warning "Rebuild Multisig Wallet Descriptor"
    1. Export XPUBs/ZPUBs from restored devices to the Transaction-Manager via
       quarantine.
    2. In watch-only software, recreate the multisig descriptor.
    3. Verify it matches the original descriptor.
    4. Rescan the blockchain on your [full node](../sovereignty/level-4.md).
    5. Confirm all UTXOs are detected.

???+ info "Test Recovery with Small Amount"
    1. Deposit a small test amount if possible.
    2. Follow the Withdrawal section to spend it.
    3. Ensure the recovered setup works fully.
    4. Update protocol documents with any changes.
    5. Store new backups if devices were replaced.

---

## Maintenance

This section outlines ongoing tasks to keep your protocol secure. Perform these
periodically (e.g., quarterly) to prevent issues. Customize schedules or tasks as needed.

???+ info "Verify Metal Backups"
    1. Access backups in rotation (e.g., one per session).
    2. Check for damage or corrosion.
    3. Transcribe and verify a seed on a test device.
    4. Reseal and return to storage.
    5. Update locations if needed.

???+ info "Update Software and Firmware"
    1. Check for updates on official sites.
    2. Verify signatures before installing.
    3. Update watch-only software and [full node](../sovereignty/level-4.md) first.
    4. For Signing-Devices, update firmware airgapped if possible.
    5. Test compatibility post-update.

???+ info "Run Full Node Health Checks"
    1. Verify node synchronization with the blockchain.
    2. Check disk space, uptime, and connections.
    3. Prune if needed, but retain necessary data.
    4. Backup node configuration.
    5. Restart and monitor for errors.

???+ info "Simulate Full Protocol Run"
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

???+ info "Provide Overview to Heirs"
    1. Explain the multisig setup and protocol basics to trusted parties (customize: "Brief family members on 2-of-3 setup").
    2. Share a redacted version of this document (e.g., without locations).
    3. Designate roles (e.g., who holds which key; customize: "Uncle Bob holds Key 3").
    4. Discuss legal aspects (e.g., wills, dead-man switches).
    5. Ensure heirs understand the importance of security.

???+ info "Locate and Access Backups Securely"
    1. Provide clues or instructions for finding [metal backups](../sovereignty/level-6.md) (e.g., via
       lawyer or safe; customize: "Check my will for locations").
    2. Instruct on checking tamper seals.
    3. Advise using a secure environment for access.
    4. Recommend consulting a Bitcoin expert if needed.
    5. Warn against rushing or public exposure.

???+ warning "Follow Setup/Recovery Steps as Needed"
    1. If keys are intact, follow the Setup section to initialize devices.
    2. For lost elements, use the Recovery section.
    3. Rebuild the watch-only wallet on a new Transaction-Manager.
    4. Verify everything through a [full node](../sovereignty/level-4.md).
    5. Test with a small transaction if possible.

???+ danger "Execute a Withdrawal if Authorized"
    1. Gather required Signing-Devices and meet the multisig threshold.
    2. Follow the Withdrawal section carefully.
    3. Send to a secure, heir-controlled address.
    4. Monitor and confirm the transaction.
    5. Document the process for records.










