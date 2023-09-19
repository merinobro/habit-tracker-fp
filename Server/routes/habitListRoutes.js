import express from "express";

import {
  createHabit,
  getHabits,
  getHabitById,
  updateHabitById,
  deleteAllHabits,
  deleteHabitById,
} from "../controllers/habitListController.js";

const router = express.Router();

router.route("/all/:id").get(getHabits).delete(deleteAllHabits);

router
  .route("/:id")
  .post(createHabit)
  .get(getHabitById)
  .put(updateHabitById)
  .delete(deleteHabitById);

export default router;
