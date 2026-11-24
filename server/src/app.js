import express from "express";
import cors from "cors";
import helmet from "helmet";
import { rateLimit } from "express-rate-limit";

const app = express();

// Security headers
app.use(helmet());

// Allow requests from our React frontend
app.use(
  cors({
    origin: process.env.CLIENT_URL,
  })
);

// Parse incoming JSON
app.use(express.json({ limit: "10kb" }));

// Basic API rate limiting
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 200,
  standardHeaders: true,
  legacyHeaders: false,
});

app.use("/api", apiLimiter);

// Health check
app.get("/api/v1/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Salon API is running",
  });
});

export default app;