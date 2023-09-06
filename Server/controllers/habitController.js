import Habit from "../models/Habit.js";

// Create a new habit
export const createHabit = async (req, res) => {
  try {
    const { name, description, frequency } = req.body;

    // Create a new habit
    const habit = new Habit({
      name,
      description,
      frequency,
      userId: req.user.id, // Assuming user is authenticated and user data is stored in req.user
    });

    await habit.save();
    res.json(habit);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Get all habits for a user
export const getHabits = async (req, res) => {
  try {
    // Fetch habits for the authenticated user
    const habits = await Habit.find({ userId: req.user.id });
    res.json(habits);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Other habit-related operations like updating and deleting can be added here