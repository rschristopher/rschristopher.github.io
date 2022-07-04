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

    *Most importantly, you will need
    one private place without any surveillance,
    including mobile phones or computers;
    a place where no one can see
    what you're doing.*



???+ check "Setup Coldcard"
    ...


???+ check "Setup Tails"
    Electrum persisted

    Create "hot-wallet"

    

### Seed Creation

???+ danger "Create Keys"
    Dice rolls to ensure 256-bits of entropy



???+ danger "Create Metal Backups"
    *optional*
    This step is not strictly required
    but is recommended.




### Proof of Control

???+ danger "Proof of Control"
    Deposit to coldcard

    Withdrawal from coldcard to hot-wallet

    Deposit back to coldcard

    Hot and cold wallets have now received and sent.



### Address Verification

Boot Tails, open Electrum, view addresses

Turn on Coldcard, Address Explorer

Compare addresses, they should be identical




## Deposit 

Boot Tails, open Electrum, receive address

Transfer the receive address via QR code,
 even to non-private device (e.g., smartphone)
 if depositing KYC coins from an exchange.




## Verify Balance

Boot Tails, open Electrum, balances




## Withdrawal 

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

