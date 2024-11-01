import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import connectToDb from "./db/connectToDb.js";
import authRoutes from "./routes/auth.route.js";

dotenv.config();
const PORT = process.env.PORT || 3000;
const app = express();
app.use(express.json());
app.use(cookieParser());

// ?Routes:
app.use("/api/v1/auth", authRoutes);

app.listen(PORT, () => {
  connectToDb();
  console.log(`Server is running on port ${PORT}`);
});

//! MiddleWare For Error Handling:
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
