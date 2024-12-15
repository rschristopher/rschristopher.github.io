# Level 7: Protocols + Multisig


!!! info "Protocols to manage the multi-signature keys (any amount)."
    <figure markdown>
    ![Level 7](/images/levels-Level-7.drawio.png)
      <figcaption>Level 7 -- ready for multisig protocols</figcaption>
    </figure>


<!--

Lord Jesus Christ
Son of the living God
Have mercy on me, a sinner

-->

If you're going to self custody your Bitcoin
 (because it's yours and you should)
 then it is  *highly recommended* to adopt
 a *protocol* for managing your Bitcoin.


A protocol is step-by-step instructions that you keep on hand;
 instructions that can be followed by you and your loved ones.
This can be as simple as using a 
 [coldcard](https://coldcard.com/)
 or
 [trezor](https://trezor.io/)
 and following their excellent documentation,
 or methodically following the
 [electrum coldstorage](https://electrum.readthedocs.io/en/latest/coldstorage.html)
 steps.

You may also want a more holistic view of 
 self custody security, such as,
 
* [10x Security Bitcoin Guide](https://btcguide.github.io/)
* [Glacier Protocol](https://glacierprotocol.org/) (recommended)

Additionally, you can find excellent resources
 to learn about security and online privacy,
 such as,

* [surveillance self-defense](https://ssd.eff.org/)
* [security-in-a-box](https://securityinabox.org/en/)




## Why a protocol?

One of the reasons I recommend the
 [Glacier Protocol](https://glacierprotocol.org/)
 is because it is broken down into subprotocols
 (setup, deposit, withdrawal) each with
 step-by-step instructions.
All individual steps are easy, and yet if
 you follow all steps you will have
 one of the most secure self custody solutions
 on the planet.

While I have minor gripes (address reuse, lack of
 [BIP-39](https://github.com/bitcoin/bips/blob/master/bip-0039.mediawiki)
 support, blind trust in casino dice, etc)
 there is no serious criticism I can find or have found
 concerning a security weakness in the glacier protocol.
However, some may find that this
 approach is too much and they want something simpler.
And still others may find that 
 it is not enough (such as wanting full privacy and verifying every transaction through secured full nodes).

In these cases it is recommended to have a custom protocol.





## How much security do you want?

The security of your Bitcoin custody can range from trivial
 to *nuclear-launch-code* level of security.
On the trivial side, a mobile app hot wallet may be perfectly
 reasonable for someone who isn't too concerned 
 with losing their funds.
On the paranoid side you may wish to secure your Bitcoin
 from hostile nation states such as North Korea
 or 
 [Canada](https://bitcoinmagazine.com/culture/bitcoin-passes-canada-trucker-protest-test).

If you start with the basics, such as following the excellent
 [coldcard](https://coldcard.com/) docs,
 you'll have secured your wealth far better 
 than any bank ever could.
This is the baseline for a secure self custody protocol.
We will not discuss anything less secure than this.

The following draft protocols incrementally build
 on this baseline to add additional security and privacy.

* [Basic+](../appendix/basic.md) - complete cold-storage and reasonable privacy
* [Custom](../appendix/custom.md) - *templates* for your own (DIY) self custody protocol




