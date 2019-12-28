import { AsyncValue } from "../async/asyncTypes";
import { asyncNotStarted } from "../async/asyncUtils";
import { KeyedByDate, Todo } from "../types/types";

export interface PersistedState {
  todos: AsyncValue<KeyedByDate<readonly Todo[]>>;
}

export function createInitialPersistedState(): PersistedState {
  return {
    todos: asyncNotStarted()
  };
}
