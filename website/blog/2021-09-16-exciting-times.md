---
slug: exciting-times
title: Release of version 1.0.0
author: Francesco Gatti
image: https://i.imgur.com/mErPwqL.png
author_url: https://www.linkedin.com/in/fgatti675
author_image_url: https://avatars.githubusercontent.com/u/5120271?v=4
---

Exciting times for our project!

After more than 60 releases, and numerous refinements of the internal components
and APIs, we are ready to start the beta release of version 1.0.0 💃

In the last months we've been focused on improving the CMS quality by
doing a lot of internal restructuring that is also going to affect the public
facing APIs (though we try to keep these changes to a minimum!).


## A bit of background

We started building FireCMS out of necessity. We were working on several
projects based on Firebase and in most of them we needed to develop some kind of
backend admin panel/CMS. We took some of those tools we had built, and merged
them into a single generic project that would support any database structure and
data type. We needed to make sure that we would need to be able to customize
many aspects of each implementation based on the necessity.

The outcome was a very good starting point to what would become FireCMS after
many iterations and feature updates. One of the consequences of this approach
was that the code was tightly coupled to Firebase, and you could find imports to
Firebase code in most layers of the code.

## The influence of Firebase

The original coupling to Firebase and specially the data structure of Firestore
has influenced many aspects of this project. The way we create entities based on
documents and collections and subcollections mimics the Firestore data
structure. What seemed like a limitation has turned out to be a great
opportunity to think of a great UI.

At Camberi we have a special passion for user experience and believe that
internal admin tools don't always receive the love they deserve.

In this time, we have developed some high quality components such as the
spreadsheet views of collections, or the side panel to edit entities and nested
subcollections.

## Where we are going

In the last year, we have seen developers integrate FireCMS in ways we had never
imagined! We have tweaked the APIs to try to accommodate those requirements but
we have come to the conclusion that a bigger change was needed.

The result is a big rework of the internal APIs and components that improves
reusability and customisation.

If you are using `CMSApp`, so FireCMS as a standalone app, this will not affect
you too much (besides some API updates). You can still use FireCMS as it was
originally meant to, a simple way to map entities and collections to awesome
views.

But, but, but... If you need more customisation you can now completely
override `CMSApp` and reuse all it's internal components. This means you now
have control of the MUI theme (adapted to V5), the CMS routes (adapted to React
Router 6), or how you display the different parts, such as the side dialogs, or
add your own.

## Separation of concerns

In the process of having a cleaner code, all the code related to Firebase has
been isolated into 3 components, one for authentication (auth controller), one
for the data source and one for storage. These components are abstracted away
behind their respective interfaces. This means you can replace any of those
parts with your custom implementation!