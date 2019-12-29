import { Entry, EntryType } from "../../../types/types";

export interface Todo extends Entry {
  type: EntryType.TODO;
  status: TodoStatus;
}

export enum TodoStatus {
  NOT_STARTED = "NOT_STARTED",
  IN_PROGRESS = "IN_PROGRESS",
  FINISHED = "FINISHED"
}
