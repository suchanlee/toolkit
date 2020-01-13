import React from "react";
import { spawn } from "redux-saga/effects";
import { View } from "../../types/viewTypes";
import { Readings } from "./components/Readings";
import { readingsReducer } from "./redux/readingsReducer";
import { readingsSaga } from "./redux/readingsSaga";
import {
  createInitialReadingsState,
  READINGS_STATE_KEY,
  ReadingsState
} from "./redux/readingsState";

export function createReadingsView(): View<ReadingsState, typeof READINGS_STATE_KEY> {
  return {
    name: "Readings",
    element: <Readings />,
    redux: {
      stateKey: READINGS_STATE_KEY,
      reducer: readingsReducer,
      initialState: createInitialReadingsState(),
      saga: spawn(readingsSaga)
    }
  };
}
