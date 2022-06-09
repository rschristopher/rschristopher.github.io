# Fixed Supply
...

## Is Fixed Supply Important?
..

## Is Fixed Supply Feasible?
...


## Read the code
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
How do I know that the future supply won't 
 be controlled by incompetent bureaucrats?

Well, it's open-source code, 
 [try it](https://bitcoin.org/en/development)
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
 A conscious choice needs to be made.

Those that refused would just continue as they were,
 running nodes and mining blocks.
The developers that refused would continue
 developing the original version and would enjoy
 the support of everyone who wished to stay
 on the original fixed supply version.

This is, it turns out, exactly what has happened 
 many *many* times before. The so called *altcoins*
 (or *shitcoins*) are the result of exactly these
 kind of hard forks.
Their adherents chose the 
 hard fork, and the market reacts accordingly.


