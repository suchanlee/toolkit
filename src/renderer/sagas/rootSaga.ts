import { all, Effect, spawn } from "redux-saga/effects";
import { persistenceSaga } from "./persistenceSaga";

export function* rootSaga() {
  const effects: Effect[] = [spawn(persistenceSaga)];

  yield all(effects);
}
