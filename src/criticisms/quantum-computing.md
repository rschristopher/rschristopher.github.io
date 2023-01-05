# Quantum Computing 

This is one of the more interesting
 and theoretical criticisms of
 Bitcoin -- it usually goes like
 this:

!!! quote "*advances in quantum computing will put millions of Bitcoin at risk, causing the price to drop to zero.*"

Such statements make
 for fun headlines
 but are not quite grounded
 in reality.
And we've been seeing such headlines 
 for over a decade without any real
 progress with quantum attacks on
 Bitcoin's
 elliptical curve cryptography
 (always seems to be a few years out).
The truth is there's very little
 threat (for now),
 and in fact 
 quantum computing
 will most likely prove
 beneficial to Bitcoin;
 with Bitcoin providing incentives
 for quantum computing breakthroughs.

Importantly,
 people are concerned
 with their own Bitcoin,
 not hypothetical threats
 to someone else's
 Bitcoin
 (which may
 or may not be
 vulnerable to a
 "quantum attack").
In other words,
 I want to know if *my*
 Bitcoin is safe.
The simple truth is,
 Bitcoin is already 
 quantum resistant
 with a small handful of exceptions.

## Quantum Resistant

If you don't reuse addresses with
 known public keys, then your
 Bitcoin is
 [quantum resistant](https://en.bitcoin.it/wiki/Quantum_computing_and_Bitcoin).
Not disclosing public keys
 is the standard approach anyway,
 recommended for privacy reasons.
With most wallet software, and
 especially with cold storage solutions,
 you'd have to go out of your way 
 to make your Bitcoin vulnerable to
 a theoretic quantum attack
 (you'd need to disclose your public keys 
 that correspond to each UTXO).

At present,
 there are indeed vulnerable
 coins to a quantum attack,
 especially those that have not
 moved since 2010.
This is because early transactions
 used [P2PK](https://river.com/learn/terms/p/p2pk/)
 which reveals the corresponding
 public key directly in the transaction.
A quantum computer that breaks
 Bitcoin's 
 elliptic curve
 would (theoretically)
 be able to generate
 a private key from a corresponding
 public key.
However, the vast majority
 of Bitcoin is stored using
  addresses generated
 from public keys --
 hashing with
 [SHA-256](https://en.bitcoin.it/wiki/SHA-256)
 and then
 [RIPEMD-160](https://en.bitcoin.it/wiki/RIPEMD-160).
This double hash provides
 quantum resistance.

How many coins are vulnerable?
That is, how many coins used P2PK?
Most famously,
 the [million or so](https://bitslog.com/2013/04/17/the-well-deserved-fortune-of-satoshi-nakamoto/)
 coins of
 Satoshi Nakamoto
 are vulnerable to a quantum attack.
If *anyone* had the means
 to access these coins,
 they would be wealthy
 beyond measure.



## Satoshi's Bounty

A better, and more constructive,
 way to view Bitcoin's relationship
 with quantum computing is that
 Bitcoin is effectively
 offering an enormous
 reward to whoever can
 break Bitcoin's signing
 algorithm.
*The prize?*
Millions of untouched 
 and most likely abandoned Bitcoin.
Quantum computing "experts"
 would not need to be
 begging the
 NSF
 for grant money
 in their fiat-funded universities,
 nor promoting scammy
 shitcoins.
They
 could be funding themselves;
 they could be
 the wealthiest people 
 on earth;
 unless they're full of shit.

This bounty is up for grabs.
All you need to do is
 develop a quantum computer
 that breaks Bitcoin's
 elliptical curve algorithm.
If the price started
 to decline due to the sudden
 supply shock of millions
 of new Bitcoin coming
 into circulation --
 don't worry --
 there are millions
 of Bitcoiners
 that will anxiously
 and happily
 buy up those cheap
 sats.
Bitcoin will be fine,
 and it will have successfully
 funded advances
 in cryptography *and*
 quantum computing.

Such advances in quantum computing
 could be more usefully applied to
 Bitcoin mining.


## Quantum Mining

Bitcoin mining is entirely based on
 SHA-256, which is itself quantum resistant.
The best known approach would be
 to use
 [Grover's Algorithm](https://en.m.wikipedia.org/wiki/Grover%27s_algorithm),
 which (if given a sufficiently powerful quantum computer)
 could reduce the search space from 2<sup>256</sup>
 to 2<sup>128</sup>.
This doesn't exactly break SHA-256,
 but it means a brute force search time
 could be reduced.

It is possible that a powerful enough
 quantum computer could mine Bitcoin
 far more efficiently than modern ASICs.
Like the progression of CPU mining
 to GPU and then to ASICs,
 quantum mining is a logical next step.
Bitcoin's difficulty adjustment will
 keep the supply schedule on time,
 producing new blocks every ten minutes
 on average.

Between Satoshi's bounty and Bitcoin mining,
 we are likely to see amazing advances
 in quantum computing that have far more
 interesting applications than just
 reducing the search space for
 a brute force SHA-256 exploit.
If quantum computing ever proves itself,
 it will be in large part thanks to Bitcoin
 and the economic incentives that are
 far superior to the farsical theatrics 
 of fiat-funded "science".



