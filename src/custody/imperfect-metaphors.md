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
 to manage private keys.

!!! danger "Not your keys, not your Bitcoin."






## Keys

It is your Bitcoin keys that you custody.
Specifically, you custody your private keys,
 usually by storing the seed phrase 
 that can generate your private keys and
 their corresponding public keys.
This is afterall based on
 [public key cryptography](https://en.wikipedia.org/wiki/Public-key_cryptography),
 specifically
 [elliptic-curve cryptography](https://en.m.wikipedia.org/wiki/Elliptic-curve_cryptography).

If you're unfamiliar with these concepts,
 their purpose is that *public keys*
 can create encrypted information that can
 only be decrypted by the corresponding
 *private keys*.
Or in the case of Bitcoin, *public keys*
 can create transaction outputs that 
 can only be spent by the corresponding
 *private keys*.
In other words, you can receive Bitcoin
 through your *public keys*
 (or rather, addresses generated by your public keys),
 and you can spend Bitcoin by using
 your *private keys*.

<!--
 [Alice and Bob](https://en.wikipedia.org/wiki/Alice_and_Bob)
-->

A *seed phrase* is a list of words
 that encode a 256-bit number
 that can derive
 private keys and their corresponding public keys,
 which can in turn generate addresses that can
 be used in transactions.
In other words, it is a phrase (typically 24 words)
 that can be used to recover your Bitcoin.
This process of deriving keys and addresses from a seed phrase
 is knows as 
 *Hierarchical Deterministic (HD) Wallets*.


### Deterministic Wallets

In practice,
 *Hierarchical Deterministic (HD) Wallets*
 allow you to save a single seed phrase
 and use that seed to derive as many keys and addresses as you need.
This could be as simple as a single account with a single key
 that you use only once, or this could be millions of
 accounts used by an instition, such that each account
 can generate its own keys and addresses.

???+ info "Brief History"
    Early version of Bitcoin generated private keys and addresses
    randomly, requiring users to backup all of the private keys
    associated with any of the addresses they had used.

    *HD wallets* on the other hand can generate an unlimited number of private keys
    and addresses, or rather, an unlimited number of accounts,
    each with their own keys and address space. And all of those
    accounts, keys, and addresses can be derived from a single seed phrase.


The best way to understand this is through examples,
 so let's start with an example seed phrase.

!!! example "Example Seed Phrase"

    ```
    primary fetch primary prefer primary fetch primary fiber fish cause adult fee
    ```

This seed phrase can generate a root key, which can generate
 multiple accounts, each account with an unlimited number of
 addresses and key pairs (public and private).
The accounts and keys can be referenced by a
 [derivation path ](https://river.com/learn/terms/d/derivation-path/).

???+ example "m/0'/0'"
    This is the
    [BIP-32](https://github.com/bitcoin/bips/blob/master/bip-0032.mediawiki)
    path to the first account, which will give us the extended private key.
    This key can be used to generate any of the child keys and addresses for this account.

    ```
    xprv9xYcGh8prgvDkcydvSeV6xEZVZ4t47xy46VzdsJGVFN8YvwKPF51u9azfREPrQyLyV8HdjDDAzaMkKcRsdfAGQ2diobuW1ZkBrGXXqze5CQ
    ```

    Additionally, we can derive the extended public key, also known as a Master Public Key (MPK).

    ```
    xpub6BXxgCfih4UX1BnqD5bhJVMD3nnTUYWwC9kuFgUH11bmqAPhjhxFJWrvBnmh5QexRFkCxqFTS1AHiPhGeEp7HKoW1d85wTyEHSeJdZouJQJ
    ```

If you wanted to derive the next two accounts, you would use `m/0'/1'` and `m/0'/2'`.
Importantly, only the root key from the seed phrase can generate these accounts.
If all you had was one of the extended private keys, you could only use that within
 that account. 
And likewise, if all you had was the extended public key,
 you could only use that to generate addresses and public keys within
 that account.

Additionally, you can retrieve specific addresses and key pairs for any of these accounts.
For example, here is the first address and key pair for account number 2.

???+ example "m/0'/2'/0'"
    Receive Address
    ```
    1N1QRK5Ru3gJ7ue3Xv277cMUMdWePbehsc
    ```

    Public Key
    ```
    02279dd8f9c77ac86499fc05cebb3c81763e20f46ad3f9731e87992b512fe2e628
    ```

    Private Key
    ```
    L1yPKTZ6Rw2ge7utKVJrf8fgx7pm6kBAFEJAUmw63hFz1uWPaEeR
    ```


The format of the receive addresses can vary, e.g.,
 a native 
 [Segwit](https://river.com/learn/terms/p/p2wpkh/)
 address and derivation path look like the following,

???+ example "m/84'/0'/3'/0/0"
    Receive Address
    ```
    bc1q3ctchdrxdt4ydljcfp4y0s0a3w8ut07j22f8ty
    ```




???+ info "Bitcoin Improvement Proposals"
    In addition to
     [BIP-32](https://github.com/bitcoin/bips/blob/master/bip-0032.mediawiki)
     there are other related BIPs, e.g.,
    
     * [BIP-44](https://github.com/bitcoin/bips/blob/master/bip-0044.mediawiki), derivation paths for 
    [P2PKH](https://river.com/learn/terms/p/p2pkh/), e.g., `m/44'/0'/0'/0`
     * [BIP-49](https://github.com/bitcoin/bips/blob/master/bip-0049.mediawiki), derivation paths for 
    [P2SH-P2WPKH](https://river.com/learn/terms/b/bip-49-derivation-paths-for-wrapped-segwit/), e.g., `m/49'/0'/0'/0`
     * [BIP-84](https://github.com/bitcoin/bips/blob/master/bip-0084.mediawiki), derivation paths for
    [P2WPKH](https://river.com/learn/terms/b/bip-84-derivation-paths-for-native-segwit/), e.g., `m/84'/0'/0'/0`
    
    And also
     [BIP 39](https://github.com/bitcoin/bips/blob/master/bip-0039.mediawiki)
     which standardized the word list used in seed phrases.



Electrum ...

https://learnmeabitcoin.com/beginners/private_keys


https://river.com/learn/terms/z/zpub-extended-public-key/

https://river.com/learn/terms/x/xpub-extended-public-key/


https://bitcointalk.org/index.php?topic=5213741.0


### Keys Demystified

Keys come in pairs of public and private
 in order to receive and spend Bitcoin.
Managing keys is handled through *HD wallets*
 which allows a single seed phrase
 to derive as many addresses and keys
 as you could possibly need.


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

An address is not a location where Bitcoin is stored, 
 but rather is used to generate a transaction output (see UTXOs below).

An invoice address (aka *receive address*), 
 is a number generated by your key that will produce a transaction output 
 that can only be spent by the associated private key.

A change address...



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




