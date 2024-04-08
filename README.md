# archieml-sandbox

![archieml googledoc side by side with the json output](/documentation/images/gdoc-to-json.png)

## About

A small "sandbox" (a place to play) repo to demo one of the many ways of setup archieml with google auth library and google cloud. I'm hoping this is a helpful collection of examples and documentaiton to help you get up and running with google docs with archieml content in it. The goal is to keep the examples super simple so you can run with your own ideas! ❤

## Overview

BEFORE you can run any of the examples in this repo, you'll need to do a few things:

1. Get stuff setup in google cloud
   - follow these instructions to [Create a project using google cloud > create a service account > enable billing and the google drive api](#step-1---setup-create-your-google-cloud-service-account-enable-billing-and-google-drive)
2. Get yourself setup to make auth'd requests from this repo
   - depending on how you roll, you can choose ONE of these instructions to follow or talk to an informed friend about how to permission a node.js project to talk to the google drive api
     - [Google auth with application default credentials](/documentation/google-auth-with-application-default-credentials.md) (RECOMMENDED)
     - [Google Auth with local service account credentials](/documentation/google-auth-with-local-service-account-credentials.md)
3. Create a gdoc > add some archieml > and give your service account permissions to read that specific gdoc
   - follow these instructions here at [step 3](#step-3---setup-create-and-permission-your-gdoc)

It's as easy as 1,2,3 🎶! But seriously, all the auth and permissions stuff can be a drag and really hard to parse through especially if you're not familiar with google cloud and how they handle auth/permissions. Hopefully some of these docs are useful for you ❤

Once you've taken care of all the google cloud/auth/permissions nonsense, then you can [run the demo app](#demo-a-tiny-node-app-that-gets-google-docs-by-their-id) or [run the simple example script to get a single doc](#get-single-docjs)

<br>
<br>
---

# Before Getting Started: Set up Google Cloud and create a google doc with archieml in it

> (process as of April 7, 2024)

## Step 1 - Setup: Create your Google Cloud service account, enable billing, and google drive

1. Create a new project:
   - go to google cloud console https://console.cloud.google.com/ > dropdown: select project > new project > project name: "name-it-whatever-you-want" > project id (under the input) click "edit" > project id: "name-it-whatever-you-want"
2. create service account
   - go to IAM & Admin https://console.cloud.google.com/iam-admin/iam > then to service accounts https://console.cloud.google.com/iam-admin/serviceaccounts > click: "create service account" > add in a service account name, account id, and description
3. Set the role of the service account to: "viewer"
4. enable billing
   - go to https://console.cloud.google.com/billing/ > enter your payment info
5. enable `google drive api` --
   - go to https://console.cloud.google.com/apis/library/drive.googleapis.com > click: `enable`

## Step 2 - Setup your app to be auth'd

After following the steps above, you need to decide how you want your app to get the application credentials to be able to read your files from google drive. You can follow these guides -- YOU ONLY NEED TO CHOOSE OF THESE

- [Google auth with application default credentials](/documentation/google-auth-with-application-default-credentials.md) (RECOMMENDED)
- [Google Auth with local service account credentials](/documentation/google-auth-with-local-service-account-credentials.md)

!!! You MUST complete one of the above so that the google-auth-library can successfully authenticate and get the authorizations it needs to talk to google drive!

## Step 3 - Setup: create and permission your gdoc

> Create and permission your google doc and add some archieml in!

![gdoc with archieml text](/documentation/images/hello-world-archieml-gdoc.png)

1. create a google doc
   - go to google drive drive.google.com > create a folder where you want to store your docs (e.g. a folder called "archieml") > create a new google doc
2. add some archieml formatted text
   - e.g. copy and paste the value of `textInGoogleDoc` from the `./__fixtures/helloWorld.js` file into your google doc
3. update the docs permissions:
   - click: share > add the service account email you want to permission

<br>
<br>
---

# Demo: A tiny node app that gets google docs by their ID

> This is a tiny node/express app that uses the credentials from your service account to auth requests using the google-auth-library to get the text parsed from a google doc as json using archieml

## Step 0 - Setup: google cloud stuff

Make sure you setup google cloud and have a google doc permissioned and ready to use. To do this:

1. make sure you have completed: [`Before Getting Started: Set up Google Cloud and create a google doc with archieml in it`](#before-getting-started-set-up-google-cloud-and-create-a-google-doc-with-archieml-in-it)

## Step 1 - Setup: this repo

> Assuming all went well above, this step gets your app setup to run.

Install the dependencies to run this app

```sh
cd archieml-sandbox
npm i
```

## Step 2 - Run the app

> This is a super simple node/express app that returns a parse JSON representation of a the content from a google doc.

```sh
npm run start
# see the magic at: http://localhost:3000
```

See your parsed gdoc by passing your gdoc id to: `http://localhost:3000/doc/:docId`, for example, if your google doc url looks like this:

```
https://docs.google.com/document/d/blah1blah2hello3yo4/edit
```

you can see the contents of that gDoc by making a request for `blah1blah2hello3yo4`

```md
http://localhost:3000/doc/blah1blah2hello3yo4
```

<br>
<br>
---

# Additional Examples

> See `/examples` for other examples

## get-single-doc.js

This example will just get a single doc log the parsed result. Make sure you've completed the steps above [in the setup section](#before-getting-started-set-up-google-cloud-and-create-a-google-doc-with-archieml-in-it) so that you have the credentials needed to run this script.

```sh
# !!! first update `gdoc` id in the script with your own!
node -r dotenv/config examples/get-single-doc.js
```

<br>
<br>
---

# Other ideas to demo

> I have no idea when I'll get to these, but just logging down some ideas

- [ ] Google Sheets: add examples pulling data from google sheets
- [ ] Google Docs: add example using dropdowns
- [ ] Google Docs: add example using suggestion mode

<br>
<br>
---

## Credits

- Created by [@joeyklee](https://jk-lee.com)
- Based on the demo in [archieml-js/examples](https://github.com/newsdev/archieml-js/blob/master/examples/google_drive.js)
- Made possible by [ArchieML](http://archieml.org/) and all the [contributors](https://github.com/newsdev/archieml-js/graphs/contributors) and [people who have built other helpful tools to support archieml](http://archieml.org/#resources) in their own work and organizations
