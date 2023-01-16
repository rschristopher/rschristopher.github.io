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

Despite what is often claimed,
 Bitcoin mining does
 not involve solving complex math problems.
Bitcoin mining is just *hashing*.
The "proof" in *proof of work* is simply
 a hash that *proves*
 a certain amount of hashinh (that is, *work*)
 was done.

!!! question "what is a hash?"

A "hash" refers to a
 [hash function](https://en.m.wikipedia.org/wiki/Hash_function),
 which is a function that takes
 input of any size and maps it to a 
 fixed-sized output.
Typically a "hash" refers to the output of
 a hash function.
A good hash function should be deterministic,
 with uniformly distributed output,
 and non-reversable.

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
 hashed output was
 smaller than a target number?
In other, the hashed output just so happened
 to be a smaller than the target.
If it's a very large target, say 
 2<sup>255</sup> then this would be trivial
 (50% of all inputs would produce
 a hashed output smaller than that, basically
 a coin toss).
But if it was a very small target, then it
 would be extremely difficult to find *any*
 input that produced a hashed output
 that was smaller.

???+ example "For example"
    Let's look at some example SHA-256 outputs,
    
    `1` => `6B86B273FF34FCE19D6B804EFF5A3F5747ADA4EAA22F1D49C01E52DDB7875B4B`
    
    `2` => `D4735E3A265E16EEE03F59718B9B5D03019C07D8B6C51F90DA3A666EEC13AB35`
    
    `3` => `4E07408562BEDB8B60CE05C1DECFE3AD16B72230967DE01F640B7E4729B49FCE`
    
    `three` => `8B5B9DB0C13DB24256C829AA364AA90C6D2EBA318B9232A4AB9313B954D3555F`
    
    `Three` => `926F52D1C1E19C0C58A7D39BF234A0D239352F5ACFA26C73989D9C3845614999`
    
    `Three?` => `F9DCE11BE6E27EA81231A766A4210EAA05D51E4C5F5F79C8FD0133274201D543`
    
    Notice that small changes in the input
    produce radically different outputs.
    Each output is a hexadecimal representation
    of a number (that is, base-16).
    In fact, there's no way to predict
    where in the 2<sup>256</sup> output space
    a given input will land (other than to
    perform the SHA-256).
    
    Also notice that none of these output
    numbers are particularly small.
    For comparison, let's look at the
    SHA-256 output of the Bitcoin genesis block,
    
    [`00000000839a8e6886ab5951d76f411475428afc90947ee320161bbf18eb6048`](https://blockstream.info/block/00000000839a8e6886ab5951d76f411475428afc90947ee320161bbf18eb6048)
    

This simple observation is the basis
 for Bitcoin mining.
In other words, finding input whose hash
 is sufficiently small can only be done
 through a brute force search;
 and thus if the goal is to find a specific input
 whose output is smaller than a given number,
 this would *prove* a certain amount of *work*
 was done.

???+ info "Other hash functions"
    In addition to SHA-256, Bitcoin makes use of
    other hash functions; in particular 
    [RIPEMD-160](https://en.m.wikipedia.org/wiki/RIPEMD),
    used in conjunction with SHA-256 to generate
    Bitcoin addresses.

### Merkle Root

...

### Hashrate

...







## Difficulty

Given a target number from 0 to 2<sup>256</sup>,
 finding an input whose SHA-256 hash is smaller
 than that target requires work.
And the smaller the target, the more difficult
 it is to find, the more work required.
In fact, Bitcoin uses a metric called
 *difficulty*, to describe the "work"
 in *proof of work*; in other words,
 a measure of how difficult it
 was to find a block.

### Network Difficulty

...

### Session Difficulty

...

### Share Difficulty

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







## Blocks

...

### Block headers

...

### Block height (PoW)

...

### Block propagation

...











## Luck

...






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








