# Dice and Paper

To really understand the security and ownership
 of your private keys, you ought to generate
 seed phrases by hand, with dice and paper.
You will need to transfer them to a secure 
 computer and generate a checksum,
 however everything before that
 can be done by hand.

I recommend using 8-sided dice 
 that have been verified through a 
 [saltwater balance test](../dice/#saltwater-balance-test).
 This will make the mapping much easier
 because an 8-sided dice 
 corresponds exactly
 to 3-bits of entropy.
 Use the following chart to map each number to its
 binary equivalient.

| 8D dice roll | 3-bits |
| :----------: | ------ |
| 1            |  001   |
| 2            |  010   |
| 3            |  011   |
| 4            |  100   |
| 5            |  101   |
| 6            |  110   |
| 7            |  111   |
| 8            |  000   |

Each number on the dice corresponds directly to
 its binary representation, except 8, which
 in binary is "1000" and so this is just the
 lower 3-bits of 8 in binary.
Because an 8-sided dice maps perfectly into 3-bits,
 it is very easy to roll and record
 the entropy bits directly in binary.


![8-sided Dice](/images/d8_dice.jpg)

### Write Dice Rolls in Binary

Each word in the seed phrase is exactly
 11-bits (2048 possibilities).

And each dice roll will provide 3-bits.

You'll want to keep rolling until you fill out
 all but the last 11-bit word, and 3-bits of the 24th word.
 As you fill out 3-bits at a time, you can go
 left-to-right and top-down, and stop after
 writing 3-bits into the 24th word.
 The remaining 8-bits of the final word are
 calculated through a
 checksum which we'll discuss next.

![Paper Dice Rolls](/images/paper_dice_rolls.jpg)

??? question "What about 12-Word Seeds?"

    You could also do 12-word seeds, 
    which will give you 128-bits of entropy.

    You'll fill out 11 of the 11-bit words
    and 7-bits of the 12th word. The
    remaining 4-bits will be the checksum.

    In either case, you'll need to compute the
    checksum to arrive at a valid final word. 
    This simple checksum is to ensure that you've
    got a valid seed phrase.

    A common approach is to add an additional passphrase
    to the seed words, like a 13th or 25th word,
    but not constrained to the BIP-39 word list.
    This passphrase 
    can provide additional bits of entropy,
    and using a strong passphrase can easily add
    enough entropy to make a *12-word plus passphrase*
    seed as strong as a *24-word* seed.


### Complete the Checksum

Completing the final word requires a checksum. 
 In this
 case a `sha256sum`
 of the 256-bits of entropy. 
 Remember the 24th word has 8-bits for
 the checksum, which should be the
 first 8-bits of the shasum.

This may sound complicated, but you can use the
 same secure airgapped computer you plan on using
 to sign transactions and
 [Self Custody](../index.md)
 your Bitcoin.
 If you're just testing this approach
 feel free to use any computer
 to calculate the checksum bits.

You will run the following shell command, and
 you'll need to type your exact binary number.
 For brevity, I will use `010...001` to represent the full
 256-bit binary number seen in the worksheet above.

```shell
$ echo 010...001 | shasum -a 256 -0
bbcb5d63c87ee0b833f656ae55db8e4ba0f0d4f8cab91be038b5c32de106696a
$ 
```

To compute the same using python is a little more involved, 
 but helpful if you want to verify.
```python
>>> import hashlib
>>> import binascii
>>> 
>>> bin_str = '010...001'
>>> hexstr = "{0:0>4X}".format(int(bin_str,2))
>>> data = binascii.a2b_hex(hexstr)
>>> hashlib.sha256(data).hexdigest()
'bbcb5d63c87ee0b833f656ae55db8e4ba0f0d4f8cab91be038b5c32de106696a'
>>> 
```

This is a Base-16 (hexidecimal) number, representing the
 [256-bit shasum](https://en.wikipedia.org/wiki/SHA-2)
 of the entropy bits we got from the dice rolls.

To get the checksum, take the first two hexidecimal digits of the shasum,
 in this case `bb`,
 and convert them to binary. Each hexidecimal digit is exactly 4-bits,
 and `b` is `1011`,
 so `bb` is `10111011`

If you are not sure how to convert hexidecimal digits to binary,
 or you want to verify you did it correctly,
 you can verify in python,

```python
>>> bin(int("bb", 16))
'0b10111011'
>>> 
```

Or you can call the above from the shell,

```shell
$ python3 -c 'print(bin(int("bb", 16))[2:])'
10111011
$
```

Once you have the first 8 binary digits 
 of the checksum, simply add those
 to the worksheet to complete
 your 24th word.
 The 3-bits from dice plus the 8-bits 
 from the sha256sum will complete all 11-bits off the word.


### Seed Word Lookup

Now that you have all the binary values, 
 you can resolve each of the 24 values to its corresponding
 [BIP-39 seed word](https://github.com/bitcoin/bips/blob/master/bip-0039/english.txt).

There are many ways to do this, and a helpful place to start is to reference
 a printable version of the BIP-39 words.
 There are many examples online, and I have included one here,

[BIP39-words.txt](BIP39-words.txt)
```
0    00000000000	abandon
1    00000000001	ability
2    00000000010	able

...

2045 11111111101	zero
2046 11111111110	zone
2047 11111111111	zoo

```

In practice, I find trying to match the binary extremely difficult.
 And instead I opted to convert each of the 11-bit numbers to decimal.
 You can do this fairly quickly if you're good at adding numbers
 that are all powers of 2 (e.g., 512 + 64 + 8 = 584).

If you're like me you can use an old pocket calculator,
 or even better,
 use the secure airgapped computer that you plan to use for
 [Self Custody](../../index.md).

Python makes a wonderful calculator,

```python
>>> int('01011011101', 2)
733
>>> 
```

You can then reference the [official list](https://github.com/bitcoin/bips/blob/master/bip-0039/english.txt)
 and see that 733 corresponds to "forum"

!!! warning "Seed words start at 0"
    Be careful to avoid 
    [fencepost errors](https://en.wikipedia.org/wiki/Off-by-one_error)
    as the line-numbers start at 1 and not 0.

Alternatively, you can do this in python very easily
 if you already have the [official list](https://github.com/bitcoin/bips/blob/master/bip-0039/english.txt)
 on your airgapped computer, e.g.,

```python
>>> with open('english.txt') as f:
...   seed_words = f.read().splitlines()
>>> 
>>> seed_words[733]
'forum'
>>> seed_words[1245]
'option'
>>>  
```

This almost feels like cheating,
 but it's a nice reminder to include the BIP-39 words
 on your secure airgapped computer.
 However you do it, manually or using the airgapped computer,
 you should now have all 24 words of your seed phrase.


## Verify Seed Phrase

Now that you have all 24 words, you can use them 
 in the wallet software  of your choice.
 If you made a mistake anywhere the checksum
 will very likely fail.

For reference, here is the example seed phrase from above,

!!! info "Example Seed Phrase"
    ```
    forum option evil nerve firm auction night account siege half spread half canyon make tragic proof fly theory clutch seed drink champion split danger
    ```

You can copy these into wallet software,

![electrum verify seed](/images/electrum_verify_seed.png)

...

![electrum sample zpub](/images/electrum_sample_zpub.png)


You can also verify your seed phrase using the
 [Mnemonic Code Converter](https://iancoleman.io/bip39)


![iancolement sample zpub](/images/iancoleman_sample_zpub.png)







