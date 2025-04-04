import * as dotenv from "dotenv";

const env = dotenv.config();

if(env.error){
  throw Error(".env not found!");
}

import express from "express";
import NormalizePort from "./utils/normalizePort";
import { connect, connection } from "mongoose";
import cors from "cors";
import { previewRoute } from "./routes/preview";

const PORT = NormalizePort(process.env.PORT as string);
const DB_URI = process.env.DB_URI;

const app = express();

connect(DB_URI as string);
connection.on("connected", () => console.log("Connected to MongoDB..."));

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {res.json("Backend of Notes by Dirk Brandon Lapitan...")});

app.use("/api/v1/preview", previewRoute);

app.listen(PORT, () => {
  console.log(`Server running at PORT ${PORT}...`);
});