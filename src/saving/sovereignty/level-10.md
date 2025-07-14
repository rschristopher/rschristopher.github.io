# Level 10: Fail-safes

!!! info "Require fully redundant networks with explicit verification of cryptographic signatures."
    <figure markdown>
    ![Level 10](/images/levels-Level-10.drawio.png)
      <figcaption>Level 10 -- redundant networks</figcaption>
    </figure>

Level 10 achieves ultimate fault tolerance by implementing redundant networks, each with its own [full node](level-4.md) and [Transaction-Manager](../appendix/airgapped-computer.md). 
This setup ensures independent creation of identical unsigned transactions and verification of signatures from [Signing-Devices](../appendix/airgapped-computer.md),
 safeguarding against network failures, hardware compromises, or attacks like [Dark Skippy](https://darkskippy.com).




---

## Why Redundant Networks?

Redundant networks eliminate single points of failure in your Bitcoin infrastructure. 
By operating two separate [full nodes](level-4.md) and [Transaction-Managers](../appendix/airgapped-computer.md) on isolated networks (e.g., via separate [DMZs](level-8.md)),
 you create parallel systems for transaction creation and signature verification. 
This ensures that a compromise or failure in one network -- whether due to malware, hardware issues, or network attacks -- does not affect the other, preserving access to your funds.

Each [Transaction-Manager](../appendix/airgapped-computer.md) generates identical unsigned transactions from the same [multisig](level-7.md) wallet and UTXOs,
 while independent signature verification detects anomalies, such as those from malicious firmware like Dark Skippy. 
This redundancy strengthens the fault tolerance established with multiple [Signing-Devices](../appendix/airgapped-computer.md) in Level 9.



---

## Benefits of Redundancy

- **Network Isolation**: Separate networks prevent cross-contamination, ensuring a breach in one does not compromise the other.
- **Independent Verification**: Each [Transaction-Manager](../appendix/airgapped-computer.md) verifies partial signatures against its own [full node](level-4.md), catching discrepancies or malicious behavior.
- **Resilience**: Funds remain accessible even if one network or device fails, as the second system can complete the transaction.



---

## Implementation

- **Isolate Networks**: Configure each [full node](level-4.md) and [Transaction-Manager](../appendix/airgapped-computer.md) on separate [DMZs](level-8.md) or VLANs using distinct routers (e.g., [Ubiquiti EdgeRouter 4](https://www.ui.com/edgemax/edgerouter-4/)).
- **Synchronize Inputs**: Ensure both Transaction-Managers use identical UTXOs, recipient addresses, and fee rates for unsigned transactions.
- **Verify Signatures**: Use tools like Sparrow Wallet to independently validate partial signatures on each [Transaction-Manager](../appendix/airgapped-computer.md).
- **Monitor Anomalies**: Employ detection tools (e.g., from [Dark Skippy](https://darkskippy.com)) to scan for signature-based attacks or possible seed exfil.
- **Test Regularly**: Simulate transaction creation and signing across both networks to confirm consistency.




---

Redundant networks with separate [full nodes](level-4.md) and [Transaction-Managers](../appendix/airgapped-computer.md) provide unmatched Bitcoin security. By generating identical unsigned transactions and independently verifying signatures from [Signing-Devices](../appendix/airgapped-computer.md), Level 10 ensures resilience against any single failure or attack, securing your funds with absolute confidence.
























