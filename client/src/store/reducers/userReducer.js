export const usersInitialState = {
  data: [],
  listId: "6516ea8345752884008b65b6",
};

export const usersReducer = (state, action) => {
  switch (action.type) {
    case "FETCH_USERS_SUCCESS":
      return {
        data: action.payload,
      };

    default:
      return state;
  }
};
