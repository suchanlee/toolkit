import { TypedAction } from "redoodle";
import { TodoDate, TodoGroupsById, TodosDaysByDateStrs, TodoStatus } from "./todosTypes";

export namespace TodosActions {
  export const setActive = TypedAction.define("todos::set-active")<TodoDate | undefined>();
  export const setSummary = TypedAction.define("todos::set-summary")<TodoDate | undefined>();
  export const initToday = TypedAction.define("todos::init-today")<InitTodayPayload>();
  export const addTodo = TypedAction.define("todos::add-todo")<AddTodoPayload>();
  export const removeTodo = TypedAction.define("todos::remove-todo")<RemoveTodoPayload>();
  export const setTodoStatus = TypedAction.define("todos::set-todo-status")<SetTodoStatusPayload>();

  export interface InitTodayPayload {
    shouldInherit: boolean;
  }

  export interface AddTodoPayload {
    value: string;
  }

  export interface RemoveTodoPayload {
    date: TodoDate;
    todoId: string;
  }

  export interface SetTodoStatusPayload {
    date: TodoDate;
    todoId: string;
    status: TodoStatus;
  }
}

export namespace InternalTodosActions {
  export const setTodos = TypedAction.define("internal-todos::set-todos-days")<{
    days?: TodosDaysByDateStrs;
    dateStrs?: readonly string[];
  }>();
  export const setGroups = TypedAction.define("internal-todos::set-groups")<TodoGroupsById>();
}
