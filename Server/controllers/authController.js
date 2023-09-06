import User from "../models/User.js";
import bcrypt from 'bcrypt';
import jwt  from "jsonwebtoken";
import { validationResult } from "express-validator";

// Register a new user
export const registerUser = async (req, res) => {
  try {
    // Validate request data
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, email, password } = req.body;

    // Check if the user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    // Create a new user
    user = new User({ username, email, password });

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();

    // Create and return a JWT token for authentication
    const payload = {
      user: {
        id: user.id,
      },
    };
    res.json({ user })
    // jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }, (err, req.body) => {
    //   if (err) throw err;
    //   res.json({ req.body });
    // });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Login a user
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the user exists
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    // Compare the provided password with the stored hash
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    // Create and return a JWT token for authentication
    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
      if (err) throw err;
      res.json({ token });
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};