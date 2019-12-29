import { TypedAction } from "redoodle";
import { TodosState } from "./todosState";

export namespace TodoActions {}

export namespace InternalTodoActions {
  export const setTodos = TypedAction.define("internal-todo::set-todos")<TodosState>();
}
