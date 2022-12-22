# Bitcoin is not Perfect 

This is one of the most common themes of critique,
 especially when a critic is engaged in debate with a Bitcoiner.
Once you see the pattern you'll see it everywhere.
The critic simply claims that a percieved weakness
 is more important and relevant
 than it actually is.
Here are some of the most common examples of this strategy:

* criminals use Bitcoin
* mining uses a lot of electricity
* it's not fairly distributed
* the price is too volatile
* the fixed supply prevents emergency funding

The problem with the above arguments 
 is that none of them would disprove Bitcoin
 (even if the claims were valid -- they are not, but that's irrelavant).
This form of argument is a kind of trap,
 similar to 
 [Bulverism](https://en.wikipedia.org/wiki/Bulverism),
 where the critic
 simply distracts with unrelated noise,
 explaining *why* something is wrong without actually showing a critical flaw.

For example, Bitcoin can be true AND used by criminals,
 and still have a volatile fiat price,
 and be unfairly distributed,
 and so on -- the question of whether
 Bitcoin is true is irrelevant to all of those concerns.



## Bitcoin fixes -- everything?

In the spirit of steelmanning a more useful critique, 
 we can examine the inverse of this argument,
 that Bitcoin is or should be perfect.
What many would call hopium,
 naive Bitcoiners act as if
 Bitcoin is the panacea to fix all of society's ills.
And even more dangerous is to
 hold Bitcoin to an impossible standard and refuse or resist
 adoption till it becomes *perfect*.

!!! quote "Perfect is the enemy of good <sup>[\*](https://en.wikipedia.org/wiki/Perfect_is_the_enemy_of_good)</sup>"

It is important to remember that Bitcoin is not, and need not be, perfect.
Bitcoin only needs to be true,
 sufficiently true that it cannot be stopped or centralized.


## Good enough?

To push this criticism into steelman territory,
 let's consider that there does exist a set of 
 necessary conditions for Bitcoin
 to survive now and in the future.
If not *perfect*, 
 it must be *good enough*.
But what does that mean for Bitcoin to be *good enough*?

Bitcoin requires a sufficiently
 advanced civilization with electricity, computers,
 and a global network.
Bitcoin will also need self-interested developers,
 and self-interested users,
 and self-interested miners --
 all to preserve the value and decentralization
 of the network.
While this does exist now, there is no reason
 to believe this will persist into the future.
Adopting Bitcoin is very much an act of *faith* --
Faith that civilization can and should persist,
 that human progress will and should continue,
 and that a universal unit-of-account is beneficial towards these ends.

To not believe in the above (with sufficient faith, beyond just rational self-interest)
 is to bow to a form nihilism that not even Bitcoin could survive.
In other words, Bitcoin depends on human civilization to survive and flourish.
If humans cannot make it, then neither can Bitcoin.

However, even with faith in human civilization,
 there are some very difficult compromises
 that Bitcoin has faced, and will continue to face.
Most concerning is privacy and decentralization.
Bitcoin is not perfectly decentralized,
 and it is not perfectly private.
Compromises were made.


### Imperfect privacy

In order to provide full transparency and
 full auditability of its supply, Bitcoin
 is not fully private nor anonymous
 -- it is pseudonymous.
In other words, sending and receiving Bitcoin
 is like writing under a pseudonym.
You can create as many wallets 
 (each with as many addresses) as you like.
Bitcoin gives you the tools for privacy,
 but it guarantees nothing; you could
 disclose your addresses allowing others to surveil 
 your Bitcoin.
As a result, it is not and never can be as
 private as cash.

This is even a problem amongst Bitcoiners.
For example, there are many fanatic Bitcoiners
 that simply do not use lightning payment
 rails out of concern for privacy;
 they do not run private lightning channels
 and learn how to secure their nodes --
 instead, they continue to use fiat
 payment rails 
 (with a kind of blindspot to the privacy problems with fiat)
 and they will say "more work needs to be done for lightning adoption".
And while this is true -- more work is always needed --
 we do not wait for others to do the work.

!!! danger "If you're capable of informed criticism, then you're capable of contributing to a [BIP](https://river.com/learn/what-is-a-bitcoin-improvement-proposal-bip/)"

Ultimately, there is no perfect privacy,
 there is only a cultural attitude to value
 and fight for privacy (or not).
Bitcoin provides us with sufficient tools
 for privacy, but the rest is up to us.
Cryptography provides us an asymmetric advantage
 to favor privacy, but
 we cannot expect any cryptographic
 system to guarantee privacy if we
 ourselves don't value it.




### Imperfect decentralization

Bitcoin compromises decentralization
 in order to maintain a fully auditable
 fixed supply with no conflicts -- an undisputed ledger.
Specifically, the consensus rules solve
 any disputes in the ledger
 through proof-of-work consensus.
In a conflict (divergent timechains)
 the chain with the most proof-of-work
 will win, the other chain will lose
 (erasing those transactions).

Most of the [whitepaper](/images/bitcoin.pdf)
 was dedicated to this exact problem,
 the famed
 51% attack:
 if anyone could
 achieve 51% or more of the total
 network hashrate (the *work* in proof-of-work)
 then they could control the network.
They could use this power for good or evil,
 but it's centralized either way.
This is why the security of the network
 depends on the enormous cost (in terms of money and ingenuity)
 of a 51% attack over a given number of blocks.

Mining benefits from
 economies of scale
 and as such we did see larger and larger mining companies
 with early signs of monopolization --
 right up until they went
 bankrupt.
Fortunate to the health of the network (but not to the miners), 
 [mining is zero sum](mining-zero-sum.md)
 and it has so far proved impossible to monopolize.

!!! danger "diseconomies of scale within Bitcoin mining must always be greater than its economies of scale"

There is no guarantee that there
 will never be a mining monopoly --
 and while this is not necessarily a risk to the
 fixed supply, this is a severe risk to
 transaction processing.
If you want a transaction in the ledger
 you go through miners,
 and if mining was ever monopolized,
 there would be a centralized
 point-of-control of who could
 (and could not)
 transact on chain.
A miner with a majority of the hashrate
 could simply ignore all other miners,
 knowing full well it will always win
 any divergent timechains, meaning
 its mempool selection would be the
 only one that matters.

This would effectively
 prove Bitcoin false.
Because it would be centralized,
 the monopoly miner would be the sole arbiter 
 for all international settlements.
They could set any premiums they
 wanted on transaction fees.
They could censor any/all transactions.
They could push people to
 second layer payment rails that
 they control (as they could censor
 all competition), giving them
 full control over currency.
And they could do all this without
 breaking consensus rules.
Eventually, even the power of seigniorage
 could be gained (on a second layer)
 and the system would 
 become yet another bloated fiat monetary system.











