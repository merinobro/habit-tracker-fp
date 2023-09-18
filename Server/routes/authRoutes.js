import express from 'express';
import { check } from 'express-validator';
import { registerUser, loginUser, logout, deleteAccount } from '../controllers/authController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';
const router = express.Router();

// POST /auth/register - Register a new user
router.post(
  '/register',registerUser
);

// POST /auth/login - Login a user
router.post('/login', loginUser);
router.post('/logout', logout);

router.delete("/delete-account", deleteAccount); // add protect


// GET /auth/user - Get the authenticated user's profile
router.get('/user', authMiddleware, (req, res) => {
  
  res.json({ user: req.user });
});

export default router;