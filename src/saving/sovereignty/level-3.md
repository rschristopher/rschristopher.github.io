# Level 3: Dedicated Hardware

!!! info "Save Bitcoin using a dedicated offline device (as much as you'd be comfortable hiding under your mattress)."
    <figure markdown>
    ![Level 3](/images/levels-Level-3.drawio.png)
      <figcaption>Level 3 -- typical home network with accessible cold storage</figcaption>
    </figure>

In order to save large amounts of money,
 and do so securely,
 you'll want to setup a dedicated signing device.
Essentially, separate the private keys from the public keys.
Public keys will be managed in a transaction manager
 (used to verify addresses for receiving Bitcoin,
 checking balances,
 and created unsigned transactions).
Private keys will be managed in an offline signing device
 (used only for spending Bitcoin).

While there are many alternatives-- we will use
 [coldcard](https://coldcard.com/)
 as an example, but any offline signing device can be used.


!!! warning "no paid nor *influenced* content -- all views are from personal experience"




## Transaction Manager

A transaction manager can be any device,
 although it's recommended to use a dedicated laptop that you can install a Linux flavor such as [Ubuntu](https://ubuntu.com/). 
You will still be using [Tails OS](https://tails.boum.org/) on a USB drive; 
 however, it's recommended to *also* install a Bitcoin client (such as [Electrum](https://electrum.org/#home)
 or [Sparrow](https://www.sparrowwallet.com/)) on the transaction manager directly. 
You can optionally use this client as a decoy or *honeypot*.



### Honeypot

Your transaction manager should be via Tails OS with a persistent xPub. 
However, you may want to install Sparrow normally with a hot wallet that you can use for testing. 
This can also serve as a honeypot, that is, a Bitcoin wallet decoy.





### Tails OS (xPub only)

Similar to [level-2](../level-2), 
 we will use a bootable [Tails OS](https://tails.boum.org/) USB drive for the actual transaction manager.
To set up your transaction manager with a watch-only wallet, follow the steps outlined in the [Coldcard documentation](https://coldcard.com/docs/paths#dump-summary-file)
 to export your xPub from the Coldcard. 

1. On your Tails OS, open Electrum.
2. Create a new wallet, select `Standard wallet`, and then `Use a master key`.
3. Paste or scan the QR code of the xPub obtained from your Coldcard.
4. When you open this wallet, you'll see a warning indicating it is watch-only.
5. When you attempt to *send* from this wallet, it will create an *unsigned transaction* file, which will need to be signed by the signing device (see below).



---



## Signing Device

Adapted from the [Coldcard docs](https://coldcard.com/docs/send-receive-btc#sending-bitcoin-airgapped):

1. Connect your Coldcard to power and enter your PIN if you haven't already done so.
2. Select `Ready to Sign` from the main menu.
3. Insert the microSD card containing the unsigned transaction file from your transaction manager.
4. The Coldcard briefly shows *Reading...* and *Validating...* before displaying transaction details. Take every opportunity to check and double-check transaction information. Ensure the address you are sending funds to is absolutely correct.
5. If the transaction information is correct and the fee acceptable, press OK (✓). Otherwise, abort the transaction by pressing X.
6. Your Coldcard signs the transaction and saves two files to the microSD card: one ending in `-signed.psbt` and another `-final.txn`.
7. Press OK (✓) to return to the Main Menu.

You can now power off the Coldcard and transfer the microSD card back to the transaction manager running Tails OS.




### Broadcasting the Transaction

Back on your Tails OS transaction manager:

1. Insert the microSD card with the signed transaction files.
2. Open Electrum or Sparrow and load the `-signed.psbt` or `-final.txn` file.
3. Verify the transaction details again, ensuring the destination address and amount are correct.
4. Broadcast the transaction to the Bitcoin network.
5. Once broadcasted, you can safely remove the microSD card and store it securely.



### Alternative Signing Devices

While Coldcard is a robust, Bitcoin-only, [air-gapped](../appendix/airgapped-computer.md) solution, other dedicated hardware options exist for self-custody. Here are two recommended alternatives:

- [**SeedSigner**](https://seedsigner.com): A DIY, open-source signing device built on affordable hardware like a Raspberry Pi Zero. SeedSigner is air-gapped, supports QR code scanning for transaction signing, and is ideal for those who prefer a fully verifiable, low-cost solution.
- [**DIY Raspberry Pi Zero**](https://armantheparman.medium.com/how-to-set-up-a-raspberry-pi-zero-air-gapped-running-latest-version-of-electrum-desktop-wallet-85e59ecaddc0): For advanced users, you can create your own signing device using a Raspberry Pi Zero with open-source software.
- [**Specter-DIY**](https://github.com/cryptoadvance/specter-diy): This approach requires technical expertise but offers complete control over the hardware and software stack.

These alternatives prioritize open-source principles and Bitcoin-only functionality, aligning with the ethos of self-custody.
However, they may require more setup effort compared to a Coldcard.





---

## Hardware Wallets: Considerations

Hardware wallets can be an excellent self-custody solution, but not all are created equal. 
Devices like the Coldcard and SeedSigner are Bitcoin-only, air-gapped, and prioritize open-source software,
 allowing users to verify entropy and maintain full control over their keys. 
Other hardware wallets may:

- Support multiple cryptocurrencies, increasing complexity and attack surfaces.
- Rely on proprietary software or hardware, limiting transparency.
- Require online connections, reducing security compared to air-gapped solutions.

When choosing a hardware wallet, prioritize devices that are Bitcoin-focused, air-gapped, and open-source to ensure maximum security and sovereignty.






---

## Conclusion

Level 3 self-custody with a dedicated signing device like Coldcard, SeedSigner, or a DIY solution provides a high level of security for saving significant amounts of Bitcoin. By separating your private keys (on the offline signing device) from your public keys (on the transaction manager), you minimize risks while maintaining full control over your funds. Using Tails OS for the transaction manager and incorporating a honeypot adds additional layers of protection.

To get started:

1. Choose a signing device (e.g., Coldcard or SeedSigner).
2. Set up a dedicated transaction manager with Tails OS and a watch-only wallet.
3. Practice the air-gapped signing process with small amounts to ensure familiarity.
4. Store your signing device and seed phrase backups in secure, offline locations.

This setup is akin to hiding your wealth "under the mattress" but with the cryptographic security of Bitcoin. 
For further reading, explore the [Coldcard documentation](https://coldcard.com/docs/) or [SeedSigner guides](https://seedsigner.com/) to deepen your understanding of secure self-custody.










