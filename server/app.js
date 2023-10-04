import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
// import {createServer} from "http";
// import {Server} from "socket.io";

import cookieParser from "cookie-parser";

import nodemailer from "nodemailer";

import { authMiddleware } from "./middlewares/authMiddleware.js";
import { changePassword } from "./controllers/changePasswordController.js";

import authRoutes from "./routes/authRoutes.js";
import habitRoutes from "./routes/habitListRoutes.js";
import {
  globalErrorHandler,
  routeNotFound,
} from "./middlewares/errorHandlers.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(cors()); // Enable Cross-Origin Resource Sharing (CORS)
app.use(express.json()); // Parse JSON request bodies

// Database Connection
mongoose.connect(process.env.DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

app.use(cookieParser());

// Email configuration
const transporter = nodemailer.createTransport({
  service: "YourEmailServiceProvider",
  auth: {
    user: "your@email.com",
    pass: "your-email-password",
  },
});

app.post("/auth/signup", (req, res) => {
  const { username, email } = req.body;

  const mailOptions = {
    from: "your@email.com",
    to: email,
    subject: "New User Profile Created",
    text: `Hello ${username}, Your user profile has been successfully created.`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email: ", error);
      res.status(500).json({ error: "Failed to send email" });
    } else {
      console.log("Email sent: " + info.response);
      res.status(200).json({ message: "User profile created and email sent" });
    }
  });
});

app.use("/auth", authRoutes);
app.use("/habits", habitRoutes);

app.use(routeNotFound);

app.use(globalErrorHandler);

app.post("/change-password", authMiddleware, changePassword);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
