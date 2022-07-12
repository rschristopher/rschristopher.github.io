# Fixed Supply
...

## Is a Fixed Supply Important?

Let's consider this classic chart that you may have seen
 in various corners of the Internet.

![Weimar Gold Price](/images/weimar_inflation_orig.jpg)

---

I've seen many versions of this chart, 
 and always felt there was a lot overlooked.
Yes, it's a textbook example of currency hyperinflation,
 but let's dig a little deeper.

We can find the raw 
 [Weimar Inflation Data](https://github.com/jessems/WeimarInflationData)
 online, and using this we can plot the classic
 hyperbolic price of gold.
Additionally, we can track things like the  *all time high* (ATH)
 and changes to that ATH.
For example,

![Weimar Inflation](/images/weimar_inflation.png)

---

This gives us two distinct stories. 
We know the story of the *gold price*.
 Inflationary paper money will inevitably end this way.
However, there's another story that is often overlooked.

There was extreme volatility in the price of gold,
 as well as in real estate and other hard assets.
For well over a year the price was dropping, 
 crashing to less than 50% of its ATH.
And then every time there was a new ATH, 
 it was followed for months on end of a painful
 bear market. 
And then the process would repeat.
The frequency of these painful cycles increased,
 as did the volatility.

The people of German in 1921 lacked the benefit
 of hindsight that we have looking at this classic
 story of a currency collapse.
Instead, they lived through massive uncertainty,
 holding gold through periods where it seemed to
 be losing value. And then other periods where
 the number would go up and up,
 only to crash once again -- until finally,
 the mark itself crashed, hyperinflated
 into oblivion.

---

A fixed supply is not only important, but critical.
 And as all fiat currencies have demonstrated,
 inflation is impossible to avoid. In the early
 days it can be tamed and even reduced, but 
 eventually it grows along with all the consequent
 problems of fiat money.



## Is a Fixed Supply Feasible?

A fixed supply is not possible through wishful thinking
 or central planning. These attempts have all failed,
 and continue to fail.

Gold and silver were more successful as money than other
 metals simply because their supply was more limited.
 And yet, the inflation rate of gold
 (the increase in supply) has historically hovered
 around 2%.
That means every year there is 2% more gold than
 the previous year.
 A gold standard means 2% annual inflation.


## How is it Possible?
Many Bitcoiners will tell you to *[read the code](https://github.com/bitcoin/bitcoin)*.

And yes, the code at the moment will
 [fix the supply](https://github.com/bitcoin/bitcoin/blob/v22.0/src/validation.cpp#L1186-L1197)
 at 21 million.

???+ info "GetBlockSubsidy"
     Every 210,000 blocks (roughly every 4 years)
     the block subsidy (new Bitcoin mined) is reduced in half,
     and it started at 50.
    You can calculate 50 times 210,000 to arrive at 10.5 million,
     exactly half of 21 million.
    Afterwards, the block subsidy
     was "halved" to 25. Then to 12.5, and we are now in the
     era of a 6.25 block subsidy.

    This "halving" process will contiue until
     the year 2140 when the final fraction of a Bitcoin is mined,
     at which point mining will operate only on transaction fees.

    ```cpp
    CAmount GetBlockSubsidy(int nHeight, const Consensus::Params& consensusParams)
    {
        int halvings = nHeight / consensusParams.nSubsidyHalvingInterval;
        // Force block reward to zero when right shift is undefined.
        if (halvings >= 64)
            return 0;
    
        CAmount nSubsidy = 50 * COIN;
        // Subsidy is cut in half every 210,000 blocks which will occur approximately every 4 years.
        nSubsidy >>= halvings;
        return nSubsidy;
    }
    ```
    The `>>=` operator in the code is a bit shift right,
     which has the effect of halving a number

    ```
    50 -> 25 -> 12.5 -> 6.25 -> 3.125 -> 1.5625 -> ...
    ```
    

But this doesn't answer the question.

How can I know that this fixed supply won't change in the future? 
How do I know we're not one pull request away from inflationary money?
How do I know that the future supply of Bitcoin won't 
 be controlled by incompetent bureaucrats?

Well, it's open-source code. 
 [Try modifying it](https://bitcoin.org/en/development)
 and see what happens.
 Create your own pull-request to change this function.

Now, obviously such a change won't be approved,
 but what if it was? Let's say the supply cap was
 changed -- would that be the end of Bitcoin?
 
Such a change would break consensus rules,
 and would be considered a hard fork,
 that is, the original software would reject 
 all new blocks on this new version,
 and it would require all the miners and nodes
 to upgrade. 
A conscious choice amongst every participant 
 in the Bitcoin network.

Those that refused would just continue as they were,
 running nodes, mining blocks, and transacting
 Bitcoin based on the 21 million fixed supply.
The developers that refused would continue
 developing the original version and would enjoy
 the support of everyone who wished to stay
 on the original fixed supply version.

This is, it turns out, exactly what has happened 
 many *many* times before. The so called *altcoins*
 (or *shitcoins*) are the result of exactly these
 kind of hard forks.
Their adherents chose the 
 hard fork, and the market reacted accordingly.


