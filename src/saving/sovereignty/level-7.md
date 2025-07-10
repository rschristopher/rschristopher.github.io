# Level 7: Multisig Protocols

!!! info "Protocols to manage multi-signature Bitcoin custody (any amount)."
    <figure markdown>
    ![Level 7](/images/levels-Level-7.drawio.png)
      <figcaption>Level 7 -- Multisig Protocols</figcaption>
    </figure>

<!--

Lord Jesus Christ
Son of the Living God
Have mercy on me, a sinner

-->

Multisig (multi-signature) Protocols are the gold standard for securing Bitcoin. 
Unlike single-signature wallets, which rely on one private key, multisig requires multiple keys to authorize transactions,
 offering unmatched security and redundancy.

These can be configured in any *m-of-n quorum*, which allows for both security and fault tolerance,
 e.g., a *2-of-3 quorum* requires 2 valid signatures from any 3 private keys 
 -- which is ideal for [inheritance planning](../wealth/inheritance.md)
 and collaborative custody.

That said, managing a multisig setup can be complex for both technical and non-technical users. 
A well-defined *protocol*—a set of step-by-step instructions—is essential to navigate this complexity,
 ensuring your Bitcoin remains secure, accessible, and manageable for you and your loved ones.




---

## Why a Multisig Protocol?

Multisig setups, such as a *2-of-3* or *3-of-5* key arrangement, provide significant advantages: losing one key doesn’t compromise your funds, and an attacker needs multiple keys to steal your Bitcoin. These benefits come at the cost of increased complexity. Without a clear protocol, even experienced users can make errors, such as mismanaging keys, failing to document recovery steps, or exposing sensitive information. For non-technical users, the technical jargon, hardware requirements, and coordination of multiple devices can be overwhelming.

A multisig protocol addresses these challenges by:

- **Simplifying Complexity**: Breaking down setup, transaction signing, and recovery into clear, repeatable steps.
- **Reducing Errors**: Providing a checklist to avoid mistakes, such as improper key storage or incorrect wallet configurations.
- **Enabling Collaboration**: Guiding trusted parties (e.g., family or heirs) to access funds securely, even if they lack technical expertise.

One excellent example is the [Glacier Protocol](https://glacierprotocol.org/), which combines multisig with rigorous operational security. Glacier breaks its process into sub-protocols (setup, deposit, withdrawal), each with detailed instructions. While highly secure, Glacier has minor drawbacks, such as address reuse and lack of [BIP-39](https://github.com/bitcoin/bips/blob/master/bip-0039.mediawiki) mnemonic seed support. For users seeking alternatives, custom protocols can be tailored to balance security and usability.






---

## Challenges of Multisig

Multisig setups are inherently more demanding than single-signature wallets. Here are the key challenges and how a protocol mitigates them:

1. **Technical Complexity**: Configuring multisig requires coordinating multiple hardware wallets (e.g., [Coldcard](https://coldcard.com/), [SeedSigner](https://seedsigner.com/)) and compatible software (e.g., [Electrum](https://electrum.org/), [Sparrow Wallet](https://sparrowwallet.com/)). A protocol provides step-by-step guidance, making the process accessible to non-technical users.
2. **Key Management**: Storing multiple keys securely in separate locations (e.g., safes, safety deposit boxes) while ensuring accessibility is daunting. A protocol outlines best practices for storage, backup, and tamper-evident measures.
3. **Transaction Coordination**: Signing transactions with multiple keys, especially across air-gapped devices, is time-consuming and error-prone. A protocol streamlines the process with clear instructions for signing and broadcasting.
4. **Recovery and Inheritance**: Without documentation, recovering funds or passing them to heirs is nearly impossible. A protocol includes recovery steps and instructions for trusted parties, reducing reliance on the primary user’s expertise.
5. **User Error**: Mistakes like losing a key, misconfiguring a wallet, or reusing addresses can compromise security. A protocol enforces best practices and includes checks to catch errors before they become critical.








--- 
## Implementing

A multisig protocol is a written guide that you and your trusted contacts can follow. Below are the essential steps to create and implement one:

1. **Choose Your Multisig Setup**:
    - Decide on the key configuration (e.g., *2-of-3*, *3-of-5*) based on your security needs.
    - Use reputable signing devices like Coldcard or SeedSigner, which support multisig.
    - Choose software that supports multisig, such as [Electrum](https://electrum.org/), [Sparrow Wallet](https://sparrowwallet.com/), or [Specter](https://specter.solutions/). These tools coordinate key setup and transaction signing.

2. **Distribute Keys Securely**:
    - Store each key in a separate, secure location (e.g., personal safe, safety deposit box, or with a trusted collaborator). Use tamper-evident storage to detect unauthorized access.
    - Avoid digital backups that could be hacked, and never store keys together.

3. **Document Your Protocol**:
    - Use a clear, step-by-step guide covering setup, transaction signing, key recovery, and inheritance. Include wallet software versions, hardware details, and contact information for trusted parties.
    - Store the protocol securely (e.g., encrypted or in a physical safe) and share relevant sections with heirs or collaborators.

4. **Test Your Setup**:
    - Perform small test transactions to verify your protocol, including signing with multiple keys and recovering funds from backups.
    - Simulate failure scenarios (e.g., losing one key) to ensure your recovery process works perfectly.









---

## How Much Security Do You Need?

The level of security required for your Bitcoin custody depends on your threat model. A protocol benefits all levels of security, but at the higher levels involving multisig, it is essential to manage complexity and ensure reliability.

- **Minimal Security**: A mobile app hot wallet (e.g., BlueWallet or Phoenix) may suffice for small amounts or users unconcerned about potential loss. A simple protocol can still help by documenting backup and recovery steps, reducing the risk of errors.
- **Baseline Security**: Using a hardware wallet like a [Coldcard](https://coldcard.com/) or [SeedSigner](https://seedsigner.com/) with a single-signature setup and proper seed phrase backup provides robust protection. A protocol ensures consistent key management and inheritance planning.
- **Advanced Security**: Multisig setups, such as a 2-of-3 or 3-of-5 key arrangement, add redundancy and resilience. A protocol is critical here to coordinate multiple keys, streamline transaction signing, and guide non-technical users or heirs.
- **Paranoid Security**: For protection against sophisticated threats—like hostile nation-states (e.g., historical cases like [Canada’s trucker protest crackdowns](https://bitcoinmagazine.com/culture/bitcoin-passes-canada-trucker-protest-test))—use a high-threshold multisig, geographically distributed keys, air-gapped devices, and self-hosted full nodes. A protocol is indispensable to manage this complexity and ensure flawless execution.

The [Basic+](../appendix/basic.md) protocol offers a starting point with reasonable security, while the [Custom](../appendix/custom.md) template supports advanced configurations.

With a multisig protocol, you’ll protect your wealth better than any bank or custodian ever could.















