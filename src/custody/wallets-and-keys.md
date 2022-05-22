# Wallets and Keys and UTXOs

Bitcoin is unlike any money that has ever existed.
 It is unlike any technology or network.
 There's really nothing in history like it.

Bitcoin is unlike *anything* that has *ever* existed.

This means that any attempt at explaining Bitcoin
 will rely either on sloppy metaphors, or novel technical terms.
 Even the term "custody" is a bit of a misnomer,
 an anachronism from a simpler time when banks would "custody" your wealth (for a fee).

In reality, there are no actual coins to custody.
 Bitcoin is pure information. Information copied publicly in an immutable ledger.
 Everyone can have a copy of the ledger,
 and everyone can validate that the ledger is correct.
 And similar to how the Internet empowered individuals to share ideas with the world (for better or worse),
 Bitcoin empowers individuals to custody their wealth in ways far more secure than any bank ever could.

And because Bitcoin is money, 
 there are many traditional metaphors
 (such as wallets, coins, and addresses),
 that can be useful 
 but at the same time may lead to a great deal of confusion.
 Bitcoin is so different that it is a category all to its own
 -- the physical limitations of "custody", "wallets", "coins", and "addresses", simply don't apply to Bitcoin.
 And thus to "custody" your Bitcoin, means something very different than anything you've thought about before Bitcoin.

We will describe these imperfect metaphors
 and attempt to demystify them, and then
 discuss the more accurate technical concepts
 necessary for understanding the truth of Bitcoin
 and what it really means to *custody your Bitcoin*.


## Wallets

In Bitcoin, the word "wallet" is a misnomer,
 possibly the most confusing concept in Bitcoin if you're thinking in terms of a physical wallet.

The term "wallet" in Bitcoin can mean different things.
 It can refer to a collection of private keys, 
 or invoice addresses,
 or UTXO sets,
 or as the hardware or software to manage any of the above.
But a Bitcoin wallet is most certainly NOT 
 a collection of your Bitcoin.

> There is no Bitcoin stored in a Bitcoin wallet.

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
 and they follow this standard pattern,

1. private keys are stored offline (e.g., in an air-gapped device).
1. public keys (e.g., a Master Public Key) are stored in an Internet-connected device.
1. for receiving Bitcoin,
    1. the "Master Public Key" can generate receive addresses, and 
    1. verify transactions.
1. for sending Bitcoin,
    1. the "Master Public Key" can generate an *unsigned transaction*, then
    1. the *unsigned transaction* is transfered to the air-gapped device, then
    1. the transaction is **signed** on the air-gapped device, then
    1. the *signed transaction* is transfered to an Internet-connected device, and then broadcast to the network.

There are many variations of cold storage but they all adhere to the above pattern;
 sometimes with additional steps meant to increase security.  
> E.g., using a seed signer, a private key is never stored in any electronic device, air-gapped or otherwise.
> Instead the key is generated from the seed phrase and used on a signing device only when needed (and discarded immediately afterwards). 


## Addresses

A Bitcoin "address", like a "wallet", is a misnomer,
 and when not understood properly can lead to bad outcomes, including lost Bitcoin.

In practice, a Bitcoin key can generate 
 unlimited receive addresses.
 And a given receive address should never be used more than once.
 A private key is needed to spend any Bitcoin received at these addresses,
 and a public key can generate receive addresses but not spend.

This seems simple enough, however, the word "address" implies your Bitcoin is located at this address.
 In reality, there is no "address" where your Bitcoin is located.
 There is only transactions, which have inputs and outputs, and the outputs can be spent only once.

Transaction inputs are created from the unspent outputs of a previous transaction.
 And the ouputs are created using an address, 
 which is just a number generated by a key.
 This makes the unspent transaction outputs spendable only by 
 the corresponding private key associated with the address.

### A Simple Example
> Imagine you receive 0.5 Bitcoin to an address in your wallet.

> Then you send 0.1 Bitcoin to someone else (to an invoice address they sent you).

It is tempting to think your original address now has 0.4 Bitcoin, 
 but in reality your original address has nothing. 
 The original transaction is spent.

>  When you send the 0.1 Bitcoin,
>   this will create a new transaction with **two** outputs:

>   one for 0.1 Bitcoin, and another 0.4 Bitcoin.

>  Your private key can access the output with 0.4 Bitcoin,
>  and someone else has the private key to access the output with 0.1 Bitcoin.
>  The original transaction output of 0.5 Bitcoin is already spent,
>  and that Bitcoin is only available in the new  *unspent transaction outputs*.

>  These *unspent transaction ouputs* are known as UTXOs (see below).

### Addresses Demystified

An invoice address (aka *receive address*), 
 is a number generated by your key that will produce a transaction output 
 that can only be spent by the associated private key.

An address is not a location where Bitcoin is stored, 
 but rather is used to generate a transaction output (see UTXOs below).

---


## Imperfect Metaphors

The words "wallet" and "address" are at best imperfect metaphors,
 and at worst confusing anachronisms, 
 like trying to define the Internet in terms of typewriters and postage stamps.

However, if you learn how Bitcoin Keys and UTXOs work,
 then you will understand what people mean
 when they talk about their Bitcoin wallet and addresses.
 In fact, by understanding these concepts, you can discover novel ways to custody your own Bitcoin
 -- and secure your own Bitcoin in ways no bank or custody service could ever match.

...
https://en.bitcoin.it/wiki/Invoice_address


Yet proper custody requires a true understanding of Bitcoin, 
 how it works, and the novel ways you can custody your own Bitcoin.


---



## Keys

It is your Bitcoin keys that you custody.
 Specifically, you custody your private keys,
 usually by storing the seed phrases 
 that can be used to generate your private keys.

This is the most important aspect of Bitcoin custody. 
 In fact, your Bitcoin is only truly yours 
 to the extent that you have secured your keys in a proper self custody system.

> Not your keys, not your Bitcoin.

A private key is nothing more than a very large number, 
 i.e., a 256-bit number.
A private key can be generated from a seed phrase.
A seed phrase can generate public and private key pairs.

This process is defined in BIP 32, 
 known as
 Hierarchical Deterministic Wallets


### Deterministic Wallet

https://en.bitcoin.it/wiki/Deterministic_wallet
BIP 32

> seed is the entropy used to generate some other desired result. It could be used for generating a private key, a master private key, or mnemonic.

1. Seed Phrase (Mnemonic)
1. Master Extended Key Pair
1. Receive Addresses


https://en.bitcoin.it/wiki/Seed_phrase
...
BIP 39
Electrum

### Samples

Seed Phrase
```
holiday crew machine fatigue welcome start axis cancel field slim rifle hero
```

Private Key
```
p2wpkh:L1mi9qLEUT1e7nzrGfkcrszBNpuoewaBidEN4oJEBjtFmzEdTHsg
```

Master Public Key
```
zpub6mtgHMNdJfXqhsQcjyUgvKBDcFfSVpmYsUVUTvFfd8zMep9RnTPZroxrDnnWcxCfyPt5Kq7Vktd5urh6XFW26spz6uroYEGUB5s2FVQ14b9
```

Generated Address
```
bc1q2ajcelxfjt0e97gmka0yppfxs4haj8cmdvw7rk
```


https://bitcointalk.org/index.php?topic=5213741.0


## Transactions

https://developer.bitcoin.org/reference/transactions.html
https://en.bitcoin.it/wiki/Transaction

https://developer.bitcoin.org/devguide/block_chain.html
...


## UTXOs

https://developer.bitcoin.org/devguide/block_chain.html?highlight=utxo
...
