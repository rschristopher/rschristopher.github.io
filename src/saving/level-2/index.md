# Level 2: Your Keys

!!! info "Save Bitcoin on a home computer or smartphone (a small amount that you can risk losing)."

<figure markdown>
![Level 2](/images/levels-Level-2.drawio.png)
  <figcaption>Level 2 -- typical home network but with Tails OS on a USB-stick</figcaption>
</figure>


Once you have some Bitcoin (through an exchange or otherwise -- see
 [level-1](../level-1))
 you'll want to transfer it to your own custody.
In other words, you'll want control of the keys
 that can access your Bitcoin.
We'll start with a 
 [hot wallet](../understand-the-terms/#hot-wallet)
 on a home computer or smartphone.

However, in order to maximize security
 and privacy, you can leverage
 [Tails OS](https://tails.boum.org/)
 with
 [Electrum](https://electrum.org/#home)
 on a bootable thumb drive.



!!! warning "no paid or *influenced* content -- all views are from personal experience"





## Smartphone

A hot-wallet on your smartphone is definitely one of the easiest
 ways to manage your own Bitcoin.
However it is only recommended for small amounts,
 like cash you'd keep in your pocket.

[![bffbtc.org](https://bffbtc.org/wp-content/uploads/2022/09/BFF-EN-Bitcoin-flyer-page1.jpg)](https://bffbtc.org/flyer/)


### Advantages 

* full control of your keys
* portability -- it's with you everywhere


### Disadvantages

* privacy concerns -- whether android or iOS, all of your behavior and activity will be tracked and sold to 3rd parties.
* security concerns -- while you may trust Apple or Google to never have a data breach and to secure your data, this clearly poses a significant risk.
* lockin concerns -- many apps do not allow seed phrases to be imported or exported -- do not use any app with this kind of lock-in.


### Reputable Apps 

* [Blue Wallet](https://bluewallet.io/)
* [Zeus](https://zeusln.app/)
* [Electrum Mobile](https://play.google.com/store/apps/details?id=org.electrum.electrum&pli=1)






## Desktop

Desktop apps can provide a more comprehensive set of features and are overall fantastic for learning.


### Advantages 

* full control of your keys


### Disadvantages

* privacy concerns -- your Bitcoin will only be as private as the computer that you're using.
* security concerns -- your Bitcoin will only be as secure as the computer that you're using.
* lockin concerns -- strictly avoid any apps that do not allow import and export of a seed phrase. In fact, it's highly recommended to create test wallets and attempt to import onto multiple wallet apps and verify that the receive addresses are identical. **A Bitcoin wallet should never be exclusive to a given application.*


### Reputable Apps  

* [Sparrow](https://www.sparrowwallet.com/)
* [Specter](https://specter.solutions/)
* [Electrum](https://electrum.org/#home)




## Tails and Electrum

If you have a spare USB thumb drive and are looking
 for the quickest and easiest way to maximize
 privacy and security before moving on to higher levels,
 then I'd highly recommend
 going with 
 [Tails OS](https://tails.boum.org/)
 which comes with Electrum.
This solves most of the disadvantages of managing
 keys on a smartphone or desktop client.
With this approach, you get a secured OS from
 a bootable USB drive that leaves no trace
 on the machine you were running it on.

### Install Tails

See the official [Install Tails](https://tails.boum.org/install/index.en.html) guide.

Once you boot with the Tails USB drive you will have an OS
 focused on maintaining your privacy, and most importantly,
 there is no persisted data, no cookies, not even persisted settings.
Every time you boot Tails it's a fresh OS and it has no memeory
 of what happened before.
Internet traffic is over Tor making it extremely difficult
 to track.

There is an optional persistent volume that you can use
 to save application data to the USB drive itself.
What we'll do is enable this *only* for Electrum so that it can
 persist your keys. 


### Enable Persistence for Electrum

Once you've booted Tails, go to *Applications* and select
 *Configure persistent volume*

![tail-select-persist](/images/tails-select-persist.png)

This will open the Persistence wizard, you'll want to scroll
 through the apps and select *Electrum*

![tails-config-persist](/images/tails-config-persist.png)

You can set a password for this persistent volume, 
 and you will need to reboot.
After a reboot, you will be given an option to
 use the persistent volume -- or you can still
 use Tails without it, in its pure amnesic state.
If you do use the persistent volume then you will
 be able to run Electrum with any saved wallets
 or transaction files.

From here you can run Electrum as normal,
 generate wallets, send and receive Bitcoin, etc.

![tails-electrum](/images/tails-electrum.png)


### Advantages 

* full control of your keys
* secure -- more secure than any other level-2 solution
* most bang for the buck -- you'll have equivalent security to most hardware wallets and likely much more privacy


### Disadvantages

* long-term storage concerns -- this approach may be secure enough for your needs, however a sensible backup of your seed phrases (preferably in metal) is highly recommended before you consider using this for larger amounts of Bitcoin


