# Scalability

<!--
Lord Jesus Christ
Son of God
have mercy on me a sinner 
-->

This is one of my favorite critiques,

!!! quote "Bitcoin only supports up to 7 transactions per second. Do the math, that's not enough."

In truth, 
 Bitcoin doesn't process any transactions
 per *second*, it processes blocks
 (of transactions) every 10 minutes, on average.
Blocks have a few thousand transactions,
 hence "up to 7 per second", I guess.
And while this is true for base layer
 transactions (final international settlement),
 2nd-layer solutions like the
 lightning network
 can scale upwards to infinity.

But a Bitcoin critic is not interested in
 2nd-layer payment rails or any actual
 engineering solutions to their criticism.
The pattern of this criticism
 is quite dumb and once you see it 
 it'll be hard to unsee.
Take whatever perceived scaling limit
 that is less than the population of humans,
 and declare it as a fatal flaw in Bitcoin.

!!! quote "ah hah, this is less than 8-billion people, Bitcoin can't be money."

With this same logic,
 fiat couldn't scale,
 credit cards couldn't scale,
 not even coins could scale -- there are only
 2-billion US quarters,
"ah hah, this is less than 8-billion,
 quarters can't be money".

Rarely will you find a nuanced
 scaling criticism -- there are however,
 some interesting critiques and thought
 exercises to be found here.

For example, how will lightning
 channels scale globally?


## Scalability of Lightning Channels

Opening and closing a lightning
 channel requires
 base layer transactions.
Can all humans on earth open 
 a lightning channel?
Can we have 8-billion lightning channels?

Truth is, under a Bitcoin standard not
 every human will need to make base layer
 transactions.
And they don't need to open lightning channels.
The world does not need a lightning channel
 for every human.
Only entities that we should call *sovereigns*
 will need to do base layer transactions
 and manage their own lightning channels.
A lightning channel is effectively a
 liquidity provider for payments.

We see the same pattern with fiat, except with
 fiat each sovereign has the power of seigniorage;
 they can print as much money (liquidity) as they
 desire.
Sovereign fiat currencies compete with each other,
 all trying their best to be the strongest
 fiat -- print too much and you hyperinflate,
 but print too little and you'll have no
 seigniorage powers.
Under a Bitcoin standard, no one has the power
 of seigniorage.
The fixed supply and
 the end of
 seigniorage is the entire value proposition
 of Bitcoin.

Under a Bitcoin standard,
 sovereigns will compete,
 and they will do so
 fairly under the rules of a fixed global
 money supply.
If a sovereign lacks liquidity in their
 lightning channels (that is, they can't pay you),
 you simply go to a sovereign that can.
This is more or less how the gold standard
 functioned before it was corrupted by
 fractional reserve paper money.



## Sovereigns and Scale

Importantly, Bitcoin supports
 vastly more sovereigns than does fiat.
In today's global fiat economy, there are
 approximately ~200 different central
 banks, each representing their own
 financial sovereignty.
Base layer transactions under fiat
 happen infrequently between these
 sovereigns, typically through
 treasury bonds, where they buy and
 sell each others debt.
In practice there is only ~20 or so
 sovereign currencies with real economic power,
 and only 7-8 that actually matter.
Most other fiat currencies
 are typically backed by
 those top 7-8 fiat currencies
 (USD, EUR, JPY, etc).

Under a Bitcoin standard, money
 is decoupled from state,
 and the power of seigniorage is no more.
Anyone with sufficient Bitcoin to do base
 layer transactions 
 (who could open and
 close lightning channels) would be a
 sovereign.
This would include nation states,
 corporations, family dynasties,
 and even individuals
 (see the 
 [Sovereign Individual](https://en.m.wikipedia.org/wiki/The_Sovereign_Individual)).
If this seems bizarre, consider
 that this is far more aligned
 with the history of money and civilization
 than our current ~50 year experiment in
 global fiat.

But how many sovereigns could exist
 under a Bitcoin standard?
Answering this is pure speculation,
 but if we're only concerned with the
 mathematics of global scale, let's imagine
 a distant future where the very
 idea of fiat money is a footnote
 in history, an oddity of less advanced
 people who pretended governments
 could issue money.
Let us imagine a Bitcoin standard.
Let us imagine, the year 2140.



## In the year 2140

If Bitcoin has survived this long,
 it will have proven itself true.
The world will be a vastly different place,
 with wonders far beyond our present
 imagination.
However, there are some things we can know
 with relative certainty.
For example, the last Satoshi
 will have been mined.
There will be zero inflation.
What we today call "mining" will instead
 be a global settlement layer, where sovereigns
 compete in a zero sum game for transaction
 fees.

And with some degree of confidence, we can
 predict that fiat money is a relic of the past.
Money will be decoupled from nation states,
 which, if they're still around, would be
 far weaker and less influencial than today.

And, the easiest prediction of all:
 Bitcoin will simply be known as *"money"*.

Let us now imagine a global population of
 12-billion humans,
 living in relative peace, though
 always with the typical human dramas
 that define humanity.

!!! danger "USD as Unit of Account"
    I'veincluded USD in the below examples;
    which is a bit funny since
    USD is obviously not a great measure,
    however, these are wild speculations
    meant as a thought exercise in the
    mathematics of scale.
    *Forgive me.*

Let's imagine that the market cap of money
 stands at $300-trillion, the equivalent
 of a $14.285-million BTCUSD.
This is arguably much smaller than
 one would expect in the year 2140,
 but we'll start here
 to set some baseline numbers for our
 scaling calculation.
We'll have the following values in sats,

```
1 sat = 0.1428 USD

1 USD = 7 sats
```

Meanwhile, the transaction fees are averaging
 1000 sats,
 which corresponds to $142 per transaction.
Each block has at least 3000 transactions,
 resulting in a block reward of $428-thousand.

1000 sats ($142) is the fee to go 
 from 2nd-layer savings to sovereign individual.
In other words, this is the fee
 to become a sovereign.
As a sovereign individual, one is free to hire
 their own team, investing in their own
 infrastructure.
Sovereigns either profit, sustain, or go bankrupt
 (assets absorbed into other sovereigns).
Competition amongst sovereign individuals
 is zero sum on the base layer, but positive
 sum in local environments as economies grow
 and new sovereign individuals are created.

But let's assume the economy grew much larger
 by the year 2140.
Let's assume a $100-million BTCUSD. 
In other words,

```
1 sat = 1 USD
```

This means 1,000 sats
 per transaction is worth much more ($1,000).
The cost of 
 becoming a sovereign individual is now
 quite expensive, and will
 grow continually more expensive as
 the economy grew.
This benefits families and multigenerational
 wealth strategies while not precluding
 individuals from joining the ranks
 of financial sovereignty.
Anyone could save and become a sovereign,
 adding liquidity to a lightning channel
 in order to run their own business.

Each block would be worth about $3-million,
 with network security at an all time high,
 despite zero block subsidies
 (it's no longer mining, just 
 international settlement).

But is all this really scalable?

There would *only* be approximately 160-million
 transactions per year.

This equates to tens-of-millions of
 financial sovereigns, out of billions of
 people.
Most individuals will not be sovereign.
Many families and dynasties
 will be sovereign.
All individuals will be associated with
 one or more sovereigns,
 either by family or by work.

Let's imagine there's only 50-million
 sovereigns at any
 given point in time.
This would easily be scalable with base layer
 transactions (using today's technology),
 and there'd be
 an average population of only 240-persons
 per sovereign
 (and with a very high per capita income).
However,
 under a Pareto distribution, 
 we could expect
 80% of the population to be working
 for the top 20%
 of sovereigns, that is,
 9.6-billion people in 10-million sovereigns,
 averaging ~960 people per sovereign,
 with a long tail of 40-million sovereigns;
 mostly family, individual,
 and small business sovereigns.
The largest sovereigns might have thousands
 of people,
 maybe even some with tens of thousands.
The smallest, are just individuals.

And due to the nature of the game
 (the economic game), it's unlikely
 a given sovereign would grow too large
 (before disintegrating into smaller sovereigns).
People would be free to work with different
 sovereigns; you're working
 for Bitcoin after all.
Sovereigns need workers and people,
 they're always hiring (otherwise why waste the
 money on even being a sovereign).

In any reasonable analysis,
 this is far more scalable
 (and far more fair)
 than the ~200 or
 so sovereign nation states
 acting as totalitarian
 regimes and slave labor coordinators for
 billions of people.
Bitcoin is an alternative to fiat debt slavery.
And a natural distribution of sovereigns
 avoids the oligarchies
 we see in modern fiat.

A Bitcoin standard, even with
 the technology as is,
 is already scalable enough to
 replace fiat.
This would also put an 
 end to our globalist oligarchy, 
 much like modernity was the
 end of nepotistic monarchies.

A future Bitcoin standard could 
 easily scale to
 tens of millions of sovereign individuals
 and dynasties,
 where today's nation states 
 would either be relics
 of a strange past, or economically
 small players amidst 
 tens of millions of other sovereigns, 
 competing for wealth and resources like
 everyone else.



