import { TypedAction } from "redoodle";
import { Note } from "../notesTypes";
import { NotesById } from "./notesState";

export namespace NotesActions {
  export const setActiveId = TypedAction.define("notes::set-active-id")<string | undefined>();
  export const setQuery = TypedAction.define("notes::set-query")<string>();
  export const addNote = TypedAction.define("notes::add-note")<Note>();
  export const setNoteValue = TypedAction.define("notes::set-note-value")<SetNoteValuePayload>();

  export interface SetNoteValuePayload {
    id: string;
    value: string;
  }
}

export namespace NotesInternalActions {
  export const setNotes = TypedAction.define("internal-notes::set-notes")<NotesById>();
}
