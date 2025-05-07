# Family photos app

## Table of Contents

-   [The Challenge](#the-challenge)
-   [Next Steps](#next-steps)
-   [Built With](#built-with)

### The Challenge

My parents have 70+ years worth of family photos digitised and saved on thumb drives in, apparently, no particular order. My BackEnd Guy (aka [Tim Duckett](https://github.com/timd) ) dumped them all into an AWS S3 bucket and scraped them into a database, now I'm trying to present them in a way that makes some kind of sense without freaking out over the sheer number...

#### This is multi-step process

(1) present the images online in a way that my parents can easily interact with them and add all the essential background information that is currently in their heads.

(2) add sorting and filtering functionality to bring some kind of order to the current chaos.

(3) gradually improve the presentation and navigation as additional information makes it possible to present the images in different ways.

(GoTo 1) actually the sheer number of images, means that this process is going to be iterative, probably for the rest of my life.

The current version is _working towards_ step 1:

- the original version was build about three years ago and was in need of a major update, which I'm currently in the middle of:
  - I've updated it to Next.js 15 and React 19
  - I have migrated from pages router to app router
  - I've introduced TypeScript

### Next steps

-   Update next/auth to reinstate the ability to log in and edit items
-   Populate database with date information
-   Default display to date order
-   Add additional fields such as "people in this photo" or "location"
-   Build sort and filter functionality
-   Move sign in and sort/filter buttons to a drop down menu
-   This is a test version and the styling is still fairly basic - designed for viewing on an iPad 6th Gen, looks reasonable on a desktop, looks like crap on a phone.


### Built with

-   [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app)
-   [Amazon S3 bucket](https://aws.amazon.com/s3/) for image storage
-   Postgres database hosted on [Railway](https://railway.app/)
