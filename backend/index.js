import cors from "cors";
import { config } from "dotenv";
import express from "express";
import mongoose from "mongoose";
import batteryRoute from "./routes/routes.js";
config();

const app = express();
const PORT = process.env.PORT || 4000;
const MONGO_URL = process.env.MONGO_URL;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/battery", batteryRoute);

mongoose
  .connect(MONGO_URL)
  .then(() => {
    console.log("connected to MongoDB");
    app.listen(PORT, () => console.log(`Listening on port ${PORT}...`));
  })
  .catch((error) => {
    console.log(error);
  });
