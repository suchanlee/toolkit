import { Reducer } from "redoodle";
import { Effect } from "redux-saga/effects";

export interface View<S> {
  name: string;
  element: JSX.Element;
  redux?: ViewRedux<S>;
}

export interface ViewRedux<S> {
  reducer: Reducer<S>;
  initialState: S;
  saga?: Effect;
}
