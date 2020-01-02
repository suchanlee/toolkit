import { setWith, TypedReducer } from "redoodle";
import { NotesActions } from "./notesActions";
import { NotesState } from "./notesState";

export const notesReducer = TypedReducer.builder<NotesState>()
  .withHandler(NotesActions.setActive.TYPE, (state, active) => {
    return setWith(state, { active });
  })
  .withHandler(NotesActions.setQuery.TYPE, (state, query) => {
    return setWith(state, { query });
  })
  .withHandler(NotesActions.addNote.TYPE, (state, note) => {
    return setWith(state, {
      notes: [note, ...state.notes]
    });
  })
  .build();
