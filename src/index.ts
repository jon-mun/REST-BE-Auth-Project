import * as dotenv from "dotenv";
dotenv.config();

import express from "express";
import mongoConnect from "./config/db";

import routes from "./api/routes/index";
import cookieParser from "cookie-parser";

const app = express();
app.use(express.json());
// TODO: Implement cors
mongoConnect();

app.use(cookieParser());
app.use("/", routes);

app.listen(process.env.PORT, () => {
  console.log(
    `Server running on ${process.env.NODE_ENV} env at port ${process.env.PORT}.`
  );
});
