import React from "react";
import { View } from "../../types/viewTypes";
import { Todos } from "./components/Todos";
import { TodosState } from "./redux/todosState";

export const TodosView: View<TodosState> = {
  name: "Todos",
  element: <Todos />
};
