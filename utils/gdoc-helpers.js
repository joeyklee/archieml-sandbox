import { drive_v2, google } from "googleapis";
import { GoogleAuth } from "google-auth-library";

/**
 * @typedef {{
 * drive: drive_v2.Drive;
 * client: import("google-auth-library/build/src/auth/googleauth").JSONClient|Compute
 * }} AuthUtilities
 *
 * @typedef {{ config:Config;
 *      data:       string;
 *      headers:    { [key: string]: string };
 *      status:     number;
 *      statusText: string;
 *     request:    Request;
 *  }} GoogleDocBody
 *
 *  @typedef {{
 *      method:       string;
 *      url:          string;
 *      headers:      Headers;
 *      responseType: string;
 *  }} Config
 *
 * @typedef {{
 *     Authorization:       string;
 *     "User-Agent":        string;
 *     "x-goog-api-client": string;
 * }} Headers
 *
 * @typedef {{
 *     responseURL: string;
 * }} Request
 */

/**
 * Instead of specifying the type of client you'd like to use (JWT, OAuth2, etc)
 * this library will automatically choose the right client based on the environment.
 * @returns {AuthUtilities}
 */
export async function handleAuth() {
  const auth = new GoogleAuth({
    scopes: "https://www.googleapis.com/auth/drive",
  });
  const client = await auth.getClient();

  const drive = google.drive({
    version: "v2",
    auth,
  });
  return { client, drive };
}

/**
 * Uses AuthUtilities passed from handleAuth() to get a gDoc body
 * @param {string} docId
 * @param {AuthUtilities} authUtilities
 * @returns {GoogleDocBody}
 */
export async function getDoc(docId, { drive, client }) {
  //   get the doc of interest
  const doc = await drive.files.get({ fileId: docId });

  //   get the link that we need to request to download the text/markup from the doc
  const exportLink = doc.data.exportLinks["text/plain"]; // also: ['text/html']
  //   we use the authenticated google client to make the request
  const body = await client.request({ method: "GET", url: exportLink });

  return body;
}
