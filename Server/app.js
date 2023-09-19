// console.clear();

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

import cookieParser from 'cookie-parser';

import nodemailer from 'nodemailer'; 

import { authMiddleware } from './middlewares/authMiddleware.js'
import { changePassword } from "./controllers/changePasswordController.js";

import authRoutes from './routes/authRoutes.js';
import habitRoutes from './routes/habitListRoutes.js';
import { globalErrorHandler, routeNotFound } from './middlewares/errorHandlers.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(cors());
app.use(express.json());

// Database Connection
mongoose.connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Import the `cookie-parser` middleware
app.use(cookieParser());

// Email configuration
const transporter = nodemailer.createTransport({
  service: 'YourEmailServiceProvider', // e.g., 'Gmail'
  auth: {
    user: 'your@email.com',
    pass: 'your-email-password',
  },
});

// Route to create a new user profile
app.post('/auth/signup', (req, res) => {
  // Extract user data from the request body
  const { username, email } = req.body;

  // Send an email to the user
  const mailOptions = {
    from: 'your@email.com',
    to: email,
    subject: 'New User Profile Created',
    text: `Hello ${username}, Your user profile has been successfully created.`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email: ', error);
      res.status(500).json({ error: 'Failed to send email' });
    } else {
      console.log('Email sent: ' + info.response);
      // Continue with the signup process and send a response to the client
      // You may want to save the user data to the database here
      res.status(200).json({ message: 'User profile created and email sent' });
    }
  });
});

// Routes

app.use('/auth', authRoutes);
app.use('/habits', habitRoutes);

app.use(routeNotFound);
app.use(globalErrorHandler);


// Route for changing password
app.post('/change-password', authMiddleware, changePassword);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
