<!--
Lord Jesus Christ
Son of God
Have mercy on me, a sinner
-->

# Understand the Terms

*Mining* is perhaps the most confusing
 metaphor within all of Bitcoin.
It can be better understood as 
 transaction processing, allowing
 for *final international settlement* --
 as well as issuance, ensuring that the
 supply schedule stays on its predetermined
 course.
Unfortunately, there's no one word to adequately
 describe all of that, hence the circumlocutions
 necessary to describe what 
 Bitcoin "mining" really is.

For these reasons, we've called this section
 *Proof of Work*.
Because for better or worse, the entirety
 of Bitcoin mining, international settlement
 processing, whatever you want to call it --
 all rests on top of what is known as a
 *proof of work* consensus mechanism.

Ww will attempt to demystify *proof of work*
 and provide a clear and technically accurate
 understanding of how mining works.

 

!!! warning "work in progress"








## Hashing 

Despite how often it is said,
 Bitcoin mining is not concerned with
 solving complex math problems.
Bitcoin mining is just *hashing*.
The "proof" in *proof of work* is simply
 a hash that *proves*
 a certain amount of hashing (that is, *work*)
 was done.
The important part is not the math function,
 the important part is the *proof of work*.

???+ question "what is a hash?"
    A "hash" refers to a
     [hash function](https://en.m.wikipedia.org/wiki/Hash_function),
     which is a math function that takes
     input of any size and maps it to a 
     fixed-sized output.
    Typically a "hash" refers to the output of
     a hash function.
    A good hash function should be deterministic,
     with uniformly distributed output,
     and be non-reversable.

    A hash function can certainly be
    considered a "complex math function"
    (not exactly a "math problem"),
    but that is decidedly not the point
    of Bitcoin hashing -- the point
    is *proof of work*.

The output set of a hash function can be
 small (useful for data indexing) or
 extremely large (useful for cryptography).
Bitcoin mining uses
 [SHA-256](https://en.m.wikipedia.org/wiki/SHA-2).


### SHA-256

SHA-256 is a hash function that
 maps any input into a number somewhere between
 0 and 2<sup>256</sup>.
This set of numbers is so large it's on the scale
 of *atoms in the universe*.
It's so astronomically large that the chance
 two human-generated
 inputs mapping to the same output
 (what would be known as a collision)
 is considered so infeasible as to be
 impossible.
And in fact there are exactly *zero* known
 collisions in SHA-256
 and finding a collision would
 likely take beyond the heat death of the
 universe to discover.

That said, what if instead of a collision,
 you just wanted to find an input whose
 SHA-256 output was
 smaller than a target number?
If it's a very large target, say 
 2<sup>255</sup> then this would be trivial
 (50% of all inputs would produce
 a hashed output smaller than that, basically
 a coin toss).
But if it was a very small target number, then it
 would be extremely difficult to find *any*
 input that produced a hashed output
 that was smaller.

???+ example "For example"
    Let's look at some example SHA-256 outputs,
    
    ```
    1 => 6B86B273FF34FCE19D6B804EFF5A3F5747ADA4EAA22F1D49C01E52DDB7875B4B
    2 => D4735E3A265E16EEE03F59718B9B5D03019C07D8B6C51F90DA3A666EEC13AB35
    3 => 4E07408562BEDB8B60CE05C1DECFE3AD16B72230967DE01F640B7E4729B49FCE
    ```
    ```
     three => 8B5B9DB0C13DB24256C829AA364AA90C6D2EBA318B9232A4AB9313B954D3555F
     Three => 926F52D1C1E19C0C58A7D39BF234A0D239352F5ACFA26C73989D9C3845614999
    Three? => F9DCE11BE6E27EA81231A766A4210EAA05D51E4C5F5F79C8FD0133274201D543
    ```
    
    Each output is a hexadecimal representation
    of a number (that is, a very large base-16 number).
    Notice that small changes in the input
    produce radically different outputs.
    In fact, there's no way to predict
    where in the 2<sup>256</sup> output set
    a given input will land (other than to
    perform the SHA-256).
    And as expected, exactly 50% of those
    outputs are less than 2<sup>255</sup>.
    
    Also notice that none of these output
    numbers are particularly small.
    For comparison, let's look at the
    SHA-256 output of the Bitcoin genesis block,
    
    [`00000000839a8e6886ab5951d76f411475428afc90947ee320161bbf18eb6048`](https://blockstream.info/block/00000000839a8e6886ab5951d76f411475428afc90947ee320161bbf18eb6048)

    Notice the leading zeros.
    This number is clearly much smaller than
    the previous SHA-256 outputs.
    In this case the target was 

    [`00000000FFFF0000000000000000000000000000000000000000000000000000`](https://en.bitcoin.it/wiki/Difficulty)

    And indeed the SHA-256 output of the genesis
    block is smaller than this target.

    Compare this to a more recent block hash, block 772244,

    [`000000000000000000032c4341255c7b108f3982b71b6e734d25b89bb9b1cc41`](https://blockstream.info/block/000000000000000000032c4341255c7b108f3982b71b6e734d25b89bb9b1cc41)
    
    By looking at the leading zeros it is obvious that this number
    is considerably smaller than the genesis block
    (and thus more work was required to find an input that
     produced such a small SHA-256 output).
    In fact, the probability of guessing an input
    with a SHA-256 output that small is so small
    that you're more likely to be struck by
    lightning every day of the week at noon.

    

This simple observation
 is the basis
 of Bitcoin mining.
Importantly, finding input whose
 SHA-256 hash output
 is smaller than a target
 can only be done
 through a brute force search;
 and thus the very existence of
 such an input
 would *prove* a certain amount of
 brute force *work*
 was done.

???+ info "Other hash functions"
    In addition to SHA-256, Bitcoin makes use of
    other hash functions; in particular 
    [RIPEMD-160](https://en.m.wikipedia.org/wiki/RIPEMD),
    used in conjunction with SHA-256 to generate
    Bitcoin addresses.

    However, within Bitcoin mining 
    *proof of work*, it is
    entirely a game of SHA-256 hashing.

???+ info "Other uses of SHA-256 in Bitcoin"
    Bitcoin makes extensive use of SHA-256,
    including addresses as well as computing
    a Merkle Root.
    A Merkle Root is a specific kind of 
    [Merkle Tree](https://en.wikipedia.org/wiki/Merkle_tree)
    which is effectively a SHA-256 hash of hashes
    of all the transactions in a given block.
    The purpose of a Merkle Root is to prove
    a given set of transactions produced
    a specific SHA-256 hash
    (a way to validate that the transactions
     in a given block were not modified).


### Hashrate

As the name implies, hashrate is
 simply the number of SHA-256
 hashes per-second happening
 in order to successful discover
 a new block.
There are great real-time
 [visualizations](https://mempool.space/graphs/mining/hashrate-difficulty#1y)
 of hashrate over time.
Hashrate across the entire Bitcoin
 network is estimated based
 on the time between blocks
 and the current network difficulty.
In general, the faster you are
 producing valid blocks for
 a given difficulty, the
 more hashrate you have.








## Difficulty

Difficulty is simply the measure
 of how difficult it is to find
 a valid block.
Every
 2016
 blocks the difficulty will be adjusted
 to match a 10-minute average time
 between blocks.
In other words, if blocks are
 coming in faster than every
 10-minutes, the difficulty
 will increase; if blocks
 are coming in slower,
 the difficulty will decrease.

The formula for difficulty is based
 on the target number discussed
 above.
Specifically,

```
difficulty = difficulty_1 / target
```

And `difficulty_1` is the highest possible target allowable in Bitcoin
 (in other words the lowest allowable difficulty),
```
difficulty_1 = 00000000FFFF0000000000000000000000000000000000000000000000000000
```

Note that as *difficulty* increases
 the target number decreases
 (that is, it becomes more difficulty
 to find a SHA-256 hash less
 than the target).



### Network Difficulty

Network difficulty refers to
 the difficulty across
 the entire Bitcoin network.
That is, the difficulty needed
 to find a valid block.
When Bitcoin was first released
 in 2009
 the network difficulty was 1.0,
 and this number slowly increased
 as more participants joined
 and started mining.
By 2012 the difficulty
 was over a million.

In the age of ASICs, the
 network difficulty has
 grown astronomically large,
 and
 [continues](https://mempool.space/graphs/mining/hashrate-difficulty#all)
 to grow.
For example, block 772244 (mentioned above)
 has a difficulty of 37,590,453,655,497.09
 (over 37-trillion).
This corresponds to a *hashrate*
 of over 250 exahash --
 that is, over 250 quintillion
 SHA-256 hashes per-second.

To put this into perspective,
 if we attempted to log all of
 the quintillions of hashes
 per-second
 then we would exhaust
 all know storage space
 (all cloud storage,
  all personal computers,
  all mobile devices)
 in only a few seconds.
Bitcoin's global hashrate is now so large
 it has outgrown our
 current (and otherwise impressive)
 global data storage capacity.



### Session Difficulty

Typically, session difficulty refers to the
 specific difficulty assigned to a miner.
While the network difficulty is used to
 find a valid block, the session difficulty
 is a way to find valid *shares* that act as
 a *proof of work* for an individual miner
 (or a pool of miners).
For example, a modern ASIC might use a
 session difficulty of 65,536 and generate
 valid share files every few seconds.

A share is simply a block
 that meets the session difficulty
 (but not necessarily the
 network difficulty).
These shares are themselves a
 *proof of work*, specifically it is
 *proof* that a given miner did work.



### Share Difficulty

A valid share must meet the session difficulty,
 which just means its SHA-256 hash is
 smaller than the target
 computed from the session difficulty.
Every share will have its own difficulty which
 is greater than the session difficulty.
And if the share difficulty is greater than
 the network difficulty then that share
 is a block!






## Luck

Luck is a measure of -- you guessed it -- *luck*.
Specifically, the *luck* of finding a 
 valid block in
 a given period of time.
It's similar to the probability of finding
 a block given a specific amount of hashrate.
Technically, luck is simply the following
 formula for all shares between two blocks,

```
sum(session_difficulty) / network_difficulty
```

In other words, if luck is 1.0 (100%) then you
 mined a block when your own *proof of work*
 was equal to the current network difficulty.
If your luck measure was greater than 1.0
 then this is bad luck
 (meaning you did more work for that
 one block than implied by the current network difficulty).
And if your luck was less than 1.0
 then this is good luck
 (meaning you found a block before doing
 all the work implied by the network difficulty).
In practice, the luck between any two blocks
 will vary, sometimes good and sometimes bad luck.
However, the average luck over time
 should convergence
 on 100% (by definition).

Over a period of N blocks, luck is simply,

```
sum(session_difficulty) / (N * network_difficulty)
```

In a perfectly efficient and error-free system,
 luck will converge to 100% as N gets larger.
And if luck is greater than 1, even by a small
 fraction, say, 1.02 (102%), then that denotes
 bad luck -- meaning you didn't mine as many
 blocks as you should have for the hashrate
 you produced.
In that case you did the work for 102 blocks
 but were rewarded 100 blocks.
Over time, let's say you earned 1000 blocks,
 but a luck of 102% means you missed 20 blocks --
 this would mean persistent bad luck, which
 is a sign something is wrong with your miners.









## Blocks

Ultimately, the entire goal of Bitcoin mining
 is to find and propagate blocks.
Finding a block means finding a valid block
 whose SHA-256 hash is less than the
 current network difficulty target.
More specifically, the hash of the
 *block headers*
 must meet this difficulty.

### Block headers

A block header is composed of a small
 number of fields that when input
 into a SHA-256 will produce a
 hash that is less than the target 
 (from the network difficulty).

* **version** -- a 4-byte field used to track version, and (since [BIP-9](https://github.com/bitcoin/bips/blob/master/bip-0009.mediawiki)) is used to signal for soft forks (backwards compatible upgrades to the protocol)
* **timestamp** -- a 4-byte field containing the Unix timestamp; must be greater than the average of the previous 11-blocks and less than 2-hours past the current network-adjusted timestamp 
* **difficulty** -- a 4-byte compressed representation of the current network difficulty
* **nonce** -- 
* **previous block hash** -- 
* **merkle root** --


### Block height and weight (PoW)

...

### Block propagation

...















## ASICs

*Application-Specific Integrated Circuit* or
 [ASIC](https://en.m.wikipedia.org/wiki/Application-specific_integrated_circuit)
 is nothing new, and in Bitcoin mining
 refers to a specific chip that calculates
 [SHA-256](https://en.m.wikipedia.org/wiki/SHA-2)
 hashes (and nothing else).
However, an "ASIC" can also refer 
 to the mining device itself
 (which has hundreds
 of ASIC chips).

Initially, Bitcoin mining happened on
 CPUs, and then GPUs.
And due to economic incentives mining moved to
 [FPGA](https://en.m.wikipedia.org/wiki/Field-programmable_gate_array)
 chips and then eventually to modern ASICs.
At every step of this evolution the incentives
 are pointing to the maximum amount of
 hashrate for the minimum amount of
 electricity consumption.







## Pools

...

### Stratum

...

### PPS

...

### PPLNS

...

### Solo

...








