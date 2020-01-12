import { TypedAction } from "redoodle";
import { TodoDate, TodoGroupsById, TodosDay, TodoStatus, TodoType } from "./todosTypes";

export namespace TodosActions {
  export const setActive = TypedAction.define("todos::set-active")<TodoDate | undefined>();
  export const initToday = TypedAction.defineWithoutPayload("todos::init-today")();
  export const addTodo = TypedAction.define("todos::add-todo")<AddTodoPayload>();
  export const removeTodo = TypedAction.define("todos::remove-todo")<RemoveTodoPayload>();
  export const setTodoStatus = TypedAction.define("todos::set-todo-status")<SetTodoStatusPayload>();

  export interface AddTodoPayload {
    value: string;
    type: TodoType;
  }

  export interface RemoveTodoPayload {
    id: string;
  }

  export interface SetTodoStatusPayload {
    id: string;
    status: TodoStatus;
  }
}

export namespace InternalTodosActions {
  export const setTodosDays = TypedAction.define("internal-todos::set-todos-days")<
    readonly TodosDay[]
  >();
  export const setGroups = TypedAction.define("internal-todos::set-groups")<TodoGroupsById>();
}
