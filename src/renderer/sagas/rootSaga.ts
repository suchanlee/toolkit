import { all, Effect, spawn } from "redux-saga/effects";
import { notesSaga } from "../views/notes/redux/notesSaga";
import { readingsSaga } from "../views/readings/redux/readingsSaga";
import { todosSaga } from "../views/todos/redux/todosSaga";

export function* rootSaga() {
  const effects: Effect[] = [spawn(readingsSaga), spawn(notesSaga), spawn(todosSaga)];

  yield all(effects);
}
