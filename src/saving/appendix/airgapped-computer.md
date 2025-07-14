# Appendix 3: Airgapped Computers

Even with dice and paper to generate a seed phrase, a computer remains
essential for Bitcoin self-custody. It calculates the checksum (the 12th or
24th word in a mnemonic), derives private keys and addresses from the seed,
verifies receive addresses, and signs transactions. For maximum security,
dedicate a computer to these tasks—one that is fully airgapped and rigorously
quarantined.

An airgapped computer lacks wireless capabilities, Bluetooth, or any network
connectivity. Paired with strict [quarantine
procedures](../sovereignty/level-5.md), it protects private keys from exposure.
Below are recommendations for three key components: the Signing-Device,
Airgapped-Computer, and Transaction-Manager. While setups can overlap—for
instance, a single device handling multiple roles—separating them enhances
security by minimizing risks.




---

## Signing-Device

The Signing-Device has one singular purpose: to sign Bitcoin transactions. It
is the only component that ever loads a seed phrase and derives private keys,
making it the most sensitive part of the system. To mitigate risks, it must
remain strictly within the airgap, never interacting directly with networked
devices or even sharing the same room in high-security setups.

A standout option is the [SeedSigner](https://seedsigner.com/), a stateless
signer that loads the seed only while powered on; once shut down, the
information vanishes from memory. This design eliminates persistent storage of
sensitive data, offering exceptional security. Setup guides are available
[here](https://econoalchemist.github.io/SeedSigner/).

Other hardware includes the Raspberry Pi Zero, which has no built-in networking
and minimal components, reducing vulnerabilities like data leakage through
hardware exploits. Attach a keyboard, monitor, and mouse as needed. For laptops
or desktops, physically remove Wi-Fi cards and networking hardware, then boot
from a secure OS like [Tails](https://tails.net/).

Install essential software: a minimal Debian distribution, Electrum or Sparrow
for signing, Python for scripts, and tools like iancoleman.io/bip39 for BIP-39
support. Input unsigned transactions via QR code only; output signed ones the
same way. Avoid USB or MicroSD to preserve the quarantine. Generate seeds with
high entropy, such as [dice](dice.md) rolls, and assume all electronics could
be compromised—use Faraday bags and camera covers.




---

## Airgapped-Computer

The Airgapped-Computer supports offline tasks beyond signing, such as scanning
and displaying QR codes to bridge the Transaction-Manager and Signing-Device.
It acts as an intermediary, ensuring the Signing-Device—a specialized subset of
the Airgapped-Computer—stays isolated within the airgap.

Hardware options mirror those for the Signing-Device: the Raspberry Pi Zero for
its simplicity, or modified laptops/desktops with networking removed. An ideal
conceptual device would be compact like a smartphone, with a MicroSD-based OS,
open-source hardware, no fan or microphone, and a read-only filesystem running
Linux, Electrum, or Sparrow.

Software setup includes a minimal Debian install, Electrum/Sparrow,
iancoleman.io/bip39, BIP-39 tools, and Python scripts. Input data via QR codes
or sanitized MicroSD/USB (use separate media for input and output to uphold
quarantine). Output via QR display, secure printing, or manual transcription
(though error-prone).

Verify firmware integrity and supply chain. Operate in an isolated space free
of windows, smart devices, or potential surveillance. The SeedSigner can double
as an Airgapped-Computer, but maintain separation to protect the signing
function.




---

## Transaction-Manager

Unlike the others, the Transaction-Manager connects to the Internet for watch-
only tasks like monitoring balances and broadcasting transactions. It serves as
the quarantine's gateway, exchanging data with the airgap solely via QR
codes—never direct contact.

Use a laptop booted from a Tails OS USB drive, as outlined in [Level 2: Your
Keys](../sovereignty/level-2.md). Enable a persistent volume to install
Electrum or Sparrow (see this [guide](https://danielpcostas.dev/installing-sparrow-wallet-on-tailsos-persistently/) for Sparrow setup). Tails ensures a
fresh, amnesic session each time, minimizing malware risks.

Software focuses on watch-only mode: Tails OS core, with Electrum or Sparrow
for wallet management. Input signed transactions via QR scanner; output
unsigned PSBTs as QR codes. Broadcast through your [full
node](../sovereignty/level-4.md) or trusted services. Connect only to secure
networks, and treat it as a target for bots and hackers—reboot fresh for every
session.




---

## Airgap Quarantine Rules

An airgap alone does not guarantee security. Follow strict [quarantine
rules](../sovereignty/level-5.md) to prevent unauthorized data flow.


To achieve nuclear-launch-code-level security, follow these rules as a concise, numbered checklist. Each includes a brief rationale for clarity and enforcement. The focus is on absolute isolation, verifiable processes, and layered defenses against physical, digital, and human threats. Adhere to them without exception during any session involving keys or transactions.

1. **No device or data crosses the quarantine except via QR codes**: Limit transfers between the Transaction-Manager and Airgapped-Computer to visual QR codes only; ban USB, MicroSD, or any physical media to eliminate malware vectors. *Rationale*: Prevents hidden payloads; QR enforces manual verification.

2. **Expose seed phrases only on the Signing-Device**: Never display, write, or input seeds on any other component; derive keys solely within this isolated environment. *Rationale*: Contains the most critical secret to one tamper-resistant point, reducing theft risk.

3. **Stow all smartphones and personal electronics in Faraday bags outside the room**: Power them off first and place in shielded bags; assume they are actively compromised for surveillance or key theft. *Rationale*: Blocks remote activation of microphones, cameras, or transmitters.

4. **Ban all electronic devices near the Signing-Device**: Exclude speakers, smart devices, fans, or anything with potential for acoustic/electromagnetic leaks; use a dedicated, shielded room if possible. *Rationale*: Mitigates side-channel attacks like audio-based data exfiltration.

5. **Ensure complete physical privacy**: Conduct sessions away from windows, in a locked room with no line-of-sight exposure; use white noise generators or RF shielding if available. *Rationale*: Guards against optical surveillance (e.g., drones, lasers) or thermal imaging.

6. **Sanitize and verify all tools pre-session**: Check software/firmware signatures on official sources; wipe temporary media and test for integrity; treat every component as potentially compromised. *Rationale*: Counters supply-chain attacks and ensures no pre-installed malware.

7. **If possible, require multi-person verification for critical steps**: Involve a trusted witness for seed loading or signing; use time-delayed access (e.g., 24-hour locks) to deter coercion. *Rationale*: Adds human redundancy against ransom or insider threats.

8. **Post-session wipe and audit**: Clear RAM on shutdown, log all actions, and test quarantine integrity periodically (e.g., simulate breaches quarterly). *Rationale*: Erases residual data and detects subtle violations early.

9. **Distribute and redundantly store components**: Keep Signing-Device elements geographically separate. *Rationale*: Ensures resilience against localized physical attacks like burglary or fire.

These rules, when followed meticulously, create a fortress-like barrier, making unauthorized access exponentially difficult—even for advanced adversaries. Test them in dry runs to build familiarity.






---

## Adversaries and Countermeasures

Protect against physical, cyber, and spiritual threats.

### Physical Adversaries
- Burglar: Hide keys, secure home.
- Ransom: Guns and defense.
- Fire: Stainless steel dog tags for backups.

### Cyber Adversaries
- Bot: Use Tails OS.
- Hacker: [Airgap quarantine](../sovereignty/level-5.md).
- NSA: Trust nothing; assume electronics spy/transmit. Use multiple airgapped devices with no single point of compromise.

### Spiritual Adversaries
- Powers and principalities: Christ Jesus is Lord and King; pray continuously and humble yourself.
- Taxes: Be responsible as a steward of God's wealth.
- Pride: Remember, this is not your wealth but God's.

Make yourself expensive to tyranny.




---

## Understanding Seed Phrases and Derivation

The best way to understand key management is through examples. Start with an
example seed phrase.

!!! example "Example Seed Phrase"
    ```
    primary fetch primary prefer primary fetch primary fiber fish cause adult fee
    ```

This seed generates a root key for multiple accounts, each with unlimited
addresses and key pairs, referenced by [derivation
paths](https://river.com/learn/terms/d/derivation-path/).

???+ example "m/0'/0'"
    Extended private key:
    ```
    xprv9xYcGh8prgvDkcydvSeV6xEZVZ4t47xy46VzdsJGVFN8YvwKPF51u9azfREPrQyLyV8HdjDDAzaMkKcRsdfAGQ2diobuW1ZkBrGXXqze5CQ
    ```

    Extended public key (Master Public Key):
    ```
    xpub6BXxgCfih4UX1BnqD5bhJVMD3nnTUYWwC9kuFgUH11bmqAPhjhxFJWrvBnmh5QexRFkCxqFTS1AHiPhGeEp7HKoW1d85wTyEHSeJdZouJQJ
    ```

For next accounts: `m/0'/1'`, `m/0'/2'`.

First address/key pair for account 2:

???+ example "m/0'/2'/0'"
    Receive Address:
    ```
    1N1QRK5Ru3gJ7ue3Xv277cMUMdWePbehsc
    ```

    Public Key:
    ```
    02279dd8f9c77ac86499fc05cebb3c81763e20f46ad3f9731e87992b512fe2e628
    ```

    Private Key:
    ```
    L1yPKTZ6Rw2ge7utKVJrf8fgx7pm6kBAFEJAUmw63hFz1uWPaEeR
    ```

Native SegWit example:

???+ example "m/84'/0'/3'/0/0"
    Receive Address:
    ```
    bc1q3ctchdrxdt4ydljcfp4y0s0a3w8ut07j22f8ty
    ```

### Bitcoin Improvement Proposals
- [BIP-32](https://github.com/bitcoin/bips/blob/master/bip-0032.mediawiki): Hierarchical deterministic wallets.
- [BIP-44](https://github.com/bitcoin/bips/blob/master/bip-0044.mediawiki): Derivation paths for P2PKH (e.g., `m/44'/0'/0'/0`).
- [BIP-49](https://github.com/bitcoin/bips/blob/master/bip-0049.mediawiki): Derivation paths for P2SH-P2WPKH (e.g., `m/49'/0'/0'/0`).
- [BIP-84](https://github.com/bitcoin/bips/blob/master/bip-0084.mediawiki): Derivation paths for P2WPKH (e.g., `m/84'/0'/0'/0`).
- [BIP-39](https://github.com/bitcoin/bips/blob/master/bip-0039.mediawiki): Standardized word list for seed phrases.

Additional resources:
- [Private Keys](https://learnmeabitcoin.com/beginners/private_keys)
- [ZPUB Extended Public Key](https://river.com/learn/terms/z/zpub-extended-public-key/)
- [XPUB Extended Public Key](https://river.com/learn/terms/x/xpub-extended-public-key/)
- [PSBT Discussion](https://bitcointalk.org/index.php?topic=5213741.0)











































































