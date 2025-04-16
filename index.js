import express from "express";
import { Client } from "pg";
const app = express();
const port = 5000;

const client = new Client({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
});

client.connect();

app.get("/", (req, res) => {
  res.json("Hello World!");
});

app.listen(port, () => {
  console.log(`FAT-portfolio-backend is listening on port ${port}`);
});
