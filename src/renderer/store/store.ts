import { applyMiddleware, createStore, Store } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";

import { rootReducer, RootState } from "../reducers/rootReducer";

const configureStore = (initialState?: RootState): Store<RootState | undefined> => {
  const middlewares: any[] = [];
  const enhancer = composeWithDevTools(applyMiddleware(...middlewares));
  return createStore(rootReducer, initialState, enhancer);
};

if (typeof (module as NodeModule).hot !== "undefined") {
  (module as NodeModule).hot?.accept("../reducers", () =>
    store.replaceReducer(require("../reducers").rootReducer)
  );
}

export const store = configureStore();
