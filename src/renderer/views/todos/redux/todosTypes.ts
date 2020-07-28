import { Entry, EntryType } from "../../../types/types";

export interface TodoGroup {
  id: string;
  name: string;
}

export interface Todo extends Entry {
  groupId?: string;
  type: EntryType.TODO;
  status: TodoStatus;
}

export interface TodoDate {
  year: number;
  month: number;
  day: number;
}

export interface TodosDay {
  date: TodoDate;
  todos: readonly Todo[];
}

export type TodosDaysByDateStrs = {
  [id: string]: TodosDay;
};

export type TodoGroupsById = {
  [id: string]: TodoGroup;
};

export enum TodoStatus {
  NOT_STARTED = "NOT_STARTED",
  IN_PROGRESS = "IN_PROGRESS",
  FINISHED = "FINISHED"
}

export interface PersistedTodos {
  todosDays: readonly TodosDay[];
  groups: readonly TodoGroup[];
}
