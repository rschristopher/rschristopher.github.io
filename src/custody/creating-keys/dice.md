# Creating Seeds with Dice

You can (and should) generate seed phrase by hand.

This is because true randomness is surprisingly difficult 
 to achieve on a computer.
This is referred to as the *Entropy*,
 that is, the measure of true randomness. The goal
 is to achieve the maximimum amount of randomness.

???+ danger "Beware of Low Entropy"
	A 24-word seed phrase is nothing more than an encoding
    of a 256-bit number (with a checksum at the end).
    If all 256-bits were the same, that is, all zeros except the checksum,
    then this would have very low entropy.

    The seed phrase would simply be,
    ```
    abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon art
    ```

    That's 23 *abandon*'s and 1 *art*

    Turns out this ridiculous 1-bit of entropy phrase
    was actually used before.
    You can recover this wallet and view the
    transaction history for yourself.
    For 2-hours in 2016 there was 346.9341 Bitcoin stored with this key.

    ![Electrum Screen](/images/electrum_abandon_art.png)

???+ question "How to get High Entropy?"
    In the above example, it took less than
    a second to discover a seed phrase protected only by *1-bit* of entropy.

    *How long would it take for 256-bits of entropy?*

	256-bits of entropy is difficult to fathom.
	You might hear "centuries" or "millions of years",
    but it's more like, "beyond the age of the universe
    even with planet-sized super-computers powered by 
    Dyson-spheres around every star."

    It's the same as flipping a coin 256 times.
    Not exactly a difficult task, but assuming it was a fair coin
    then this would get you 256-bits of entropy, and the odds
    of anyone guessing or deriving that exact 256-bit number is
    impossible (unless they watched you flipping the coin).

    It's like finding a needle in a haystack -- if the 
    haystack was the entire universe,
    and also the needle was invisible.


## Numeric Base of Dice

We usually deal with Base-10 (decimal) and Base-2 (binary).
 In fact, anytime we say "bits" when referring to a number
 we're referring to the length of a binary number.

But we can represent numbers in any arbitrary base.
 And this is important because one of the best
 sources of true random numbers is *fair* dice rolls.

A common 6-sided dice can be used to generate a 256-bit
 number, but doing so can be somewhat confusing.
 You may try to map the numbers to binary but you'll find
 it's not so easy (1 dice gives you roughly 2.5-bits of entropy).
 To be safe you could just map odd and even rolls to binary 1 and 0,
 but this requires 256 dice rolls and isn't very efficient.

A better aproach is to use a *Base-6* representation of a 256-bit
 number, which would require 99 dice rolls.
 This is the minimum number of *fair* dice rolls necessary
 to achieve 256-bits of entropy.

Alternatively, and my recommendation, is to use an 8-sided dice,
 the kind commonly found in role-playing games.
 A *fair* 8-sided dice roll has exactly 3-bits
 of entropy (meaning every 8-sided dice roll gives you exactly 3 of the 256 bits).
 With this approach 
 you'll need 85 rolls to generate sufficient
 entropy for a seed phrase.


### 256-bits in other Bases

| Numeric Base          | *length* | Description                |
| --------------------- | -------: |--------------------------- |
| Base-2 (binary)       | 256      | coin tosses                |
| Base-6                |  99      | dice rolls                 |
| Base-8 (octal)        |  85      | 8-sided dice rolls         |
| Base-10 (decimal)     |  77      | *770-Quattuorvigintillion* |
| Base-20               |  59      | 20-sided dice rolls        |
| Base-64               |  43      | I-Ching Hexagrams          |
| Base-2048             |  24      | seed words                 |

## How to Ensure Fair Dice

Salt water test...

![8-sided Dice](/images/d8_dice.jpg)


## Paper and Pencil

...

![Paper Dice Rolls](/images/paper_dice_rolls.jpg)

## Airgapped Computer

...
Even if you use the Paper and Pencil method,
 you will need to type that large number into a computer.
 And this computer must be airgapped and well secured 
 (even if that means destroying everything after you're done).
 This 256-bit number is literally the key to your wealth.





