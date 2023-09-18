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

// Routes

app.use('/auth', authRoutes);
app.use('/habits', habitRoutes);

app.use(routeNotFound);
app.use(globalErrorHandler);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
