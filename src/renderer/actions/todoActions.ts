import { TypedAction } from "redoodle";
import { TodoState } from "../states/todoState";

export namespace TodoActions {}

export namespace InternalTodoActions {
  export const setTodos = TypedAction.define("internal-todo::set-todos")<TodoState>();
}
