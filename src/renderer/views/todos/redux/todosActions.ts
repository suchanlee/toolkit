import { TypedAction } from "redoodle";
import { TodoDate, TodosDaysByDateStrs, TodoStatus, TodosViewOptions } from "./todosTypes";

export namespace TodosActions {
  export const setActive = TypedAction.define("todos::set-active")<TodoDate | undefined>();
  export const setSummary = TypedAction.define("todos::set-summary")<TodoDate | undefined>();
  export const setViewOptions = TypedAction.define("todos::set-view-options")<TodosViewOptions>();
  export const initToday = TypedAction.define("todos::init-today")<InitTodayPayload>();
  export const addTodo = TypedAction.define("todos::add-todo")<AddTodoPayload>();
  export const removeTodo = TypedAction.define("todos::remove-todo")<RemoveTodoPayload>();
  export const moveTodo = TypedAction.define("todos::move-todo")<MoveTodoPayload>();
  export const setTodoStatus = TypedAction.define("todos::set-todo-status")<SetTodoStatusPayload>();
  export const updateGroup = TypedAction.define("todos::update-group")<string>();
  export const moveGroup = TypedAction.define("todos::move-group")<MoveGroupPayload>();
  export const createGroup = TypedAction.define("todos::create-group")<CreateGroupPayload>();

  export interface InitTodayPayload {
    shouldInherit: boolean;
  }

  export interface AddTodoPayload {
    value: string;
    group?: string;
  }

  export interface RemoveTodoPayload {
    date: TodoDate;
    todoId: string;
  }

  export interface MoveTodoPayload {
    date: TodoDate;
    fromGroup: string | undefined;
    toGroup: string | undefined;
    fromLocalIndex: number;
    toLocalIndex: number;
  }

  export interface SetTodoStatusPayload {
    date: TodoDate;
    todoId: string;
    status: TodoStatus;
  }

  export interface UpdateGroupPayload {
    date: TodoDate;
    curGroup: string;
    newGroup: string;
  }

  export interface MoveGroupPayload {
    date: TodoDate;
    fromIndex: number;
    toIndex: number;
  }

  export interface CreateGroupPayload {
    date: TodoDate;
    name: string;
  }
}

export namespace InternalTodosActions {
  export const setTodos = TypedAction.define("internal-todos::set-todos-days")<{
    days?: TodosDaysByDateStrs;
    dateStrs?: readonly string[];
  }>();
}
