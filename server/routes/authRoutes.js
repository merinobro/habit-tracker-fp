import express from "express";
import {
  registerUser,
  loginUser,
  logout,
  deleteAccount,
  protect,
  getMe,
} from "../controllers/authController.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/logout", logout);

router.use(protect);
router.get("/me", getMe);

router.delete("/delete-account", deleteAccount);

export default router;
