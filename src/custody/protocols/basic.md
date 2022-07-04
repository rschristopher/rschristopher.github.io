# Basic Security Protocol


???+ info "Who is this good for?"
    This protocol
    is easy to use
    without compromising 
    security or privacy (unlike your bank).
    It is ideal for
    anyone wanting to
    self custody their Bitcoin 
    with more security than any bank, ever.



## Setup


???+ check "Prerequisites"
    1 coldcard (or air-gapped device)

    1 micro SD card

    1 USB card loaded with Tails OS (Electrum persisted)
    
    1 laptop (that can be booted with Tails OS)

*Most importantly*, you will need
 one private place; a place with no surveillance,
 no smartphones nor computers;
 a place where no one can see
 what you're doing.

???+ danger "Must be done in private"
    These steps (in red) involve private keys
    and must be done in complete privacy.
    This means no phones, no Internet,
    and no electronics other than what 
    is specified (e.g., a coldcard).

???+ warning "Be careful"
    These steps (in orange) involve
    access to your Bitcoin wallet 
    and should be handled with caution.

    It is advisable to use the same private
    room as above
    and only bring with you the listed devices
    (which may involve Internet access).
    Please leave all other devices,
    including smartphones, elsewhere.



???+ check "Setup Coldcard"
    ...


???+ check "Setup Tails"
    Electrum persisted

    Create hot wallets

    

### Seed Creation

???+ danger "Create Seed"
    Ensure your smartphone is in another room.

    Ensure there is no Internet connected devices
    in the room with you.

    You will need only the coldcard, and dice.

    ... Dice rolls to ensure 256-bits of entropy


???+ warning "Master Public Key"
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



???+ danger "Create Seed Backups"
    *optional*
    This step is not strictly required
    but is recommended.




### Proof of Control

???+ warning "Proof of Control"
    Deposit to coldcard

    Withdrawal from coldcard to a hot-wallet

    Deposit back to coldcard

    Hot and cold wallets have now received and sent.



### Address Verification

???+ warning "Verify Receive Addresses"
    Boot Tails, open Electrum, view addresses

    Turn on Coldcard, Address Explorer

    Compare addresses, they should be identical




## Deposit 

???+ warning "Deposit Bitcoin"
    Boot Tails, open Electrum, receive address

    Transfer the receive address via QR code,
    even to non-private device (e.g., smartphone)
    if depositing KYC coins from an exchange.




## Verify Balance

???+ warning "Verify Balance"
    Boot Tails, open Electrum, view balances




## Withdrawal 

???+ warning "Withdraw Bitcoin"
    Boot Tails, open Electrum,
    create transaction

    Insert secure micro SD card into your computer running Tails,
    write unsigned transaction (PSBT) to card

    Insert secure micro SD card into Coldcard,
    sign transaction

    Insert secure micro SD card into your computer running Tails,
    load the signed transaction and broadcast.

    Wait for confirmation.


## Additional Security Concerns

You may want to consider enhancing this basic
 protocol with more advanced techniques.

+ Metal seed backup
+ Run a full node
+ Coinjoin and other privacy techniques
+ Multi-sig 

