export const habitsInitialState = {
  habits: [],
};

export const habitsReducer = (state, action) => {
  switch (action.type) {
    case "FETCH_HABITS_SUCCESS":
      return {
        habits: action.payload.habitList,
      };

    case "ADD_HABIT_CARD":
      return {
        ...state,
        habits: [...state.habits, action.payload],
      };

    case "UPDATE_HABIT_CARD":
      return {
        ...state,
        habits: state.habits.map((habit) =>
          habit._id === action.payload._id ? action.payload : habit
        ),
      };

    case "DELETE_HABIT_CARD":
      return {
        ...state,
        habits: state.habits.filter((habit) => habit._id !== action.payload),
      };

    case "UPDATE_PROGRESS":
      return {
        habits: action.payload,
      };

    default:
      return state;
  }
};
