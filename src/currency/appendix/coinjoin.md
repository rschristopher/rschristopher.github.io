# Appendix 2: CoinJoin

CoinJoin is a privacy-enhancing technique for Bitcoin transactions, allowing multiple users to combine their payments into a single collaborative transaction. Proposed by Gregory Maxwell in 2013, it breaks the heuristic link between inputs and outputs by mixing funds, making it harder for chain analysis to trace ownership. It's non-custodial -- users retain control of their keys and sign only their parts -- and relies on a coordinator to facilitate without holding funds. This fosters fungibility, countering surveillance in Bitcoin's transparent ledger.

This appendix explains CoinJoin technically, from basics to advanced, with examples of transaction structures and processes.



---

## Basic Concepts

CoinJoin operates by aggregating inputs from multiple participants into one transaction with multiple outputs, ideally of equal denominations to maximize mixing. The goal is to obscure which input owns which output, defeating common ownership heuristics.

- **Coordinator**: A server or peer that organizes the mix, collecting blinded inputs/outputs and constructing the transaction. Users unblind and sign only after verification.
- **Denomination**: Fixed output amounts (e.g., 0.1 BTC) to create indistinguishable coins.
- **Blinding**: Users blind their outputs (using Chaumian signatures in some implementations) to prevent the coordinator from linking inputs to outputs.
- **Atomicity**: The transaction either fully succeeds or fails; no partial execution to avoid theft.

CoinJoin doesn't create new coins but reshuffles existing ones for privacy.




---

## How It Works

The process involves several steps to ensure trustlessness:

1. **Announcement**: Users signal interest to the coordinator, specifying amounts and denominations.
2. **Input Registration**: Participants provide inputs (UTXOs) and blinded output addresses.
3. **Transaction Construction**: Coordinator builds the joint transaction with mixed inputs/outputs.
4. **Blame Round**: If invalid, identify and exclude faulty participants.
5. **Signing**: Users receive the tx, unblind, verify (no changes, their outputs present), and sign their inputs.
6. **Broadcast**: Coordinator or users broadcast the fully signed transaction.

Success requires all signatures; failure reverts without loss.



---

## Advanced Features

Implementations enhance CoinJoin for usability and security:

- **Whirlpool (Samourai)**: Zero-link mixes with fixed denominations; post-mix spending tools to avoid re-linking.
- **Taproot Integration**: Schnorr signatures enable larger, more efficient mixes with better privacy.
- **Defenses**: Against sybil attacks (fees, proofs), DoS (blame mechanisms), and analysis (equal outputs, multiple rounds).

Future: CISA for cross-input aggregation, reducing fees.

!!! warning "Samourai Whirlpool"
    Samourai Wallet's developers were arrested in 2024. They are mounting a  [legal defense](https://blog.ronindojo.io/samourai-defense-fund/).

???+ example "Simple CoinJoin Transaction Structure"
    Three users (A, B, C) each contribute 0.1 BTC inputs, mixing into three 0.1 BTC outputs (plus change if uneven).
    ```
    Inputs:
    - A: 0.1 BTC (UTXO1)
    - B: 0.1 BTC (UTXO2)
    - C: 0.1 BTC (UTXO3)

    Outputs:
    - 0.1 BTC to new addr X (could be A's, B's, or C's)
    - 0.1 BTC to new addr Y (could be A's, B's, or C's)
    - 0.1 BTC to new addr Z (could be A's, B's, or C's)
    ```
    Observers can't link which input owns which output.

???+ example "CoinJoin Process (Simplified)"
    Users connect to coordinator, submit blinded outputs.
    ```
    1. User blinds output: hash(pubkey + blinding factor)
    2. Coordinator signs blinded hashes.
    3. User unblinds signature, verifies tx with equal 0.1 BTC outputs.
    4. Signs input if valid.
    ```
    Ensures coordinator can't steal or link.

---

Challenges include coordinator centralization (mitigated by decentralization in JoinMarket), analysis attacks (countered by multiple mixes), and fees (reduced via Taproot). Regulatory scrutiny (e.g., on mixers) persists, but non-custodial nature protects users.

Future: Script enhancements (covenants) for efficient mixes, L2 integration for scaling privacy.




