const express = require("express");
const routes = require("./routes/index");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
require("./config/db");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

app.use(bodyParser.json());
app.use("/api/v1", routes);

app.listen(PORT, () => {
  console.log(`Server is up and running on PORT: ${PORT}`);
});
