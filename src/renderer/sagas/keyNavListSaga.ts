import * as mousetrap from "mousetrap";
import { all, takeLeading } from "redux-saga/effects";
import { KeyNavListActions } from "../actions/keyNavListActions";

export function* keyNavListSaga() {
  const effects = [
    yield takeLeading(KeyNavListActions.registerListeners, registerKeyNavListeners),
    yield takeLeading(KeyNavListActions.deregisterListeners, deregisterKeyNavListeners)
  ];
  yield all(effects);
}

function* registerKeyNavListeners() {
  mousetrap.bind("up", () => yield put(KeyNavListActions.moveUp()));
  mousetrap.bind("down", () => yield put(KeyNavListActions.moveDown()));
  mousetrap.bind("enter", this.handleEnter);
}

function deregisterKeyNavListeners() {
  mousetrap.unbind("up");
  mousetrap.unbind("down");
}
