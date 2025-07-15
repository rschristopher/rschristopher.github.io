# Level 12: Off-grid

!!! info "Receive-only (e.g., satellite) nodes with geographically distributed key signing."
    <figure markdown>
    ![Level 12](/images/levels-Level-12.drawio.png)
      <figcaption>Level 12 -- a veritable Hero's Journey into transaction signing</figcaption>
    </figure>

Level 12 is the ultimate expression of Bitcoin self-custody, completely off-grid and airgapped, designed to withstand sophisticated physical, electronic, and network-based threats. 
It employs receive-only nodes (e.g., RF or satellite) and geographically distributed key signing, expanding the airgap to cover redundant DMZs (and the receive-only nodes).

An Airgapped-Computer collects signatures from read-only Transaction-Managers (every step cryptographically verified), and a final signed transaction is then taken to a geographically distinct drop point,
 to broadcast via a stateless computer. Importantly, the only "online" device is the drop point, with zero visibility into how transactions were created or signed.




---

## Why Off-grid?

- **Redundant Full Nodes**: Read-only full nodes provide uninterrupted access to the blockchain (e.g., via [satellite](https://blockstream.com/satellite/)), even under network censorship or failure.
- **Airgap Expansion**: Covering redundant DMZs with an airgap isolates critical operations from network threats.
- **Distributed Signing**: Keys are managed across secure, geographically separated locations, eliminating single points of failure or compromise.

Building on all prior levels --
 [full nodes](level-4.md), [airgap quarantine](level-5.md), [metal backups](level-6.md), [multisig](level-7.md),
 [fail-safes](level-10.md), [countermeasures](level-11.md), etc
 -- Level 12 creates an impenetrable fortress for Bitcoin self-custody.




---

## Benefits of Off-grid

- **Unmatched Security**: Defends against state-level adversaries, physical tampering, and electronic attacks.
- **Fault Tolerance**: Redundant systems ensure functionality even if one component fails.
- **Privacy Preservation**: Off-grid operations minimize exposure to online surveillance.




---

## Implementation

!!! warning "Discipline is Key"
    Strict adherence to [Quarantine Rules](level-5.md) and [multisig protocols](level-7.md) is essential. Any lapse compromises the entire system.

- **Geographically Distributed Key Signing**:
    - Deploy [Signing-Devices](../appendix/airgapped-computer.md) in multiple secure, physically separate locations.
    - Use a [multisig](level-7.md) setup requiring signatures from several devices to authorize transactions.

- **Redundant Receive-Only Full Nodes**:
    - Operate one full node via RF and another via satellite, both configured as read-only to prevent tampering.
    - Verify data consistency between nodes to ensure blockchain integrity.

- **Airgapped Signature Collection**:
    - Use an [Airgapped-Computer](../appendix/airgapped-computer.md) within the expanded airgap to collect signatures from read-only Transaction-Managers.
    - Transfer unsigned transactions via QR codes or other offline methods, adhering to [quarantine rules](level-5.md).

- **Secure Transaction Broadcasting**:
    - Move the signed transaction to an online Transaction-Manager at a designated drop point. This is a stateless Transaction-Manager (no persistent storage); it's one and only job is to broadcast signed transactions (over Tor or VPN).
    - Broadcast via a full node, using VPN or Tor to anonymize the process.

- **Enhanced Countermeasures**:
    - Apply [Level 11 countermeasures](level-11.md): privacy filters, Faraday cages, white noise generators, and tamper-evident seals.
    - Protect against side-channel attacks during QR code transfers or physical device handling.


An example of Level 12 security is included in the appendix, see the [Ludicrous Protocol](../appendix/protocol_ludicrous.md).






---

Level 12’s off-grid design, with receive-only nodes, geographically distributed key signing, and an airgapped core, offers the most extreme yet practical security for Bitcoin self-custody. It ensures your Bitcoin remains sovereign, even against the most determined threats.





















