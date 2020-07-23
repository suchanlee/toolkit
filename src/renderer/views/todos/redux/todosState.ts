import { TodoDate, TodoGroupsById, TodosDaysByDateStrs } from "./todosTypes";

export interface TodosState {
  activeDate: TodoDate | undefined;
  days: TodosDaysByDateStrs;
  // always sorted in descending order
  dateStrs: readonly string[];
  groups: TodoGroupsById;
}

export const TODOS_STATE_KEY = "todos" as "todos";

export type WithTodosState = {
  [TODOS_STATE_KEY]: TodosState;
};

export function createInitialTodosState(): TodosState {
  return {
    activeDate: undefined,
    days: {},
    dateStrs: [],
    groups: {}
  };
}
