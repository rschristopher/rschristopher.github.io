# Level 6: International Lightning

Scaling beyond local merchant networks, international Lightning involves operating a distributed Lightning hub across multiple geographic regions, effectively acting as a sovereign Lightning Service Provider (LSP). Using node software like LND or CLN on geographically distributed full nodes, you manage a network of channels, providing liquidity and onboarding tools for international partners, employees, and/or contractors. For example, a global business might run nodes in Europe, Asia, and the Americas, acting as a sovereign international payment system.

This assumes an international business with multiple locations, focusing on distributed node management, liquidity provisioning, and simple onboarding for non-custodial wallets. It demands expertise in multi-region setup and integration.




---

## How It Works

- **Setup**: Deploy Lightning node software (e.g., LND or CLN) on multiple Bitcoin full nodes across multiple geographic regions (e.g., one in the US, one in Europe, one in Asia) for redundancy and low-latency routing.
- **Channels**: Establish and fund a network of Lightning channels across your nodes, peering strategically with international hubs. Integrate with external LSPs (e.g., ACINQ or Lightning Labs Pool) for supplemental liquidity, ensuring non-custodial access where you provide funds and partners control keys.
- **Payments**: Facilitate global sends/receives, and onboard employees/contractors with simple non-custodial wallets (e.g., provide seed setup guidance and initial channel liquidity), enabling instant Lightning transfers.
- **Examples**: A multinational firm runs distributed nodes to pay contractors in Asia via integrated LSP channels, or a dynasty offers staff non-custodial wallets for seamless international remittances.




---

## Strengths

- **Distributed Resilience**: Multiple nodes across regions ensure uptime and efficient global routing, reducing single-point failures.
- **Sovereign Scaling**: Act as an LSP for your network while integrating external ones, maintaining non-custodial control for all participants.
- **Onboarding Ease**: Provides simple tools for employees/contractors to join with their own wallets, fostering a sovereign payment ecosystem.




---

## Weaknesses

- **High Complexity**: Managing multi-region nodes, peering, and LSP integrations requires advanced technical skills and infrastructure.
- **Capital and Costs**: Funding channels across nodes ties up Bitcoin, plus potential hardware expenses.
- **Maintenance Overhead**: Constant rebalancing, monitoring, and updates for distributed nodes; geographic diversity adds coordination challenges.
- **Regulatory Considerations**: International operations may face varying laws, though Bitcoin's decentralization helps mitigate risks.




---

## Choosing a Reputable Solution

Focus on Bitcoin-only, open-source Lightning implementations for distributed operations. Avoid proprietary or multi-asset tools. Key criteria:

- **Non-Custodial**: Supports key control for all network participants, including onboarded users.
- **Open-Source**: Transparent code for security and customizability (e.g., LND’s audited codebase).
- **Bitcoin-Only**: Avoid complexity and vulnerabilities of “crypto” platforms.
- **Multi-Node Support**: Tools for distributed management, LSP integration, and easy onboarding.



---

## Recommended Solutions

- [LND (Lightning Network Daemon)](https://lightning.network/): Go-based implementation for robust multi-node operations, ideal for international liquidity and peering.
- [CLN (Core Lightning)](https://blockstream.com/lightning/): Flexible, modular Lightning node software, supporting advanced LSP integrations for global merchant networks.



---

International Lightning lets you operate a distributed, sovereign LSP for global commerce, but its demands foreshadow simpler innovations. Next, advance to [Level 7](level-7.md) for barrier-free, universal Bitcoin payments.


