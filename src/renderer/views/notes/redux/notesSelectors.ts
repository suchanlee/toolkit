import { createSelector } from "reselect";
import { RootState } from "../../../states/rootState";

export const selectNotes = (state: RootState) => state.notes;
export const selectNotesNotes = (state: RootState) => state.notes.notes;
export const selectNotesActive = (state: RootState) => state.notes.active;

export const selectNotesHasActive = createSelector(selectNotesActive, active => active != null);
