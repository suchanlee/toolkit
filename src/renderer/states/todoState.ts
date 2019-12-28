import { Todo, Iso8601String } from "../types/types";

export interface TodoState {
  date: Iso8601String;
  todos: readonly Todo[];
}
