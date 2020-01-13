import React from "react";
import { spawn } from "redux-saga/effects";
import { View } from "../../types/viewTypes";
import { Todos } from "./components/Todos";
import { todosReducer } from "./redux/todosReducer";
import { todosSaga } from "./redux/todosSaga";
import { createInitialTodosState, TODOS_STATE_KEY, TodosState } from "./redux/todosState";

export function createTodosView(): View<TodosState> {
  return {
    name: "Todos",
    element: <Todos />,
    redux: {
      stateKey: TODOS_STATE_KEY,
      initialState: createInitialTodosState(),
      reducer: todosReducer,
      saga: spawn(todosSaga)
    }
  };
}
