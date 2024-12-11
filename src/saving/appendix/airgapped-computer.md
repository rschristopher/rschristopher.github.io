# Appendix: Airgapped Computer

!!! warning "work in progress"


Even if you use
 [Dice and Paper](dice.md#dice-and-paper)
 to generate a seed phrase,
 you will need a computer to manage your private keys
 (which are generated from a seed phrase).
A computer will be needed
 to sign transactions with your private keys, 
 as well as verify receive addresses.
It is recommended to use a dedicated computer --
 a computer which is
 airgapped and well secured.



## Airgap Quarantine

An airgapped computer is one
 with no wireless, 
 no bluetooth,
 no network connectivity of any kind.
In addition to the airgap, 
 a quarantine will help ensure
 that the private keys will
 not be exposed.
A quarantine is a set of 
 procedures one would follow
 to ensure that no unauthorized
 data will flow in or out of 
 this device.

An airgap by itself will not
 guarantee the security of your
 private keys (although will greatly help).
Sensible quarantine procedures will be
 necessary to ensure the airgap is
 never violated and that the risk
 of hardware exploits are minimized.

While any device can be used,
 here are some recommendations,


???+ info "Raspberry Pi Zero (recommended)"
    The RPi Zero has no wifi
    and no networking of any kind.
    The device is so simple that
    it eliminates most potential
    hardware vulnerabilities.
    E.g., if you're worried about data
    leakage through discreet
    fan noise variation, well, the
    RPi Zero doesn't have a fan.

    **downside:** you must provide
    your own KVM (keyboard, video, mouse) peripherals
    which may have their own vulnerabilities,
    and you may end up with a sort of 
    Frankenstein computer
    (duct taped together)




???+ info "Laptop or Desktop"
    With some effort it's possible
    to take an existing laptop or desktop
    and simply remove the wifi card
    and all built-in networking devices.

    **downside:** not all computers
    allow for this kind of customization,
    and honestly even an older model
    laptop is probably more powerful
    than what you'll need for managing
    Bitcoin keys. And in general, the
    more hardware features, the more
    potential security concerns. 
    Simpler is better.


???+ info "Ideal Seed-signer"
    The ideal cold-storage computer
    simply doesn't exist.

    If it did, it would have the following attributes,

    1. smartphone-like device, or mini-laptop
    1. no built-in storage, MicroSD only (for the OS and software)
    1. open source hardware (with firmware verification and supply chain safeguards)
    1. completely air-gapped (no fan, no speaker, no microphone, QR-code reader only)
    1. read-only filesystem by default (option for persisting an encrypted volume)
    1. should run Linux
    1. should run electrum, python, and a terminal
    1. isolated electronic and physical counter-measures (to surveillance)

    All software and configuration should be on the MicroSD (like a Raspberry Pi)
    but with an optional tamper-proof seal such that seed phrases could only be
    generated *after* sealing the MicroSD in place.

    
    




## Software

A minimal Debian install is recommended,
 the bare minimum needed for the following:

* Electrum
* Sparrow
* iancoleman.io/bip39/
* BIP-39 Seed Words
* python and supporting scripts



## Input Device

PSBT

https://river.com/learn/terms/p/partially-signed-bitcoin-transaction-psbt/

BIP-174

This is the only data that ever needs to 
 input into our airgapped device.
And once signed, this is the only output
 from our device.
This means we must securely read in a PBST,
 and securely output a signed transaction.


### QR Code Reader

You will need a camera to read the QR Code of the PSBT




### Micro SD

Alternatively, and this method is tricky to ensure an airgap,
 you can copy the PSBT from a MicroSD card or USB thumb drive.

Importantly, the same device should NOT be used to transfer
 the signed transaction back to a networked device -- doing
 so will violate the quarantine.



## Output Device

This is the most sensitive and high-risk part
 of a Bitcoin transaction, as you must take
 data from the quarantined device and
 broadcast it to the Bitcoin network.
The risk of breaking the airgap quanrantine
 is highest here.



### QR Code Display

You will need a device with a camera to be in proximity
 of the airgapped device, this is itself risky, so 
 precautions must be taken (see protocols)



### Printed QR Code

If you have a secure printer, one
 that you know cannot be remotely exploited
 then you can simply print the QR code 
 of the signed transaction, and then scan
 that printed QR code later on
 any trusted Internet connected device.
This printer will necessarily be part of
 the quarantined airgapped computer,
 and its sole job is to print
 signed transactions (and nothing more).


### Pencil and Paper

If you're extremely paranoid and also patient,
 you could physically write down
 the signed transaction and then 
 input it into
 an Internet-connected device later.
This is obviously error prone, and while you 
 will have minimized the risk of breaking
 the airgap quarantine,
 you will have maximized risk of error
 (including sending your Bitcoin to an unrecoverable address).


<!--

...
Command Line Overview




https://iancoleman.io/bip39/


Entropy 
https://www.fourmilab.ch/random/





 [Alice and Bob](https://en.wikipedia.org/wiki/Alice_and_Bob)



The best way to understand this is through examples,
 so let's start with an example seed phrase.

!!! example "Example Seed Phrase"

    ```
    primary fetch primary prefer primary fetch primary fiber fish cause adult fee
    ```

This seed phrase can generate a root key, which can generate
 multiple accounts, each account with an unlimited number of
 addresses and key pairs (public and private).
The accounts and keys can be referenced by a
 [derivation path ](https://river.com/learn/terms/d/derivation-path/).

???+ example "m/0'/0'"
    This is the
    [BIP-32](https://github.com/bitcoin/bips/blob/master/bip-0032.mediawiki)
    path to the first account, which will give us the extended private key.
    This key can be used to generate any of the child keys and addresses for this account.

    ```
    xprv9xYcGh8prgvDkcydvSeV6xEZVZ4t47xy46VzdsJGVFN8YvwKPF51u9azfREPrQyLyV8HdjDDAzaMkKcRsdfAGQ2diobuW1ZkBrGXXqze5CQ
    ```

    Additionally, we can derive the extended public key, also known as a Master Public Key (MPK).

    ```
    xpub6BXxgCfih4UX1BnqD5bhJVMD3nnTUYWwC9kuFgUH11bmqAPhjhxFJWrvBnmh5QexRFkCxqFTS1AHiPhGeEp7HKoW1d85wTyEHSeJdZouJQJ
    ```

If you wanted to derive the next two accounts, you would use `m/0'/1'` and `m/0'/2'`.
Importantly, only the root key from the seed phrase can generate these accounts.
If all you had was one of the extended private keys, you could only use that within
 that account. 
And likewise, if all you had was the extended public key,
 you could only use that to generate addresses and public keys within
 that account.

Additionally, you can retrieve specific addresses and key pairs for any of these accounts.
For example, here is the first address and key pair for account number 2.

???+ example "m/0'/2'/0'"
    Receive Address
    ```
    1N1QRK5Ru3gJ7ue3Xv277cMUMdWePbehsc
    ```

    Public Key
    ```
    02279dd8f9c77ac86499fc05cebb3c81763e20f46ad3f9731e87992b512fe2e628
    ```

    Private Key
    ```
    L1yPKTZ6Rw2ge7utKVJrf8fgx7pm6kBAFEJAUmw63hFz1uWPaEeR
    ```


The format of the receive addresses can vary, e.g.,
 a native 
 [Segwit](https://river.com/learn/terms/p/p2wpkh/)
 address and derivation path look like the following,

???+ example "m/84'/0'/3'/0/0"
    Receive Address
    ```
    bc1q3ctchdrxdt4ydljcfp4y0s0a3w8ut07j22f8ty
    ```




???+ info "Bitcoin Improvement Proposals"
    In addition to
     [BIP-32](https://github.com/bitcoin/bips/blob/master/bip-0032.mediawiki)
     there are other related BIPs, e.g.,
    
     * [BIP-44](https://github.com/bitcoin/bips/blob/master/bip-0044.mediawiki), derivation paths for 
    [P2PKH](https://river.com/learn/terms/p/p2pkh/), e.g., `m/44'/0'/0'/0`
     * [BIP-49](https://github.com/bitcoin/bips/blob/master/bip-0049.mediawiki), derivation paths for 
    [P2SH-P2WPKH](https://river.com/learn/terms/b/bip-49-derivation-paths-for-wrapped-segwit/), e.g., `m/49'/0'/0'/0`
     * [BIP-84](https://github.com/bitcoin/bips/blob/master/bip-0084.mediawiki), derivation paths for
    [P2WPKH](https://river.com/learn/terms/b/bip-84-derivation-paths-for-native-segwit/), e.g., `m/84'/0'/0'/0`
    
    And also
     [BIP 39](https://github.com/bitcoin/bips/blob/master/bip-0039.mediawiki)
     which standardized the word list used in seed phrases.




https://learnmeabitcoin.com/beginners/private_keys

https://river.com/learn/terms/z/zpub-extended-public-key/

https://river.com/learn/terms/x/xpub-extended-public-key/


https://bitcointalk.org/index.php?topic=5213741.0


-->

