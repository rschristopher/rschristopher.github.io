# Level 2: Lottery Mining

Run a small ASIC miner pointed at a public solo stratum server, competing for entire block rewards with minuscule odds. This entry-level participation lets you contribute to Bitcoin's security, experience proof-of-work, and start reducing reliance on third-party miners -- bringing you towards true sovereignty.




---

## Getting Started

Choose a low-power, affordable ASIC miner suitable for home solo mining. The Bitaxe Gamma is a popular option; visit the official site at [bitaxe.org](https://bitaxe.org/) or buy from [bitaxeshop.com](https://www.bitaxeshop.com/en/).

Alternatives include:

- [Avalon Nano 3S](https://mineshop.eu/) (~6 TH/s)
- [NerdQaxe++](https://solosatoshi.com/) (~4.8 TH/s)

These devices draw minimal electricity and are plug-and-play.

!!! info "Setup Instructions"
    1. Power on the ASIC miner and connect to its initial interface (often via WiFi hotspot or USB).
    2. Configure network settings to join your home WiFi (or Ethernet).
    3. Enter solo pool details in the mining software/interface,
        1. URL: `stratum+tcp://solo.ckpool.org:3333`
        2. username: your Bitcoin address
    4. Save changes, reboot the device, and monitor hashing performance via the built-in dashboard or pool stats.

No full node required; the stratum server manages work and submissions. Consider alternative solo pools such as `public-pool.io`.




---

## Stratum Protocol

ASIC miners communicate block templates via the Stratum protocol, which replaced the outdated getwork in 2012. It uses a client-server model where your miner (client) connects to a stratum server to receive jobs and submit proof-of-work shares, all via JSON-RPC calls over TCP for low-latency efficiency.

The disadvantages of Stratum are numerous. It's an ASCII protocol sending binary data in hex, and with inconsistent byte ordering. There's no encryption and it's vulnerable to man-in-the-middle atracks.

While Stratum is criticized for closed development and displacing more open standards like `getblocktemplate`, it's a functional protocol -- all miners rely on it for its simplicity and efficiency, with no widespread shift in sight despite its flaws. Ultimately, it is how the ASIC chips themselves operate.

!!! warning "Failures of Stratum V2"
    Despite promises of decentralization and miner empowerment, Stratum V2 adoption remains near-zero years after launch. Miners prioritize reliability over untested and unnecessarily complicated features, exposing core devs' tendency to bikeshed while ignoring the grind of actual proof-of-work hashing. Sovereignty thrives on proven tools -- stick to V1 and push for real improvements through participation.




---

## Probabilities and Poisson

Bitcoin mining is like playing the ultimate cosmic lottery, where every hash is a ticket in a game ruled by Poisson distributions -- those quirky math models for rare, random events like shooting stars or your phone buzzing at 3 AM. Imagine events happening at an average rate but with wild timing: long stretches of nothing, then bam, a flurry out of nowhere. No memory, no patterns, just pure chance.

Your hashes are the tickets, each scratching for that golden header whose sha256d beats the network target. The network difficulty clocks in at 126.27 trillion as of July 2025, making it insanely tough, and with a global hashrate humming at ~939 EH/s (that's 939 quintillion hashes per second!), your little 6 TH/s miner is basically whispering in a hurricane.

Enter the Poisson distribution to crunch the numbers: your expected blocks (λ) = (your hashrate / network hashrate) × blocks per period. Over a year (~52,560 blocks), λ is about 0.00007 for a Bitaxe -- tiny odds! Probability of zero blocks? Almost certain. Odds of snagging at least one? Roughly 0.007%, or 1 in 14,286 years. Talk about impossible dreams! But that's the thrill: epic dry spells build character, and if luck hits, it's jackpot city.

Meanwhile, session shares at easier difficulties (say, 4 million) give mini-wins to track your grind, and the luck metric (found shares vs. expected) reveals the variance rollercoaster -- under 100% means you're hot, over means keep hashing and start praying. It's Bitcoin's chaotic heart: frustrating, exhilarating, and a reminder why those "impossible" odds keep sovereign miners plugged in, chasing that one-in-a-trillion glory.



---

## Why Solo Mining?

Solo mining is the path to true sovereignty in proof-of-work hashing -- it keeps you independent, directly contributing to Bitcoin's decentralization without intermediaries. By hashing alone, you avoid the pitfalls of centralized pools, enforcing rules and transaction validity on your (sovereign) terms, free from external control. 

Solo hashing decentralizes hashrate, combating pool dominance and enhancing network resilience. Even unrewarded, it affirms Bitcoin's permissionless truth -- bureaucrats can't fake the work, securing your sovereignty through participation.

Mining pools undermine this: they centralize hashrate, creating single points of failure vulnerable to censorship, regulations, and collapse. Block withholding attacks exemplify the risk -- malicious miners submit shares for payouts but withhold valid blocks, sabotaging the pool's revenue while profiting. This erodes trust and highlights pools' fragility in an adversarial system.

Ultimately, mining pools are not viable long-term businesses in a sound money economy. They thrive on fiat's easy money, subsidizing inefficiencies through cheap credit and inflation. In Bitcoin's hard money world, pool overhead (fees, operations) can't compete with solo efficiency; they'll dissolve as subsidies vanish, forcing hashrate back to sovereign individuals.

Embrace solo mining: it affirms Bitcoin's permissionless ethos, combats centralization, and secures your wealth through real work. Outsourcing to pools exchanges sovereignty for illusory stability -- a fiat trap that Bitcoin rejects.

!!! warning "Avoid FPPS and Mining Pools"
    Full Pay Per Share (FPPS) pools promise steady payouts, but they trade sovereignty for scraps -- centralizing hashrate and exposing you to operator risks like withholding or censorship. Never join; True sovereignty means embracing variance, not outsourcing your hashes.



---

Advance to [Level 3](level-3.md): scale to a small farm, maintaining solo operations for steadier variance while upholding independence.









