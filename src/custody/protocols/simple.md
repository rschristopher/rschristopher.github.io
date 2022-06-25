# Level-1 Secure Protocol

This is a high-level overview of a Bitcoin
 cold-storage protocol that can be setup
 at home.

???+ info "Who is this good for?"
    Anyone looking for an easy
    self custody solution that
    is more secure than any bank.

    This protocol offers a balanced
    approach that is easy to use
    without compromising security.



## Setup

???+ check "Prerequisites"
    1 coldcard (or air-gapped device)

    1 micro SD card

    1 USB card loaded with Tails OS (Electrum persisted)
    
    1 laptop (that can be booted with Tails OS)
    

### Seed Creation

???+ danger "Setup Coldcard"
    ...

???+ danger "Setup Tails"
    ...


### Address Verification

Only verified receive addresses should be used.

Check first, middle, and final characters.
Compare Signer-1 and Signer-2 addresses, then
 compare to DMZ addresses.

Transfer batch of verified receive addresses
 to PC.
Each address can be used only once!


## Deposit 

Master Public Key is available on the DMZ,
 where verified receive addresses can be 
 transmitted to the Internet connected device.


### Verify balance

Check the balance on the DMZ to Node-1


## Withdrawal 

Use DMZ to generate transaction, 
 copy unsigned transaction to Signer-1

Sign transaction with relevant wallets,
 then copy partially signed transaction
 to Signer-2 

Sign transaction with relevant wallets,
 then copy signed transaction to DMZ






