# Airgapped Computer

Even if you use
 [Dice and Paper](../creating-keys/dice-and-paper.md)
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


## Software

A minimal Debian install is recommended,
 the bare minimum needed for Electrum.

* Electrum
* iancoleman.io
* BIP-39 Seed Words
* custom scripts



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

You will need a camera to read the QA Code of the PSBT




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



## Hardware Wallets

[Hardware Wallets](hardware-wallets.md) 
 can be a great self custody solution.

However, with the exception of devices like the
 [Coldcard](https://coldcard.com/),
 hardware wallets offer
 very different approaches to self-custody,
 are rarely Bitcoin-only,
 and they often
 involve proprietary software or hardware,
 with limited ability to verify entropy.


