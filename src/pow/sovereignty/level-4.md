# Level 4: Sovereign Pool

Now that you have a dedicated space to run your mining farm, you'll want to run your own dedicated pool -- this ensures privacy as well, any found blocks will appear on the network through your full node, with no explicit evidence that your farm even exists.

You'll run your own stratum server -- a private gateway for your farm's hashrate, pulling block templates from your dedicated full node and submitting blockw without any external trust. This eliminates public server dependencies, ensuring absolute control over your operations and deepening sovereignty by internalizing the entire hashing pipeline.




---

## Setup

Host your sovereign pool on a dedicated server running open-source stratum software, paired with a dedicated full node exclusively for this purpose.

Requirements:

- Dedicated server -- a NUC (or equivalent) with 16+ GB of memory and at least 2 TB of storage (if needed you can run a pruned node).
- Fast Internet connection.
- [Bitcoin Knots](https://bitcoinknots.org/)
- Stratum server -- [CKPool](https://bitbucket.org/ckolivas/ckpool/src/master/) or [public-pool](https://github.com/benjamin-wilson/public-pool) or any trusted stratun server.

There are bundled options such as 
[Umbrel](https://umbrel.com/) or
[Start9](https://marketplace.start9.com/public-pool), either way you'll want to configure your node to be well-peered with lots of memory for `dbcache` to ensure fast block propagation.

Once everything is running, youll want to direct your miners to the server's stratum URL (e.g., `stratum+tcp://server-ip:3333`), either using your Bitcoin address as username, or configure that address in the stratum server config.




---

## Monitoring Shares

Log high-difficulty shares to independently verify your farm's hashrate -- each share is a mini proof-of-work, proving miners are performing as expected without pool reliance.

Enable share logging in your server's config (e.g., CKPool's sharelog option or public-pool.io's logging features); it records accepted/rejected shares, timestamps, and difficulties to files. You can parse these with custom scripts in python to calculate effective hashrate, as well as actual shares vs. expected based on difficulty.

This metric spots underperformers -- low share rates signal hardware issues, overheating, or config errors. Cross-reference with miner dashboards for diagnostics; consistent logging ensures your farm's health. Your share data is a gold mine of insights into your sovereign mining farm.




---

## Testnet

Occasionally, and definitely prior to mainnet deployment, test your sovereign farm on Bitcoin testnet -- the sandbox chain to confirm block finding and broadcasting without stakes. It's vital for validating end-to-end farm integrity.

Process: Spin up a testnet node (Bitcoin Knots -testnet mode), tie your stratum server to its RPC for templates/submissions. Route part of your farm to the server using a testnet address (a single ASIC will likely dominate testnet, and even a small farm will induce a 
[testnet storm](https://blog.lopp.net/the-block-storms-of-bitcoins-testnet/amp/)). Find lots of testnet blocks -- lower difficulty yields quicker results, testing template creation, share flow, block detection, and relay.

Scan node logs for `submitblock` success and confirm on [explorers](https://mempool.space/testnet). Mine a few blocks to iron out kinks. This proves reliability, safeguarding your sovereign chain.




---

## Why Sovereign Pool?

A sovereign pool cements control -- you own the interface between farm and node, eliminating risks like downtime or manipulation. It enables template customization, fast block submission, and full hashrate transparency.

FPPS pools defeat sovereignty; your pool keeps everything in-house, resisting attacks and centralization. In Bitcoin's ecosystem, this self-reliance scales sovereignty.

Embrace it: full-stack hashing secures your wealth and the network through unyielding independence.





---

At this scale, you will only have enough hashrate to find a block every 3-5 years. No easy task, but advance to [Level 5](level-5.md) for enterprise scale.




