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
A well-managed airgap quarantine offers you more security for your savings than any bank in the history of the world.





---

## Prepare

An airgap quarantine requires a signing device and an [air-gapped computer](../appendix/airgapped-computer.md) to handle QR code workflows, ensuring no network exposure.
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

An airgap quarantine is typically more involved than a simple network airgap.
By adhering to these rules you ensure maximum security for your savings.


To achieve nuclear-launch-code-level security, follow these rules as a concise, numbered checklist. Each includes a brief rationale for clarity and enforcement. The focus is on absolute isolation, verifiable processes, and layered defenses against physical, digital, and human threats. Adhere to them without exception during any session involving seeds or transaction signing.

1. **No device or data crosses the quarantine except via QR codes**: Limit transfers between the Transaction-Manager and Airgapped-Computer to visual QR codes only; ban USB, MicroSD, or any physical media to eliminate malware vectors. *Rationale*: Prevents hidden payloads; QR enforces manual verification.

2. **Expose seed phrases only on the Signing-Device**: Never display, write, or input seeds on any other component; derive keys solely within this isolated environment. *Rationale*: Contains the most critical secret to one tamper-resistant point, reducing theft risk.

3. **Stow all smartphones and personal electronics in Faraday bags outside the room**: Power them off first and place in shielded bags; assume they are actively compromised for surveillance or key theft. *Rationale*: Blocks remote activation of microphones, cameras, or transmitters.

4. **Ban all electronic devices near the Signing-Device**: Exclude speakers, smart devices, fans, or anything with potential for acoustic/electromagnetic leaks; use a dedicated, shielded room if possible. *Rationale*: Mitigates side-channel attacks like audio-based data exfiltration.

5. **Ensure complete physical privacy**: Conduct sessions away from windows, in a locked room with no line-of-sight exposure; use white noise generators or RF shielding if available. *Rationale*: Guards against optical surveillance (e.g., drones, lasers) or thermal imaging.

6. **Sanitize and verify all tools pre-session**: Check software/firmware signatures on official sources; wipe temporary media and test for integrity; treat every component as potentially compromised. *Rationale*: Counters supply-chain attacks and ensures no pre-installed malware.

7. **If possible, require multi-person verification for critical steps**: Involve a trusted witness for seed loading or signing; use time-delayed access (e.g., 24-hour locks) to deter coercion. *Rationale*: Adds human redundancy against ransom or insider threats.

8. **Post-session wipe and audit**: Clear RAM on shutdown, log all actions, and test quarantine integrity periodically (e.g., simulate breaches quarterly). *Rationale*: Erases residual data and detects subtle violations early.

9. **Distribute and redundantly store components**: Keep Signing-Device elements geographically separate. *Rationale*: Ensures resilience against localized physical attacks like burglary or fire.

These rules, when followed meticulously, create a fortress-like barrier, making unauthorized access exponentially difficult—even for advanced adversaries. 
Test them in dry runs to build familiarity.








---

## Signing Ceremony

In order to maintain the integrity of your airgap quarantine,
 a strict signing ceremony should be followed.
Airgap quarantine steps are highlighted in red.

???+ note "Step 1: Create Unsigned Transaction"
    1. On the Tails OS transaction manager, open Electrum or Sparrow.
    2. Create a transaction in your watch-only wallet (e.g., send Bitcoin to an address).
    3. Verify the transaction details (amount, address, fee).
    4. Export the unsigned transaction as a QR code.

???+ danger "Step 2: Transfer to Air-Gapped Computer"
    1. Boot the [air-gapped computer](../appendix/airgapped-computer.md) (with Tails OS or Linux install).
    2. Open Sparrow or Electrum and scan the QR code from the transaction manager.
    3. Verify the transaction details (address, amount, fee).
    4. Save the unsigned transaction to a microSD card (for devices without QR input) or export it as a QR code (for QR-capable signing device).

???+ danger "Step 3: Sign Transaction"
    1. Power on the signing device using a battery or offline charger.
    2. Load the unsigned transaction.
    3. Verify the transaction details (address, amount, fee).
    4. Approve / Sign the transaction.

???+ danger "Step 4: Transfer Signed Transaction"
    1. On the [air-gapped computer](../appendix/airgapped-computer.md), load the signed transaction.
    2. Verify the signed transaction details in Sparrow or Electrum.
    3. Export the signed transaction as a QR code.

???+ note "Step 5: Broadcast Signed Transaction"
    1. On the transaction manager, scan the signed transaction QR code from the [air-gapped computer](../appendix/airgapped-computer.md).
    2. Verify the transaction details again (address, amount, fee).
    3. Broadcast the transaction to the Bitcoin network via your Bitcoin node.
    4. Wait for transaction confirmation.














--- 

## Signing Devices

!!! warning "No paid nor *influenced* content -- all views are from personal experience"

Choose a device based on your preference for cost, ease of use, or open-source transparency, ensuring it supports air-gapped operation.

- [**Coldcard**](https://coldcard.com): Bitcoin-only, air-gapped, with robust security (secure element, PIN protection). Requires an [air-gapped computer](../appendix/airgapped-computer.md) for QR workflows, using microSD for transaction input.
- [**Coldcard Mk4**](https://coldcard.com/docs/qr-codes): Adds native QR code support for xPub export and transaction signing. Simplifies airgap workflows but is slightly more expensive.
- [**SeedSigner**](https://seedsigner.com): DIY, open-source device built on Raspberry Pi Zero. Fully transparent, and QR-native, but requires assembly and technical expertise.
- [**Specter-DIY**](https://github.com/cryptoadvance/specter-diy): Open-source, DIY device using affordable hardware. Supports QR codes and air-gapped workflows but requires significant setup. Best for advanced users.


Regardless of which signing device you use,
 an airgap quarantine delivers unmatched security for your Bitcoin, far surpassing the security of traditional banking systems with respect to custody of wealth. 
By combining a Bitcoin full node, Tails OS transaction manager, and a strictly air-gapped signing process, you achieve ultimate sovereignty and privacy. 


---

*Disclaimer*: Airgap quarantine demands rigorous security practices. Verify all hardware and software, cross-check transactions, and maintain strict airgap discipline. 
Self-custody carries risks, and you are responsible for protecting your Bitcoin.































