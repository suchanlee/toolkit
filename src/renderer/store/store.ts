import { applyMiddleware, createStore } from "redux";
// tslint:disable-next-line: import-name
import createSagaMiddleware from "redux-saga";
import { composeWithDevTools } from "redux-devtools-extension";

import { rootReducer } from "../reducers/rootReducer";
import { createInitialRootState } from "../states/rootState";

const configureStore = () => {
  const middlewares: any[] = [];
  const enhancer = composeWithDevTools(applyMiddleware(...middlewares, createSagaMiddleware()));
  return createStore(rootReducer as any, createInitialRootState() as any, enhancer);
};

export const store = configureStore();
