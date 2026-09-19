import cors from "cors";
import express from "express";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.status(200).json({
    success: true,
    message: "SDTS API is running",
    timestamp: new Date().toISOString(),
  });
});

export default app;
