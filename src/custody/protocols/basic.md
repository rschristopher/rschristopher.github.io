# Basic Security Protocol


???+ info "Who is this good for?"
    Anyone wanting simple 
    self custody
    with more security than any bank, ever.

    This protocol
    is easy to use
    without compromising 
    security or privacy (unlike your bank).



## Setup

???+ check "Prerequisites"
    1 coldcard (or air-gapped device)

    1 micro SD card

    1 USB card loaded with Tails OS (Electrum persisted)
    
    1 laptop (that can be booted with Tails OS)


???+ check "Setup Coldcard"
    ...


???+ check "Setup Tails"
    Electrum persisted

    Create "hot-wallet"

    

### Seed Creation

???+ danger "Create Keys"
    Dice rolls to ensure 256-bits of entropy


### Seed Backup

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


