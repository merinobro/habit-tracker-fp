import User from "../models/User.js";
import HabitList from "../models/HabitList.js";
import jwt from "jsonwebtoken";

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXP,
  });
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
    jwtToken,
  });
};

const createHabitList = async (user) => {
  const newHabitList = await HabitList.create({});
  user.habitListId = newHabitList._id;
  await user.save();
};

export const registerUser = async (req, res, next) => {
  try {
    const user = await User.create(req.body);
    await createHabitList(user);
    createSendToken(user, 201, res);
  } catch (error) {
    next(error);
  }
};

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

export const protect = async (req, res, next) => {
  try {
    let jwtToken;
    // This is used to get token from postman
    const { authorization } = req.headers;
    if (authorization && authorization.startsWith("Bearer")) {
      jwtToken = authorization.split(" ")[1];
    }
    // This will be used to get token from browser
    // const jwtToken = req.cookies["jwtToken"];
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

export const deleteAccount = async (req, res, next) => {
  try {
    const { user } = req;
    // Delete the user
    await User.findByIdAndDelete(user._id);
    // Optionally, delete the user's habit list or any other related data
    await HabitList.findByIdAndDelete(user.habitListId);
    // Logout the user (if desired)
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
