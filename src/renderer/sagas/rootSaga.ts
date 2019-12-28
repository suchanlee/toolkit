import { all, spawn, Effect } from "redux-saga/effects";
import { persistenceSaga } from "./persistenceSaga";

export function* rootSaga() {
  const effects: Effect[] = [spawn(persistenceSaga)];

  yield all(effects);
}
