# Wallets and Keys and UTXOs

Bitcoin is unlike any money that has ever existed.
 It is also unlike any technology or network.
 There's really nothing in history like it.

Bitcoin is unlike *anything* that has *ever* existed.

This means that any attempt at explaining Bitcoin
 will either rely on sloppy metaphors, or technical terms.
 Yet proper custody requires a true understanding of Bitcoin, 
 how it works, and the novel ways you can custody your own Bitcoin.

In reality, there are no actual coins to custody.
 Bitcoin is pure information. Information copied publicly in an immutable ledger.
 Everyone can have a copy of the ledger,
 and everyone can validate that their copy is correct.

And because Bitcoin is money, 
 there are many traditional metaphors
 (such as wallets, coins, and addresses),
 that can be useful 
 but at the same time may still lead to a great deal of confusion.

We will describe these metaphors
 and attempt to demystify them, and then
 discuss the more accurate technical concepts
 necessary for understanding the truth of Bitcoin
 and what it really means to custody.


## Wallets

In Bitcoin, the word "wallet" is a misnomer,
 and possibly the biggest source of confusion.

The term "wallet" in Bitcoin can mean different things.
 It can refer to a collection of private keys, 
 or receive addresses,
 or UTXO sets,
 or as the hardware or software to manage any of the above.
But a Bitcoin wallet is most certainly NOT 
 a collection of your Bitcoin. 
There is no Bitcoin stored in a Bitcoin wallet.

The traditional meaning of the word "wallet" simply doesn't apply to Bitcoin.
 The word "wallet" was used in Bitcoin because the original Bitcoin core client would store private keys in a file named `wallet.dat`.
 This "wallet" was simply the file where your private keys were stored.

### Hot Wallet

A "hot wallet" refers to any software or hardware that stores your private keys in a device connected to the Internet, 
 allowing you to send and receive Bitcoin.
If a private key is directly accessible to an online device, this makes it "hot".

E.g., if you have a Bitcoin wallet app on your phone that can send and receive Bitcoin, 
 this is referred to as a "hot wallet".

### Cold Storage Wallet

If you don't store your private key in a device connected to the Internet, 
 this is referred to as "cold storage".

There are obvious security benefits to cold storage.
 And "cold storage" is the recommended approach for safe custody of your Bitcoin.

There are many cold storage practices, 
 but they follow this standard pattern,

1. private keys are stored in an air-gapped device.
1. private keys generate a "Master Public Key" which is stored in an Internet-connected device.
1. the "Master Public Key" can generate receive addresses and verify transactions, but it cannot send Bitcoin.
1. for sending Bitcoin,
    1. the "Master Public Key" can generate an unsigned transaction.
    1. the *unsigned* transaction is transfered to the air-gapped device.
    1. the transaction is signed on the air-gapped device.
    1. the *signed* transaction is transfered to the Internet-connected device, and then broadcast to the network.

There are many variations of cold storage but they all adhere to the above pattern;
 sometimes with additional steps meant to increase security,  
 e.g., using a seed signer, the private key is never stored in any electronic device, air-gapped or otherwise.
 Instead the key is generated from the seed phrase and used on a signing device only when needed. 


## Addresses

"Address", like "wallet", is a misnomer,
 and when not understood correctly can lead to dangerous outcomes, including lost Bitcoin.

There is no "address" that maintains a balance of your Bitcoin.
 There is only transactions, which have inputs and outputs.

In practical terms, imagine if you receive 0.5 Bitcoin to an address in your wallet.
 You then send 0.1 Bitcoin to someone else.
 It is tempting to think the original address now has 0.4 Bitcoin, 
 but in reality your original address has nothing.
 There is no "from address" in Bitcoin.
 When you sent 0.1 Bitcoin,
  this created a transaction with two outputs:
  one for 0.1 Bitcoin, and another 0.4 Bitcoin.
 Your private key can access the output with 0.4 Bitcoin,
 and someone else has the private key to access the output with 0.1 Bitcoin.
 These ouputs are known as UTXOs (see below).

An invoice address, or receive address, 
 is an encoded single use number that will produce a transaction output that can only be spent by the corresponding private key.
 An address is not a location where Bitcoin is stored, 
 but rather is part of a transaction that will include one or more UTXOs.

...
The words "wallet" and "address" are at best imperfect metaphors,
 and at worst confusing anachronisms, like trying to define the Internet in terms of typewriters and postage stamps.

...
Seed Phrase -> Private Keys -> Public Keys -> Addresses
https://en.bitcoin.it/wiki/Invoice_address


---



## Keys

To truly understand Bitcoin,
 you must understand "keys", 
 which is the most apt and important metaphor.
 It is the keys that you custody.
 Specifically, safe guarding your private keys,
 or rather, the seed phrases used to generate
 your private keys.

This is the most important aspect of Bitcoin custody. 
 A "key" refers to a private key that can sign transactions.
 That is, the means to spend your Bitcoin.
 In fact, your Bitcoin is only truly yours 
 to the extend that you have secured your keys in a proper self custody system.

A private key is nothing more than a very large number. A 256-bit number.

### Seed Phrase

https://en.bitcoin.it/wiki/Deterministic_wallet
BIP 32

Hierarchical Deterministic Wallet

https://en.bitcoin.it/wiki/Seed_phrase
...
BIP 39
Electrum


## Transactions

https://developer.bitcoin.org/reference/transactions.html
https://en.bitcoin.it/wiki/Transaction

https://developer.bitcoin.org/devguide/block_chain.html
...


## UTXOs

https://developer.bitcoin.org/devguide/block_chain.html?highlight=utxo
...
