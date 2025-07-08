# Level 5: Airgap Quarantine

!!! info "Save Bitcoin with greater security than any bank (as much as you'd be comfortable hiding under your mattress)."
    <figure markdown>
    ![Level 5](/images/levels-Level-5.drawio.png)
      <figcaption>Level 5 -- airgap quarantine with dedicated air-gapped computer</figcaption>
    </figure>

Level 5 enforces an **airgap quarantine**, ensuring your signing device and its associated computer remain completely isolated from any network or external device. This strict airgap provides the highest level of Bitcoin self-custody security by eliminating risks of malware, network attacks, or physical data leaks. Data transfers use QR codes via a dedicated [air-gapped computer](../appendix/airgapped-computer.md), avoiding physical connections like USB or microSD. This setup builds on [Level 4](../level-4), combining a [Bitcoin Knots](https://bitcoinknots.org/) full node and a Tails OS transaction manager with an air-gapped signing process.

!!! warning "No paid nor *influenced* content -- all views are from personal experience"

## Why Airgap Quarantine?

The airgap is the foundation of Level 5, ensuring your private keys remain untouchable. By isolating the signing device and [air-gapped computer](../appendix/airgapped-computer.md), you eliminate all vectors for remote or physical compromise. Benefits include:

- **Uncompromised Security**: No network or physical connections prevent malware, keyloggers, or exploits from accessing your keys.
- **Enhanced Privacy**: QR codes transfer data optically, avoiding traceable interfaces like USB or network.
- **Sovereign Control**: You verify and sign transactions independently using trusted, open-source tools.

This guide uses a generic signing device with an [air-gapped computer](../appendix/airgapped-computer.md) running QR-capable software (e.g., Sparrow or Electrum) to maintain the airgap quarantine.

## Setting Up Your Airgap Quarantine

Level 5 assumes you have a [Level 4 setup](../level-4): a Bitcoin Knots full node and a Tails OS transaction manager with [Electrum](https://electrum.org/) or [Sparrow](https://www.sparrowwallet.com/) for a watch-only wallet. The airgap quarantine requires a signing device and an [air-gapped computer](../appendix/airgapped-computer.md) to handle QR code workflows, ensuring no network exposure.

### Signing Device Setup
The signing device holds your private keys and must remain air-gapped, never connecting to any network or device. You’ll need:

- **Hardware**: A Bitcoin-only signing device with seed phrase generation (e.g., 12/24-word BIP-39).
- **Power**: Offline power source (e.g., battery or dedicated charger).
- **Environment**: A clean, offline computer (e.g., temporary Tails OS session) for initial setup.

1. **Initialize the Signing Device**:
    - Power on the device using an offline power source (never connect to a networked system).
    - Update the firmware offline, following the device’s official instructions, using a sanitized microSD or USB drive.
    - Generate a new 12/24-word seed phrase (BIP-39) or import an existing seed.
    - Write down the seed phrase on paper or metal and store it securely offline.
2. **Export xPub**:
    - Export the extended public key (xPub) for your chosen wallet type (e.g., BIP-84 Native Segwit).
    - If the device supports QR codes, display the xPub as a QR code; otherwise, save it to a microSD card as a text file.
    - Transfer the xPub to the [air-gapped computer](../appendix/airgapped-computer.md) (via QR or sanitized microSD) for further transfer to the transaction manager.
    - On the Tails OS transaction manager, open Electrum or Sparrow, create a watch-only wallet, and import the xPub (similar to [Level 3](../level-3)).
    - Verify the watch-only wallet shows correct addresses and balances via your Bitcoin Knots node.
3. **Secure the Device**:
    - Set a strong PIN or passphrase, if supported.
    - Store the device in a tamper-evident bag or safe when not in use.

### Air-Gapped Computer Setup
The [air-gapped computer](../appendix/airgapped-computer.md) processes transactions and handles QR code generation/scanning, ensuring the signing device’s airgap is preserved. See [the appendix](../appendix/airgapped-computer.md) for detailed setup instructions. Requirements include:

- **Hardware**: A dedicated device (e.g., old laptop or Raspberry Pi) with a display, webcam, and no network hardware.
- **Storage**: A USB drive with [Tails OS](https://tails.boum.org/) or a clean Linux install (e.g., [Ubuntu](https://ubuntu.com/)).
- **Software**: Sparrow or Electrum installed offline for transaction processing and QR code support.
- **QR Scanner**: A webcam or attached USB webcam compatible with your OS.

1. **Prepare the Computer**:
    - Physically disable network capabilities (e.g., remove Wi-Fi/Bluetooth modules, tape over Ethernet port).
    - Install Tails OS or Ubuntu on a USB drive using a clean, offline system.
    - Install Sparrow or Electrum offline by transferring the verified installer via a USB drive.
2. **Verify Integrity**:
    - Boot the [air-gapped computer](../appendix/airgapped-computer.md) and confirm no network connections (e.g., check `ifconfig` or `nmcli` for no active interfaces).
    - Use a fresh Tails OS session or dedicated Linux install for each signing session to minimize risks.
3. **Import xPub (Initial Setup)**:
    - Transfer the signing device’s xPub (via QR code or sanitized microSD) to the [air-gapped computer](../appendix/airgapped-computer.md).
    - In Sparrow or Electrum, export the xPub as a QR code to the transaction manager.
    - Scan the QR code on the transaction manager to create the watch-only wallet.

### Transaction Manager Setup
The transaction manager is the [Level 4](../level-4) setup: a Tails OS USB with Electrum or Sparrow, connected to your Bitcoin Knots full node. It requires a webcam to scan QR codes from the [air-gapped computer](../appendix/airgapped-computer.md).

- **Electrum**: Enable QR code support in `Preferences > QR Code`.
- **Sparrow**: Use `Tools > Scan QR Code` for QR-based workflows.
- **Privacy**: Run on a local network with your Knots node, using Tails OS’s Tor routing for broadcasting transactions.

## Airgap Transaction Workflow

The airgap quarantine uses QR codes to transfer data between the transaction manager and [air-gapped computer](../appendix/airgapped-computer.md), with the signing device processing transactions offline. The workflow varies slightly depending on whether the signing device supports QR codes natively or requires microSD input.

### Step 1: Create Unsigned Transaction
1. On the Tails OS transaction manager, open Electrum or Sparrow.
2. Create a transaction in your watch-only wallet (e.g., send Bitcoin to an address).
3. Export the unsigned transaction as a QR code:
    - In Electrum, select `Send > QR Code`.
    - In Sparrow, go to `Transactions > Export > QR Code`.
4. Verify the transaction details (amount, address, fee) on the transaction manager.

### Step 2: Transfer to Air-Gapped Computer
1. Boot the [air-gapped computer](../appendix/airgapped-computer.md) with Tails OS or your Linux install.
2. Open Sparrow or Electrum and scan the QR code from the transaction manager’s screen using the webcam.
    - For large transactions, scan multiple QR codes as prompted.
3. Verify the transaction details (address, amount, fee) on the [air-gapped computer](../appendix/airgapped-computer.md).
4. Save the unsigned transaction to a microSD card (for devices without QR input) or export it as a QR code (for QR-capable devices).

### Step 3: Sign with the Signing Device
1. Power on the signing device using a battery or offline charger.
2. Load the unsigned transaction:
    - For QR-capable devices, scan the QR code from the [air-gapped computer](../appendix/airgapped-computer.md).
    - For non-QR devices, insert a sanitized microSD card with the unsigned transaction.
3. Verify the transaction details (destination address, amount, fee) on the signing device’s screen against the [air-gapped computer](../appendix/airgapped-computer.md).
4. If correct, approve the transaction to sign it. Output the signed transaction:
    - QR-capable devices: Display the signed transaction as a QR code.
    - Non-QR devices: Save the signed transaction to the microSD card (e.g., `-signed.psbt`).
5. If incorrect, reject the transaction and investigate discrepancies.
6. Power off the signing device.

### Step 4: Transfer Signed Transaction
1. On the [air-gapped computer](../appendix/airgapped-computer.md), load the signed transaction:
    - Scan the QR code from the signing device (if QR-capable).
    - Insert the microSD card with the signed transaction (if non-QR).
2. Verify the signed transaction details in Sparrow or Electrum.
3. Export the signed transaction as a QR code.

### Step 5: Broadcast Signed Transaction
1. On the transaction manager, scan the signed transaction QR code from the [air-gapped computer](../appendix/airgapped-computer.md):
    - In Electrum, use `Tools > Load Transaction > From QR Code`.
    - In Sparrow, use `Tools > Scan QR Code`.
2. Verify the transaction details again (address, amount, fee).
3. Broadcast the transaction to the Bitcoin network via your Bitcoin Knots node.
4. Confirm the transaction appears in your Knots node’s mempool (e.g., via `bitcoin-cli getmempoolentry`).

### Security Notes
- **Airgap Discipline**: Ensure the signing device and [air-gapped computer](../appendix/airgapped-computer.md) never touch a networked device, even for power or updates.
- **Screen Distance**: Position devices 6–12 inches apart for clear QR code scanning.
- **Lighting**: Use a well-lit environment, avoiding direct sunlight on screens.
- **Verification**: Cross-check transaction details on all devices to prevent spoofing.
- **MicroSD Hygiene**: For non-QR devices, use a dedicated, sanitized microSD card, stored offline.

## Maintaining the Airgap

The airgap is the bedrock of Level 5’s security. Any breach—network connection, untrusted USB, or online power source—could expose your keys. To preserve the airgap:

- **No Connections**: Never connect the signing device or [air-gapped computer](../appendix/airgapped-computer.md) to the internet, USB ports (except for offline power), or networked devices.
- **Offline Power**: Use a battery or offline charger for both the signing device and [air-gapped computer](../appendix/airgapped-computer.md).
- **Secure Storage**: Store the signing device, [air-gapped computer](../appendix/airgapped-computer.md), and any microSD cards in tamper-evident bags or a safe when not in use.
- **Clean Setup**: Update firmware or software using offline Tails OS sessions, then destroy the session.
- **Backup Integrity**: Store seed phrase backups (paper/metal) in separate, secure locations, never digitizing them.
- **Monitor Transaction Manager**: Periodically use a fresh Tails OS USB for the transaction manager to minimize malware risks.

## Signing Device Options

Several signing devices support airgap quarantine workflows, offering varying levels of QR code integration and cost:

- **Coldcard (Mk3 or earlier)**: Bitcoin-only, air-gapped, with robust security (secure element, PIN protection). Requires an [air-gapped computer](../appendix/airgapped-computer.md) for QR workflows, using microSD for transaction input. Priced ~$100–$150. [coldcard.com](https://coldcard.com/).
- **Coldcard Mk4**: Adds native QR code support for xPub export and transaction signing, eliminating the need for an [air-gapped computer](../appendix/airgapped-computer.md). Simplifies airgap workflows but is slightly more expensive. [coldcard.com](https://coldcard.com/docs/qr-codes).
- **SeedSigner**: DIY, open-source device built on Raspberry Pi Zero. Fully transparent, low-cost (~$50–$100), and QR-native, but requires assembly and technical expertise. [seedsigner.com](https://seedsigner.com/).
- **Specter-DIY**: Open-source, DIY device using affordable hardware (e.g., ESP32). Supports QR codes and air-gapped workflows but requires significant setup. Best for advanced users. [github.com/cryptoadvance/specter-diy](https://github.com/cryptoadvance/specter-diy).

Choose a device based on your preference for cost, ease of use, or open-source transparency, ensuring it supports air-gapped operation.

## Conclusion

Level 5 airgap quarantine delivers unmatched security for your Bitcoin, surpassing traditional banking systems through rigorous isolation. By combining a Bitcoin Knots full node, Tails OS transaction manager, and a strictly air-gapped signing process with an [air-gapped computer](../appendix/airgapped-computer.md), you achieve ultimate sovereignty and privacy. This setup is a digital fortress hidden under your mattress, protected by an unbreachable airgap.

To get started:

1. Set up a signing device with an offline seed and export its xPub via QR code or microSD.
2. Configure an [air-gapped computer](../appendix/airgapped-computer.md) with Sparrow or Electrum for QR workflows.
3. Ensure your Tails OS transaction manager has a webcam for QR scanning.
4. Practice the transaction workflow with small amounts to build confidence.
5. Store the signing device, [air-gapped computer](../appendix/airgapped-computer.md), microSD (if used), seed phrase backups, and node configuration securely offline.

For further reading, explore the [Bitcoin Knots guides](https://bitcoinknots.org/), 
 [Tails OS security practices](https://tails.boum.org/), or the documentation for your chosen signing device (see above).

---

*Disclaimer*: Airgap quarantine demands rigorous security practices. Verify all hardware and software, cross-check transactions, and maintain strict airgap discipline. 
Self-custody carries risks, and you are responsible for protecting your Bitcoin.































