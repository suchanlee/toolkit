import { Entry, EntryType } from "../../../types/types";

export interface Todo extends Entry {
  group?: string;
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
  groups: readonly string[];
}

export type TodosDaysByDateStrs = {
  [id: string]: TodosDay;
};

export enum TodoStatus {
  NOT_STARTED = "NOT_STARTED",
  IN_PROGRESS = "IN_PROGRESS",
  FINISHED = "FINISHED"
}

export interface PersistedTodos {
  todosDays: readonly TodosDay[];
}

export interface TodosViewOptions {
  isFinishedHidden: boolean;
}
