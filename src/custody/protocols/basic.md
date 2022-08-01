# Bitcoin Security Protocol: Basic+


???+ info "Who is this good for?"
    This protocol
    is easy to use
    without compromising 
    security or privacy (unlike your bank).

    It is ideal for
    anyone wanting to
    self custody their Bitcoin 
    with more security than any bank, ever.


High-entropy (256-bit) seed phrase

Complete cold-storage,
 private keys will never touch an Internet-connected device.


PDF ?



## Setup


???+ check "Device list"
    1 coldcard (or air-gapped device)

    1 micro SD card

    1 USB card loaded with Tails OS (Electrum persisted)
    
    1 laptop (that can be booted with Tails OS)

*Most importantly*, you will need
 a private place; a place with no surveillance,
 no smartphones nor computers;
 a place where no one can see
 what you're doing.

???+ danger "Must be done in private"
    These steps (in red) involve private keys
    and must be done in complete privacy.
    This means no phones, no Internet,
    and no electronics other than what 
    is specified (e.g., a coldcard).

    This can be as simple as a bathroom
    or a basement, just ensure that you have
    privacy.


???+ warning "Be careful"
    These steps (in orange) involve
    access to your Bitcoin addresses 
    and should be handled with caution.

    It is advisable to use the same private
    place as above
    and only bring with you the listed devices
    (which may involve Internet access).
    Please leave all other devices,
    including smartphones, elsewhere.


    

### Seed Creation

This is a 3-step process ...


???+ danger "Seed Creation (step 1/3): Generate Seed"
    Ensure your smartphone is in another room.

    Ensure there is no Internet connected devices
    in the room with you.

    You will need only the coldcard, and dice.

    ... Dice rolls to ensure 256-bits of entropy


???+ warning "Seed Creation (step 2/3): Master Public Key"
    Ensure your smartphone is in another room.

    Ensure there is no Internet connected devices
    in the room with you, except the laptop.
    Ensure that the laptop is powered off.

    You will need the laptop, coldcard, Micro SD,
    and Tails OS USB

    Power on the coldcard,
     ... Transfer master public key to Micro SD

    Boot Tails OS,
    ... Transfer master public key to Tails



???+ warning "Seed Creation (step 3/3): Hot-wallet Decoys"

    This step is not strictly required
    but is recommended.

    When you boot Tails OS you can create
    additional wallets, and while these will
    be "hot" wallets, these will be far more
    secure than any wallets you create on
    your smartphone.





### Address Verification

???+ warning "Verify Receive Addresses"
    Boot Tails, open Electrum, view addresses

    Turn on Coldcard, Address Explorer

    Compare addresses, they should be identical

    *optional* --
    Write down partial addresses (including change addresses)
    to make this step faster in the future by not needing both devices to perform address verification.





### Proof of Control

1. Deposit to coldcard
1. Withdrawal from coldcard to a hot-wallet
1. Deposit back to coldcard
1. verify hot and cold wallets have now received and sent.




## Deposit 

???+ warning "Deposit Bitcoin"
    Boot Tails, open Electrum, receive address (verify as needed)

    Transfer the receive address via QR code,
    even to non-private device (e.g., smartphone)
    if depositing KYC coins from an exchange.




## Verify Balance

???+ warning "Verify Balance"
    Boot Tails, open Electrum, view balances






## Withdrawal 

This is a 3-step process ...

???+ warning "Withdrawal (step 1/3): Create Unsigned Transaction"
    Boot Tails, open Electrum,
    create transaction

    Insert secure micro SD card into your computer running Tails,
    write unsigned transaction (PSBT) to card



???+ danger "Withdrawal (step 2/3): Sign Transaction"
    Insert secure micro SD card into Coldcard,
    sign transaction



???+ warning "Withdrawal (step 3/3): Broadcast Signed Transaction"
    Insert secure micro SD card into your computer running Tails,
    load the signed transaction and broadcast.

    Wait for confirmation.



## Additional Security Concerns

You may want to consider enhancing this
 protocol with more advanced techniques.

+ Metal seed backup
+ Run a full node
+ Coinjoin and other privacy techniques
+ Multi-sig 

