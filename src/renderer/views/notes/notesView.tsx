import React from "react";
import { spawn } from "redux-saga/effects";
import { View } from "../../types/viewTypes";
import { Notes } from "./components/Notes";
import { notesReducer } from "./redux/notesReducer";
import { notesSaga } from "./redux/notesSaga";
import { createInitialNotesState, NOTES_STATE_KEY, NotesState } from "./redux/notesState";

export function createNotesView(): View<NotesState> {
  return {
    name: "Notes",
    element: <Notes />,
    redux: {
      stateKey: NOTES_STATE_KEY,
      initialState: createInitialNotesState(),
      reducer: notesReducer,
      saga: spawn(notesSaga)
    }
  };
}
