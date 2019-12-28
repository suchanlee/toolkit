import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
// tslint:disable-next-line: import-name
import createSagaMiddleware from "redux-saga";

import { rootReducer } from "../reducers/rootReducer";
import { createInitialRootState } from "../states/rootState";

const configureStore = () => {
  const middlewares: any[] = [];
  const enhancer = composeWithDevTools(applyMiddleware(...middlewares, createSagaMiddleware()));
  return createStore(rootReducer as any, createInitialRootState() as any, enhancer);
};

export const store = configureStore();
