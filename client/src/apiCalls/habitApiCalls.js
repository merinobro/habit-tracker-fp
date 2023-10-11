/* import axios from "axios";
axios.defaults.withCredentials = true;

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

export const updateProgress = async (
  { _id, completed, progress },
  dispatchHabits,
  listId
) => {
  try {
    const response = await axios.patch(
      `http://localhost:8000/habits/${listId}`,
      {
        habitId: _id,
        progress: completed ? progress - 1 : progress + 1,
        completed: !completed,
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
 */

import axios from "axios";
axios.defaults.withCredentials = true;

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
    // Dispatching the new habit directly to the state
    dispatchHabits({
      type: "ADD_HABIT_CARD",
      payload: response.data.data.habit, // Assuming the new habit is returned in response.data.data.habit
    });
  } catch (error) {
    console.error(error);
  }
};

//* ____________________________________________  Delete habit by ID ___________________________________________

export const deleteHabit = async (habitId, dispatchHabits, listId) => {
  try {
    await axios.delete(`http://localhost:8000/habits/${listId}/${habitId}`);
    // Dispatching the id of the deleted habit to remove it from the state
    dispatchHabits({
      type: "DELETE_HABIT_CARD",
      payload: habitId,
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
    // Dispatching the updated habit directly to the state
    dispatchHabits({
      type: "UPDATE_HABIT_CARD",
      payload: response.data.data.habit, // Assuming the updated habit is returned in response.data.data.habit
    });
  } catch (error) {
    console.error(error);
  }
};

//* ____________________________________________  Update progress __________________________________________________

export const updateProgress = async (
  { _id, completed, progress },
  dispatchHabits,
  listId
) => {
  try {
    const response = await axios.patch(
      `http://localhost:8000/habits/${listId}`,
      {
        habitId: _id,
        progress: completed ? progress : progress + 1,
        completed: !completed,
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
