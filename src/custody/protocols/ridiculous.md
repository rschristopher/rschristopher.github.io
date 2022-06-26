# Ridiculous Security Protocol

???+ info "Who is this good for?"
    Advanced users looking for a
    robust self custody solution
    without any single-point of compromise.


## Setup

???+ check "Prerequisites"
    1+ air-gapped device with micro SD card reader

    1+ air-gapped device with camera

    1 Micro SD card

    1 USB card loaded with Tails OS (Electrum persisted)
    
    1 laptop with wifi (that can be booted with Tails OS)



### Seed Creation

???+ danger "Create Keys"
    Create 5+ high-entropy seed phrases
    
    Create metal backups
    
    Transfer master public keys to PC
    
    Generate 2/2, 3/5, etc, multisig
     ... using Signer-1 and Signer-2
    
    Transfer multisig master public keys to PC


### Proof of Control

???+ danger "Proof of Control"
    Deposit small amount on each single-sig.
    
    Withdraw to multisig, for each single-sig 
    
    Withdraw back to single-sig, for each multi-sig
    
    All wallets have received and sent.
    
    Single-sig stores the small amounts, 
     and can be used under duress 
    
    Large deposits will go to multi-sig,
     and can only be accessed by using
     2+ signing devices



### Address Verification

Only verified receive addresses should be used.

Check first, middle, and final characters.
Compare Signer-1 and Signer-2 addresses, then
 compare to Tails addresses.

Each address can be used only once!




## Deposit 

Master Public Key is available on Tails,
 where verified receive addresses can be 
 transmitted.




## Verify balance

Boot Tails OS, open Electrum



## Withdrawal 

Use Tails to generate transaction, 
 copy unsigned transaction to Signer-1 (micro SD)

Sign transaction with relevant wallets,
 then copy partially signed transaction
 to Signer-2 (QR code)

Sign transaction with relevant wallets,
 then copy signed transaction back to Tails






