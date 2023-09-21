// console.clear();

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

import cookieParser from 'cookie-parser';

import authRoutes from './routes/authRoutes.js';
import habitRoutes from './routes/habitListRoutes.js';
import { globalErrorHandler, routeNotFound } from './middlewares/errorHandlers.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(cors()); // Enable Cross-Origin Resource Sharing (CORS)
app.use(express.json());  // Parse JSON request bodies


// Database Connection
mongoose.connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});


// `cookie-parser` middleware
app.use(cookieParser());  // Parse cookies sent in the HTTP request

// Routes

app.use('/auth', authRoutes);  // Use authentication-related routes
app.use('/habits', habitRoutes);  // Use habit-related routes

// Handle 404 Not Found errors with a custom middleware
app.use(routeNotFound);

// Handle global errors with a custom error handler middleware
app.use(globalErrorHandler);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

//^ This provides an explanation of the purpose and functionality of each part of your Express.js server setup. Frontend developers can use this information to understand how the server works, how to send requests to it, and how to handle responses and errors.