# Family photos app

## Table of Contents

-   [The Challenge](#the-challenge)
-   [Next Steps](#next-steps)
-   [Outstanding Issues](#outstanding-issues)
-   [Built With](#built-with)

### The Challenge

My parents have 70+ years worth of family photos digitised and saved on thumb drives in, apparently, no particular order. My BackEnd Guy (aka [Tim Duckett](https://github.com/timd) ) dumped them all into an AWS S3 bucket and scraped them into a database, now I'm trying to present them in a way that makes some kind of sense without freaking out over the sheer number...

#### This is multi-step process

(1) present the images online in a way that my parents can easily interact with them and add all the essential background information that is currently in their heads.

(2) add sorting and filtering functionality to bring some kind of order to the current chaos.

(3) gradually improve the presentation and navigation as additional information makes it possible to present the images in different ways.

(GoTo 1) actually the sheer number of images, means that this process is going to be iterative, probably for the rest of my life.

The current version is _working towards_ step 1:

-   It's possible to log in and edit items.
-   To improve the ease of use for my parents, anyone logging in with our family email domain is automatically given editing rights, so they don't need to go through an additional verification step.
-   ... that's it so far.

UPDATE: The Footer is now a separate component that holds the Back/Forward buttons in gallery view. In single image view it holds single image navigation buttons and the Edit button for admins. I also fixed an _extremely weird_ bug in which the Next was calling a single image twice, even in production, but using the favicon as the payload in the second call. Moving the favicon file down a level in file structure fixed it but _I have no idea why_.

### Next steps

-   Populate database with date information
-   Default display to date order
-   Add additional fields such as "people in this photo" or "location"
-   Build sort and filter functionality
-   Move sign in and sort/filter buttons to a drop down menu

### Outstanding issues

-   This is a test version and the styling is still fairly basic - designed for viewing on an iPad 6th Gen, looks reasonable on a desktop, looks like crap on a phone.
-   The only way out of the single image view is to return to the first page of the gallery. I'd like it to go back to the last visited gallery page, regardless of how many single images have been viewed. I need to think about how to achieve this.

### Built with

-   [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app)
-   [Amazon S3 bucket](https://aws.amazon.com/s3/) for image storage
-   Postgres database hosted on [Railway](https://railway.app/)
