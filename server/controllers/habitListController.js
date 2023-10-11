//successHandler middleware to handle successful responses
import successHandler from "../middlewares/successHandler.js";
import HabitList from "../models/HabitList.js";

//~------------------------------------------------------------
//^ Get all habits for a user
/* 
    GET http://localhost:8000/habits/all/[listID]
*/
export const getHabits = async (req, res, next) => {
  try {
    // Find the HabitList by its ID and populate the habitList field
    const habitList = await HabitList.findById(req.params.id).populate(
      "habitList"
    );
    successHandler(res, 200, habitList);
  } catch (err) {
    next(err);
  }
};

//~------------------------------------------------------------------------
//^ Create a new habit
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

    // Extract the newly added habit
    const newHabit = habitList.habitList.find(
      (habit) => habit.name === req.body.name
    );

    successHandler(res, 200, { habit: newHabit });
  } catch (err) {
    next(err);
  }
};

//~--------------------------------------------------------------------
//^ Update a habit by ID
/* 
    PUT http://localhost:8000/habits/[listID]

    habit id need to be sent via body
*/

export const updateHabitById = async (req, res, next) => {
  try {
    // Extract relevant data for updating the habit
    const { name, habitId } = req.body;

    const updatedHabitList = await HabitList.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          "habitList.$[item].name": name,
        },
      },
      { arrayFilters: [{ "item._id": habitId }], new: true }
    ).populate("habitList");

    if (!updatedHabitList) {
      return res.status(404).json({ message: "Habit not found" });
    }

    // Extract the updated habit
    const updatedHabit = updatedHabitList.habitList.find(
      (habit) => habit._id.toString() === habitId
    );

    successHandler(res, 200, { habit: updatedHabit });
  } catch (err) {
    next(err);
  }
};

//~------------------------------------------------------------------------------
//PUT http://localhost:8000/habits/[listID]
export const updateProgress = async (req, res, next) => {
  try {
    const { progress, habitId, completed } = req.body;

    const habitList = await HabitList.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          "habitList.$[item].progress": progress,
          "habitList.$[item].completed": completed,
        },
      },
      { arrayFilters: [{ "item._id": habitId }], new: true }
    ).populate("habitList");

    successHandler(res, 200, habitList);
  } catch (error) {
    next(error);
  }
};

//~------------------------------------------------------------------------------
//^ Delete a habit by ID
/* 
    DELETE http://localhost:8000/habits/[listID]

    habit id need to be sent via body
*/
export const deleteHabitById = async (req, res, next) => {
  try {
    const updatedHabitList = await HabitList.findByIdAndUpdate(
      req.params.listId,
      { $pull: { habitList: { _id: req.params.habitId } } },
      { new: true }
    ).populate("habitList");

    // Instead of returning the entire updated habit list, just send the deleted habit's ID for confirmation.
    successHandler(res, 200, { deletedHabitId: req.params.habitId });
  } catch (err) {
    next(err);
  }
};

//~---------------------------------------------------------------------
//^ Delete all habits
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

//~---------------------------------------------------------------------------
//^ Get a habit by ID
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
