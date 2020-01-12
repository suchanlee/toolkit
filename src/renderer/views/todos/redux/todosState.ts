import { TodoDate, TodoGroupsById, TodosDaysByDateStrs } from "./todosTypes";

export interface TodosState {
  activeDate: TodoDate | undefined;
  days: TodosDaysByDateStrs;
  // always sorted in descending order
  dateStrs: readonly string[];
  groups: TodoGroupsById;
}

export function createInitialTodosState(): TodosState {
  return {
    activeDate: undefined,
    days: {},
    dateStrs: [],
    groups: {}
  };
}
