import express from "express";
import routes from "./routes/routes.js";
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
