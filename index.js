import express from "express";
import { handleAuth, getDoc } from "./utils/gdoc-helpers.js";
import archieml from "archieml";

const PORT = 3000;
const app = express();

handleAuth()
  .then((authUtilities) => {
    app.get("/", (_req, res) => {
      res.send("hello!");
    });

    app.get("/ping", (_req, res) => {
      res.send("pong!");
    });

    app.get("/doc/:docId", async (req, res) => {
      const { docId } = req.params;
      const { data } = await getDoc(docId, authUtilities);

      const parsed = archieml.load(data);
      res.json(parsed);
    });

    app.listen(PORT, () => {
      console.log(`see the magic at: http://localhost:${PORT}`);
    });
  })
  .catch(console.error);
