import { TypedAction } from "redoodle";
import { Note } from "../notesTypes";

export namespace NotesActions {
  export const setActive = TypedAction.define("notes::set-active")<Note | undefined>();
  export const setQuery = TypedAction.define("notes::set-query")<string>();
  export const addNote = TypedAction.define("notes::add-note")<Note>();
}
