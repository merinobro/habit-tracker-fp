import express from "express";
import {
    authMiddleware,
    checkUserRole,
} from "../middlewares/authMiddleware.js";
import {
    createHabit,
    getHabits,
    getHabitById,
    updateHabit,
    updateHabitById,
    deleteAllHabits,
    deleteHabitById,
} from "../controllers/habitListController.js";

const router = express.Router();

router
    .route("/:id")
    .post(createHabit)
    .get(getHabits)
    //.get(getHabitById)
    .put(updateHabit)
    .put(updateHabitById)
    //.delete(deleteAllHabits)
    .delete(deleteHabitById);

export default router;
