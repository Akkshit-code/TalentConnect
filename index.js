// const express = require("express");
// const routes = require("./routes/index");
// const bodyParser = require("body-parser");
// const dotenv = require("dotenv");
// require("./config/db");

// dotenv.config();

// const app = express();
// const PORT = process.env.PORT || 8080;

// app.use(bodyParser.json());
// app.use("/api/v1", routes);

// app.listen(PORT, () => {
//   console.log(`Server is up and running on PORT: ${PORT}`);
// });

// -------------------------------

import express from "express";
import routes from "./routes/index.js";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import "./config/db.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

app.use(bodyParser.json());
app.use("/api/v1", routes);

app.listen(PORT, () => {
  console.log(`Server is up and running on PORT: ${PORT}`);
});
