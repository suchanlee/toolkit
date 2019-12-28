import { AsyncValue } from "../async/asyncTypes";
import { Todo, KeyedByDate } from "../types/types";
import { asyncNotStarted } from "../async/asyncUtils";

export interface PersistedState {
  todos: AsyncValue<KeyedByDate<readonly Todo[]>>;
}

export function createInitialPersistedState(): PersistedState {
  return {
    todos: asyncNotStarted()
  };
}
