import successHandler from "../middlewares/successHandler.js";
import HabitList from "../models/HabitList.js";

// Create a new habit
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
// Get all habits for a user
export const getHabits = async (req, res, next) => {
    try {
        const habitList = await HabitList.findById(req.params.id);

        successHandler(res, 200, habitList);
    } catch (err) {
        next(err);
    }
};

//Get a habit by ID
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

// Update a habit
export const updateHabit = async (req, res, next) => {
    try {
        const { name, description, frequency } = req.body;

        const criteria = {
            name: req.body.name,
        };

        const updatedHabit = await HabitList.findOneAndUpdate(
            criteria,
            {
                name,
                description,
                frequency,
            },
            { new: true }
        );

        if (!updatedHabit) {
            return res.status(404).json({ message: "Habit not found" });
        }

        successHandler(res, 200, updatedHabit);
    } catch (err) {
        next(err);
    }
};

// Update a habit by ID
export const updateHabitById = async (req, res, next) => {
    try {
        const { name, description, frequency } = req.body;

        const updatedHabit = await HabitList.findByIdAndUpdate(
            req.params.id,
            { name, description, frequency },
            { new: true }
        );

        if (!updatedHabit) {
            return res.status(404).json({ message: "Habit not found" });
        }

        successHandler(res, 200, updatedHabit);
    } catch (err) {
        next(err);
    }
};

// Delete a habit by ID
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

// Delete all habits
export const deleteAllHabits = async (req, res, next) => {
    try {
        await HabitList.deleteMany({});
        successHandler(res, 200);
    } catch (err) {
        next(err);
    }
};
