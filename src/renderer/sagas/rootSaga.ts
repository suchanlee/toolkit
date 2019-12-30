import { all, Effect, spawn } from "redux-saga/effects";
import { readingsSaga } from "../views/readings/redux/readingsSaga";
import { persistenceSaga } from "./persistenceSaga";

export function* rootSaga() {
  const effects: Effect[] = [spawn(persistenceSaga), spawn(readingsSaga)];

  yield all(effects);
}
