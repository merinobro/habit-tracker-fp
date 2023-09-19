import successHandler from "../middlewares/successHandler.js";
import HabitList from "../models/HabitList.js";

// Get all habits for a user
/* 
    GET http://localhost:8000/habits/all/[listID]
*/
export const getHabits = async (req, res, next) => {
  try {
    const habitList = await HabitList.findById(req.params.id).populate("habitList");
    successHandler(res, 200, habitList);
  } catch (err) {
    next(err);
  }
};

// Delete all habits
/* 
    DELETE http://localhost:8000/habits/all/[listID]
*/
export const deleteAllHabits = async (req, res, next) => {
  try {
    await HabitList.deleteMany({});
    successHandler(res, 200);
  } catch (err) {
    next(err);
  }
};

// Create a new habit
/* 
    POST http://localhost:8000/habits/[listID]
*/
export const createHabit = async (req, res, next) => {
  try {
    const habitList = await HabitList.findByIdAndUpdate(
      req.params.id,
      { $push: { habitList: req.body } },
      { upsert: true, new: true }
    ).populate("habitList");
    successHandler(res, 200, habitList);
  } catch (err) {
    next(err);
  }
};

//Get a habit by ID
/* 
    GET http://localhost:8000/habits/[listID]

    habit id need to be sent via body
*/
export const getHabitById = async (req, res, next) => {
  try {
    const list = await HabitList.findById(req.params.id);

    const habit = list.habitList.find(
      (h) => h._id.toString() === req.body.habitId
    );

    successHandler(res, 200, habit);
  } catch (err) {
    next(err);
  }
};

// Update a habit by ID
/* 
    PUT http://localhost:8000/habits/[listID]

    habit id need to be sent via body
*/


export const updateHabitById = async (req, res, next) => {
  try {
    const { name, description, frequency, habitId } = req.body;

    const updatedHabit = await HabitList.findByIdAndUpdate(
      req.params.id,

      {
        $set: {
          "habitList.$[item].name": name,
          "habitList.$[item].description": description,
          "habitList.$[item].frequency": frequency,
        },
      },

      { arrayFilters: [{ "item._id": habitId }], new: true }
    ).populate("habitList");

    if (!updatedHabit) {
      return res.status(404).json({ message: "Habit not found" });
    }

    successHandler(res, 200, updatedHabit);
  } catch (err) {
    next(err);
  }
};

// Delete a habit by ID
/* 
    DELETE http://localhost:8000/habits/[listID]

    habit id need to be sent via body
*/
export const deleteHabitById = async (req, res, next) => {
  try {
    const deleted = await HabitList.findByIdAndUpdate(
      req.params.id,
      { $pull: { habitList: { _id: req.body.habitId } } },
      { new: true }
    ).populate("habitList");

    successHandler(res, 200, deleted);
  } catch (err) {
    next(err);
  }
};
