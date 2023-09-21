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


// GET /all/:id - Get all habits for a specific user
// DELETE /all/:id - Delete all habits for a specific user
router.route("/all/:id").get(getHabits).delete(deleteAllHabits);


// POST /:id - Create a new habit for a specific user
// GET /:id - Get a specific habit by ID
// PUT /:id - Update a specific habit by ID
// DELETE /:id - Delete a specific habit by ID
router
  .route("/:id")
  .post(createHabit)  // Controller function to create a habit
  .get(getHabitById)  // Controller function to retrieve a specific habit
  .put(updateHabitById)  // Controller function to update a specific habit
  .delete(deleteHabitById);  // Controller function to delete a specific habit

export default router;

//^This provides a clear overview of each route's purpose and the HTTP methods they support. Frontend developers can use this information to understand how to make requests to these endpoints and handle responses from the server.