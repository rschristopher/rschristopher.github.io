# Appedix: Dice and Computer

!!! warning "work in progress"


We can use our airgapped computer 
 to convert dice rolls
 into a seed phrase. 
This will give us the verified entropy
 of dice rolls, and when done correctly
 can be more secure than dice and paper.

This technique is also applicable to other
 methods of creating 256-bits of entropy,
 from I-Ching Hexagrams to Tarot cards.
 All that is required is a list of unique
 characters to represent the set.


???+ tldr "dice-rolls to number"
    ``` py linenums="1"
    def dice2n(n_str, digits):
        basem = 1
        n = 0
        for c in reversed(n_str):
            n += (digits.index(c)) * basem
            basem = basem*len(digits)
        return n
    ```


???+ tldr "number to dice-rolls"
    ``` py linenums="1"
    def n2dice(n, digits):
        chars = []
        while n > 0:
            n, d = divmod(n, len(digits))
            chars.append(digits[d])
        return ''.join(reversed(chars))
    ```


If you already have the [official BIP-39 words](https://github.com/bitcoin/bips/blob/master/bip-0039/english.txt)
 on your airgapped computer, e.g.,

```python
>>> with open('english.txt') as f:
...   seed_words = f.read().splitlines()
>>> 
>>> seed_words[0]
'abandon'
>>> seed_words[2047]
'zoo'
>>> 
```

Roll the dice and record them into a variable, e.g., `d6_rolls`

```python
>>> 
>>> d6_rolls = '1325251343253343214251563241321214344521641246163226332132423346231453554151345112124463226413335644'
>>> 
```

Next you'll want to verify the length,

```python
>>> len(d6_rolls)
100
>>> 
```


Let's convert this to a number,

```python
>>> 
>>> entropy_number = dice2n(d6_rolls, '123456')
>>> entropy_number
41477543854087285771122632882271155796101921343012082862722996391061926720649
>>> 
```

You've got the number, now we format it as a binary string,

```python
>>> 
>>> entropy_bin = format(entropy_number, '0256b')
>>> entropy_bin
'0101101110110011011101010011011111001010001101010111010000011101111001010110000000001100110010000000110100001111010011000011010000110010000111010000110100111001101111010110001001011001111111000000100010110010011000010111010000110000010011000011010010001001'
>>> 
```

Compute the checksum

```python
>>> 
>>> import hashlib
>>> import binascii
>>> 
>>> entropy_hex = format(entropy_number, '064x')
>>> hex_bytes = binascii.a2b_hex(entropy_hex)
>>> entropy_sha = hashlib.sha256(hex_bytes).hexdigest()
>>> entropy_sha
'bbcb5d63c87ee0b833f656ae55db8e4ba0f0d4f8cab91be038b5c32de106696a'
>>> 
```


Add first 8-bits of the checksum, to produce the 264-bit string
 (that is, 24 words, each with 11-bits)

```python
>>> 
>>> seed_bin = entropy_bin + format(int(entropy_sha[0:2], 16), '08b')       
>>> len(seed_bin)
264

```

You can now lookup seed words using 11-bit slices,

```
>>> 
>>> seed_words[ int(seed_bin[0:11], 2) ]
'forum'
>>> 
```

Using the above approach, you can loop through all slices,

```
>>> 
>>> [seed_words[int(seed_bin[x:x+11],2)] for x in range(0,264,11)]
['forum', 'option', 'evil', 'nerve', 'firm', 'auction', 'night', 'account', 'siege', 'half', 'spread', 'half', 'canyon', 'make', 'tragic', 'proof', 'fly', 'theory', 'clutch', 'seed', 'drink', 'champion', 'split', 'danger']
>>> 
```

---

???+ tldr "dice to seed phrase"
    ``` py linenums="1"
    import hashlib
    import binascii

    def dice_to_seed_phrase(n_str, digits, seed_words):
        """ generate seed phrase from dice rolls
        """
        def dice2n(n_str, digits):
            basem = 1
            n = 0
            for c in reversed(n_str):
                n += (digits.index(c)) * basem
                basem = basem*len(digits)
            return n
        entropy_number = dice2n(n_str, digits)
        entropy_bin = format(entropy_number, '0256b')[:256]
        entropy_hex = format(entropy_number, '064x')[:64]
        hex_bytes = binascii.a2b_hex(entropy_hex)
        entropy_sha = hashlib.sha256(hex_bytes).hexdigest()
        seed_bin = entropy_bin + format(int(entropy_sha[0:2], 16), '08b')
        return [seed_words[int(seed_bin[x:x+11],2)] for x in range(0,264,11)]
    ```

You can use the above to generate a seed phrase from your dice roll string,

```python
>>> 
>>> my_seed_phrase = dice_to_seed_phrase(d6_rolls, '123456', seed_words)
>>> for w in my_seed_phrase:
...  print(w)
... 
forum
option
evil
nerve
firm
auction
night
account
siege
half
spread
half
canyon
make
tragic
proof
fly
theory
clutch
seed
drink
champion
split
danger
>>>
```

--- 

???+ tldr "dice prompt mini app"
    ``` py linenums="1"
    import curses
    
    def dice_prompt(seed_words, digits='123456'):
        if len(set(digits)) != len(digits):
            return "digits need to be unique"
        stdscr = curses.initscr()
        rolls_needed = len(n2dice(2**256-1, digits))
        rolls = []
        _seeds = ['abandon'] * 24
        _ent = 1
        while len(rolls) < rolls_needed:
            stdscr.erase()
            stdscr.addstr(0, 0, f"Entering {len(rolls)+1}/{rolls_needed} dice roll: ")
            _y, _x = stdscr.getyx()
            stdscr.addstr(1, 0, f"-> {''.join(rolls)}")
            _seeds = dice_to_seed_phrase(''.join(rolls), digits, seed_words)
            _ent = len(bin( dice2n(digits[-1]*len(rolls), digits) )[2:])
            stdscr.addstr(3, 0, f"estimated entropy <{_ent}-bits")
            _seed_phrase = '\n'.join(_seeds)
            stdscr.addstr(5, 0, _seed_phrase)
            stdscr.move(_y, _x)
            stdscr.refresh()
            _raw = stdscr.getch()
            if chr(_raw) in digits:
                rolls.append(chr(_raw))
        curses.endwin()
        final_seeds = dice_to_seed_phrase(''.join(rolls), digits, seed_words)
        return ' '.join(final_seeds)
                
    ```

---

![dice_prompt() screen](/images/dice_prompt_d8_animated.gif)




