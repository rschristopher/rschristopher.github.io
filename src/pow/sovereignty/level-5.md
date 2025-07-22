# Level 5: Enterprise Scaling

Scale your mining farm to enterprise levels, pushing hashrate to find blocks every 2-3 months. This expansion turns your operation into a dominant force, converting massive energy into consistent hashrate, earning Bitcoin while maintaining full sovereignty over your proof-of-work hashrate.




---

## Setup

Expand your [Level 4](level-4.md) farm with 50-100 large ASIC miners in an industrial container. Use the same efficient models as before, but deploy at volume.

Requirements:

- Industrial site: data center or custom build with 1-2 MW power draw
- Low-cost electricity
- Dedicated full node: [Bitcoin Knots](https://bitcoinknots.org/)
- Stratum server: [CKPool](https://bitbucket.org/ckpool/src/master/) or [public-pool](https://github.com/benjamin-wilson/public-pool)
- Container with cooling system with space for 50-100 ASIC miners, e.g., [Avalon Box](https://shop.canaan.io/products/products-avalon-air-cooling-mining-boxvariantsid10191), or check options from [power-mining](https://www.powermining.io/)





---

## Scaling

With only 100 ASIC miners a single physical server (NUC) running a dedicated full node and stratum server should be more than sufficient, however, you may want to consider a backup server for fault tolerance. Each miner can support 3 stratum URLs, and it's recommended to configure them with a primary, backup, and a tertiary backup, such as one of the hosted solo pools from [Level 2](level-2.md).

At 50 PH/s against ~935 EH/s network hashrate and 126.27T difficulty (July 2025), expect λ ≈ 2.81 blocks/year (~ one every 4.3 months). Double to 100 PH/s for λ ≈ 5.62 (~ every 2.2 months). Poisson variance adds unpredictability, averaging 2-3 months per block.

Maximize uptime with automated maintenance, power redundancy, and custom scripts (e.g., Python script for API monitoring) to oversee miners and detect issues swiftly.

!!! info "Repair Bench"
    At this scale, you'll want a separate repair bench, along with a few miners ready to be deployed to replace any bad miners. There may be fan issues, power supply issues, control board issues, or the more costly hashboard issues.




---

## Monitoring Shares

Continue logging high-difficulty shares to track farm health -- this will independently prove your 50-100 PH/s hashrate.

Activate logging in your stratum config and set an appropriately high session difficulty (high enough to avoid massive amounts of data, and low enough to reliably monitor miner hashrate; record shares, times, and difficulties. Analyze with Python scripts for effective hashrate (actual vs. expected).

Most miner APIs can also ptovide temperature, fan speed, estimated power usage, and other useful metrics worth tracking. You may want to leverage a time-series database (Prometheus or InfluxDB), and integrate with dashboarding tools (like Grafana).




---

## Why Enterprise?

Enterprise scaling yields a handful of blocks per-year -- producing Bitcoin straight from your farm, free from KYC taint or exchange risks. These blocks are pure sovereign blocks.

Finding blocks every 2-3 months creates a steady sovereign supply, shielding against volatility and affirming independence in centralized finance's shadow. It's proof-of-work's zenith, forging energy into untouchable wealth.

Embrace it: enterprise scaling delivers consistent sovereign blocks, where you control what goes in to the block (and what doesn't).





---

Advance to [Level 6](level-6.md) for industrial scale, finding blocks weekly and even daily.







