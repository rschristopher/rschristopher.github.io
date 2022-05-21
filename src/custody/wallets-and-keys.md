# Wallets and Keys and UTXOs

## Wallets
A Bitcoin wallet is a misnomer. 
The term "wallet" is used in a variety of contexts.
 It can refer to a collection of private keys, 
 or receive addresses,
 or UTXO sets,
 or the software to manage any of the above,
 or the hardware to manage any of the above.

But what a Bitcoin wallet is NOT 
 is a collection of your Bitcoin.

The most common and colloquial understanding of the word "wallet" simply doesn't apply to Bitcoin.
 The word "wallet" is used because the original Bitcoin core client would store private keys in a `wallet.dat` file.
 And in this context referred to the file where your private keys were stored.

### Hot Wallet

A "hot wallet" refers to any software or hardware that stores your keys in an device connected to the Internet, allowing you to send and receive Bitcoin.
The important part is the private key. 

E.g., if you have a Bitcoin wallet app on your phone that can send and receive Bitcoin, this is referred "hot wallet".

### Cold Storage Wallet

If you don't store a private key in a device connected to the Internet, 
 this is referred to as "cold storage".

There are obvious security benefits to cold storage.
 And "cold storage" is the recommended approach for long-term storage of your Bitcoin.

There are many cold storage practices, 
 but most follow a standard pattern,
1. private keys are stored in an air gapped device.
1. private keys generate a "Master Public Key" which is stored in an Internet connected device.
1. the "Master Public Key" can generate receive addresses and verify transactions, but it cannot send Bitcoin.
1. for sending Bitcoin,
    1. the "Master Public Key" can generate an unsigned transaction.
    1. the unsigned transaction is transfered to the air-gapped device.
    1. the transaction is signed on the air-gapped device.
    1. the signed transaction is transfered to the Internet connected device and then broadcast to the network.

There are many variations of the above, but all follow a similar pattern, 
 e.g., seed signers where a private key is never permanently stored electronically (and only stored temporarily in a signing device when needed). 

## Keys

This is the most important part of Bitcoin custody. 
 The "key" refers to a private key that can sign transactions.

A private key is merely a very large number. A 256-bit number.

...

## Addresses
...

## Transactions
...

## UTXOs
...
