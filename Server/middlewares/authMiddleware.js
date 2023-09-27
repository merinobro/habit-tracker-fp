import  jwt  from "jsonwebtoken";
import User from "../models/User.js";

// Middleware to verify and decode JWT token
export const authMiddleware = async (req, res, next) => {
  // Get the token from the request header
  const token = req.header('x-auth-token');

  // Check if the token is missing
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Add the user to the request object
    req.user = decoded.user;

    // Check if the user's current password is provided in the request
    if (!req.body.currentPassword) {
      return res.status(400).json({ msg: 'Current password is required for this action' });
  }

    // Proceed to the next middleware or route handler
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};

// Middleware to check user roles and permissions (authorization)
export const checkUserRole = async (req, res, next) => {
  try {
    // Fetch the user from the database
    const user = await User.findById(req.user.id);

    // Check if the user has the required role or permission
    if (!user || !user.isAdmin) {
      return res.status(403).json({ msg: 'Access denied. You do not have the required permissions.' });
    }

    // Proceed to the next middleware or route handler
    next();
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

