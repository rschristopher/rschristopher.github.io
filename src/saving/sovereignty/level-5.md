# Level 5: Airgap Quarantine

!!! info "Greater security than any bank (as much as you'd be comfortable hiding under your mattress)."
    <figure markdown>
    ![Level 5](/images/levels-Level-5.drawio.png)
      <figcaption>Level 5 -- airgap quarantine with dedicated air-gapped computer</figcaption>
    </figure>

An **airgap quarantine** ensures your signing device and any associated computers remain completely isolated from any network or external device. 
A strict airgap provides the highest level of security by eliminating risks of malware, network attacks, or physical data leaks. 
Data transfers require QR codes via a dedicated [air-gapped computer](../appendix/airgapped-computer.md),
 avoiding physical connections like USB or microSD. 

By isolating the signing device via an [air-gapped computer](../appendix/airgapped-computer.md), you eliminate most all attack vectors (for remote or physical compromise).
A well-managed airgap quarantine offers you more security to your savings than any bank in the history of the world.





---

## Prepare

An airgap quarantine requires a signing device and possibly an [air-gapped computer](../appendix/airgapped-computer.md) to handle QR code workflows, ensuring no network exposure.
This can be challenging to setup, and it is important to prepare carefully.

Technically, there are numerous ways to create an airgap, either on existing hardware or something like a [SeedSigner](https://seedsigner.com/).
The most challenging aspect is not the device, but the discipline used to ensure that the Quarantine Rules (see below) are never violated.

Ultimately, you'll need an airgapped device (or devices) that can perform the following:

1. Input seeds and/or keys (verify checksums).
1. Read QR codes (of unsigned transactions).
1. Sign transactions.
1. Display QR codes (of signed transactions).

If you have a signing device that doesn't perform all of the above (such as no QR support),
 you will need an air-gapped laptop, and you must ensure that your signing device ONLY ever interfaces with that air-gapped laptop.
[Tails OS](https://tails.boum.org/) can be useful towards this end, although it's important to maintain the airgap
 -- that is -- the USB drive used by Tail OS must also be quarantined.







---

## Quarantine Rules

The rules of an airgap quarantine are typically more involved than a simple network airgap.
By adhering to these rules you ensure maximum security for your savings.

1. No device can cross the quarantine (except the transaction manager via QR codes).
1. No device can be exposed to your seed phrases (except your signing device).
1. Stow all smartphones in farraday bags outside the room where you will power on your signing device. Assume they are actively trying to steal your keys (and your Bitcoin).
1. Ensure there are no electronic devices in the vicinity of your signing device (including speakers and any "smart" devices).
1. Ensure you are not near a window and that you have complete privacy.









---

## Signing Ceremony

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





---

## Maintaining the Airgap

The airgap is the bedrock of Level 5’s security. Any breach—network connection, untrusted USB, or online power source—could expose your keys. To preserve the airgap:

- **No Connections**: Never connect the signing device or [air-gapped computer](../appendix/airgapped-computer.md) to the internet, USB ports (except for offline power), or networked devices.
- **Offline Power**: Use a battery or offline charger for both the signing device and [air-gapped computer](../appendix/airgapped-computer.md).
- **Secure Storage**: Store the signing device, [air-gapped computer](../appendix/airgapped-computer.md), and any microSD cards in tamper-evident bags or a safe when not in use.
- **Clean Setup**: Update firmware or software using offline Tails OS sessions, then destroy the session.
- **Backup Integrity**: Store seed phrase backups (paper/metal) in separate, secure locations, never digitizing them.
- **Monitor Transaction Manager**: Periodically use a fresh Tails OS USB for the transaction manager to minimize malware risks.






--- 

## Signing Devices

!!! warning "No paid nor *influenced* content -- all views are from personal experience"

Several signing devices support airgap quarantine workflows, offering varying levels of QR code integration and cost:

- **Coldcard (Mk3 or earlier)**: Bitcoin-only, air-gapped, with robust security (secure element, PIN protection). Requires an [air-gapped computer](../appendix/airgapped-computer.md) for QR workflows, using microSD for transaction input. Priced ~$100–$150. [coldcard.com](https://coldcard.com/).
- **Coldcard Mk4**: Adds native QR code support for xPub export and transaction signing, eliminating the need for an [air-gapped computer](../appendix/airgapped-computer.md). Simplifies airgap workflows but is slightly more expensive. [coldcard.com](https://coldcard.com/docs/qr-codes).
- **SeedSigner**: DIY, open-source device built on Raspberry Pi Zero. Fully transparent, low-cost (~$50–$100), and QR-native, but requires assembly and technical expertise. [seedsigner.com](https://seedsigner.com/).
- **Specter-DIY**: Open-source, DIY device using affordable hardware (e.g., ESP32). Supports QR codes and air-gapped workflows but requires significant setup. Best for advanced users. [github.com/cryptoadvance/specter-diy](https://github.com/cryptoadvance/specter-diy).

Choose a device based on your preference for cost, ease of use, or open-source transparency, ensuring it supports air-gapped operation.





---

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































