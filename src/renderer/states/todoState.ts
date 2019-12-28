import { Iso8601String, Todo } from "../types/types";

export interface TodoState {
  date: Iso8601String;
  todos: readonly Todo[];
}
