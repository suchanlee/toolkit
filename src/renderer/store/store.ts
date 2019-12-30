import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
// tslint:disable-next-line: import-name
import createSagaMiddleware from "redux-saga";

import { rootReducer } from "../reducers/rootReducer";
import { rootSaga } from "../sagas/rootSaga";
import { createInitialRootState } from "../states/rootState";

const configureStore = () => {
  const sagaMiddleware = createSagaMiddleware();
  const enhancer = composeWithDevTools(applyMiddleware(sagaMiddleware));
  const store = createStore(rootReducer as any, createInitialRootState() as any, enhancer);
  sagaMiddleware.run(rootSaga);
  return store;
};

export const store = configureStore();
