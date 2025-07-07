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
 although it's recommended to use a dedicated laptop
 that you can install a Linux flavor such as
 [Ubuntu](https://ubuntu.com/).
You will still be using 
 [Tails OS](https://tails.boum.org/) on a USB drive,
 however, it's recommended to *also* install
 a Bitcoin client (such as
 [Electrum](https://electrum.org/#home)
 or
 [Sparrow](https://www.sparrowwallet.com/))
 on the transaction manager directly.
You will use this client as a
 decoy or *honeypot*.
 


### Honeypot

The proper transaction manager will be via Tails OS with a persistent xPub.
However, you may want to install Sparrow normally with a hot wallet that you can use for testing.
This can also serve as a honeypot, that is, a Bitcoin wallet decoy.




### Tails OS (xPub only)

Similar to [level-2](../level-2) we will use a
 bootable 
 [Tails OS](https://tails.boum.org/) USB drive,

https://coldcard.com/docs/paths#dump-summary-file


Create new wallet, select `Standard wallet` and then `Use a master key`,

![electrum-use-master-key](/images/electrum-use-master-key.png)

You can than *paste* or do a QR capture of the xpub you got from above.
When you open this wallet you'll get the following warning,

![electrum-watch-only](/images/electrum-watch-only.png)

When you try to *send* from this wallet it will instead create an
 *unsigned transaction* file, which will need to be signed by
 the signing device (see below).




## Signing Device

Adapted from the
 [coldcard docs](https://coldcard.com/docs/send-receive-btc#sending-bitcoin-airgapped),

1. Connect your COLDCARD to power and enter your PIN if you haven't already done so.
1. Select `Ready to Sign` from the main menu.
1. The COLDCARD briefly shows Reading . . . and Validating . . . before displaying transaction details. Take every opportunity to check and double check transaction information. Make sure the address you are sending funds to is absolutely correct.
1. If the transaction information is correct and the fee acceptable, press OK(✓). Otherwise, you can abort the transaction by pressing X.
1. Your COLDCARD signs the transaction and saves two files to the microSD card, one ending in -signed.psbt, the other -final.txn.
1. Press OK(✓) to return to the Main Menu.

You can now power off the coldcard,
 and transfer the microSD card back to the transaction manager 
 running Tails OS.



<!--

Coldcard

DIY rpi-zero

Seedsigner

https://alevchuk.medium.com/bitcoin-good-start-c70ef23092c2



## Hardware Wallets

Hardware Wallets
 can be a great self custody solution.

However, with the exception of devices like the
 [Coldcard](https://coldcard.com/),
 hardware wallets offer
 very different approaches to self-custody,
 are rarely Bitcoin-only,
 and they often
 involve proprietary software or hardware,
 with limited ability to verify entropy.



-->






