import { TodoDate, TodoGroupsById, TodosDay } from "./todosTypes";

export interface TodosState {
  activeDate: TodoDate | undefined;
  todosDays: readonly TodosDay[];
  groups: TodoGroupsById;
}

export function createInitialTodosState(): TodosState {
  return {
    activeDate: undefined,
    todosDays: [],
    groups: {}
  };
}
