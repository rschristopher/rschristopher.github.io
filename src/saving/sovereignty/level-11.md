# Level 11: Countermeasures

!!! info "Electronic countermeasures to safeguard against 'NSA-level' threats."
    <figure markdown>
    ![Level 11](/images/levels-Level-11.drawio.png)
      <figcaption>Level 11 -- electronic countermeasures</figcaption>
    </figure>

Level 11 fortifies the [airgap quarantine](level-5.md) with electronic countermeasures to protect QR code transfers in a [multisig](level-7.md) setup. By ensuring only unsigned transactions from the [Transaction-Manager](../appendix/airgapped-computer.md) enter the airgap and only partially signed transactions exit, we aim to defend against advanced side-channel attacks, including those from malicious firmware like [Dark Skippy](https://darkskippy.com).




---

## Why Countermeasures?

QR code transfers between the [Transaction-Manager](../appendix/airgapped-computer.md) and [Signing-Devices](../appendix/airgapped-computer.md) are critical, carrying sensitive transaction data across the [airgap quarantine](level-5.md). Advanced adversaries could exploit side channels -- optical, electromagnetic, or acoustic -- to intercept this data. 
Countermeasures ensure that only unsigned transactions enter and partially signed transactions exit, while blocking unauthorized exfiltration, even from state-level threats.

Building on Level 10’s redundant networks, countermeasures add a layer of defense by securing the physical and electronic environment,
 complementing the [fault tolerance](level-9.md) of multiple [Signing-Devices](../appendix/airgapped-computer.md)
 and [redundant networks](level-10.md).




---

## Benefits of Countermeasures

- **Data Flow Control**: Strict validation ensures only unsigned PSBTs enter and partially signed PSBTs exit the airgap.
- **Side-Channel Protection**: Mitigates optical, electromagnetic, and acoustic attacks on QR code transfers.
- **Threat Resistance**: Raises the bar against advanced adversaries, preserving [multisig](level-7.md) security.




---

## Implementation

!!! warning "Quarantine Rules"
    While electronic and physical countermeasures prevent side-channel and tampering attacks, you must integrate them into your [Quarantine Rules](level-5.md) and [multisig protocol](level-7.md). Your security depends on your disciplined adherence to these rules.

- **Camera Blockers**: Apply webcam covers or tape to disable cameras on the [Transaction-Manager](../appendix/airgapped-computer.md) when not scanning QR codes, blocking unauthorized recording.
- **Firmware Checks**: Verify Signing-Device firmware regularly, using tools to detect anomalies (e.g., [Dark Skippy](https://darkskippy.com)), safeguarding against malicious software.
- **Privacy Enclosure**: Use a lightproof scanning booth to shield QR code transfers from external observation, enhancing optical security.
- **Privacy Filters**: Use polarized screen protectors on [Transaction-Manager](../appendix/airgapped-computer.md) and [Signing-Device](../appendix/airgapped-computer.md) displays to limit viewing angles, preventing hidden cameras or observers from capturing QR codes. 
- **Secure Space**: Perform transfers in a private, controlled room with no windows or cameras to prevent physical surveillance.
- **Shielded Environment**: Conduct QR transfers in a Faraday cage or shielded room to block electromagnetic emissions, protecting against signal interception.
- **Tamper-Evident Seals**: Affix seals on [Signing-Devices](../appendix/airgapped-computer.md) to detect unauthorized physical access, ensuring hardware integrity.
- **White Noise**: Deploy white noise generators (preferably non-electronic) to mask acoustic signals during device operation, thwarting audio-based attacks.

An example of Level 11 security is included in the appendix, see the [Ridiculous Protocol](../appendix/protocol_ridiculous.md).



---

Electronic countermeasures in the [airgap quarantine](level-5.md) ensure secure QR code transfers, protecting [multisig](level-7.md) transactions from advanced threats. 
Combined with Level 10’s redundant networks, Level 11 delivers unparalleled resilience for your Bitcoin infrastructure.





























