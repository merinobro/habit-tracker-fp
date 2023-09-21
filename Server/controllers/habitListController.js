
//successHandler middleware to handle successful responses
import successHandler from "../middlewares/successHandler.js";
// HabitList model
import HabitList from "../models/HabitList.js";

//~------------------------------------------------------------
//^ Get all habits for a user
/* 
    GET http://localhost:8000/habits/all/[listID]
*/
export const getHabits = async (req, res, next) => {
  try {
     // Find the HabitList by its ID and populate the habitList field
    const habitList = await HabitList.findById(req.params.id).populate("habitList");
    successHandler(res, 200, habitList);
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
      // Delete all habits from the database
    await HabitList.deleteMany({});

     // Respond with a successful status
    successHandler(res, 200);
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
      // Add a new habit to the specified HabitList
    const habitList = await HabitList.findByIdAndUpdate(
      req.params.id,
      { $push: { habitList: req.body } },
      { upsert: true, new: true }
    ).populate("habitList");

    // Respond with a successful status and the updated habitList
    successHandler(res, 200, habitList);
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

    // Find the HabitList by its ID
    const list = await HabitList.findById(req.params.id);

    // Find the specific habit within the HabitList based on the provided habitId
    const habit = list.habitList.find(
      (h) => h._id.toString() === req.body.habitId
    );

    successHandler(res, 200, habit);
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
    const { name, description, frequency, habitId } = req.body;

     // Update the habit within the specified HabitList
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

     // Check if the habit was found and updated
    if (!updatedHabit) {
      return res.status(404).json({ message: "Habit not found" });
    }

    // Respond with a successful status and the updated habitList
    successHandler(res, 200, updatedHabit);
  } catch (err) {
    next(err);
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
    // Delete the specified habit from the HabitList
    const deleted = await HabitList.findByIdAndUpdate(
      req.params.id,
      { $pull: { habitList: { _id: req.body.habitId } } },
      { new: true }
    ).populate("habitList");

    // Respond with a successful status and the updated habitList
    successHandler(res, 200, deleted);
  } catch (err) {
    next(err);
  }
};
