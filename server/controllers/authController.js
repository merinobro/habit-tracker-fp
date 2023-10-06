//modules and packages
import User from "../models/User.js";
import HabitList from "../models/HabitList.js";
import jwt from "jsonwebtoken";
import { authError } from "../middlewares/errorHandlers.js";

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXP,
  });
};

const removeCookies = (res, ...cookies) => {
  cookies.forEach((cookie) => res.clearCookie(cookie));
};

const createSendToken = (user, statusCode, res) => {
  const jwtToken = signToken(user._id);

  const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "None" : "lax",
  };

  res.cookie("jwtToken", jwtToken, cookieOptions);

  user.password = undefined;

  res.status(statusCode).json({
    message: "success",
    success: true,
    status: statusCode,
    user,
  });
};

//~--------------------------------------------------------------------
//^ Function to create a new HabitList and associate it with a user

const createHabitList = async (user) => {
  const newHabitList = await HabitList.create({});
  user.habitListId = newHabitList._id;
  await user.save();
};

//~-------------------------------------------------------------------------------
//^ Controller function to register a new user

export const registerUser = async (req, res, next) => {
  try {
    const user = await User.create(req.body);
    await createHabitList(user);
    createSendToken(user, 201, res);
  } catch (error) {
    if (error.code === 11000) {
      return next(duplicateFieldsHandler(error.keyValue));
    }
    next(error);
  }
};

//~-------------------------------------------------------------------
//^ Controller function to log in a user

export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      throw authError(400, "Please provide email and password");

    const user = await User.findOne({ email });

    if (!user || !(await user.correctPassword(password, user.password))) {
      throw authError(401, "Incorrect email or password");
    }

    createSendToken(user, 200, res);
  } catch (error) {
    next(error);
  }
};

//~ -----------------------------------------------------------------------
//^ Controller function to log out a user

export const logout = async (req, res, next) => {
  try {
    removeCookies(res, "jwtToken");

    res.status(200).json({
      message: "success",
      statusCode: 200,
      data: "Logged out successfully",
    });
  } catch (error) {
    next(error);
  }
};

//~ ---------------------------------------------------------------------
//^ Middleware function to protect routes requiring authentication

export const protect = async (req, res, next) => {
  try {
    const jwtToken = req.cookies["jwtToken"];

    const decoded = jwt.verify(jwtToken, process.env.JWT_SECRET);

    if (!decoded.id) throw authError(401, "Invalid token");

    const user = await User.findById(decoded.id);
    if (!user) throw authError(401, "User not found.");

    req.user = user;
    req.isAuthenticated = true;

    next();
  } catch (error) {
    next(error);
  }
};

//~-----------------------------------------------
//^ Controller function to delete a user's account
export const deleteAccount = async (req, res, next) => {
  try {
    const { user } = req;

    await User.findByIdAndDelete(user._id);

    await HabitList.findByIdAndDelete(user.habitListId);

    removeCookies(res, "jwtToken");

    res.status(200).json({
      message: "success",
      statusCode: 200,
      data: "Account deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
