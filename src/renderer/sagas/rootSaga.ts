import { all, Effect, spawn } from "redux-saga/effects";
import { View } from "../types/viewTypes";
import { bannerSaga } from "./bannerSaga";

export function createRootSaga(views: readonly View<any, any>[]) {
  return function*() {
    const effects: Effect[] = [spawn(bannerSaga)];
    for (const view of views) {
      if (view.redux?.saga != null) {
        effects.push(view.redux.saga);
      }
    }
    yield all(effects);
  };
}
