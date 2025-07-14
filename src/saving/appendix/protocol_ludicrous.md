# Appendix: Ludicrous Protocol

The Ludicrous Protocol is an extreme Bitcoin self-custody system implementing **[Level 12](../sovereignty/level-12.md) security**. It uses a *3-of-5 multisig* wallet with five [Signing-Devices](airgapped-computer.md)—three SeedSigners and two Coldcard Qs—stored in geographically distributed, secure locations. It leverages receive-only full nodes (RF and satellite), an expanded airgap covering both DMZs, redundant Transaction-Managers, and a secure drop point for transaction broadcasting, ensuring resilience against state-level threats while maintaining fault tolerance and privacy.

---

??? info "Secure Environment and Countermeasures"
    The Ludicrous Protocol requires a highly secure environment to protect against sophisticated threats. This includes:

    - **Geographical Distribution**: Store the five [Signing-Devices](airgapped-computer.md) in separate, secure locations to eliminate single points of failure.
    - **Expanded Airgap**: The airgap covers both DMZs, isolating all critical operations from network threats.
    - **Physical Security**: Each location must be equipped with a Faraday cage, privacy enclosure, and secure room to prevent physical and electromagnetic attacks.
    - **Electronic Security**: Use privacy filters on all device screens, camera blockers on the [Transaction-Manager](airgapped-computer.md), and tamper-evident seals on [Signing-Devices](airgapped-computer.md).
    - **Receive-Only Full Nodes**: Operate one RF and one satellite full node, both configured as read-only, to ensure tamper-proof blockchain data.
    - **Redundant Transaction-Managers**: Use two [Transaction-Managers](airgapped-computer.md) on isolated networks for transaction creation and verification.
    - **Secure Drop Point**: Designate a physically secure, monitored location for broadcasting transactions.

??? info "Setup"
    Create a 3-of-5 [multisig](../sovereignty/level-7.md) wallet with five seeds, each generated on a dedicated [Signing-Device](airgapped-computer.md) in a unique, secure location. Operate within the expanded airgap and adhere to strict [quarantine rules](../sovereignty/level-5.md).

    1. **Prepare Secure Environments**
        1. Establish five secure locations for the [Signing-Devices](airgapped-computer.md), each with a Faraday cage, privacy enclosure, and secure room.
        2. Set up two [Transaction-Managers](airgapped-computer.md) on isolated networks, each connected to a receive-only full node (one RF, one satellite).
        3. Designate a secure drop point for the online Transaction-Manager.
        4. Equip all devices with privacy filters, camera blockers, and tamper-evident seals.
        5. Verify and update software and firmware using tools like [Dark Skippy](https://darkskippy.com).

    2. **Generate Seeds**
        ??? danger "Critical Step"
            1. Activate each [Signing-Device](airgapped-computer.md) in its secure location.
            2. Generate a seed (SeedSigner: with [dice](dice.md); Coldcard Q: with dice), using privacy filters.
            3. Save each seed as a QR code.
            4. Repeat for all five devices, powering off between steps.

    3. **Backup to Metal**
        ??? danger "Critical Step"
            1. Stamp seeds onto [metal backups](../sovereignty/level-6.md).
            2. Store backups in distinct, secure sites with tamper-evident seals.

    4. **Export ZPUBs to Transaction-Managers**
        ??? warning "Caution"
            1. Export ZPUBs via QR from each [Signing-Device](airgapped-computer.md) in its secure environment.
            2. Transfer ZPUBs to both [Transaction-Managers](airgapped-computer.md) via secure QR.
            3. Set up a 3-of-5 [multisig](../sovereignty/level-7.md) wallet in Sparrow on both Transaction-Managers.

    5. **Validate Addresses for Future Deposits**
        ??? danger "Critical Step"
            1. Generate receive addresses on both [Transaction-Managers](airgapped-computer.md).
            2. Verify addresses on at least three [Signing-Devices](airgapped-computer.md) via secure QR.

    6. **Test Setup with Small Transaction**
        ??? info "General Info"
            1. Perform a small deposit and withdrawal, signing with three [Signing-Devices](airgapped-computer.md) from different locations.
            2. Confirm consistency across both [Transaction-Managers](airgapped-computer.md) and receive-only nodes.

??? info "Deposit"
    Receive Bitcoin using verified addresses confirmed by both receive-only [full nodes](../sovereignty/level-4.md).

    1. **Generate Receive Address**
        ??? info "General Info"
            1. Create a new receive address on both [Transaction-Managers](airgapped-computer.md) and verify they match.

    2. **Verify Address on Airgapped Devices**
        ??? danger "Critical Step (Optional)"
            *Optional* -- used when no pre-verified address is available.
            1. Confirm the address on three [Signing-Devices](airgapped-computer.md) via secure QR.

    3. **Share Address with Sender**
        ??? info "General Info"
            1. Securely provide the verified address.
            2. Monitor receipt on both [Transaction-Managers](airgapped-computer.md).

    4. **Monitor Incoming Transaction**
        ??? info "General Info"
            1. Check the transaction on both receive-only [full nodes](../sovereignty/level-4.md).
            2. Ensure node consistency.

??? info "Withdrawal"
    Spend Bitcoin using [multisig](../sovereignty/level-7.md) signing with three [Signing-Devices](airgapped-computer.md) from different locations.

    1. **Create Unsigned Transaction**
        ??? info "General Info"
            1. Generate identical unsigned transactions on both [Transaction-Managers](airgapped-computer.md).
            2. Export PSBTs as QR codes.

    2. **Transfer Unsigned Transaction to Airgapped Devices**
        ??? warning "Caution"
            1. Deliver PSBT via secure QR to three [Signing-Devices](airgapped-computer.md) in their locations.

    3. **Sign Transaction**
        ??? danger "Critical Step"
            1. Produce partial signatures on three [Signing-Devices](airgapped-computer.md).
            2. Return partial PSBTs to both [Transaction-Managers](airgapped-computer.md) via secure QR.

    4. **Combine Signatures and Finalize Transaction**
        ??? warning "Caution"
            1. Merge signatures on both [Transaction-Managers](airgapped-computer.md).
            2. Validate the finalized transaction on both.

    5. **Inspect Transaction**
        ??? warning "Caution"
            1. Scan for anomalies using [Dark Skippy](https://darkskippy.com) on both [Transaction-Managers](airgapped-computer.md).

    6. **Broadcast Signed Transaction**
        ??? info "General Info"
            1. Transfer the signed transaction to the secure drop point.
            2. Broadcast via the online Transaction-Manager.
            3. Monitor confirmations on both receive-only nodes.

??? info "Check Balance"
    View balances without keys using receive-only [full nodes](../sovereignty/level-4.md).

    1. **Sync Watch-Only Wallets**
        ??? info "General Info"
            1. Sync Sparrow on both [Transaction-Managers](airgapped-computer.md) with their receive-only nodes.

    2. **Query Balance for Multisig Addresses**
        ??? info "General Info"
            1. Check balances on both [Transaction-Managers](airgapped-computer.md) and confirm consistency.

??? info "Recovery"
    Restore from backups if keys or devices are lost, using new [Signing-Devices](airgapped-computer.md).

    1. **Identify the Issue**
        ??? info "General Info"
            1. Assess the recovery need and locate [metal backups](../sovereignty/level-6.md).

    2. **Retrieve Backups**
        ??? danger "Critical Step"
            1. Access backups from secure sites, verifying tamper seals.

    3. **Restore Keys on New Signing-Devices**
        ??? danger "Critical Step"
            1. Restore seeds on new [Signing-Devices](airgapped-computer.md) in secure locations with privacy filters.

    4. **Rebuild Multisig Wallet Descriptor**
        ??? warning "Caution"
            1. Export ZPUBs to both [Transaction-Managers](airgapped-computer.md) via secure QR.
            2. Recreate the [multisig](../sovereignty/level-7.md) descriptor on both.

    5. **Test Recovery with Small Amount**
        ??? info "General Info"
            1. Conduct a test transaction to verify functionality.

??? info "Maintenance"
    Ensure protocol integrity with ongoing tasks.

    1. **Verify Metal Backups**
        ??? danger "Critical Step"
            1. Check tamper seals and metal condition at all locations.

    2. **Update Software and Firmware**
        ??? info "General Info"
            1. Update firmware in an airgapped environment, verifying integrity.

    3. **Run Full Node Health Checks**
        ??? info "General Info"
            1. Confirm both receive-only nodes are synced and consistent.

    4. **Simulate Full Protocol Run**
        ??? info "General Info"
            1. Test the protocol with small amounts, signing from multiple locations.

    5. **Audit Secure Environments**
        ??? info "General Info"
            1. Regularly audit locations, countermeasures, and tamper-evident seals.

---

**Notes**:
- The Ludicrous Protocol achieves [Level 12 security](https://isbitcointrue.com/saving/sovereignty/level-12/) with receive-only nodes, geographically distributed key signing, an expanded airgap, and a secure drop point.
- Strict adherence to [quarantine rules](../sovereignty/level-5.md) and [multisig protocols](../sovereignty/level-7.md) is essential for maintaining security.








