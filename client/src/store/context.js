import React, { createContext, useEffect, useReducer } from "react";
import { habitsInitialState, habitsReducer } from "./reducers/habitReducer";
import { usersInitialState, usersReducer } from "./reducers/userReducer";
import { getHabits } from "../apiCalls/habitApiCalls";

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

  useEffect(() => {
    getHabits(dispatchHabits, usersState.listId);
  }, []);

  return (
    <DataContext.Provider
      value={{ habitsState, dispatchHabits, usersState, dispatchUsers }}
    >
      {children}
    </DataContext.Provider>
  );
};
