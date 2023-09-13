import express from "express";
import { authMiddleware, checkUserRole, } from "../middlewares/authMiddleware.js";
import { createHabit, getHabits } from "../controllers/habitController.js";
const router = express.Router();
// POST /habits - Create a new habit
router.post("/:id", createHabit);
// GET /habits - Get all habits for the authenticated user
router.get("/", getHabits);
// Add other habit-related routes (e.g., updating and deleting habits) here
export default router;







