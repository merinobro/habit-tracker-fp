import express from 'express';
import { check } from 'express-validator';
import { registerUser, loginUser, logout, deleteAccount } from '../controllers/authController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';
const router = express.Router();

// POST /auth/register - Register a new user
router.post('/register',
              registerUser   // Controller function to handle user registration
);

// POST /auth/login - Login a user
router.post('/login', 
              loginUser  // Controller function to handle user login
);
router.post('/logout', 
              logout  // Controller function to handle user logout
);

router.delete("/delete-account",
                //! add protect
               deleteAccount  // Controller function to handle account deletion
); 



// GET /auth/user - Get the authenticated user's profile
router.get('/user', authMiddleware, (req, res) => {
  
    // Respond with the authenticated user's profile
  res.json({ user: req.user });
});

export default router;

//*overview of each route, including its purpose and whether authentication is required. The frontend team can use this information to understand how to make requests to the API and what to expect in the responses.