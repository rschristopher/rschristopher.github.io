# Level 3: Small Farms

A mining farm is a dedicated operation to produce and harvest hashrate -- transforming raw electricity into computational power that secures Bitcoin's network. With a mining farm, you convert energy into hashrate, enforcing the Bitcoin's rules, and claim a larger stake in the zero-sum game of proof-of-work hashing.




---

## Getting Started

Build a small farm with 5-20 large ASIC miners, targeting 1-5 PH/s total hashrate. Focus on high-efficiency models for a setup in a dedicated space with affordable power.

Potential models (as of July 2025)

- [Bitmain Antminer S21](https://shop.bitmain.com/) (200 TH/s, 3500W)
- [Canaan Avalon A15](https://canaan.io/) (194 TH/s, 3600W)
- [Auradine AD250](https://auradine.com/) (250 TH/s, 3800W)
- [Teraflux AH3880](https://terawulf.com/) (380 TH/s, 4500W hydro-cooled)

These units require industrial-grade infrastructure; prioritize ventilation, noise mitigation, and stable power.

!!! warning "Software for Farm Management"
    Managing a small farm of ASICs demands custom software for monitoring and control -- avoid proprietary tools in favor of open-source scripts. Without it, handling multiple rigs becomes chaotic. Comsider the following features:
    
    - miner config -- automatically set the stratum URL and user on each miner. Additionally set network information if needed.
    - health checks -- track miner health, hashrate, and logs (calling each miner's API).
    - curtailment -- control the power mode. All miners can be put to sleep, and many support a low power mode in addition to the default.



---

## Power and Site Requirements

Small farms move beyond toys -- large ASICs consume lots of power and produce extreme heat and noise, rendering garages or desktops unsuitable. Secure a dedicated site like a warehouse or a shed with commercial power and cooling.

Key requirements:

- **Power**: Lock in low-cost electricity (under $0.05/kWh; seek regions like Texas or Iceland). Use high-efficiency PSUs and PDUs; monitor consumption to prevent overloads or skyrocketing bills.
- **Cooling**: Implement AC, exhaust systems, or immersion to maintain <40°C; heat buildup kills efficiency and hardware.
- **Site**: Wire for 220V+ circuits, surge protection, and rack space. Noise (70-90 dB) needs isolation; comply with local regs for energy or emissions, possibly requiring permits.
- **Maintenance**: Equip with dust filters, firmware tools, and safety measures like fire suppression; farms run hot, so plan for regular upkeep.

Affordable power is the farm's lifeblood -- source it wisely to turn electricity into sustainable hashrate.




---

## Why Small Farms?

Small farms solidify solo sovereignty -- scaled hashrate decentralizes Bitcoin. You can control block templates, prioritize transactions, and bolster resilience against attacks.

Commit to your farm: it empowers the protocol, protects your assets through amplified work, and defies a fiat mindset (of debt slavery). A small mining farm is your path to sovereignty.




---

Advance to [Level 4](level-4.md) with your own atratum server (your own private pool).






