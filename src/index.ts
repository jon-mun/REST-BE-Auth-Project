import * as dotenv from "dotenv";
dotenv.config();

import express from "express";
import mongoConnect from "./config/db";

import routes from "./api/routes/index";

const app = express();
app.use(express.json());
mongoConnect();

app.use("/", routes);

app.get("/", (req, res) => {
  res.json("Hello world!");
});

app.listen(process.env.PORT, () => {
  console.log(
    `Server running on ${process.env.NODE_ENV} env at port ${process.env.PORT}.`
  );
});
