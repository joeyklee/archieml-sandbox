# Google Auth with Application Default Credentials (ADC)

There's a bunch of ways to auth your app, so this is just one of the many ways to do this. I _think_ this is the recommended way to do this while developing locally (?) because:

1. you don't have to worry about accidentally checking in your credentials into the code (we run that risk if we [create and download a service account key](./google-auth-with-local-service-account-credentials.md))
2. Since this library by default reads and writes to `~/.config/gcloud/application_default_credentials.json`, you don't need to fuss with setting `.env` variables for `GOOGLE_APPLICATION_CREDENTIALS` since the library will find your credentials.

## Prerequisite Step

Make sure you have completed these steps here: [Before Getting Started: Set up Google Cloud and create a google doc with archieml in it](../README.md/#before-getting-started-set-up-google-cloud-and-create-a-google-doc-with-archieml-in-it)

## Step 1: Setup and install `google-cloud-sdk`

First install the google cloud cli tool

```sh
brew install --cask google-cloud-sdk
```

Then make sure you have those variables accessible to your terminal PATH. I'm using zsh, so i do:

```sh
# To add gcloud components to your PATH, add this to your profile:
source "$(brew --prefix)/share/google-cloud-sdk/path.zsh.inc"
source "$(brew --prefix)/share/google-cloud-sdk/completion.zsh.inc"
```

now initialize gcloud:

```sh
gcloud init
```

Typically, if you wanted to just use the gcloud auth to handle logging in for your particular user, you would do:

```sh
gcloud auth application-default login
```

If you run the above, you'll see some credential files have been created at `~/.config/gcloud/application_default_credentials.json`. Yay this means this is working!

## Step 2: Impersonating a service account

Instead of auth'ing against our user, we need to auth against our service account. To do this, we can do what google calls "impersonate service account". In this case replace `<the service account email>` with the service account email you created earlier (TODO add ref)

```sh
gcloud auth application-default login --impersonate-service-account <the service account email>
```

If you try to run one of the examples in this repo, you might get an error in case you haven't yet added the right role to your user, for example, assuming you've updated the script below w/ your own `docId`, if we run the following:

```sh
# make sure you've run `npm install`
node -r dotenv/config examples/get-single-doc.js
# GaxiosError: Insufficient Permission
```

We should see something like: `"Permission 'iam.serviceAccounts.getAccessToken' denied on resource (or it may not exist)."` To fix this we need to enable your account to be able to [view service accounts](https://console.cloud.google.com/iam-admin/roles/details/roles%3Ciam.serviceAccountViewer)

Go to the service accounts page > go to [iam](https://console.cloud.google.com/iam-admin/iam) > find your email in the list (not the service account) > edit principal > add role: view service accounts

## Step 3: confirm it is working

With that permission added and assuming you've updated the script below w/ your own `docId`, you should be able to run this script below and see some results:

```sh
# make sure you've run `npm install`
node -r dotenv/config examples/get-single-doc.js
# {"body":[{"header1":[{"text":"i love you","formatting":[{"type":"bold"}]}],"paragraph":[{"text":"I love archieml","formatting":[{"type":"bold"}]}]}]}
```

Now you should be setup up to run the rest of the examples in this repo! 🎉

## References

- auth overview:
  - https://developers.google.com/workspace/guides/auth-overview
- Secret manager:
  - https://cloud.google.com/secret-manager/docs/overview
- Local development:
  - https://cloud.google.com/docs/authentication/provide-credentials-adc#local-dev
- How does gcloud find these credentials from your recent login?
  - https://cloud.google.com/docs/authentication/application-default-credentials#personal
- local dev setup with Application Default Credentials:
  - https://cloud.google.com/docs/authentication/provide-credentials-adc#local-dev
