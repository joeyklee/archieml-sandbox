import archieml from "archieml";
import { getDoc, handleAuth } from "../utils/gdoc-helpers.js";

async function main(docId) {
  // setup and handle your auth
  const { client, drive } = await handleAuth();

  //   get the doc body
  const body = await getDoc(docId, { drive, client });

  // use archieml to parse the plain-text
  const parsed = archieml.load(body.data);
  console.log(JSON.stringify(parsed));
}

const docId = "1ZhgvuOLC5TF7sA_kzgqLtYFdbQiFRh5vh-Wf_WCmBBo"; // TODO: replace with your own gdoc id
main(docId).catch(console.error);
