<!--
Lord Jesus Christ
Son of God
Have mercy on me, a sinner
-->

# Imperfect Metaphors

> Bitcoin is unlike *anything* that has *ever* existed.

Bitcoin is unlike any money we've ever known.
 It is unlike any technology or network --
 there's really nothing like it in history.
As a result, any attempt at explaining Bitcoin
 will rely either on imperfect metaphors, or novel technical terms.
For example, the word *custody* is a misnomer,
 an anachronism from a simpler time when banks would *custody* your money.

In reality, there are no actual coins to custody.
Bitcoin is pure information; 
 information copied publicly in an immutable ledger.
Everyone can have a copy of the ledger,
 and everyone can validate that the ledger is correct.
And similar to how the Internet empowered individuals to share ideas with the world,
 Bitcoin empowers individuals to custody their wealth,
 and to do so in ways far more secure than any bank ever could.

And because Bitcoin is money, 
 there are many traditional metaphors
 (such as *wallets*, *coins*, and *addresses*)
 that can be useful, 
 but at the same time may lead to a great deal of confusion.
Bitcoin is in a category all to itself
 -- the physical limitations of *custody*, *wallets*, *coins*, and *addresses* simply don't apply to Bitcoin.
And thus to *custody* your Bitcoin, means something very different than anything you've thought about before Bitcoin.

We will describe these imperfect metaphors
 and attempt to demystify them, and then
 discuss the more accurate technical concepts
 necessary for understanding the truth of Bitcoin
 and what it really means to *custody your Bitcoin*.





## Wallets

In Bitcoin, the word *wallet* is a misnomer,
 possibly the most confusing metaphor in Bitcoin.
The term *wallet* in Bitcoin can mean different things.
It can refer to a collection of private keys, 
 or invoice addresses,
 or UTXO sets,
 or as the hardware or software to manage any of the above.
But a Bitcoin wallet is most certainly NOT 
 a collection of your Bitcoin.

!!! warning "There is no Bitcoin stored in a Bitcoin wallet."

The traditional meaning of the word *wallet* simply doesn't apply to Bitcoin.
 The word *wallet* was used in Bitcoin because the original Bitcoin core client app would store private keys in a file named `wallet.dat`.
 This `wallet.dat` was simply the file where your private keys were stored.

### Hot Wallet

A *hot wallet* refers to any software or hardware that stores your private keys in a device connected to the Internet, 
 allowing you to send and receive Bitcoin.
If a private key is directly accessible to an online device, this makes it *hot*.

E.g., if you have a Bitcoin wallet app on your phone that can send and receive Bitcoin, 
 this is referred to as a *hot wallet*.

### Cold Storage Wallet

If you store private keys offline, 
 in a device never connected to the Internet, 
 this is referred to as *cold storage*.
There are obvious security benefits,
 and *cold storage* is the recommended approach 
 for safe custody of your Bitcoin.

There are many cold storage practices, 
 and they follow a standard pattern,

1. private keys are stored offline (e.g., in an air-gapped device).
1. public keys can be stored in an Internet-connected device.
1. for receiving Bitcoin,
    1. the public key can generate receive addresses, and 
    1. verify transactions.
1. for sending Bitcoin,
    1. the public key can generate an *unsigned transaction*, then
    1. the *unsigned transaction* is transfered to the air-gapped device, then
    1. the transaction is **signed** on the air-gapped device, then
    1. the *signed transaction* is transfered to an Internet-connected device, and then broadcast to the network.

There are many variations of cold storage but they all adhere to the above pattern;
 sometimes with additional steps meant to increase security.  
> E.g., using a seed signer, a private key is never stored in any electronic device, air-gapped or otherwise.
> Instead the key is generated from the seed phrase and used on a signing device only when needed (and discarded immediately afterwards). 

### Wallets Demystified

A Bitcion wallet is not a collection of your Bitcoin.
Rather, a Bitcoin wallet is any device or procedure used 
 to manage your private keys (necessary to send
 and receive Bitcoin).
This includes
 [hardware wallets](securing-keys/hardware-wallets.md),
 as well as 
 [protocols](protocols/index.md)
 used to manage private keys.

!!! danger "Not your keys, not your Bitcoin."






## Keys

It is your Bitcoin keys that you custody.
Specifically, you custody your private keys,
 usually by storing the seed phrases 
 that can generate the private keys and
 their corresponding public keys.


This relies on 

 [elliptic-curve cryptography](https://en.m.wikipedia.org/wiki/Elliptic-curve_cryptography)

 [public key cryptography](https://en.wikipedia.org/wiki/Public-key_cryptography)
 
 [Alice and Bob](https://en.wikipedia.org/wiki/Alice_and_Bob)



Seed phrases are defined in BIP 32, 
 known as
 Hierarchical Deterministic Wallets


### Deterministic Wallets

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



### Sample Keys

!!! info "Example Seed Phrase"

    ```
    holiday crew machine fatigue welcome start axis cancel field slim rifle hero
    ```

!!! info "Private Key"

    ```
    p2wpkh:L1mi9qLEUT1e7nzrGfkcrszBNpuoewaBidEN4oJEBjtFmzEdTHsg
    ```
https://learnmeabitcoin.com/beginners/private_keys

!!! info "Master Public Key"

    ```
    zpub6mtgHMNdJfXqhsQcjyUgvKBDcFfSVpmYsUVUTvFfd8zMep9RnTPZroxrDnnWcxCfyPt5Kq7Vktd5urh6XFW26spz6uroYEGUB5s2FVQ14b9
    ```

https://river.com/learn/terms/z/zpub-extended-public-key/
https://river.com/learn/terms/x/xpub-extended-public-key/

!!! info "Generated Address"

    ```
    bc1q2ajcelxfjt0e97gmka0yppfxs4haj8cmdvw7rk
    ```


https://bitcointalk.org/index.php?topic=5213741.0


### Keys Demystified

...


## Addresses

A Bitcoin *address*, like a *wallet*, is a misnomer,
 and when not understood properly can lead to bad outcomes.
In practice, a public key can generate 
 unlimited receive addresses such that
 a given receive address should never be used more than once.
The corresponding private key is needed to spend any Bitcoin received at these addresses,
 and the public key can generate receive addresses but not spend.

This seems simple enough, however, the word *address* implies your Bitcoin is located at this address.
In reality, there is no *address* where your Bitcoin is located.
There are only transactions, which have inputs and outputs, and the outputs can be spent only once.

Transaction inputs are created from the unspent outputs of a previous transaction.
And these ouputs are created using an address, 
 which is just a number generated by a key.
 This makes the unspent transaction outputs spendable only by 
 the corresponding private key associated with the address.

### A Simple Example

Imagine you receive `0.5 Bitcoin` to an address in your wallet.
 This will create a transaction that looks something like,

``` mermaid
flowchart LR
  subgraph TX-1
    direction LR
    subgraph in-1[in]
        direction LR
        a[0.5 BTC]
    end
    subgraph out-1[out]
        direction LR
        b[0.5 BTC]
    end
  end
  a --> b
```

Then you send `0.1 Bitcoin` to someone else (to an invoice address they sent you).

It is tempting to think your original address now has 0.4 Bitcoin, 
 but in reality your original address has nothing. 
 The original transaction is *spent*.

When you send the 0.1 Bitcoin,
 this will create a *new* transaction with **two** outputs:

``` mermaid
flowchart LR
  subgraph TX-1
    direction RL
    subgraph in-1[in]
        direction RL
        a[0.5 BTC]
    end
    subgraph out-1[out]
        direction RL
        b[0.5 BTC]
    end
  end
  subgraph TX-2
    direction TB
    subgraph in-2[in]
        direction RL
        c[0.5 BTC]
    end
    subgraph out-2[out]
        direction BT
        d[0.1 BTC]
    end
    subgraph out-2a[out]
        direction BT
        e[0.4 BTC]
    end
  end
  a --> b
  in-2 --> out-2
  in-2 --> out-2a
  b --> in-2
```

One output has `0.1 Bitcoin`, and another with `0.4 Bitcoin`.

Your private key can access the output with `0.4 Bitcoin`,
 and someone else has the private key to access the output with `0.1 Bitcoin`.
 The original transaction output of 0.5 Bitcoin is already spent,
 and your Bitcoin is only available in the new *unspent transaction outputs*.

!!! warning "These *unspent transaction ouputs* are known as UTXOs (see below)."

### Addresses Demystified

An invoice address (aka *receive address*), 
 is a number generated by your key that will produce a transaction output 
 that can only be spent by the associated private key.

An address is not a location where Bitcoin is stored, 
 but rather is used to generate a transaction output (see UTXOs below).



## Transactions

``` mermaid
flowchart LR
  subgraph TX-1
    direction TB
    subgraph in-1[in]
        direction TB
        a[0.25 BTC]
    end
    subgraph in-1a[in]
        direction TB
        a1[0.25 BTC]
    end
    subgraph out-1[out]
        direction BT
        b[0.5 BTC]
    end
  end
  subgraph TX-2
    direction TB
    subgraph in-2[in]
        direction RL
        c[0.5 BTC]
    end
    subgraph out-2[out]
        direction BT
        d[0.1 BTC]
    end
    subgraph out-2a[out]
        direction BT
        e[0.4 BTC]
    end
  end
  in-1 --> out-1
  in-1a --> out-1
  in-2 --> out-2
  in-2 --> out-2a
  out-1 --> in-2
```

https://developer.bitcoin.org/reference/transactions.html
https://en.bitcoin.it/wiki/Transaction

https://developer.bitcoin.org/devguide/block_chain.html
...


### UTXOs

https://developer.bitcoin.org/devguide/block_chain.html?highlight=utxo
...


### Transactions Demystified

...





## Blockchain

A *blockchain*, like the name implies,
 is a chain of blocks.
A block is a collection of transactions.
This is also an imperfect metaphor
 for what is more aptly known the
 Bitcoin *timechain*.


### Timechain

...



### Blockchain Demystified

...




