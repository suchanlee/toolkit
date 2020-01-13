import { Reducer } from "redoodle";
import { Effect } from "redux-saga/effects";

export interface View<S, K extends string = string> {
  name: string;
  element: JSX.Element;
  redux?: ViewRedux<S, K>;
}

export interface ViewRedux<S, K extends string> {
  stateKey: K;
  reducer: Reducer<S>;
  initialState: S;
  saga?: Effect;
}
