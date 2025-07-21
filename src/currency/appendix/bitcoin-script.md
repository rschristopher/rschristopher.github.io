# Appendix 1: Bitcoin Script

Bitcoin Script is a stack-based scripting language used in Bitcoin transactions to define the conditions under which outputs (UTXOs) can be spent. It's not Turing-complete (to prevent loops and ensure predictability), making it secure for a decentralized network. Scripts are executed by Bitcoin nodes to validate spends, with the stack processing operations (opcodes) from left to right. Beginners can think of it as a simple lock-and-key system: the scriptPubKey (locking script) in an output sets the puzzle, and the scriptSig (unlocking script) in the input solves it.

This appendix progresses from basics to advanced concepts, with examples demonstrating key features.

---

## Basic Concepts

Bitcoin Script operates on a stack (last-in, first-out data structure). Opcodes manipulate the stack: pushing data, performing arithmetic, or verifying conditions. A script succeeds if the final stack top is non-zero (true) and no errors occur.

- **Data Types**: Numbers (integers), booleans (true/false), byte arrays.
- **Common Opcodes**:
  - Data Push: `OP_PUSHBYTES_<n>` or shortcuts like `OP_1` (pushes 1).
  - Arithmetic: `OP_ADD`, `OP_SUB`, `OP_MUL`.
  - Crypto: `OP_HASH160` (RIPEMD-160 of SHA-256), `OP_CHECKSIG` (verifies signature).
  - Control: `OP_IF`/`OP_ELSE`/`OP_ENDIF`, `OP_EQUALVERIFY`.

Scripts are limited to prevent abuse (e.g., max 10,000 bytes pre-Taproot).

???+ example "Simple Equality Check"
    This script checks if two numbers on the stack are equal.
    ```
    OP_2 OP_3 OP_EQUAL  // Pushes 2 and 3, checks if equal (false, script fails)
    ```
    If executed with `OP_2 OP_2 OP_EQUAL`, it succeeds.

---

## Standard Transaction Types

Bitcoin uses templates for common scripts, evolving for efficiency and privacy.

- **Pay-to-PubKey-Hash (P2PKH)**: Legacy standard; spend by providing pubkey and signature matching the hash.
- **Pay-to-Script-Hash (P2SH)**: Hides complex scripts behind a hash; redeem by revealing the script and satisfying it (e.g., for multisig).
- **SegWit (P2WPKH/P2WSH)**: Improves scalability; witnesses (sigs) separated, reducing fees.
- **Taproot (P2TR)**: Combines key/spend paths; Schnorr sigs for efficiency/privacy.

???+ example "P2PKH Locking Script"
    Locks to a pubkey hash; spender must provide matching pubkey and sig.
    ```
    OP_DUP OP_HASH160 <pubkeyHash> OP_EQUALVERIFY OP_CHECKSIG
    ```

???+ example "P2SH Redeem Script (2-of-3 Multisig)"
    Redeem script for 2-of-3 multisig, hashed in P2SH output.
    ```
    OP_2 <pubkey1> <pubkey2> <pubkey3> OP_3 OP_CHECKMULTISIG
    ```

---

## Advanced Features

As Bitcoin evolves, Script gains sophistication for complex conditions.

- **Multisig**: Requires m-of-n signatures (e.g., `OP_CHECKMULTISIG`).
- **Timelocks**: `OP_CHECKLOCKTIMEVERIFY` (CLTV, absolute, e.g., after block height) or `OP_CHECKSEQUENCEVERIFY` (CSV, relative, e.g., after confirmation).
- **Hashlocks**: Locks to a hash preimage (secret); used in Lightning HTLCs.
- **Covenants**: Proposed (e.g., `OP_CHECKTEMPLATEVERIFY`); restrict spends to specific templates.
- **Taproot Enhancements**: Key aggregation with Schnorr, script trees for hidden conditions.

???+ example "Hashlock + Timelock (HTLC)"
    For atomic swaps or Lightning: spend with secret or refund after timeout.
    ```
    OP_IF OP_HASH160 <hash> OP_EQUALVERIFY OP_CHECKSIG OP_ELSE <time> OP_CHECKLOCKTIMEVERIFY OP_DROP OP_CHECKSIG OP_ENDIF
    ```

???+ example "Taproot Key Spend"
    Simple Taproot output; spend with Schnorr sig.
    ```
    OP_1 <32-byte tweaked pubkey>
    ```

---

## Challenges and Future

Script's limitations (no loops) ensure security but restrict flexibility. Soft forks add opcodes (e.g., Taproot in 2021). Future proposals like `OP_CAT` or covenants could enable advanced L2s, scaling to billions while keeping non-custodial.

For hands-on, test on regtest or signet networks.








