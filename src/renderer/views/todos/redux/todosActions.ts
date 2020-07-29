import { TypedAction } from "redoodle";
import { TodoDate, TodoGroup, TodosDaysByDateStrs, TodoStatus } from "./todosTypes";

export namespace TodosActions {
  export const setActive = TypedAction.define("todos::set-active")<TodoDate | undefined>();
  export const setSummary = TypedAction.define("todos::set-summary")<TodoDate | undefined>();
  export const initToday = TypedAction.define("todos::init-today")<InitTodayPayload>();
  export const addTodo = TypedAction.define("todos::add-todo")<AddTodoPayload>();
  export const removeTodo = TypedAction.define("todos::remove-todo")<RemoveTodoPayload>();
  export const setTodoStatus = TypedAction.define("todos::set-todo-status")<SetTodoStatusPayload>();
  export const addGroup = TypedAction.define("todos::add-group")<string>();
  export const updateGroup = TypedAction.define("todos::update-group")<TodoGroup>();
  export const moveGroup = TypedAction.define("todos::move-group")<MoveGroupPayload>();
  export const removeGroup = TypedAction.define("todos::remove-group")<string>();

  export interface InitTodayPayload {
    shouldInherit: boolean;
  }

  export interface AddTodoPayload {
    value: string;
    groupId?: string;
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

  export interface MoveGroupPayload {
    id: string;
    direction: "up" | "down";
  }
}

export namespace InternalTodosActions {
  export const setTodos = TypedAction.define("internal-todos::set-todos-days")<{
    days?: TodosDaysByDateStrs;
    dateStrs?: readonly string[];
  }>();
  export const setGroups = TypedAction.define("internal-todos::set-groups")<readonly TodoGroup[]>();
}
