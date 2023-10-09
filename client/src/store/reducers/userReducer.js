export const usersInitialState = {
  user: {},
  listId: "",
  isUserLoggedIn: false,
};

export const usersReducer = (state, action) => {
  switch (action.type) {
    case "REGISTER_USER":
      return {
        ...state,
        user: action.payload.user,
        listId: action.payload.user.habitListId,
        isUserLoggedIn: true,
      };

    case "LOGIN_USER":
      return {
        ...state,
        user: action.payload.user,
        listId: action.payload.user.habitListId,
        isUserLoggedIn: true,
      };

    /* case "LOGOUT_USER" :
      return{

      }

    case "DELETE_ACCOUNT":
      return{

      } */

    default:
      return state;
  }
};
