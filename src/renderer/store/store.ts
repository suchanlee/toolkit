import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
// tslint:disable-next-line: import-name
import createSagaMiddleware from "redux-saga";

import { createRootReducer } from "../reducers/rootReducer";
import { createRootSaga } from "../sagas/rootSaga";
import { createInitialRootState } from "../states/rootState";
import { Views } from "../views/view";

const configureStore = () => {
  const sagaMiddleware = createSagaMiddleware();
  const enhancer = composeWithDevTools(applyMiddleware(sagaMiddleware));
  const store = createStore(
    createRootReducer(Views) as any,
    createInitialRootState(Views) as any,
    enhancer
  );
  sagaMiddleware.run(createRootSaga(Views));
  return store;
};

export const store = configureStore();
