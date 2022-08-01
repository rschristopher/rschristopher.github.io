# Bitcoin Security Protocol: Ludicrous

???+ info "Who is this good for?"
    Advanced users looking for the most
    robust self custody solution possible.


Full node on a protected network.

Master public keys will never touch an Internet-connected device.

No persistance of private keys or seed phrases on any electronic device.
 Air-gapped seed-signing devices only.


## Setup

???+ check "Prerequisites"
    2+ distinct air-gapped devices

    1 USB card loaded with Tails OS
    
    1+ full-node, mynode, umbrel
    
    1+ DMZ computer, no Internet access
    
    1+ secure Internet computer 
    
    1+ secure Ethernet router


???+ check "Installation"
    
    Signer-1
    Signer-2
    
    Node-1
    Node-2
    
    DMZ-1
    
    PC-1
    
    Wired Ethernet router with no Internet,
    private network access only.
    
    DMZ, Node-1 and Node-2 are on this network,
     Node-1 and Node-2 have limited access over Tor


### Seed Creation

???+ danger "Create Keys"
    Create 5+ high-entropy seed phrases
    
    Create metal backups
    
    Transfer master public keys to DMZ-1
    
    Generate 3/5, etc, multisig
     ... using Signer-1 and Signer-2
     ... verify entropy bits on Signer-1 and Signer-2
    
    Transfer multisig master public keys to DMZ-1



### Proof of Control

???+ danger "Proof of Control"
    Deposit small amount on each singl-sig.
    
    Withdraw to multisig, for each single-sig 
    
    Withdraw back to single-sig, for each multi-sig
    
    All wallets have received and sent.
    
    Single-sig stores the small amounts, 
     and can be used under duress 
    
    Large deposits will go to multi-sig,
     and can only be accessed by using
     both signing devices and the DMZ






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


## Verify balance

Check the balance on DMZ-1 to Node-1


## Withdrawal 

Use DMZ-1 to generate transaction, 
 copy unsigned transaction to Signer-1

Sign transaction with relevant wallets,
 then copy partially signed transaction
 to Signer-2 

Sign transaction with relevant wallets,
 then copy signed transaction back to DMZ-1






