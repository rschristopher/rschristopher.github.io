# Airgapped Computer

...

Even if you use the Paper and Pencil method,
 you will need to type that large number into a computer.
 And this computer must be airgapped and well secured 
 (even if that means destroying everything after you're done).
 This 256-bit number is literally the key to your wealth.

## DIY

You need a computer with no wireless, no bluetooth,
 no network connectivity of any kind.

The moment keys are stored on this device 
 it must never touch any other devices,
 not even a USB thumb-drive.

Or rather, the hardware itself should
 be considered compromised, and any
 device that touches this or is even
 in close proximity to this device
 should be considered a threat.
Afterall, it doesn't take much to
 steal a private key or seed phrase.
It is a small amount of information
 and our goal is to ensure that
 this information will never
 be revealed to anyone other
 than those we trust to 
 access our wealth.




### Input: PSBT

https://river.com/learn/terms/p/partially-signed-bitcoin-transaction-psbt/

BIP-174

This is the only data that ever needs to 
 input into our airgapped device.
And once signed, this is the only output
 from our device.
This means we must securely read in a PBST,
 and securely output a signed transaction.


#### QR Code

You will need a camera to read the QA Code of the PSBT




#### Micro SD

Alternatively, and this method is tricky to ensure an airgap,
 you can copy the PSBT from a MicroSD card or USB thumb drive.

Importantly, the same device should NOT be used to transfer
 the signed transaction back to a networked device -- doing
 so will violate the quarantine.



### Output: Signed Bitcoin Transaction

This is the most sensitive and high-risk part
 of a Bitcoin transaction, as you must take
 data from the quarantined device and
 broadcast it to the Bitcoin network.
The risk of breaking the airgap quanrantine
 is highest here.



#### QR Code

You will need a device with a camera to be in proximity
 of the airgapped device, this is itself risky, so 
 precautions must be taken (see protocols)



#### Printed QR Code

If you have a secure printer, one
 that you know cannot be remotely exploited
 then you can simply print the QR code 
 of the signed transaction, and then scan
 that printed QR code later on
 any trusted Internet connected device.


#### By Hand

You could opt to physically write down
 the signed transaction and then read it into
 an Internet-connected device later.
This is obviously error prone, and while you 
 would have minimized the risk of breaking
 the airgap quarantine,
 you will have maximized risk of error
 (including sending your Bitcoin to an unrecoverable address).



