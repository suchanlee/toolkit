import React from "react";
import { View } from "../../types/viewTypes";
import { TodosState } from "./redux/todosState";

export const TodosView: View<TodosState> = {
  name: "Todos",
  element: <div>Todos</div>
};
