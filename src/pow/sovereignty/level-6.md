# Level 6: Industrial Scale

Industrial scale is any mining site over 10 MW, deploying thousands of ASIC miners to achieve high hashrate for frequent blocks. These are typically organized in custom built containers housing hundreds of miners each, allowing modular growth, and requiring intensive power, cooling, and maintenance.

At this stage, a mining site will directly inpact the network difficulty, which will adjust to maintain ~10 minute per block, no matter how much hashrate you bring online.



---

## Setup

Deploy multiple mining containers at a 10+ MW site, each with hundreds of ASIC miners (see [Level 3](level-3.md)). If we assume these miners are averaging 200 TH/s and 3500 Watts per unit, this yields ~2,857 miners total with at least ~571 PH/s.

Custom containers:

- [Mineshop Mining Container](https://mineshop.eu/mining-containers/) (up to 168 S21 miners, advanced airflow)
- [QuoteColo Custom Builds](https://www.quotecolo.com/bitcoin-miner-container/) (700-miner units, 1.9MW load)
- ... please and more

Requirements:

- Facilities: data centers or custom plants with 10+ MW capacity
- Multiple full nodes: [Bitcoin Knots](https://bitcoinknots.org/), at least 2 nodes, well-peered, with large `dbcache` for fast block propagation.
- Stratum server cluster: [CKPool](https://bitbucket.org/ckolivas/ckpool/src/master/) or [public-pool](https://github.com/benjamin-wilson/public-pool), 3-5 servers for load balancing
- Staff... for maintenance, electrical work, security





---

## Power and Scaling

A 10 MW baseline supports ~2,857 miners at 3500W each. At ~571 PH/s (~935 EH/s network, 126.27T difficulty, July 2025), expect λ ≈ 32 blocks/year (~1 every 11 days).

This will scale linearly:

- 10 MW site (~2,857 miners, ~571 PH/s) yields λ ≈ 32 blocks/year (~1 every 11 days)
- 50 MW site (~14,286 miners, ~2.86 EH/s) yields λ ≈ 160 (~3 weekly).
- 100 MW site ...

Poisson variance means clusters or gaps; scale tightens it sonewhat.

!!! info "Repair and Redundancy"
    On-site repair centers with spares (up to 10% fleet) for hot swaps. Train teams for fan/PSU/control board/hashboard fixes; downtime loses blocks.



---

## Monitoring Shares

Log high-difficulty shares to verify farm health -- however at industrial scale we have industrial data demands, share volume is large and you may consider sampling or investing in large scale data solutions. Consider time-series database such as Prometheus or InfluxDB, and Grafana for visualization.

At this scale, large data will be invaluable to troubleshoot and diagnose issues as they artive.



---

## Why Industrial Scale?

Industrial scale guarantees blocks -- weekly/daily sovereign blocks from your site(s), untainted. You are effectively the sovereign of your own transactions, making it impossible for anyone to censor your transactions (as you can define block templates for a guaranteed block).

This builds a sovereign reserve, defying volatility and all central planners. As your hashrate raises network difficulty, it hardens Bitcoin while rewarding efficiency.

Embrace it: industrial hashing forges wealth through dominance.




---

Advance to [Level 7](level-7.md) to lead the way into the inevitable future of proof-of-work hashing.




