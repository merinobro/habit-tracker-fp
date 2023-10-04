import express from "express";

import {
  createHabit,
  getHabits,
  getHabitById,
  updateHabitById,
  deleteAllHabits,
  deleteHabitById,
  updateProgress,
} from "../controllers/habitListController.js";

const router = express.Router();

router.route("/all/:id").get(getHabits).delete(deleteAllHabits);

router
  .route("/:id")
  .post(createHabit)
  .get(getHabitById)
  .put(updateHabitById)
  .patch(updateProgress);

router.route("/:listId/:habitId").delete(deleteHabitById);

export default router;
