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

## Best Practices

- **Spread Out**: Keep devices in different physical locations.
- **Verify Often**: Check device integrity and update firmware.
- **Backup Wisely**: Store seed phrases in [metal](level-6.md), apart from devices.




---

Redundant [Signing-Devices](../appendix/airgapped-computer.md) in a [multisig](level-7.md) setup bolster Bitcoin security against hardware failure and attacks. 
This method ensures resilience and fault-tolerant control over your funds.






