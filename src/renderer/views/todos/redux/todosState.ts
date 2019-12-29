import { Iso8601String } from "../../../types/types";
import { Todo } from "./todosTypes";

export interface TodosState {
  date: Iso8601String;
  todos: readonly Todo[];
}

export function createInitialTodosState(): TodosState {
  return {
    date: "" as Iso8601String,
    todos: []
  };
}
