import express from 'express';
import { check } from 'express-validator';
import { registerUser, loginUser } from '../controllers/authController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';
const router = express.Router();
// POST /auth/register - Register a new user
router.post(
  '/register',registerUser
  // [
  //   check('username', 'Username is required').not().isEmpty(),
  //   check('email', 'Please include a valid email').isEmail(),
  //   check('password', 'Password must be at least 6 characters long').isLength({ min: 6 }),
  // ],
);
// POST /auth/login - Login a user
router.post('/login', loginUser);
// GET /auth/user - Get the authenticated user's profile
router.get('/user', authMiddleware, (req, res) => {
  // You can return the user's profile information here
  res.json({ user: req.user });
});
export default router;









