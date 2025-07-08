# Level 4: Full Node

!!! info "Save Bitcoin and run your own node (as much as you'd be comfortable hiding under your mattress)."
    <figure markdown>
    ![Level 4](/images/levels-Level-4.drawio.png)
      <figcaption>Level 4 -- introducing a Full Bitcoin Node</figcaption>
    </figure>

Running a Bitcoin full node enhances your self-custody by allowing your transaction manager to verify transactions and balances against your own copy of the Bitcoin blockchain. This eliminates reliance on third-party nodes, boosting privacy and security. In Level 4, you’ll integrate a full node into the setup from [Level 3](../level-3), using it to support your transaction manager while keeping private keys offline on a dedicated signing device like a [Coldcard](https://coldcard.com/).

!!! warning "No paid nor *influenced* content -- all views are from personal experience"

## Why Run a Full Node?

A full node downloads and validates the entire Bitcoin blockchain, ensuring you trust only your own verification of the network’s rules. Benefits include:

- **Privacy**: Your transaction manager queries your own node, reducing risks of IP tracking or data leaks.
- **Security**: You verify transactions and balances yourself, avoiding reliance on potentially malicious external nodes.
- **Sovereignty**: Running a node strengthens Bitcoin’s decentralization, contributing to network resilience.

This guide recommends [Bitcoin Knots](https://bitcoinknots.org/), a Bitcoin full node implementation with enhanced privacy features and spam filtering compared to Bitcoin Core. Knots includes tools like improved transaction filtering and mempool policies to reduce spam, making it ideal for privacy-focused self-custody.

## Setting Up Your Full Node

To run a Bitcoin Knots full node, you need a dedicated device with sufficient storage, as the Bitcoin blockchain exceeds 500 GB (as of July 2025) and grows over time. A Raspberry Pi 4 or 5 with an external SSD is cost-effective, though a dedicated Linux laptop or desktop (e.g., [Ubuntu](https://ubuntu.com/)) offers better performance.

### Hardware Requirements
- **Device**: Raspberry Pi 4/5 (8 GB RAM recommended) or a dedicated Linux computer.
- **Storage**: At least 1 TB SSD (external for Raspberry Pi, internal for laptops/desktops).
- **Internet**: Stable connection with sufficient bandwidth (initial sync requires significant data).
- **Power**: Reliable power supply, ideally with a UPS for uninterrupted operation.

### Software Setup
1. **Install Linux**:
   - For a Raspberry Pi, use [Raspberry Pi OS](https://www.raspberrypi.com/software/) or [Umbrel](https://umbrel.com/) for a user-friendly interface (note: Umbrel may require manual Knots integration).
   - For a laptop/desktop, install [Ubuntu](https://ubuntu.com/download/desktop).
2. **Download Bitcoin Knots**:
   - Visit [bitcoinknots.org](https://bitcoinknots.org/) and download the latest Bitcoin Knots version for your system.
   - Verify the download using GPG signatures to ensure authenticity.
3. **Configure Bitcoin Knots**:
   - Create a `bitcoin.conf` file in the Bitcoin data directory (`~/.bitcoin/` on Linux).
   - Add the following settings for a secure, node-only setup:
     ```conf
     server=1
     rpcuser=yourusername
     rpcpassword=yourstrongpassword
     txindex=1
     listen=1
     bind=127.0.0.1
     prune=0
     blockfilterindex=1
     ```
   - `txindex=1` enables transaction indexing for wallet queries; `prune=0` ensures a full archival node; `blockfilterindex=1` supports advanced privacy features.
4. **Optimize Initial Block Download (IBD)**:
   - Set the `dbcache` parameter in `bitcoin.conf` to allocate more RAM for caching, speeding up IBD and verification. For example:
     ```conf
     dbcache=4096
     ```
   - A `dbcache` of 4096 MB (4 GB) is suitable for systems with 8 GB RAM; adjust based on available memory (e.g., 2048 MB for 4 GB RAM). Higher values reduce disk I/O but require sufficient RAM.
5. **Start Bitcoin Knots**:
   - Run `bitcoind -daemon` to start the node in the background.
   - The initial sync may take days, depending on hardware, internet speed, and `dbcache` settings. Monitor progress with `bitcoin-cli getblockchaininfo`.
6. **Secure Your Node**:
   - Configure your firewall to allow only port 8333 (Bitcoin P2P) for external connections and restrict RPC access to localhost.
   - Enable Tor or a VPN for additional privacy if your node is externally accessible.
   - Back up `bitcoin.conf` and any wallet files offline.

!!! note "Speeding Up Initial Sync"
    Setting `dbcache` to a higher value (e.g., 4096 MB) significantly reduces the time for Initial Block Download and verification by caching more blockchain data in RAM. Ensure your system has enough free memory to avoid swapping, which could slow down the process. For example, a Raspberry Pi with 8 GB RAM can safely use `dbcache=4096`, while a 4 GB system should use `dbcache=2048` or lower.

### Optional: User-Friendly Interfaces
For easier node management, consider [Umbrel](https://umbrel.com/) or [Raspiblitz](https://raspiblitz.org/), which provide web interfaces and tools like Electrum Server. However, these may default to Bitcoin Core; you’ll need to manually install Bitcoin Knots (check project documentation for compatibility). Knots’ built-in spam filtering and privacy features make it a strong choice even without these interfaces.

## Integrating with the Transaction Manager

With your Bitcoin Knots node synced, configure your [Level 3 transaction manager](../level-3) to connect to it. This assumes you’re using [Tails OS](https://tails.boum.org/) with [Electrum](https://electrum.org/) or [Sparrow](https://www.sparrowwallet.com/) for your watch-only wallet.

### Connecting Electrum to Your Node
1. **Set Up Electrum Server** (recommended for efficiency):
   - Install [Electrum Personal Server](https://github.com/chris-belcher/electrum-personal-server) or [Electrs](https://github.com/romanz/electrs) on your node to provide a lightweight interface for Electrum.
   - Configure the server to connect to Bitcoin Knots, following the respective documentation.
2. **Configure Electrum on Tails OS**:
   - Boot Tails OS and open Electrum.
   - Go to `Preferences > Network` and select `Connect to a specific server`.
   - Enter your node’s IP address and port (e.g., `192.168.1.100:50002` for Electrs or EPS).
   - Alternatively, use Knots’ RPC interface with `electrum --oneserver --server=yournodeip:8332:t` (requires additional setup).
3. **Verify Connection**:
   - Confirm Electrum connects to your node and shows synced status.
   - Ensure your watch-only wallet loads addresses and balances correctly.

### Connecting Sparrow to Your Node
1. **Configure Sparrow**:
   - Open Sparrow on Tails OS.
   - Go to `File > Preferences > Server` and select `Bitcoin Core` (compatible with Knots).
   - Enter your node’s IP address, RPC port (default 8332), and RPC credentials from `bitcoin.conf`.
2. **Test the Connection**:
   - Sparrow should connect and display blockchain data from your Knots node.
   - Verify that your watch-only wallet creates unsigned transactions as in [Level 3](../level-3).

### Leveraging Knots’ Privacy Features
- Bitcoin Knots’ spam filtering reduces mempool clutter, ensuring your transaction manager processes only relevant data.
- The `blockfilterindex=1` setting enables compact block filters, improving privacy for wallet queries.
- Run your transaction manager and node on the same local network to minimize external queries, and use Tails OS’s Tor routing for broadcasting transactions.

## Signing Transactions
The signing process remains identical to [Level 3](../level-3):

1. Create an unsigned transaction on your transaction manager (Tails OS with Electrum/Sparrow).
2. Transfer the transaction file to your offline signing device (e.g., Coldcard) via microSD.
3. Sign the transaction on the Coldcard and save the signed file.
4. Return to the transaction manager, load the signed file, and broadcast it via your Bitcoin Knots node.

Your Knots node verifies and propagates the transaction to the Bitcoin network, leveraging its enhanced privacy and filtering capabilities.

## Maintenance and Security
- **Keep Bitcoin Knots Updated**: Check [bitcoinknots.org](https://bitcoinknots.org/) for updates to address security and privacy improvements.
- **Monitor Storage**: Ensure your SSD has space for the growing blockchain (~50 GB/year).
- **Backup Configuration**: Store `bitcoin.conf` and wallet files offline.
- **Physical Security**: Secure your node device, as it holds sensitive blockchain data.
- **Power and Uptime**: Use a UPS to prevent data corruption and maintain 24/7 uptime to support the network.

## Conclusion
Level 4 self-custody with a Bitcoin Knots full node empowers you to verify transactions and balances independently, with enhanced privacy and spam filtering. By integrating your Knots node with the Level 3 transaction manager and offline signing device, you create a sovereign, secure setup for saving significant Bitcoin. This is like fortifying your digital mattress with a privacy-focused vault.

To get started:

1. Set up a dedicated device with Bitcoin Knots, optimizing IBD with `dbcache`.
2. Sync the blockchain and secure your node with a firewall and strong credentials.
3. Connect your Tails OS transaction manager (Electrum or Sparrow) to your Knots node.
4. Test the workflow with small transactions to ensure reliability.
5. Store your signing device, seed phrase, and node backups securely offline.

For further reading, explore the [Bitcoin Knots documentation](https://bitcoinknots.org/), [Umbrel guides](https://getumbrel.com/), or [Raspiblitz tutorials](https://raspiblitz.org/) (with Knots integration).

---

*Disclaimer*: Running a full node requires technical effort and responsibility. Verify software downloads, secure your hardware, and double-check transactions. Self-custody and node operation carry risks, and you are responsible for protecting your Bitcoin.
