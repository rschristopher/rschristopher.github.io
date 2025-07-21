# Level 7: Inevitable Future

Bitcoin as a universal currency will enable billions of people to buy and sell as easily as they do with cash, no custodians, no intermediaries -- a seamless, privacy-preserving system where everyday users transact, all backed by Bitcoin's security. Imagine an employee working for a sovereign business getting paid sats directly into a non-custodial Lightning wallet like Zeus or Phoenix -- the wallet handles everything, surviving channel closures through off-chain notes or automatic swaps, without the user ever needing on-chain transactions. This fulfills Bitcoin's promise of sound money for all, where most people save and spend in non-custodial wallets, without running nodes or balancing channels, instead just working and stacking sats.

Bitcoin's existing adoption demands inevitable advancements as a currency, solving the "last-mile" problem (providing inbound liquidity to new users) and ensuring wallets remain non-custodial and resilient to closures. Missing pieces like better covenants and federated models will be developed, making Bitcoin the default currency.




---

## How It Will Work

- **Setup**: Users install a simple non-custodial wallet (e.g., future versions of Phoenix or Zeus), generating a seed phrase for backup, or leveraging a secure and private account from a trusted family member. No channel funding required — they simply connect to an employer's LSP or mint for automatic liquidity.
- **Payments**: Receive sats from work or direct sales, all by sharing a wallet invoice. Send and receive as easily as cash.
- **Sovereignty**: A motivated individual saves enough Bitcoin to justify an on-chain transaction, taking their first step into becoming a sovereign.





---

## Strengths

- **Simplicity**: Users get paid and spend without complexity — LSPs/mints abstract channels, wallets survive closures via ecash or swaps.
- **Non-Custodial Resilience**: Funds remain accessible and spendable even if channels close, with user-held keys ensuring true control.
- **Universal Access**: Enables saving/spending in layer 2+ wallets for most, scaling to billions without nodes or liquidity management concerns.






---

## Current Gaps

- **Inbound Liquidity**: New users can't receive without channels; LSPs help but are often semi-custodial — there is a lack of non-custodial LSP standards.
- **Channel Closures**: Force-closing a channel in high-fee environments risk funds becoming inaccessible to normal users; splicing and "justice transactions" mitigate, but not seamless for all.
- **Privacy Leaks**: Routing metadata exposes info; blinded paths needed for full anonymity.
- **User Experience**: Many wallets are semi-custodial; true non-custodial wallets like Phoenix/Breez exist but require education — and are definitely not intuitive.




---

## Current Proposals

Future protocols will enable simple, resilient non-custodial wallets:

- [Channel Splicing](https://bitcoinops.org/en/topics/splicing/): Add/remove funds without closing channels, reducing on-chain needs and surviving closures gracefully. 
- [Fedimint](https://fedimint.org/)/[Cashu](https://cashu.space/): Mints issue blinded notes backed by BTC; users hold ecash in wallets, spendable off-chain, independent of closures — federated for trust minimization.
- [Ark](https://arkdev.info/)/[Statechains](https://bitcoinops.org/en/topics/statechains/): Off-chain scaling with shared UTXOs or transferable ownership; no user channels, funds survive via unilateral exits or off-chain transfers.
- Advanced LSPs: Non-custodial LSPs (e.g., [ACINQ](https://acinq.co/)) provide liquidity swaps; ensuring payments flow with minimal user intervention.





---

Bitcoin is best understood as the inevitable global currency, where billions transact non-custodially without complexity, leaving the complexity to the true financial sovereigns.









