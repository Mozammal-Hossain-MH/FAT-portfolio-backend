import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import express, { json, static as serveStatic } from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import errorHandler from "./middlewares/errorHandler.js";
import router from "./routes/routes.js";
const app = express();
const port = 5000;

dotenv.config();
// const { Client } = pkg;
// const client = new Client({
//   user: process.env.DB_USER,
//   host: process.env.DB_HOST,
//   password: process.env.DB_PASSWORD,
//   port: process.env.DB_PORT,
//   database: process.env.DB_NAME,
// });

// client.connect();

// middlewares
app.use(json());
app.use(serveStatic("Images"));
app.use(cookieParser());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// APIS
app.use("/api", router);

// TEST
app.get("/api", (req, res) => {
  res.json({ data: "Hello from FAT-portfolio-backend!" });
});

// ERROR logs
app.get("/api/errors", (req, res) => {
  const errorId = req.query.errorId;
  const logFilePath = path.join(__dirname, "logs", "error.log");

  fs.readFile(logFilePath, "utf8", (err, data) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Failed to read log file.", error: err.message });
    }

    try {
      const logs = data
        .trim()
        .split("\n")
        .map((line) => JSON.parse(line));

      // If errorId is provided, filter logs
      const filteredLogs = errorId
        ? logs.filter((log) => log.message.includes(`[Error ID: ${errorId}]`))
        : logs;

      res.json(filteredLogs);
    } catch (parseError) {
      res.status(500).json({ message: "Failed to parse log data." });
    }
  });
});

// GLOBAL Error Handler
app.use(errorHandler);

// CHECK CONNECTION
app.listen(port, () => {
  console.log(`FAT-portfolio-backend is listening on port ${port}`);
});
