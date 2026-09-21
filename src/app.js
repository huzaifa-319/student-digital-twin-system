const cors = require("cors");
const express = require("express");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.json({
    success: true,
    message: "SDTS API is running",
    timestamp: new Date().toISOString(),
  });
});

module.exports = app;
