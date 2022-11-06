# Level-2 Your Keys

!!! warning "work in progress"

<!--

...
Command Line Overview


BIP-39 Seed Words
https://github.com/bitcoin/bips/blob/master/bip-0039/english.txt

https://github.com/hatgit/BIP39-wordlist-printable-en/blob/master/BIP39-en-printable.txt



https://iancoleman.io/bip39/


Entropy 
https://www.fourmilab.ch/random/


https://armantheparman.com/dicev1/
https://bitcoinmagazine.com/culture/diy-bitcoin-private-key-project










 [Alice and Bob](https://en.wikipedia.org/wiki/Alice_and_Bob)



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


-->
