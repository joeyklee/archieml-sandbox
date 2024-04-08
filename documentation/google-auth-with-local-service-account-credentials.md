# Google Auth with local service account credentials

> created April 7, 2024

Before you get the content from a google doc you'll have to do some setup in google cloud. This will take you through creating a new "project' in google cloud, creating a ["service account"](https://cloud.google.com/iam/docs/service-account-overview) and giving it permissions to access resources in google cloud (e.g. google drive), and last enabling billing and the google drive api.

There are a million ways you can give yourself (e.g. your applications) permissions to access google cloud resources so this is "just one" of the many ways to accomplish this! I highly recommend [learning more about authentication](https://developers.google.com/workspace/guides/auth-overview) so you can make sure to secure your applications to suite your needs. For the purpose of this demo, we are just focused on getting your application authorized so you can focus on the more interesting bits - creating and getting archieml content from a google doc! But seriously, authentication is important (and complex) so if you're unsure about this stuff, make sure to talk to an informed friend (someone who does devops at your org!) to help you.

!!! NOTE: NEVER ADD/COMMIT YOUR CREDENTIALS TO GIT IN ANY PROJECT THIS CAN LEAD SERIOUS PROBLEMS!!!

## Prerequisite Step

Make sure you have completed these steps here: [Before Getting Started: Set up Google Cloud and create a google doc with archieml in it](../README.md/#before-getting-started-set-up-google-cloud-and-create-a-google-doc-with-archieml-in-it)

## Create and download the service account credentials locally

1. now from the service accounts page https://console.cloud.google.com/iam-admin/serviceaccounts > click the service account you just created > navigate to the `keys` tab > click: `add key` > download that service account key > rename it: `./credentials.json` > and add it to the root of this repo (typically there will be other ways to auth your application in stg/prd environments like reading these credentials into your CI/CD pipeline in another way like using OIDC or VAULT or some combination of things. Google also has a "secret manager" that might be worth looking into https://cloud.google.com/secret-manager/docs/overview). NOTE: NEVER ADD/COMMIT YOUR CREDENTIALS TO GIT IN YOUR A PROJECT THIS CAN LEAD SERIOUS PROBLEMS!!!

   The `.credentials` file should look something like this:

   ```json
   {
     "type": "service_account",
     "project_id": "the-project-id",
     "private_key_id": "an alphanumeric string",
     "private_key": "-----BEGIN PRIVATE KEY-----a-bunch-of-numbers-and-letters\n-----END PRIVATE KEY-----\n",
     "client_email": "service-account-name@the-project-id.iam.gserviceaccount.com",
     "client_id": "some-number",
     "auth_uri": "https://accounts.google.com/o/oauth2/auth",
     "token_uri": "https://oauth2.googleapis.com/token",
     "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
     "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/service-account-name@the-project-id.iam.gserviceaccount.com",
     "universe_domain": "googleapis.com"
   }
   ```

## Set your GOOGLE_APPLICATION_CREDENTIALS

By going this route, you'll have to make sure that the google-auth-library knows where to get those credentials. You can set this up in your `.env`

Create a `.env` file using the `touch` command

```sh
cd archieml-sandbox
touch .env
```

Point your `GOOGLE_APPLICATION_CREDENTIALS` to where your service account credentials are stored. This will make sure that google-auth-library knows where to get your service account credentials. In this case since the `credentials.json` file is in the root of this repo, you can just do (the google-auth-library will know how to get and parse this):

```sh
echo GOOGLE_APPLICATION_CREDENTIALS=./credentials  >> .env
```

your `.env` file should look like this now:

```txt
GOOGLE_APPLICATION_CREDENTIALS=./credentials
```
