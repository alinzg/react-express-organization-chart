import express from "express";
import { GET, DELETE, NEW, ADD } from "./controller.js";
import cors from "cors";
import bodyParser from "body-parser";

const app = express();
app.use(cors({ origin: "*" }));
app.use(bodyParser.json());

app.get("/api/get", GET);
app.get("/api/delete/:id", DELETE);
app.get("/api/new/:id", NEW);
app.post("/api/add", ADD);

export function start() {
  app.listen(3001);
}
