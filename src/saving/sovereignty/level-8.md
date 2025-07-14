# Level 8: DMZs

!!! info "Keep your full-node and transaction-manager completely safe from untrusted devices on your network."
    <figure markdown>
    ![Level 8](/images/levels-Level-8.drawio.png)
      <figcaption>Level 8 -- network segmentation and DMZs</figcaption>
    </figure>

In Level 8, we introduce the concept of a DMZ (Demilitarized Zone) to elevate the security of your Bitcoin setup. A DMZ is a distinct network segment positioned between your home network and the Internet, acting as a fortified buffer for your non-airgapped components. This approach complements the [airgap quarantine](level-5.md) used for offline tasks, focusing here on safeguarding the online elements of your Bitcoin infrastructure.

Your home network is likely a mix of devices -- laptops, smartphones, smart TVs, and IoT gadgets -- any of which could be a weak link, potentially compromised by malware or an attacker. 
By isolating your Bitcoin [full node](level-4.md) and [Transaction-Manager](../appendix/airgapped-computer.md) within a DMZ,
 you establish a protective barrier, making it far more difficult for threats to reach these vital assets, even if your home network is breached.




---

## Why a DMZ?

The DMZ isolates your [full node](level-4.md) (running Electrs for wallet functionality) and [Transaction-Manager](../appendix/airgapped-computer.md) (booting from Tails OS) from your broader home network. Only the Transaction-Manager is permitted to communicate with the full node, meaning that even if other devices on your network are compromised, they cannot directly target your Bitcoin setup.

This isolation is typically achieved using a separate router or managed switch—such as the [Ubiquiti EdgeRouter 4](https://www.ui.com/edgemax/edgerouter-4/) 
 -- configured with strict firewall rules to regulate traffic flow. 
The result is a tightly controlled environment that minimizes exposure to potential threats.




---

## Why Ethernet Only?

This setup prioritizes wired connections over Wi-Fi to maximize security. 
Wireless networks, while user-friendly, are susceptible to risks like data interception, unauthorized access, and exploits targeting Wi-Fi protocols. 
By relying solely on Ethernet, you eliminate these vulnerabilities, ensuring your Bitcoin infrastructure is only accessible through physically secure, wired links.



---

Adopting a DMZ with wired connections for your Bitcoin [full node](level-4.md) and [Transaction-Manager](../appendix/airgapped-computer.md) provides a robust defense against network-based threats. This setup safeguards your assets from risks within your home network and sidesteps the weaknesses of Wi-Fi, offering a professional-grade security solution. 
While it demands thoughtful configuration, the heightened protection it delivers is invaluable for securing your Bitcoin infrastructure.































