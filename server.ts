import * as dotenv from "dotenv";

const env = dotenv.config();

if(env.error){
  throw Error(".env not found!");
}

import express from "express";
import NormalizePort from "./utils/normalizePort";

const PORT = NormalizePort(process.env.PORT as string);

const app = express();

app.listen(PORT, () => {
  console.log(`Server running at PORT ${PORT}...`);
});