import { setWith, TypedReducer } from "redoodle";
import { NotesActions, NotesInternalActions } from "./notesActions";
import { NotesState } from "./notesState";

export const notesReducer = TypedReducer.builder<NotesState>()
  .withHandler(NotesActions.setActiveId.TYPE, (state, activeId) => {
    return setWith(state, { activeId });
  })
  .withHandler(NotesActions.setQuery.TYPE, (state, query) => {
    return setWith(state, { query });
  })
  .withHandler(NotesActions.setFilter.TYPE, (state, filter) => {
    return setWith(state, { filter });
  })
  .withHandler(NotesInternalActions.setNotes.TYPE, (state, notes) => {
    return setWith(state, { notes });
  })
  .build();
