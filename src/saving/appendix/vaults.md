# Appendix 4: Covenant Vaults

Bitcoin's evolution continues to prioritize security and sovereignty, with proposals like covenant vaults introducing programmable restrictions on how coins can be spent. 
This appendix explores covenants and their application in vaults -- advanced mechanisms for secure storage, though it carries additional risks.
Drawing from ongoing Bitcoin Improvement Proposals (BIPs) such as `OP_VAULT` (BIP-345) and `OP_CHECKTEMPLATEVERIFY` (BIP-119) or CTV,
 these features aim to enhance self-custody. 
By enforcing spending conditions, covenants enable "vaults" that protect against theft,
 making them ideal for long-term saving, inheritance, and family wealth preservation.






---

## Bitcoin Covenants

Covenants are script-based restrictions that dictate how Bitcoin can be spent in future transactions,
 going beyond simple locks to enforce ongoing conditions. 
Unlike standard scripts that control immediate spending,
 covenants "covenant" or bind future outputs, ensuring coins follow predefined paths -- such as time delays or specific addresses.

- **CheckTemplateVerify (CTV)**: Proposed in BIP-119, CTV allows a transaction to commit to a template of future spends, verifying hashes to ensure outputs match exact structures. This enables simple vaults by pre-committing to delayed or conditional transactions.
- **OP_VAULT (BIP-345)**: A more flexible opcode for creating vaults, allowing "unvaulting" with delays (e.g., requiring two blocks for spends) to give owners time to intervene in case of hacks.
- **Other Proposals**: CheckSigFromStack (CSFS) for verifying signatures in scripts, and innovations like PIPEs (Proofs in Protocol Execution) combining covenants with zero-knowledge proofs (ZKPs) for L1 enhancements without soft forks.

Covenants address limitations in Bitcoin's scripting, enabling features like secure custody protocols and programmable money flows, all while maintaining decentralization.

| Covenant Type | Core Function | Example Use |
|---------------|---------------|-------------|
| CTV          | Template hashing for fixed spends | Pre-committing to a recovery address. |
| OP_VAULT     | Delayed unvaulting with triggers | Theft prevention via time-locked spends. |
| CSFS         | Signature verification in scripts | Delegated emergency spends without keys. |





---

## Bitcoin Vaults

Vaults leverage covenants to create outputs where funds are locked under conditions that enhance security, reducing risks like theft or loss. 
In essence, they make Bitcoin storage more robust by design -- funds are secured in a script that enforces rules, with access only under specific, delayed actions.

- **Basic Vault Setup**: Funds are sent to a Pay-to-Taproot (P2TR) address with covenant scripts. To spend, a "trigger" transaction must be broadcast, followed by a delayed confirmation (e.g., via `OP_CHECKSEQUENCEVERIFY` or CSV), giving time for a "clawback" to a cold wallet if unauthorized.
- **Vault Aspect**: Covenants handle restrictions -- e.g., using NUMS (Nothing-Up-My-Sleeve) points as internal keys to force script-path spends only.
- **Hybrid Variants**: Combine CTV for standard paths and CSFS for emergencies, allowing pre-signed delegations (e.g., "send X sats to Y by block Z") without full handover.
- **Implementation Example**: On testnets like Mutinynet, vaults use Taproot leaves: One for CTV-clawback (immediate to cold storage), another for CSFS-delegation (bypassing delays for authorized ops).






---

## Proposals

Several BIPs advance this tech:

- **BIP-345 (OP_VAULT)**: Introduces opcodes for vault creation, with recovery paths.
- **CTV + CSFS Combinations**: Enable basic/hybrid vaults on signets, as demonstrated in POCs.
- **PIPEs**: Covenant-like features with ZKPs for no-soft-fork upgrades.

While not yet mainnet-activated, testnet demos show viability. For users, integrate with hardware wallets or collaborative custody for vault functionality.





---

## Risks

- **Complexity**: Script errors could lock funds; thorough testing needed.
- **Adoption Barriers**: Requires consensus for activation; debates on "restrictive" covenants persist.
- **Regulatory Scrutiny**: Programmable spends might attract oversight.

| Risk | Impact | Mitigation |
|------|--------|------------|
| Script Bugs | Fund Loss | Use audited BIPs and simulations. |
| Soft Fork Delays | Slow Rollout | Explore no-fork alternatives like PIPEs. |
| Over-Restriction | Reduced Flexibility | Design vaults with escape hatches. |




---

Vaults represent a potential leap in Bitcoin's programmability, offering secure storage that bolsters wealth preservation. 
By enforcing low-time-preference through delays and conditions, they empower families to build enduring legacies, free from fiat's vulnerabilities. 
As proposals like `OP_VAULT` progress, you may want to integrate them into your sovereignty journey -- starting with basic self-custody and evolving to vaulted setups. 





















