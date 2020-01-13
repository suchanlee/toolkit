import { all, Effect } from "redux-saga/effects";
import { View } from "../types/viewTypes";

export function createRootSaga(views: readonly View<any, any>[]) {
  return function*() {
    const effects: Effect[] = [];
    for (const view of views) {
      if (view.redux?.saga != null) {
        effects.push(view.redux.saga);
      }
    }
    yield all(effects);
  };
}
