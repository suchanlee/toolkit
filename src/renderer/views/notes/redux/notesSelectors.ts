import { sortBy, values } from "lodash-es";
import { createSelector } from "reselect";
import { RootState } from "../../../states/rootState";
import { normalizeString } from "../../../utils/stringUtils";

export const selectNotes = (state: RootState) => state.notes;
export const selectNotesNotes = (state: RootState) => state.notes.notes;
export const selectNotesActiveId = (state: RootState) => state.notes.activeId;
export const selectNotesQuery = (state: RootState) => state.notes.query;

export const selectNotesActiveNote = createSelector(
  selectNotesNotes,
  selectNotesActiveId,
  (notes, activeId) => {
    if (activeId != null) {
      return notes[activeId];
    } else {
      return undefined;
    }
  }
);

export const selectNotesHasActive = createSelector(selectNotesActiveId, active => active != null);

export const selectFilteredNotes = createSelector(
  selectNotesNotes,
  selectNotesQuery,
  (notes, query) => {
    const q = normalizeString(query);
    let filteredNotes = values(notes);

    if (q.length > 0) {
      filteredNotes = filteredNotes.filter(n => n.value.indexOf(q) > -1);
    }

    return sortBy(filteredNotes, note => -new Date(note.date).getTime());
  }
);
