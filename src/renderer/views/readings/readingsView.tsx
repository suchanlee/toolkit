import React from "react";
import { View } from "../../types/viewTypes";
import { Readings } from "./components/Readings";
import { readingsReducer } from "./redux/readingsReducer";
import { createInitialReadingsState, ReadingsState } from "./redux/readingsState";

export const ReadingsView: View<ReadingsState> = {
  name: "Readings",
  element: <Readings />,
  redux: {
    reducer: readingsReducer,
    initialState: createInitialReadingsState()
  }
};
