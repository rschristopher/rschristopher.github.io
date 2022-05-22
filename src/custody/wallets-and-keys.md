# Wallets and Keys and UTXOs

## Wallets

In Bitcoin, the word "wallet" is a misnomer. A common expression that often leads to confusion.

The term "wallet" in Bitcoin can mean different things.
 It can refer to a collection of private keys, 
 or receive addresses,
 or UTXO sets,
 or as the hardware or software to manage any of the above.
But a Bitcoin wallet is most certainly NOT 
 a collection of your Bitcoin. 
There is no Bitcoin stored in a Bitcoin wallet.

The most common understanding of the word "wallet" simply doesn't apply to Bitcoin.
 The word "wallet" was used in Bitcoin because the original Bitcoin core client would store private keys in a file named`wallet.dat`.
 This "wallet" was simply the file where your private keys were stored.

### Hot Wallet

A "hot wallet" refers to any software or hardware that stores your private keys in a device connected to the Internet, 
 allowing you to send and receive Bitcoin.
The important part is that the private key is accessible to the online device, this makes it "hot".

E.g., if you have a Bitcoin wallet app on your phone that can send and receive Bitcoin, 
 this is referred to as a "hot wallet".

### Cold Storage Wallet

If you don't store your private key in a device connected to the Internet, 
 this is referred to as "cold storage".

There are obvious security benefits to cold storage.
 And "cold storage" is the recommended approach for safe custody of your Bitcoin.

There are many cold storage practices, 
 but most follow this standard pattern,

1. private keys are stored in an air gapped device.
1. private keys generate a "Master Public Key" which is stored in an Internet connected device.
1. the "Master Public Key" can generate receive addresses and verify transactions, but it cannot send Bitcoin.
1. for sending Bitcoin,
    1. the "Master Public Key" can generate an unsigned transaction.
    1. the *unsigned* transaction is transfered to the air-gapped device.
    1. the transaction is signed on the air-gapped device.
    1. the *signed* transaction is transfered to the Internet connected device, and then broadcast to the network.

There are many variations of cold storage,  
 e.g., using a seed signer, the private key is never stored in any electronic device, air-gapped or otherwise.
 Instead the key is generated from the seed phrase and used on a signing device only when needed. 

## Keys

This is the most important aspect of Bitcoin custody. 
 A "key" refers to a private key that can sign transactions.

A private key is merely a very large number. A 256-bit number.

### Seed Phrase

https://en.bitcoin.it/wiki/Deterministic_wallet
BIP 32

Hierarchical Deterministic Wallet

https://en.bitcoin.it/wiki/Seed_phrase
...
BIP 39
Electrum

## Addresses

Seed Phrase -> Private Keys -> Public Keys -> Addresses
https://en.bitcoin.it/wiki/Invoice_address

Addresses, like "wallet" is also a misnomer.

There is no address that maintains a balance of Bitcoin.

An invoice address, or receive address, 
 is an encoded single use number that can be spent by the corresponding private key.
 An address is not a location where Bitcoin is stored, 
 but rather is part of a transaction that if included in the timechain will result in unspent transaction outputs (UTXOs).

...


## Transactions

https://developer.bitcoin.org/reference/transactions.html
https://en.bitcoin.it/wiki/Transaction

https://developer.bitcoin.org/devguide/block_chain.html
...


## UTXOs

https://developer.bitcoin.org/devguide/block_chain.html?highlight=utxo
...
