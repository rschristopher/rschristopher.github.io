# Appendix: Ludicrous Protocol

This protocol delivers an ultra-secure *3-of-5* [multisig](../sovereignty/level-7.md) Bitcoin self-custody system using **five different [Signing-Devices](airgapped-computer.md)**: three SeedSigners and two Coldcard Qs (one per seed). It leverages an expanded [airgap quarantine](../sovereignty/level-5.md) covering both DMZs, redundant receive-only [full nodes](../sovereignty/level-4.md) (RF and satellite), [metal seed backups](../sovereignty/level-6.md), geographically distributed key signing, and stringent [quarantine rules](../sovereignty/level-5.md) to provide unparalleled protection. By using distinct devices per seed, redundant systems, and advanced countermeasures, this protocol achieves [Level 12](../sovereignty/level-12.md) security, ensuring resilience against state-level threats.

!!! info "Receive-only (e.g., satellite) nodes with geographically distributed key signing."
    <figure markdown>
    ![Level 12](/images/levels-Level-12.drawio.png)
      <figcaption>Level 12 -- a veritable Hero's Journey into transaction signing</figcaption>
    </figure>





---

## Secure Environment and Countermeasures

To safeguard against advanced threats, all QR code transfers must be conducted in **secure, geographically distributed environments** with the following countermeasures:

- **Geographical Distribution**: Store each [Signing-Device](airgapped-computer.md) in a unique, secure location (e.g., vaults, Faraday-protected rooms).
- **Expanded Airgap**: The airgap extends across both DMZs, isolating all critical operations from network threats.
- **Secure Spaces**: Each location must be a private, controlled room with no windows or cameras.
- **Shielded Environments**: Use Faraday cages or shielded rooms to block electromagnetic emissions.
- **Privacy Filters**: Polarized screen protectors on all device screens to prevent optical eavesdropping.
- **White Noise Generators**: To mask acoustic signals during device operation (preferably non-electronic).
- **Privacy Enclosures**: Lightproof booths for QR scanning to shield from external observation.
- **Camera Blockers**: Covers or tape to disable cameras on the [Transaction-Managers](airgapped-computer.md) when not in use.
- **Tamper-Evident Seals**: Applied to [Signing-Devices](airgapped-computer.md) when stored to detect unauthorized access.


## Quarantine Rules

To achieve the highest level of security for your Bitcoin self-custody, follow these rules as a concise, numbered checklist. These rules extend the original [Level-5](../sovereignty/level-5.md) quarantine to include advanced countermeasures (suitable for the "Ludicrous" protocol),
 ensuring protection against physical, digital, and human threats.

Adhere to these rules without exception during any session involving seeds or transaction signing.

1. **Limit data transfers to QR codes only**: No physical media (e.g., USB, MicroSD) is allowed across the quarantine. *Rationale*: Prevents malware vectors and enforces manual verification.

2. **Expose seed phrases only on the Signing-Device**: Never display, write, or input seeds on any other component. *Rationale*: Isolates the most critical secret to one tamper-resistant device.

3. **Stow all smartphones and personal electronics in Faraday bags outside the room**: Power them off first. *Rationale*: Blocks remote activation of microphones, cameras, or transmitters.

4. **Ban all electronic devices near the Signing-Device; use non-electronic white noise generators and privacy enclosures**: Exclude any potential sources of acoustic or electromagnetic leaks. *Rationale*: Mitigates side-channel attacks (e.g., audio or EM data exfiltration).

5. **Ensure complete physical privacy with secure spaces and privacy filters**: Use a locked room with no windows or cameras, and apply polarized screen protectors to all devices. *Rationale*: Prevents optical surveillance and physical access.

6. **Sanitize and verify all tools pre-session**: Check software/firmware signatures, verify tamper-evident seals on Signing-Devices, and test tool integrity. *Rationale*: Counters supply-chain attacks and pre-installed malware.

7. **Distribute and redundantly store components geographically with tamper-evident seals**: Store Signing-Devices in separate, secure locations. *Rationale*: Ensures resilience against localized physical attacks (e.g., theft, fire).

8. **Use receive-only full nodes (RF and satellite) for blockchain data**: Utilize RF and satellite-based nodes to receive tamper-proof data without transmitting. *Rationale*: Maintains privacy and resilience against network censorship.

9. **Employ redundant Transaction-Managers on isolated networks**: Use two Transaction-Managers, each linked to a separate receive-only node. *Rationale*: Provides redundancy and independent cryptographic verification of all steps.

10. **Implement an expanded airgap covering the receive-only full nodes and Transaction-Managers**: Isolate all critical operations from network threats. *Rationale*: Protects against all network-based attacks.

11. **Utilize a secure drop point for broadcasting signed transactions**: Designate a single physically secure, monitored location, used only for broadcasting signed transactions. *Rationale*: Ensures secure handling of transaction broadcasting.

12. **Coordinate signing sessions securely across geographically distributed locations**: Follow strict procedures for QR transfers and quarantine rules at each site. *Rationale*: Maintains security in a distributed setup.

These rules, when followed meticulously, create a fortress-like barrier around your Bitcoin, making unauthorized access or compromise exponentially difficult -- even for advanced adversaries.






---

## Setup

Establish your 3-of-5 [multisig](../sovereignty/level-7.md) wallet with five seeds created on dedicated [Signing-Devices](airgapped-computer.md) (one device per seed). Conduct this in secluded, secure settings across multiple locations, maintaining airgaps and [quarantine procedures](../sovereignty/level-5.md).

??? info "1. Prepare Secure Environments"
    1. Acquire five [Signing-Devices](airgapped-computer.md): three SeedSigners and two Coldcard Qs, each for one seed.
    2. Set up **three secure spaces** for QR transfers in geographically distributed locations: private rooms with no windows or cameras, each equipped with a physical and electronic countermeasures, such as non-electronic white noise generators, and privacy enclosures.
    3. Install **privacy filters** on all [Signing-Device](airgapped-computer.md) and [Transaction-Manager](airgapped-computer.md) screens.
    4. Prepare **camera blockers** for the [Transaction-Managers](airgapped-computer.md).
    5. Obtain **tamper-evident seals** for the [Signing-Devices](airgapped-computer.md).
    6. Assemble **two [Transaction-Managers](airgapped-computer.md)** (Tails OS with persistent storage) within the airgap, each linked to a receive-only [full node](level-4.md): e.g., one RF and one satellite.
    7. Install Sparrow and detection tools (for data exfil attacks like [Dark Skippy](https://darkskippy.com)) on both Transaction-Managers' persistent storage.
    8. Authenticate and update software and firmware for all devices.
    9. Designate a **secure drop point** for broadcasting signed transactions, with a [full node](../sovereignty/level-4.md) and a Transaction-Manager running Tail OS and *no persistent storage*. This drop point will be used only for broadcasting signed transactions (everything else will happen within the quarantined airgap).

??? info "2. Set Up Receive-Only Full Nodes"
    1. **Satellite-Based Full Node**:  
       - Set up a receive-only full node using Blockstream's satellite service to receive blockchain data without internet.  
       - Follow the setup guide at [blockstream.com/satellite](https://blockstream.com/satellite/).
    2. **RF-Based Full Node**:  
       - Set up a second receive-only full node using an RF source for decentralized blockchain data reception.  
       - Use a reliable guide like the [RTL-SDR Bitcoin Blockchain Guide](https://www.rtl-sdr.com/receiving-the-bitcoin-blockchain-from-satellites-with-an-rtl-sdr/) for setup instructions.  
       - Ensure both nodes are configured as receive-only to maintain the airgap and prevent any outbound data transmission.

??? danger "3. Generate Seeds"
    1. Activate each airgapped [Signing-Device](airgapped-computer.md) in its respective secure location, one at a time.
    2. Generate a seed on each device (SeedSigner: Settings > Seeds > Generate Seed with [dice](dice.md); Coldcard Q: generate with dice). Ensure **privacy filters** are installed to protect displays.
    3. Jot the seed phrase on paper temporarily for confirmation.
    4. Validate the seed on the device display.
    5. Save as QR (SeedSigner: Export Seed QR; Coldcard Q: Export Seed QR).
    6. Repeat for all five seeds, powering off devices between steps. Label clearly (e.g., "Signing-Device-1", "Signing-Device-2").

??? danger "4. Backup to Metal"
    1. Stamp each seed onto durable [metal backups](../sovereignty/level-6.md).
    2. Cross-verify against the paper note.
    3. Incinerate the paper note.
    4. Store backups in distinct, secure sites with **tamper-evident seals**.

??? warning "5. Export ZPUBs to Transaction-Managers"
    1. On each [Signing-Device](airgapped-computer.md), load its seed and export ZPUB (SeedSigner: Export XPUB > Multisig; Coldcard Q: Export Wallet > Multisig).
    2. **Following secure QR transfer procedures**, convey ZPUBs via QR to both [Transaction-Managers](airgapped-computer.md) within the airgap.
    3. Integrate ZPUBs into Sparrow on both Transaction-Managers for a 3-of-5 [multisig](../sovereignty/level-7.md) watch-only wallet.

??? danger "6. Validate Addresses for Future Deposits"
    1. Produce receive addresses in Sparrow on both Transaction-Managers.
    2. **Following secure QR transfer procedures**, relay addresses via QR to each [Signing-Device](airgapped-computer.md) for verification.
    3. Confirm derivation from ZPUB on each device.

??? info "7. Test Setup with Small Transaction"
    1. Transfer a small Bitcoin amount following the Deposit procedure.
    2. Observe confirmation on both receive-only [full nodes](../sovereignty/level-4.md).
    3. Transfer some Bitcoin following the Withdrawal procedure (sign with three devices from different locations).
    4. Validate the workflow and record issues.




---

## Deposit

Receive Bitcoin using unique, verified addresses confirmed through both receive-only [full nodes](../sovereignty/level-4.md).

??? info "1. Generate Receive Address"
    1. Start Sparrow on both [Transaction-Managers](airgapped-computer.md) within the airgap.
    2. Generate a new receive address from the [multisig](../sovereignty/level-7.md) descriptor and ensure it matches on both.

??? danger "2. Verify Address on Airgapped Device"
    *Optional* -- used when no pre-verified address is available.
    
    1. **Following secure QR transfer procedures**, send address data via QR to at least three [Signing-Devices](airgapped-computer.md).
    2. Confirm ZPUB derivation on each device.

??? info "3. Share Address with Sender"
    1. Deliver the verified address securely.
    2. Await the transaction in Sparrow on both Transaction-Managers.

??? info "4. Monitor Incoming Transaction"
    1. Check the transaction on both receive-only [full nodes](../sovereignty/level-4.md) or Sparrow on both Transaction-Managers.
    2. Await confirmations and ensure consistency across nodes.





---

## Withdrawal

Spend Bitcoin via [multisig](../sovereignty/level-7.md) signing with three [Signing-Devices](airgapped-computer.md) from different locations.

??? info "1. Create Unsigned Transaction"
    1. Open Sparrow on both [Transaction-Managers](airgapped-computer.md) within the airgap.
    2. Select UTXOs, define recipient and amount.
    3. Export the PSBT as QR, ensuring both Transaction-Managers generate identical PSBTs.

??? warning "2. Transfer Unsigned Transaction to Airgapped Device"
    1. **Following secure QR transfer procedures**, convey the PSBT via QR to each of the three [Signing-Devices](airgapped-computer.md) in their respective locations.
    2. Load the PSBT on each device without signing.

??? danger "3. Sign Transaction"
    1. On each of the three [Signing-Devices](airgapped-computer.md), load the assigned seed and generate a partial signature.
    2. **Following secure QR transfer procedures**, export the partial PSBT as QR to both [Transaction-Managers](airgapped-computer.md).
    3. Power off devices to clear memory.

??? warning "4. Combine Signatures and Finalize Transaction"
    1. Merge the three partial signatures in Sparrow on both Transaction-Managers.
    2. Validate the finalized transaction on both systems.

??? warning "5. Inspect Transaction"
    1. Use detection tools (for [Dark Skippy](https://darkskippy.com) style attacks) on both Transaction-Managers to scan for anomalies.
    2. If issues are detected, abort and investigate.

??? info "6. Broadcast Signed Transaction"
    1. Transfer the signed transaction from the airgap to the **secure drop point**.
    2. Broadcast via the online Transaction-Manager at the drop point.
    3. Monitor confirmations on both receive-only [full nodes](../sovereignty/level-4.md) within the airgap.




---

## Check Balance

View balances without keys, using both receive-only [full nodes](../sovereignty/level-4.md).

??? info "1. Sync Watch-Only Wallet"
    1. Start Sparrow on both [Transaction-Managers](airgapped-computer.md) within the airgap.
    2. Connect to their respective receive-only [full nodes](../sovereignty/level-4.md) and sync.

??? info "2. Query Balance for Multisig Addresses"
    1. Check the balance in Sparrow on both Transaction-Managers and confirm consistency.



---

## Recovery

Restore from backups if keys or devices are lost. Use new [Signing-Devices](airgapped-computer.md) for multiple recoveries.

??? info "1. Identify the Issue"
    1. Determine the recovery type (e.g., lost device).
    2. Retrieve [metal backups](../sovereignty/level-6.md) from secure sites.

??? danger "2. Retrieve Backups"
    1. Access backups from their secure locations.
    2. Check tamper seals.

??? danger "3. Restore Keys on New Signing-Device"
    1. Input the backup seed on a new [Signing-Device](airgapped-computer.md) with **privacy filters** installed in a secure location.
    2. Validate the restored wallet.

??? warning "4. Rebuild Multisig Wallet Descriptor"
    1. **Following secure QR transfer procedures**, export ZPUBs to both [Transaction-Managers](airgapped-computer.md).
    2. Recreate the [multisig](../sovereignty/level-7.md) descriptor in Sparrow on both systems.

??? info "5. Test Recovery with Small Amount"
    1. Perform a test transaction to confirm functionality.



---

## Maintenance

Sustain protocol integrity with regular tasks across all locations.

??? danger "1. Verify Metal Backups"
    1. Inspect tamper seals and metal condition at each secure site.
    2. Test seeds on [Signing-Devices](airgapped-computer.md).

??? info "2. Update Software and Firmware"
    1. Check for updates and verify signatures.
    2. Update firmware in an airgapped environment at each location.

??? info "3. Run Full Node Health Checks"
    1. Ensure both receive-only [full nodes](../sovereignty/level-4.md) are synced and consistent.

??? info "4. Simulate Full Protocol Run"
    1. Test the entire protocol with small amounts, signing from multiple locations.
    2. Verify the secure environments and countermeasures.

??? info "5. Check Secure Environments"
    1. Ensure shielded rooms, privacy filters, and white noise generators are functional at all locations.
    2. Inspect tamper-evident seals on [Signing-Devices](airgapped-computer.md).
    3. Verify the integrity of the receive-only nodes and their connections.



---

This protocol achieves [Level 12 security](https://isbitcointrue.com/saving/sovereignty/level-12/) by integrating geographically distributed key signing, an expanded airgap covering redundant DMZs, receive-only nodes (RF and satellite), redundant Transaction-Managers, and a secure drop point, all to protect a 3-of-5 [multisig](../sovereignty/level-7.md) setup, ensuring protection against the most sophisticated threats.





