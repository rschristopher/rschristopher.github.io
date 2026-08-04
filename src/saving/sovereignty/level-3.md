# Level 3: Dedicated Hardware

!!! info "Save Bitcoin using a dedicated offline device (as much as you'd be comfortable hiding under your mattress)."
    <figure markdown>
    ![Level 3](/images/levels-Level-3.drawio.png)
      <figcaption>Level 3 -- typical home network with accessible cold storage</figcaption>
    </figure>

In order to save large amounts of money,
 and do so securely,
 you'll want to setup a dedicated signing device.
Essentially, this will separate the private keys from the public keys.

Public keys will be managed in a **transaction manager**
 (used to verify addresses for receiving Bitcoin,
 checking balances,
 and created unsigned transactions).
Private keys will be managed in an offline signing device
 (used only for spending Bitcoin).

While there are many alternatives -- we will use
 [SeedSigner](https://seedsigner.com/)
 as an example, but any offline signing device can be used.


!!! danger "Beware of Hardware Wallets"
    A hardware wallet runs firmware written by someone else,
     on hardware built by someone else.
    You are trusting both the intentions and the competence of everyone involved in building and marketing (and even shipping) the device to you.

    From 2021 to 2026 Coldcard (Coinkite) contained firmware with a broken random number generator.
    Seeds created on affected devices were weak enough that attackers
     could recreate them offline and drain wallets
     without physical access to any device
     (see [Block's analysis](https://engineering.block.xyz/blog/predictable-rng-fallback-and-32-bit-reseed-in-coldcard-firmware)).
    If the device that generated your seed was broken,
     a metal backup of that same seed does not save you.
    We do not recommend Coldcard.

    Ledger's [2020 data breach](https://www.ledger.com/addressing-the-july-2020-e-commerce-and-marketing-data-breach)
     leaked customer emails, names, phone numbers, and physical addresses.
    That kind of leak can and does lead to home invasions.

    Use open-source, air-gapped, Bitcoin-only tools
     (SeedSigner is the example we use here).
    Generate entropy you can verify yourself
     (see [dice](../appendix/dice.md)).


---

## Transaction Manager

A transaction manager can be any device,
 although it's recommended to use a dedicated laptop that you can install a Linux flavor such as [Ubuntu](https://ubuntu.com/). 
However, it is recommended to use [Tails OS](https://tails.boum.org/) on a USB drive for the added privacy and security.


### Honeypot

Your real **transaction manager** should be via Tails OS with a persistent xPub (see below). 
However, you may want to install [Sparrow](https://www.sparrowwallet.com/) or [Electrum](https://electrum.org/#home) with a hot wallet
 and use that for testing. 
This can also serve as a honeypot, that is, a Bitcoin wallet decoy.
If someone comes looking for Bitcoin, a honeypot can act as an effective decoy.




### Tails OS (xPub only)

Similar to [level-2](../level-2), 
 we will use a bootable [Tails OS](https://tails.boum.org/) USB drive for the actual **transaction manager**.
To set up your transaction manager with a watch-only wallet,
 export the xPub (ZPUB) from your SeedSigner
 (Settings > Advanced > Export XPUB > Single Sig, native SegWit)
 and display it as a QR code.
A full walkthrough is in the [basic protocol](../appendix/protocol_basic.md).

???+ note "Tails OS with xPub"
    1. On your Tails OS, open Electrum or Sparrow.
    2. Create a new wallet, select `Standard wallet`, and then `Use a master key` (or import xPub/ZPUB).
    3. Paste or scan the QR code of the xPub obtained from your SeedSigner.
    4. When you open this wallet, you'll see a warning indicating it is watch-only.
    5. When you attempt to *send* from this wallet, it will create an *unsigned transaction* (PSBT), which will need to be signed by the SeedSigner (see below).




---

## Signing Device

SeedSigner signs over QR codes -- no USB cable between the signer and the networked world.
For the full protocol, see [basic protocol with SeedSigner](../appendix/protocol_basic.md).

???+ note "Sign Transaction"
    1. On the transaction manager, create a send transaction in the watch-only wallet and export the unsigned PSBT as a QR code.
    2. Power on the SeedSigner and load the seed if necessary (QR scan or manual entry).
    3. Scan the unsigned PSBT QR from the transaction manager.
    4. Review transaction details carefully on the SeedSigner display (destination address, amount, fee). Ensure the address you are sending funds to is absolutely correct.
    5. If the transaction information is correct and the fee acceptable, approve and sign. Otherwise abort.
    6. Display the signed PSBT as a QR code for the transaction manager to scan.
    7. Power off the SeedSigner when finished.

???+ note "Broadcasting (signed) Transaction"
    1. On the transaction manager, scan the signed PSBT QR from the SeedSigner.
    2. Open Electrum or Sparrow and load the signed transaction.
    3. Verify the transaction details again, ensuring the destination address and amount are correct.
    4. Broadcast the transaction to the Bitcoin network.
    5. Once broadcasted, confirm the transaction appears as expected.




---

## Alternative Signing Devices

- [**SeedSigner**](https://seedsigner.com/): A DIY, open-source signing device built on affordable hardware (Raspberry Pi Zero). SeedSigner is air-gapped, supports QR code scanning for transaction signing, and is ideal for those who prefer a fully verifiable solution. See also the [econoalchemist setup guide](https://econoalchemist.github.io/SeedSigner/).
- [**DIY Raspberry Pi Zero**](https://armantheparman.medium.com/how-to-set-up-a-raspberry-pi-zero-air-gapped-running-latest-version-of-electrum-desktop-wallet-85e59ecaddc0): For advanced users, you can create your own signing device using a Raspberry Pi Zero with open-source software.
- [**Specter-DIY**](https://github.com/cryptoadvance/specter-diy): This approach requires technical expertise but offers complete control over the hardware and software stack.

These alternatives prioritize open-source principles and Bitcoin-only functionality, aligning with the ethos of self-custody.




---

## Hardware Wallets: Considerations

Hardware wallets can be part of a self-custody setup, but not all are created equal.
See the warning above for Coldcard and Ledger specifically.

Prefer devices that are:

- Bitcoin-only (smaller attack surface).
- Air-gapped (QR preferred over USB).
- Open-source enough that firmware and seed generation can be audited.
- Able to use independent entropy ([dice](../appendix/dice.md)), not only the vendor RNG.

Other hardware wallets may:

- Support multiple cryptocurrencies, increasing complexity and attack surfaces.
- Rely on proprietary software or hardware, limiting transparency.
- Require online connections or companion apps, reducing security compared to air-gapped solutions.
- Collect your name and shipping address as part of the purchase.

When choosing a signing device, prioritize devices that are Bitcoin-focused, air-gapped, and open-source -- and always verify seeds and addresses yourself.
