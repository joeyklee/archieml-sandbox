# archieml-sandbox

## About

A small "sandbox" (a place to play) repo to demo one of the many ways of setup archieml with google auth library and google cloud. I'm hoping this is a helpful collection of examples and documentaiton to help you get up and running with google docs with archieml content in it. The goal is to keep the examples super simple so you can run with your own ideas! ❤

---

# Before Getting Started: Set up Google Cloud and create a google doc with archieml in it

> (process as of April 7, 2024)

Before you get the content from a google doc you'll have to do some setup in google cloud. This will take you through creating a new "project' in google cloud, creating a ["service account"](https://cloud.google.com/iam/docs/service-account-overview) and giving it permissions to access resources in google cloud (e.g. google drive), and last enabling billing and the google drive api.

There are a million ways you can give yourself (e.g. your applications) permissions to access google cloud resources so this is "just one" of the many ways to accomplish this!

!!! NOTE: NEVER ADD/COMMIT YOUR CREDENTIALS TO GIT IN ANY PROJECT THIS CAN LEAD SERIOUS PROBLEMS!!!

## Step 1 - Setup: Google Cloud

1. Create a new project:
   - go to google cloud console https://console.cloud.google.com/ > dropdown: select project > new project > project name: "name-it-whatever-you-want" > project id (under the input) click "edit" > project id: "name-it-whatever-you-want"
2. create service account
   - go to IAM & Admin https://console.cloud.google.com/iam-admin/iam > then to service accounts https://console.cloud.google.com/iam-admin/serviceaccounts > click: "create service account" > add in a service account name, account id, and description
3. create a key for that service account
   - now from the service accounts page https://console.cloud.google.com/iam-admin/serviceaccounts > click the service account you just created > navigate to the `keys` tab > click: `add key` > download that service account key > rename it: `./credentials.json` > and add it to the root of this repo (typically there will be other ways to auth your application in stg/prd environments like reading these credentials into your CI/CD pipeline). NOTE: NEVER ADD/COMMIT YOUR CREDENTIALS TO GIT IN YOUR A PROJECT THIS CAN LEAD SERIOUS PROBLEMS!!!
4. enable billing
   - go to https://console.cloud.google.com/billing/ > enter your payment info
5. enable `google drive api` --
   - go to https://console.cloud.google.com/apis/library/drive.googleapis.com > click: `enable`

## Step 2 - Setup: create and permission your gdoc

> Create and permission your google doc and add some archieml in!

1. create a google doc
   - go to google drive drive.google.com > create a folder where you want to store your docs (e.g. a folder called "archieml") > create a new google doc
2. add some archieml formatted text
   - e.g. copy and paste the value of `textInGoogleDoc` from the `./__fixtures/helloWorld.js` file into your google doc
3. update the docs permissions:
   - click: share > add the service account email you want to permission

---

# Demo: A tiny node app that gets google docs by their ID

> This is a tiny node/express app that uses the credentials from your service account to auth requests using the google-auth-library to get the text parsed from a google doc as json using archieml

## Step 0 - Setup: google cloud stuff

Make sure you setup google cloud and have a google doc permissioned and ready to use. You can follow the instructions above in: [`Before Getting Started: Set up Google Cloud and create a google doc with archieml in it`](#before-getting-started-set-up-google-cloud-and-create-a-google-doc-with-archieml-in-it)

## Step 1 - Setup: this repo

> Assuming all went well above, this step gets your app setup to run.

Create a `.env` file using the `touch` command

```sh
cd archieml-sandbox
touch .env
```

Point your `GOOGLE_APPLICATION_CREDENTIALS` to where your service account credentials are stored. This will make sure that google-auth-library knows where to get your service account credentials

```sh
echo GOOGLE_APPLICATION_CREDENTIALS=./credentials  >> .env
```

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

---

# Additional Examples

> See `/examples` for other examples

## get-single-doc.js

This example will just get a single doc log the parsed result. Make sure you've completed the steps above so that you have the credentials needed to run this script.

```sh
# !!! first update `gdoc` id in the script with your own!
node -r dotenv/config examples/get-single-doc.js
```

---

# Other ideas to demo

> I have no idea when I'll get to these, but just logging down some ideas

- [ ] Google Sheets: add examples pulling data from google sheets
- [ ] Google Docs: add example using dropdowns
- [ ] Google Docs: add example using suggestion mode
