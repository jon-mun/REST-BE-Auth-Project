import * as dotenv from "dotenv";
dotenv.config();

import express from "express";
import mongoConnect from "./utils/db";

import userRouter from "./routes/users";

const app = express();
app.use(express.json());
mongoConnect();

app.use("/api/users", userRouter);

app.get("/", (req, res) => {
  res.json("Hello world!");
});

app.listen(process.env.PORT, () => {
  console.log(
    `Server running on ${process.env.NODE_ENV} env at port ${process.env.PORT}.`
  );
});
