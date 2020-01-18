import { sortBy, values } from "lodash-es";
import { createSelector } from "reselect";
import { RootState } from "../../../states/rootState";
import { normalizeString } from "../../../utils/stringUtils";
import { NoteIdentifier } from "../notesTypes";
import { getNoteTitle } from "../utils/notesUtils";

export const selectNotes = (state: RootState) => state.notes;
export const selectNotesNotes = (state: RootState) => state.notes.notes;
export const selectNotesActiveId = (state: RootState) => state.notes.activeId;
export const selectNotesOpenedIds = (state: RootState) => state.notes.openedIds;
export const selectNotesQuery = (state: RootState) => state.notes.query;
export const selectNotesFilter = (state: RootState) => state.notes.filter;

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
  selectNotesFilter,
  (notes, query, filter) => {
    const q = normalizeString(query);
    let filteredNotes = values(notes).filter(n => n.archiveStatus === filter);

    if (q.length > 0) {
      filteredNotes = filteredNotes.filter(n => normalizeString(n.value).indexOf(q) > -1);
    }

    return sortBy(filteredNotes, note => -new Date(note.lastModified).getTime());
  }
);

export const selectOpenedNoteIdentifiers = createSelector(
  selectNotesNotes,
  selectNotesOpenedIds,
  (notes, openedIds) => {
    const openedNotes = openedIds.map(id => notes[id]);
    const identifers: NoteIdentifier[] = [];

    for (const openedNote of openedNotes) {
      if (openedNote != null) {
        identifers.push({
          title: getNoteTitle(openedNote),
          id: openedNote.id
        });
      }
    }

    return identifers;
  }
);
