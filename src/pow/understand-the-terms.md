<!--
Lord Jesus Christ
Son of God
Have mercy on me, a sinner
-->

# Understand the Terms

*Mining* is perhaps the most confusing
 metaphor within all of Bitcoin.
It is perhaps better understood as 
 transaction processing, allowing
 for *final international settlement*,
 in addition to ensuring that the
 supply schedule stays on its predetermined
 course.
Unfortunately, there's no word to adequately
 describe all that, hence the circumlocutions
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
 understanding for how it all works.

 

!!! warning "work in progress"








## Hashing 

Despite what a lot of well-intentioned
 media outlets claim, Bitcoin mining does
 not involve solving complex math problems.
Bitcoin mining is actually just *hashing*.
The "proof" in *proof of work* is simply
 a hash that *proves*
 a certain amount of hashes
 were made.

!!! question "what is a hash?"

A "hash" refers to a
 [hash function](https://en.m.wikipedia.org/wiki/Hash_function),
 which is simply a function that takes
 input of any size and maps it to a 
 fixed-sized output.
Typically a "hash" refers to the output of
 a hash function.
A good hash function should be deterministic,
 uniformly distributed output, and non-reversable.

The output set of a hash function can be
 small (useful for data indexing) or
 extremely large (useful for cryptography).
Bitcoin mining uses SHA-256.


### SHA-256

[SHA-256](https://en.m.wikipedia.org/wiki/SHA-2)
 maps any input into a number somewhere between
 0 and 2<sup>256</sup>.
This set of numbers is so large it's on the scale
 of *atoms in the universe*.
It's so astronomically large that the chance
 two human-generated
 inputs mapping to the same output (collision)
 is considered so infeasible as to be
 impossible.
And in fact there are exactly *zero* known
 collisions in SHA-256
 and finding a collision would
 likely take beyond the heat death of the
 universe to discover.

That said, what if instead of a collision,
 you just wanted to find an input whose
 hash was
 smaller than a given number?
Well, it would depend on the number.
If it's a very large number, say 
 2<sup>255</sup> then this would be trivial
 (50% of all inputs would do it, basically
 a coin flip).
But if it was a very small number, then it
 would be extremely difficult to find *any*
 input that produced a hash that was smaller.

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








