<!--

Lord Jesus Christ
Son of the living God
Have mercy on me, a sinner

-->

# Understand the Terms

While saving in Bitcoin involves new concepts that don't otherwise exist in traditional economic models (such as a cryptographic ledger or UTXO sets), Bitcoin commerce is well aligned with traditional economics. The goal is simply to make and receive payments. For businesses, it means selling goods and services -- getting paid in Bitcoin. For customers, it means paying for goods and services -- as easily as you would pay in cash.

If you're coming from a fiat mindset, that is, commerce within fiat currency, Bitcoin commerce might seem odd at first, but you'll find it similar to *traditional* (pre-fiat) business models. This is because most of those traditional business models developed under a gold standard (a sound money standard).

As a result, you may find commerce under a Bitcoin standard to be intuitive and simple, almost naive, with none of the complex financialization one finds in modern fiat. There are however some new concepts, in particular new technical concepts that are worth understanding. We will describe and help demystify these new concepts, especially those necessary for understanding commerce in Bitcoin.




---

## On-Chain Transactions
Bitcoin's base layer handles direct peer-to-peer transfers recorded on the blockchain. These provide final, immutable settlement -- final international settlement -- but come with trade-offs: fees can be high for small amounts, and confirmations take time (about 10 minutes per block). Suitable for large transfers or channel settlements, but inefficient for frequent micropayments, necessitating Layer-2 solutions.




---

## Multisig Addresses
Addresses requiring multiple signatures to spend funds, often 2-of-2 for shared control in channels or wallets. Enhances security by needing consensus from parties, used in payment channels to prevent unilateral spends.





---

## Time-Locks
Mechanisms to delay spending: CheckLockTimeVerify (CLTV) sets an absolute future time or block height; CheckSequenceVerify (CSV) enforces relative delays after confirmation. Essential for safe channel updates, allowing time to contest invalid states.




---

## Hash Values and Secrets
Cryptographic tools where a secret (unguessable number string) hashes to a fixed output. Used in Hashed Time-Locked Contracts (HTLCs) for atomic routing: payments succeed only if the secret is revealed, ensuring secure, conditional transfers across channels.




---

## Bearer Instruments (e.g., OpenDime)
Physical tokens like OpenDime act as "digital cash" -- load Bitcoin, seal, and transfer without on-chain broadcasts. Verified via USB, they enable private, local trades but require eventual on-chain settlement for reuse.




---

## Wallets
- **Custodial Wallets**: Third-party services (e.g., exchanges) hold keys and manage funds. Easy for beginners but vulnerable to censorship or loss, as users don't control assets.
- **Non-Custodial Wallets**: Users hold keys (e.g., Electrum, Sparrow). Provide full control and sovereignty, supporting hierarchical deterministic (HD) setups for unlimited addresses without reuse risks.
- **Cold Storage**: Offline wallets for long-term holding, minimizing online exposure while allowing secure receives.




---

## Payment Channels
Off-chain setups for repeated transactions between parties. Funded via an on-chain multisig "opening transaction," updated with unbroadcast "commitment transactions" using time-locks and secrets to deter cheating. Bidirectional versions enable back-and-forth payments, forming the basis for networks like Lightning.




---

## Point-of-Sale (POS) Systems
Tools like BTCPay Server for merchants to accept Bitcoin/Lightning payments, routing directly to wallets or cold storage. Enable sovereign commerce by avoiding intermediaries, with integration for invoices and automatic settlements.




---

## Full Nodes
Software (e.g., Bitcoin Knots) that validates the entire blockchain independently. Essential for sovereignty: verifies rules, transactions, and balances without trusting others. Merchants or liquidity providers run nodes for reliable network participation.




---

## Lightning Network
Lightning is a Bitcoin payment network (proposed in this 2016 [whitepaper](https://lightning.network/lightning-network-paper.pdf)). It allows virtually unlimited scaling of Bitcoin payments and is built on top of the Bitcoin network as a second-layer network. In other words, the base-layer network has no visibility into Lightning payments but only provides final settlement of Lightning channels.

In effect, Lightning is a network of channels between peer-to-peer Bitcoin nodes. Each channel provides liquidity between two nodes: a balance on each side. Lightning routes payments through the channels, allowing users anywhere in the network to send and receive Bitcoin anywhere else on the network (provided there is sufficient liquidity in the channels).

There are plenty of [great](https://medium.com/softblocks/lightning-network-in-depth-part-1-payment-channels-b943607950dd) [resources](https://bitcoinmagazine.com/technical/understanding-the-lightning-network-part-building-a-bidirectional-payment-channel-1464710791) to understand the implementation details of the Lightning Network, and while still very early, it has seen widespread early adoption.

<figure markdown>
  [![lightning geo map](/images/lightning-map.png)](https://explorer.acinq.co/)
  <figcaption>Lightning Network Map -- each line is a channel</figcaption>
</figure>

### Public Channels
The above is a map of all *public* Lightning channels. A public channel is simply a routable channel connected to the broader Lightning network. This is a peer-to-peer network that routes payments anywhere. Another way to think about it, these are the channels that are not otherwise hidden. Public channels (and nodes) are discoverable on sites such as [1ml](https://1ml.com/), [amboss.space](https://amboss.space/), or through LnRouter.

<figure markdown>
  [![lightning network explorer](/images/lightning-map-lnrouter.png)](https://lnrouter.app/graph)
  <figcaption>LnRouter -- exploring public nodes</figcaption>
</figure>

Importantly, anyone can use the Lightning Network, and anyone with a node (a Bitcoin full node with Lightning software) can join. To join, simply request to open a channel with one of the nodes on the network. The moment you have at least one open channel, your node will be discoverable by others. Additionally, a well-connected node could potentially earn sats by routing payments.

### Private Channels
A private channel is simply a channel between two nodes that is not otherwise discoverable. Private channels (and entire private networks) can easily be created for situations where all participants wish to remain private. For example, payments between nation states or business entities wishing to remain private.

Importantly, maintaining privacy requires an implicit trust amongst all participants in a private network. Should one of the nodes create a routable channel to the public Lightning Network, this would (depending on the software and configuration) make this formerly private network part of the public network.

### Liquidity and Routing
Liquidity is the available balance in channels: outbound for sending, inbound for receiving. Insufficient liquidity can block routes. Routing uses interconnected channels and HTLCs for secure, atomic paths—payments complete fully or fail. Challenges include balancing channels and fees; watchtowers monitor for fraud during offline periods.

### Lightning Service Providers (LSPs)
Services that provide inbound liquidity by opening channels to users, often for a fee. LSPs (e.g., via wallets like Phoenix) simplify onboarding for newcomers, enabling receives without manual channel management, while maintaining non-custodial control.




