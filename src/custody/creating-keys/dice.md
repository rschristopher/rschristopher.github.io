# Creating Seeds with Dice

You can (and should) generate seed phrase by hand.

This is because true randomness is surprisingly difficult 
 to achieve on a computer.
This is referred to as *Entropy*,
 that is, the measure of randomness. 
 For example, a fair coin flip is 1-bit of entropy,
 flipping two coins can offer 2-bits of entropy (4 possible outcomes).
 If one of the coins is unfair and *always* lands
 on heads, then we're back to only 1-bit of entropy
 from the first coin.

The goal of a seed phrase 
 is to achieve the maximimum amount of randomness
 that would prevent anyone from deriving or guessing
 your seed phrase.

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

There's a strange phenomenon in the Bitcoin
 community where they insist on 
 *casino-grade* dice;
 as if "casino" is an
 infallible authority
 on dice grading that we should trust
 our life savings with.

!!! quote "Don't trust, verify"

If you're concerned
 with the fairness of dice, then 
 you should verify your dice with a 
 saltwater test.
Whether using *AAA casino-grade razor edge 
 precision dice* or using the dice you got
 from a board game, a saltwater test can verify
 if the dice is balanced or not. Just saying
 "Casino-grade" is not a verification.

In most cases, even a slightly unbalanced dice
 will still roll fairly, but it's recommended 
 to *verify* that a given set of dice is 
 sufficiently balanced to generate the 
 desired level of entropy.


### Saltwater Balance Test

You'll find many 
 [examples online](https://thecriticaldice.com/blogs/news/how-to-salt-water-test-your-dice), 
 mostly from
 dedicated communities around board games, RPGs,
 and gambling aficionados.

In practice, you simply need a cup of
 *supersaturated saltwater*. This just means
 the water cannot absorb any more salt and
 that your dice will become buoyant. 

1. In a clean cup, fill with clean filtered
 water
1. Add salt, a lot of salt, and stir till 
 the salt is fully absorbed in the water
1. Keep adding salt and stirring until
 your dice becomes buoyant

Once the dice is floating towards the surface
 you'll be able to test if it's
 balanced or not. Simply push the dice
 with a pencil or chopstick.

???+ info "Balanced Dice"
    ![balanced dice](/images/d20_balanced_saltwater.gif)

    [src](https://thecriticaldice.com/blogs/news/how-to-salt-water-test-your-dice)

An unbalanced dice will float upward favoring
 one side. It will be obvious. In practice
 this could be due to air-bubbles or
 inconsistent materials.

???+ info "Unbalanced Dice"
    ![unbalanced dice](/images/d20_unbalanced_saltwater.gif)

    [src](https://thecriticaldice.com/blogs/news/how-to-salt-water-test-your-dice)

Using this very simply technique you can
 verify your dice are balanced and can 
 safely be used to generate high levels
 of entropy. You'll find the "casino-grade" 
 dice offer no benefit over board game dice,
 and most importantly you'll have verified
 your dice. No trust required!

## Paper and Pencil and Dice

I recommend using 8-sided dice that have been verified through a 
 [saltwater balance test](#saltwater-balance-test)

![8-sided Dice](/images/d8_dice.jpg)
...

![Paper Dice Rolls](/images/paper_dice_rolls.jpg)

## Airgapped Computer

...
Even if you use the Paper and Pencil method,
 you will need to type that large number into a computer.
 And this computer must be airgapped and well secured 
 (even if that means destroying everything after you're done).
 This 256-bit number is literally the key to your wealth.





