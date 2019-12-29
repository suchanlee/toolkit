import { AsyncValue } from "../async/asyncTypes";
import { asyncNotStarted } from "../async/asyncUtils";
import { KeyedByDate } from "../types/types";
import { Todo } from "../views/todos/redux/todosTypes";

export interface PersistedState {
  todos: AsyncValue<KeyedByDate<readonly Todo[]>>;
}

export function createInitialPersistedState(): PersistedState {
  return {
    todos: asyncNotStarted()
  };
}
