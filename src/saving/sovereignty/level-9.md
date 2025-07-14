# Level 9: Fault Tolerance

!!! info "Remove all 'single points of compromise'."
    <figure markdown>
    ![Level 9](/images/levels-Level-9.drawio.png)
      <figcaption>Level 9 -- redundant signing devices</figcaption>
    </figure>

Fault tolerance in Bitcoin custody hinges on eliminating single points of compromise. 
Level 9 builds on our [multisig](level-7.md) protocol by adding redundant [Signing-Devices](../appendix/airgapped-computer.md),
 ensuring funds remain secure even if a device fails or is compromised, such as by malicious firmware.




---

## Why Fault Tolerance?

In a [multisig](level-7.md) configuration, using multiple [Signing-Devices](../appendix/airgapped-computer.md)
 (each with its own private key) provides fault tolerance against hardware failure or compromise of any single device. 
This is because the multisig setup requires signatures from multiple devices to authorize a transaction, preventing any one compromised device from acting alone. 
For example, malicious firmware with a Dark Skippy attack could compromise a single device (seed exfil), but fault-tolerant redundancy ensures your wealth remains safe.



---

## Which Devices?

Any two of the Signing-Devices discussed in [Level 3](level-3.md) can be used to ensure fault tolerance.

For example:

- [**SeedSigner**](https://seedsigner.com): A DIY, open-source signing device built on affordable hardware (Raspberry Pi Zero). SeedSigner is air-gapped, supports QR code scanning for transaction signing, and is ideal for those who prefer a fully verifiable solution.
- [**DIY Raspberry Pi Zero**](https://armantheparman.medium.com/how-to-set-up-a-raspberry-pi-zero-air-gapped-running-latest-version-of-electrum-desktop-wallet-85e59ecaddc0): For advanced users, you can create your own signing device using a Raspberry Pi Zero with open-source software.
- [**Specter-DIY**](https://github.com/cryptoadvance/specter-diy): This approach requires technical expertise but offers complete control over the hardware and software stack.
- [**Coldcard Q**](https://coldcard.com/q): Coldcard with QR scanner and display.





---

## Implementation

You will need at least a *2-of-3* multisig, and at least two different signing devices (ideally different manufacturer and firmware).

* **Seed-1** -- created by Signing-Device-1
* **Seed-2** -- created by Signing-Device-2
* **Seed-3** -- created by an [Airgapped-Computer](../appendix/airgapped-computer.md) or by [pencil and paper](../appendix/dice.md); this seed will act as a backup for recovery purposes.

Importantly, each seed is dedicated to a specific Signing-Device, and one should take additional precautions in the [Quarantine Rules](level-5.md)
 to ensure no cross-contamination between seeds and Signing-Devices.

In practice, your Transaction-Manager will create an unsigned transaction and you will transmit (via [quarantine](level-5.md)) to each Signing-Device and collect
 the needed signatures onto the Transaction-Manager, which will merge the signatures into a finalized transaction.
An example of Level 9 fault tolerance is included in the appendix, see the [advanced protocol](../appendix/protocol_advanced.md).




---

Redundant [Signing-Devices](../appendix/airgapped-computer.md) in a [multisig](level-7.md) setup bolster security against hardware failure and attacks. 
This method ensures resilience and fault-tolerant control over your funds.










