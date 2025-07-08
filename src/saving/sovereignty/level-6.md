# Level 6: Metal Backup

!!! info "Save Bitcoin with metal backups (as much as your house is worth)."
    <figure markdown>
    ![Level 6](/images/levels-Level-6.drawio.png)
      <figcaption>Level 6 -- metal seed backups</figcaption>
    </figure>

Level 6 enhances your Bitcoin self-custody by creating a durable metal backup of your seed phrase, ensuring your private keys survive extreme conditions like fire, flood, or physical damage. This setup builds on [Level 5](../level-5), which uses an air-gapped signing device, a [Bitcoin Knots](https://bitcoinknots.org/) full node, a Tails OS transaction manager, and an [air-gapped computer](../appendix/airgapped-computer.md). A metal seed backup, created using generic stainless steel dog tags and a tungsten stamping kit, provides a fireproof, waterproof, and corrosion-resistant record for your 12/24-word BIP-39 seed phrase, protecting wealth equivalent to "your house." Generic metal stamping offers superior security by allowing you to source materials independently, avoiding reliance on commercial Bitcoin seed backup solutions that may have supply chain risks or proprietary designs.

!!! warning "No paid nor *influenced* content -- all views are from personal experience"

## Why Metal Seed Backup?

A metal seed backup ensures your Bitcoin seed phrase withstands disasters that could destroy paper or digital backups. By stamping your seed phrase into durable materials like stainless steel or titanium, you create a resilient, long-term record. Benefits include:

- **Extreme Durability**: Withstands high temperatures, water, and physical stress, unlike paper or plastic.
- **Longevity**: Resists degradation for decades, ensuring access to your funds.
- **Security**: Offline, immune to digital attacks, and sourced independently for maximum trust.

Generic metal stamping, using dog tags or washers from craft stores, enhances security by avoiding commercial Bitcoin seed backup solutions, which may involve unverified supply chains or pre-engraved components that could compromise privacy.

## Choosing Durable Materials

Select materials that resist environmental damage and are suitable for stamping. The table below compares common metals for hardness (Vickers scale, higher is better for stamping durability) and melting temperature (for fire resistance):

| **Metal**       | **Hardness (Vickers)** | **Melting Temperature** | **Suitability for Seed Backup** |
|-----------------|------------------------|-------------------------|---------------------------------|
| Stainless Steel | ~200–250 HV           | ~2,500°F (1,370°C)     | Excellent: Affordable, corrosion-resistant, durable, easy to stamp. |
| Titanium        | ~300–350 HV           | ~3,000°F (1,660°C)     | Superior: Lightweight, extremely durable, fire-resistant, slightly harder to stamp. |
| Aluminum        | ~25–50 HV             | ~1,220°F (660°C)       | Poor: Soft, prone to scratches, lower fire resistance. |
| Silver          | ~25–70 HV             | ~1,760°F (960°C)       | Poor: Soft, tarnishes, less durable for stamping. |
| Gold            | ~20–30 HV             | ~1,947°F (1,064°C)     | Poor: Very soft, expensive, unsuitable for stamping. |

- **Stainless Steel**: Affordable, corrosion-resistant, and durable, ideal for dog tags or washers. Widely available at craft stores or online.
- **Titanium**: Ultra-durable, lightweight, and fire-resistant, but more expensive and slightly harder to stamp. Suitable for high-value backups.
- **Tungsten Stamping Kit**: Use a tungsten or steel stamping kit with letter stamps (e.g., 3mm or 4mm for legibility). Tungsten stamps are harder, ensuring clear imprints on metal surfaces. Available at craft stores or online retailers like Amazon.

Avoid softer metals like aluminum, silver, or gold, which are less durable and harder to stamp legibly. Verify material quality to ensure durability standards.

## Creating a Metal Seed Backup

Stamp your 12/24-word BIP-39 seed phrase (from your [Level 5](../level-5) signing device) into stainless steel dog tags or washers. Generic materials, like dog tags, offer security by allowing you to control the supply chain. For example, a solution like [MicroSeed](https://21e15.com/) uses 1" fender washers (quarter-sized) in stainless steel or titanium, but you can achieve the same result with dog tags from craft stores.

### Materials Needed
- **Metal Medium**:
    - Stainless steel dog tags (available at craft stores or online).
    - Alternatively, stainless steel or titanium washers (1" diameter).
- **Stamping Kit**: Tungsten or steel stamping kit with letter stamps.
- **Stamping Surface**: A flat, hard surface like a steel anvil or brick for stable stamping. A brick is sufficient but may leave slight imperfections.

### Stamping Process
1. **Prepare the Seed Phrase**:
    - Retrieve the seed phrase from your [Level 5](../level-5) signing device, written on a temporary paper backup during initial setup.
    - Work in a secure, private location with no cameras or onlookers.
    - Destroy the paper backup after stamping to prevent leaks.
2. **Set Up the Stamping Area**:
    - Place the dog tag or washer on a flat, hard surface (e.g., steel anvil or brick).
    - Secure the medium with tape or a holder to prevent movement. Ensure not to stamp beyond designated areas to avoid damage.
3. **Stamp the Seed Phrase**:
    - Use a tungsten stamping kit to imprint each word letter by letter. Apply light, consistent pressure for clear, legible imprints.
    - Double-check each word against the original seed phrase before stamping the next.
4. **Verify the Backup**:
    - Confirm all words are correctly stamped and legible under various lighting conditions.
    - Test the backup by entering the seed phrase into a temporary, offline wallet (e.g., on a fresh Tails OS session) to ensure it matches the signing device’s public addresses.
    - Destroy the temporary wallet session after verification.
5. **Secure the Backup**:
    - Store the metal backup in a tamper-evident bag or container.
    - Place it in a secure, offline location (e.g., safe deposit box, home safe) separate from your signing device and [air-gapped computer](../appendix/airgapped-computer.md).
    - Consider multiple backups in different locations for redundancy, ensuring each is equally secure.

### Security Notes
- **Privacy During Stamping**: Perform stamping in a private, offline environment to avoid exposure.
- **Material Quality**: Verify dog tags or washers are genuine stainless steel or titanium to ensure durability.
- **Stamping Precision**: Practice on scrap metal to master the technique before stamping the final backup.
- **Destruction of Temporary Backups**: Burn or shred any paper backups after stamping to eliminate risks.
- **Avoid Commercial Solutions**: Generic dog tags or washers reduce supply chain risks compared to commercial Bitcoin seed backup products, which may have pre-engraved components or unverified origins.

## Maintaining Your Metal Backup

To ensure your metal seed backup remains reliable:

- **Inspect Regularly**: Check annually for corrosion, scratches, or wear, though stainless steel and titanium are highly resistant.
- **Multiple Backups**: Create at least two metal backups, stored in separate, secure locations (e.g., home safe and bank vault).
- **Avoid Digital Exposure**: Never scan, photograph, or digitize the backup to maintain security.
- **Test Periodically**: Every few years, verify legibility and test on an offline wallet to confirm accuracy.
- **Secure Locations**: Store backups in fireproof, waterproof containers in locations only you or trusted individuals can access.

## Integration with Level 5

The metal seed backup complements the [Level 5](../level-5) airgap quarantine, ensuring your seed phrase is preserved if your signing device or [air-gapped computer](../appendix/airgapped-computer.md) is lost or damaged. The transaction workflow remains unchanged:

- Use the Tails OS transaction manager and Bitcoin Knots node for watch-only operations.
- Sign transactions on the [air-gapped computer](../appendix/airgapped-computer.md) with the signing device, using QR codes or sanitized microSD.
- The metal backup serves as a fail-safe, allowing wallet recovery by re-entering the seed phrase into a new signing device if needed.

## Conclusion

Level 6 metal seed backup, using generic stainless steel dog tags or washers, protects Bitcoin as valuable as your house. By stamping your seed phrase into durable materials with a tungsten kit, you ensure resilience against fire, flood, or time, while generic materials enhance security by avoiding commercial Bitcoin seed backup solutions. Combined with Level 5’s airgap quarantine, this setup creates an indestructible foundation for your Bitcoin, rivaling any vault.

To get started:

1. Acquire stainless steel dog tags or washers and a tungsten stamping kit from a craft store or online.
2. Stamp your seed phrase in a private, offline environment, verifying each word.
3. Test the backup on an offline wallet to confirm accuracy.
4. Store multiple backups in secure, separate locations using tamper-evident containers.
5. Destroy any temporary paper backups and maintain airgap discipline.

For further reading, explore [Bitcoin Knots guides](https://bitcoinknots.org/), [Tails OS security practices](https://tails.boum.org/), or metal stamping resources at craft stores.

---

*Disclaimer*: Metal seed backups require meticulous handling and secure storage. Verify material quality, stamp accurately, and protect backups from theft or exposure. Self-custody carries risks, and you are responsible for protecting your Bitcoin.







































