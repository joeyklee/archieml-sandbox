# archieml-sandbox

A small sandbox repo to demo how to setup archieml with google auth library

## Setup: Google Cloud

1. create service account
2. create a key for that service account
3. download that service account > rename it: `./credentials.json` > and add it to the root of this repo (typically there will be other ways to auth your application in stg/prd environments like reading these credentials into your CI/CD pipeline)
4. enable billing
5. enable `google drive api` -- https://console.cloud.google.com/apis/library/drive.googleapis.com

## Setup: create and permission your gdoc

1. create a google doc
2. add some archieml text
3. share > add the service account address you want to permission

## Setup: this repo

```sh
cd archieml-sandbox
touch .env
```

This will make sure that google-auth-library knows where to get your service account credentials

```sh
echo GOOGLE_APPLICATION_CREDENTIALS=./credentials  >> .env
```

```sh
cd archieml-sandbox
npm i
```

## Run the app

```sh
npm run start
# see the magic at: http://localhost:3000
```

See your parsed gdoc by passing your gdoc id to: `http://localhost:3000/doc/:docId`

```md
http://localhost:3000/doc/1ZhgvuOLC5TF7sA_kzgqLtYFdbQiFRh5vh-Wf_WCmBBo
```

# Examples

## get-single-doc.js

This example will just get a single doc log the parsed result

```sh
node -r dotenv/config examples/get-single-doc.js
```
