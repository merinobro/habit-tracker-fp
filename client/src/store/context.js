import React, { createContext, useEffect, useReducer } from "react";
import { habitsInitialState, habitsReducer } from "./reducers/habitReducer";
import { usersInitialState, usersReducer } from "./reducers/userReducer";
import { getHabits } from "../apiCalls/habitApiCalls";
import { getMyData } from "../apiCalls/usersApiCalls";

export const DataContext = createContext();

export const ContextProvider = ({ children }) => {
  const [habitsState, dispatchHabits] = useReducer(
    habitsReducer,
    habitsInitialState
  );

  const [usersState, dispatchUsers] = useReducer(
    usersReducer,
    usersInitialState
  );

  const { isUserLoggedIn, listId } = usersState;

  useEffect(() => {
    if (isUserLoggedIn && listId) {
      getHabits(dispatchHabits, listId);
    }
  }, [isUserLoggedIn, listId]);

  useEffect(() => {
    (async () => {
      const response = await getMyData();
      if (response && response.isAuthenticated) {
        dispatchUsers({ type: "LOGIN_USER", payload: response });
      }
    })();
  }, []);

  return (
    <DataContext.Provider
      value={{ habitsState, dispatchHabits, usersState, dispatchUsers }}
    >
      {children}
    </DataContext.Provider>
  );
};
