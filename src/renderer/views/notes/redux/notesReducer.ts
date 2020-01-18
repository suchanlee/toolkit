import { setWith, TypedReducer } from "redoodle";
import { NotesActions, NotesInternalActions } from "./notesActions";
import { NotesState } from "./notesState";

export const notesReducer = TypedReducer.builder<NotesState>()
  .withHandler(NotesActions.setActiveId.TYPE, (state, activeId) => {
    if (activeId != null && !state.openedIds.includes(activeId)) {
      const openedIds = [...state.openedIds, activeId];
      return setWith(state, { activeId, openedIds });
    }
    return setWith(state, { activeId });
  })
  .withHandler(NotesActions.setQuery.TYPE, (state, query) => {
    return setWith(state, { query });
  })
  .withHandler(NotesActions.setFilter.TYPE, (state, filter) => {
    return setWith(state, { filter });
  })
  .withHandler(NotesActions.addOpenedId.TYPE, (state, noteId) => {
    if (!state.openedIds.includes(noteId)) {
      const openedIds = [...state.openedIds, noteId];
      return setWith(state, { openedIds });
    }
    return state;
  })
  .withHandler(NotesActions.removeOpenedId.TYPE, (state, noteId) => {
    if (state.openedIds.includes(noteId)) {
      const openedIds = state.openedIds.filter(id => id !== noteId);
      return setWith(state, { openedIds });
    }
    return state;
  })
  .withHandler(NotesInternalActions.setNotes.TYPE, (state, notes) => {
    return setWith(state, { notes });
  })
  .build();
