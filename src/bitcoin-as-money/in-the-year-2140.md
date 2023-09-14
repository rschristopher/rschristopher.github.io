# In the Year 2140

Most famously, this is the year (give or take) that the last Bitcoin will be mined. The Bitcoin supply schedule will officially hit its fixed limit of 20,999,999.9769.  Why not exactly 21-million? Well, a single BTC is not infinitely divisible, and it would take infinite halvings and infinite time for the halving logic to reach 21-million.

More formally, an infinite halving schedule would have an asymptotic limit of 21-million (see the first equation below). But there are only 33 block-subsidy eras (0 to 32), each lasting exactly 210,000 blocks (see the second equation, which is the total Bitcoin supply).

.. img

Each era is roughly 4-years, for a total of 132 years, such that the final era will have a block subsidy of only 1 satoshi, or 0.00000001 BTC. A single satoshi is not divisible on the base layer, thus, at block height 6,930,000 (in the year 2140) we will see the final block subsidy. From that point on Bitcoin mining will operate only on fees, which in practice will already have happened as fees will far outweigh such small block subsidies (in fact, the coinbase reward itself will likely be dust).

While it’s difficult to make predictions more than a century in the future, we can speculate based on what we do know and examine any pre-conditions for Bitcoin’s survival – in other words, if Bitcoin will survive to the year 2140 and issue its final block subsidy, then what would have to be true?



## Human Population and Technology

Global population growth is difficult to predict more than a century into the future, and advances in technology and adoption are even more speculative. That said, for some baseline numbers we can assume a global population increase over 10-billion, and sufficient agricultural advances to avoid the various doomsday predictions (which have historically been wrong every singly time) and arrive at a conservative estimate of 12-billion global population.

Likewise we can assume advances in energy markets and access to technology, which are necessary for the mass adoption of Bitcoin. While there are many regressive scenarios one can speculate upon, most of these are not only detrimental to human flourishing but also to Bitcoin adoption itself. In other words, one needs a global information network and access to personal computing devices for Bitcoin to not only thrive but to survive. 

If there is any such regression in human civilization then it is unlikely Bitcoin will survive in a recognizable way into the year 2140 – so for the purposes for this exercise, we will assume humanity overcomes the various existential threats (external and self-imposed) and maintains a steady state of growth and human flourishing. We can consider this the baseline requirement for Bitcoin’s survival (that we don’t end up living in a post-apocalyptic dystopia).

!!! info "Prerequisite 1"
    In order for Bitcoin to survive to the year 2140, human civilization must avoid any catastrophic collapse. Bitcoin depends on human flourishing.



## Mempool Fee Market

Long before we get to the final satoshi, what we call mining will necessarily be operating on fees. As such, by the year 2140 the name “mining” will be too much of a misnomer and can more accurately be understood as “transaction processing”, or “proof-of-work hashing”.

Importantly, this means there must be sustained demand for transaction settlement, and this demand must be in excess of available blockspace. Consider the following,

* 4000 transactions per block (average)
* 144 blocks per day
* 210-million transactions per year

In order to operate solely on fees, there must always be more demand than the available supply, and it must be consistent over time. In other words, unless the mempool has in excess of 4000 transactions with sufficiently high fees then there’d be no reason to do any PoW hashing. At present, the block subsidy motivates miners to continue hashing even if the mempool is empty.

But in the year 2140, if the mempool fee market is too low or empty, miners would need to curtail their equipment and await sufficient transaction fees. This lull in activity, if prolonged, would have deleterious effects on the network difficulty, leading to a far more vulnerable network (risk of chain splits, censorship, and any of the effects of 51% attacks).

We can conclude that the fee market must be stable 24/7 with demand continuously in excess of the supply of blockspace, which would be necessary to competitively bid up fees.

!!! info "Prerequisite 2"
    In order for Bitcoin to survive to the year 2140, demand for blockspace (for transaction settlement) must be stable and continuously greater than supply, and this must be true every hour of every day.





## Price

While this is impossible to predict even in the short term, BTCUSD is impossibly more impossible to predict in the long-term.  And how should we measure this? USD may or may not exist in the year 2140 (especially not with any sense of value that we understand today). 

We could try to measure the value in gold. Gold has proven a far more stable store of value over time than any fiat currency, so we will estimate our calculations based on BTCAUX (Bitcoin to ounces of gold). Furthermore, we will reflect back on the Mempool Fee Market and determine any pre-conditions for Bitcoin’s survival into the year 2140 based on fees (as priced in gold).

At present, with block subsidies contributing to block rewards, we can earn about 80-100 ounces of gold per block. As we know mining is sustainable (and profitable) with this kind of reward today, we can assume that in the year 2140 we should see similar values earned per block, albeit entirely in fees.

As there are roughly 4000 transactions in a block, this means an average transaction fee of 0.02 to 0.025 ounces of gold per transaction. This is about $50 in today’s USD, which seems reasonable as a future minimum. In other words, we should expect a roughly 50x increase in BTC value relative to today’s price as a baseline minimum for Bitcoin to be alive into the year 2140.

!!! info "Prerequisite 3"
    In order for Bitcoin to survive to the year 2140, then the value (purchasing power) must be roughly 50x or more of its current price as measured in gold.

To be clear, this is not a prediction of future price activity, this is a speculation that the Bitcoin price MUST increase at least 50x relative to gold if it is to survive without block subsidies.



## Sovereigns and Scale

At present, global fiat is not dependent on precious metals or any hard asset that is in demand outside of any one monetary sovereign (usually a nation state with its own fiat money). The existing global fiat system has tenuous dependencies on USD as the global medium of exchange for crude oil (the so-called “petrodollar” system). And separately there exists global foreign exchange (forex) markets where fiat currencies are traded, arbitrages are sorted, and prices are discovered.

Unlike a gold standard, where the exchange rate could be settled based on the precious metal content of coins, global forex requires a vastly more complicated system that reduces the number of financial sovereigns (that is, the number of nation states that can create their own fiat). Even now without a gold standard, there are far more mints (public and private) creating gold coins and bullion than there are sovereign nation states with their own fiat money. All one needs is gold. This is because the value of gold depends only on its demand, with very little seigniorage possible, and no forex market necessary.

Bitcoin takes this to an extreme of eliminating seigniorage entirely. If Bitcoin survived into the year 2140, there will be no new Bitcoin and no opportunity for seigniorage. Additionally, blockspace will be constrained to roughly 210-million transactions per year. And while this is easily enough to absorb the 50x increase in value (as measured in gold) discussed previously, is this enough to cover a global demand of 12-billion people?

In other words, could Bitcoin become a victim of its own success, as blockspace itself becomes too scarce, necessitating secondary layers that fail to offer the assurances one finds with on-chain settlement? Put simply, how could Bitcoin scale globally? And how does the compare to fiat?

The short answer is no. On-chain transactions (final international settlement) clearly cannot scale to a global population of 12-billion. With only 210-million transactions per year possible, base-layer transactions will effectively be limited to a population of tens-of-millions maybe a hundred million max. Scaling beyond that will require secondary layers such as lightning, but even lightning necessitates on-chain transactions. In fact, any secondary layer will by definition require on-chain transactions in order to achieve the security and backing made possible by the base layer.

Ultimately, if there are 12-billion people looking to use Bitcoin, only a small minority of millions (say 50 to 100-million people) will be able to do so on the base layer. While this sounds unfair, it's important to contrast this with fiat. Those millions of people making on-chain transactions are themselves financial sovereigns.

Meanwhile, the number of fiat sovereigns is limited to the number of fiat currencies, which is under 200. Not thousands, not millions, and in fact only a handful of fiat currencies cover nearly all the value (USD, EUR, CNY, JPY, etc). This produces a defacto global oligarchy of central banks in a winner-take-all game where weaker fiats are absorbed into stronger fiats (e.g., so-called “dollarization”). Ultimately, the fiat game is not scalable globally over time.

Contrast this with Bitcoin where anyone who transacts on-chain is the equivalent of a financial sovereign, able to provide liquidity into any secondary layer. Importantly, if Bitcoin is to survive and flourish into the year 2140, then secondary layers must be available to all without necessitating on-chain transactions. That is, an existing lightning channel must itself be scalable to multiple participants rather than be limited to a single user (as it is now).

!!! info "Prerequisite 4"
    In order for Bitcoin to survive to the year 2140, secondary layer channels (such as lightning channels) must allow for multiple participants per channel, in other words, multiple private keys per channel.

There are no technological barriers to achieving such a world of tens of millions of financial sovereigns, however, these secondary layers must never supplant or weaken the demand for base layer transactions sufficient to maintain the security of the network. In other words, if secondary layers provided sufficient savings and liquidity for everyone, then why use the base layer, why bother paying transaction fees for on-chain transactions?

For Bitcoin to survive, financial sovereigns must have advantages not available to users of secondary layers, and these advantages must be sufficient to sustain the continuous demand for blockspace.

In practice, a sovereign controls the liquidity, say, in a lightning channel. And even if multiple participants could share the same channel, those participants could not provide their own liquidity and benefit from 2nd layer transaction fees the way the sovereign can. The incentives for 2nd layer fees must be sufficient to encourage the far more costly on-chain transactions. There must be continued competition amongst Bitcoin users to become one of the financial sovereigns, iterating over time such that the continuous demand is met to keep proof-of-work hashing incentivized.

!!! info "Prerequisite 5"
    In order for Bitcoin to survive to the year 2140, there must be fierce competition and incentives for users of secondary layers to become user of the base layer (financial sovereigns).



## Culture War

Ultimately, secondary layers will be a ripe target for fractional reserve schemes and fiat. For example, an existing nation state may choose to back their fiat currency with Bitcoin but then ban or limit their own citizens from transacting in Bitcoin (exactly as the US did during the Bretton Woods era). In this situation, even under a global Bitcoin standard, fiat currencies will very likely survive.

The very pattern that led to global fiat could easily be repeated even after the abject failure of global fiat. This isn't the first fiat monetary system, and it's unlikely to be the last. As long as there are people willing to work for fiat while alternatives exist, then fiat money will remain.

!!! info "Prerequisite 6"
    In order for Bitcoin to survive to the year 2140, there must be sufficient global demand for hard money and a forcible rejection of fractional reserve and fiat.

Unfortunately, if prerequisite 6 was already met, we would still be on a gold standard and Bitcoin would never have existed. The more nuanced flavor of this prerequisite is that Bitcoin itself must incentive exactly this cultural shift to anathematize fractional reserve and fiat money. Human nature on this matter has already spoken.

God help us.




