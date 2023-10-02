import axios from "axios";

//* ____________________________________________ Get all habits for a user _______________________________________

export const getHabits = async (dispatchHabits, listId) => {
  try {
    const response = await axios.get(
      `http://localhost:8000/habits/all/${listId}`
    );

    dispatchHabits({
      type: "FETCH_HABITS_SUCCESS",
      payload: response.data.data,
    });
  } catch (error) {
    console.error(error);
  }
};

//* ____________________________________________  Create new habit ____________________________________________

export const addHabit = async (dispatchHabits, habit, listId) => {
  try {
    const response = await axios.post(
      `http://localhost:8000/habits/${listId}`,
      habit
    );

    dispatchHabits({
      type: "ADD_HABIT_CARD",
      payload: response.data.data,
    });
  } catch (error) {
    console.error(error);
  }
};

//* ____________________________________________  Delete habit by ID ___________________________________________

export const deleteHabit = async (habitId, dispatchHabits, listId) => {
  try {
    console.log("api", habitId);
    const response = await axios.delete(
      `http://localhost:8000/habits/${listId}/${habitId}`
    );

    dispatchHabits({
      type: "DELETE_HABIT_CARD",
      payload: response.data.data,
    });
  } catch (error) {
    console.error(error);
  }
};

//* ____________________________________________  Update habit by ID ____________________________________________

export const updateHabit = async (habit, newTitle, dispatchHabits, listId) => {
  try {
    const response = await axios.put(`http://localhost:8000/habits/${listId}`, {
      habitId: habit._id,
      name: newTitle,
    });

    dispatchHabits({
      type: "UPDATE_HABIT_CARD",
      payload: response.data.data.habitList,
    });
  } catch (error) {
    console.error(error);
  }
};

//* ____________________________________________  Update progress __________________________________________________

export const updateProgress = async (habit, dispatchHabits, listId) => {
  try {
    const response = await axios.patch(
      `http://localhost:8000/habits/${listId}`,
      {
        habitId: habit._id,
        progress: habit.progress + 1,
        completed: true,
      }
    );

    dispatchHabits({
      type: "UPDATE_PROGRESS",
      payload: response.data.data,
    });
  } catch (error) {
    console.error(error);
  }
};
