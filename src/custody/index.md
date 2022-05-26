# Custody

To *custody* Bitcoin means 
 securing the private keys that would be needed
 to spend your Bitcoin.
Unlike physical custody of assets, 
 custody of Bitcoin 
 means storing information, a key or seed phrase,
 and to store it in such a way that no one else
 would ever be able to know it.

For example, consider the following seed phrase,

!!! info "Example Seed Phrase"

    ```
    holiday crew machine fatigue welcome start axis cancel field slim rifle hero
    ```

Because this seed phrase has been revealed,
 anyone can generate private keys from this seed,
 which will access any Bitcoin stored in its invoice addresses (generated from this seed).


> *What if you had to secure this seed phrase?*

In other words, how would you secure this phrase 
 such that,

1. The seed phrase is accessible to those you trust (family members and the like), and
1. No one else could ever know the seed phrase

Knowing how to fulfil the above 
 is at the heart of how to custody Bitcoin.

## Self Custody

To *Self Custody* means you personally 
 secure your seed phrase and manage your own keys.
 This is the recommended approach but
 it is also the **only** way to properly secure your
 Bitcoin.

With Self Custody could decide that you'd rather die than give up your Bitcoin;
 that it will go to your children or else to no one.
 This sounds silly and rather extreme, but Bitcoin is the only asset
 in the history of the world where you can meaningfully accomplish this level of ownership.
 And you can accomplish this without lawyers or politicians.
 In fact, you can accomplish this even in opposition to lawyers and churches and nation states.

Can you say the same about stocks, bonds, real-estate, or any modern financial instrument?

The closest you might get is a physical possession, a bearer asset such as gold bullion.

But here is the difference:
 with the use of force anyone can take possession of gold bullion
 (as has happened over-and-over throughout history),
 incentivizing the use of force to seize wealth.
 But with Bitcoin, use of force is far less effective. 
 You can transfer your Bitcoin anywhere in the world.
 And in the extreme, you can take your Bitcoin to the grave.

This difference shifts the balance of power,
 aligning incentives with voluntary cooperation
 and not with force or fiat.

!!! quote "A Sovereign of your own Savings"

## Only Self Custody

If you trust an institution to custody your Bitcoin,
 then it's not your Bitcoin, it's their Bitcoin.
 And no matter how secure their custody system,
 it will never be as secure as your own Self Custody.

!!! danger "Not your Bitcoin"
    
    An institution that holds "your" Bitcoin can
    use "your" Bitcoin as collateral for "their" loan.
    If they're particularly clever they can buy
    more Bitcoin with that loan, 
    and if they're devious they'll create
    fractional reserve schemes. And if they go
    bankrupt do you really think you'll 
    get "your" Bitcoin back?
    
    An institution with "your" Bitcoin can 
    lock you out of your account. The governments
    in whichever countries the institution resides can freeze
    and even seize your funds. Perhaps your name
    was too similar to someone on a sanctions list,
    or perhaps your government is in a dispute
    with another government and they 
    suspend your account.

    A hacker who learned your mother's maiden name
    may be able to withdraw "your" Bitcoin. 
    Perhaps one of the many data breaches resulted
    in your personal information leaking out,
    putting "your" Bitcoin at risk,
    through the fault of the very institutions
    trusted to secure your information.


## It's Easy

There's a common misconception that Bitcoin Self Custody is hard.

In practice, Bitcoin Self Custody is as easy as changing a light-bulb,
 and it is vastly easier than online banking, not to mention far more secure.
 Bitcoin is as secure as you want it to be, from *trivial* to *nuclear-launch-code*
 level of security.


> Bitcoin is hard? Compared to what?!

Let's look at a typical security setup for
 accessing a typical online banking service,
 and determine how easy and secure things really are.

???+ danger "Typical Online Banking"
    
    The bank requires a "strong password",
    the kind recommended by security experts.

    You use a Password Manager to generate "strong passwords",
    and your online banking password is something like `CH"sgK9'?f<WZWYS`.

    The bank requires *multi-factor authentication* (MFA), 
    and you've been told by security experts
    not to rely on SMS text messages for MFA, so you install an IdP app,
    which requires its own password with optional biometric verification.

    You generate another "strong password" for your IdP app,
    this one is `DVqt*\Hax2$YD5vK`.

    The bank asks for your email address and asks you to verify it.
    You realize your email can be used to reset passwords, and fortunately
    you've already enabled MFA for your email service and used a
    "strong password", which is `c9~%C8UMNp+ung9=`.

	The bank also requires AML/KYC, so you provide them
    copies of your passport and you upload an image of yourself holding your
    passport along with a piece of paper that has your written
    signature and today's date. You feel stupid sending your bank a selfie,
    but you do it anyway.

    The bank also asks you to select and answer three "security questions",
    and you go with your high-school mascot, name of your first pet,
    and the city you met your significant other (*Cherokees, Rex, Hoboken*).

    The password manager also
    requires its own "strong password" and in case you forget that one,
    they provide you a "secret key" that they recommend 
    you print out and keep someplace safe.
    This "secret key" they tell you, can be used to recover ***all*** of your passwords,
    so you have to keep it very safe.

	You write down the following on a piece of paper,
    > 6QRDjV7MmznW63yjZWM5c8ngC5rxQhZxAPXrzfuYbg8CZuLT

    and you put that paper in a fire-proof lockbox.


We could keep going with this all-too-common tale of security theater 
 (and you've no doubt already experienced much of this),
 but let's pause here
 and analyze how easy and how secure this system really is --

???+ danger "Security Review"

    In practice, your personal information has certainly been leaked out
    to the dark web
    multiple times (through any one of the high-profile data breaches
    that you read about in the news).

	The fire-proof lockbox would not preserve a piece of paper
    through a house fire.

    Regardless, there's a much bigger problem --
    a barely competent hacker could call your bank and impersonate you.
    With a quick glance at your social media,
    they can answer the security questions (*Cherokees, Rex, Hoboken*),
    then they
    reset the password, change the security questions,
    liquidate the account,
    and finally they close the account.

    If this happens, you'll find yourself locked out of your own account, and
    after weeks of calling the bank and getting a lawyer involved
    you will eventually learn what
    happened. Your account was liquidated.
    The bank assumes no responsibility, and they give you the number for the FBI.
    They blame the whole ordeal on your weak security questions 
    and point to the terms and services that you signed (but never read).


In case it's not obvious, online banking is vastly more complicated
 than anything you'll encounter with Bitcoin Self Custody.
 And you'll find all the same cryptographic concepts,
 such as *private keys* and *recovery seeds*, but the bank and apps will
 apply them in comically useless ways that add no real security
 and still manage to leave you vulnerable.

No reasonable person would conclude that the current state
 of online security is easy.
 Securing your identity across disparate technology
 and banking providers is not easy.
 And worse, it is getting harder and harder by the day.


!!! question "But is Bitcoin Self Custody really as easy as changing a light-bulb?"
    
    Yes, and definitely easier than 
    the security theater of online banking.

    Bitcoin is new and can seem complicated.
    But imagine asking a person from the 
    middle ages to change a light bulb. 
    They'd be confused and 
    without explicit instructions
    they would probably
    electrocute themselves.
    
    Bitcoin is no different. 
    Future generations may laugh at us
    for being so hopelessly ignorant of
    what will seem obvious and intuitive to them.


## Really, It's Easy

Securing your assets in the traditional fiat banking system requires
 a Rube-Goldberg-Machine of security-theater
 where telling a call-center operator in the Philipines
 what your mother's maiden name is,
 somehow constitutes security.

Bitcoin Self Custody offers real security. 
 And thus the risk of losing your funds in traditional banking
 is far higher than any reasonable Self Custody solution.

!!! question "Why would I want to be a bank?"
    
    You don't, and that's the point.

    Bitcoin allows superior custody services 
    that no bank or institution will ever be able 
    to match.

Bitcoin Self Custody is exactly as hard 
 as learning about the Internet in the 1990s.
 It's new, it's different,
 and it confuses those who haven't realized
 just how disruptive this kind of technology can be.


!!! question "I heard it requires 'persistent competence', is that true?"

    That's online banking you're thinking about.

    A redneck with a gun and a coldcard can custody Bitcoin
    with more security than your bank.


