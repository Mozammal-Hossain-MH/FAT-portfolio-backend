import dotenv from "dotenv";
import express from "express";
import pkg from "pg";
import router from "./routes/routes.js";
const app = express();
const port = 5000;

dotenv.config();
const { Client } = pkg;
const client = new Client({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
});

client.connect();

app.use("/api", router);

app.get("/api", (req, res) => {
  res.json({ data: "Hello from FAT-portfolio-backend!" });
});

app.listen(port, () => {
  console.log(`FAT-portfolio-backend is listening on port ${port}`);
});
