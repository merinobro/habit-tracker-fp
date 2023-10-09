import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

import cookieParser from "cookie-parser";

import authRoutes from "./routes/authRoutes.js";
import habitRoutes from "./routes/habitListRoutes.js";
import {
  globalErrorHandler,
  routeNotFound,
} from "./middlewares/errorHandlers.js";

dotenv.config();
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use("/auth", authRoutes);
app.use("/habits", habitRoutes);

app.use(routeNotFound);
app.use(globalErrorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

mongoose.connect(process.env.DB_URI);
mongoose.connection
  .on("error", console.error)
  .on("open", () =>
    console.log(`Conntected to MongoDB / ${mongoose.connection.name}`)
  );
