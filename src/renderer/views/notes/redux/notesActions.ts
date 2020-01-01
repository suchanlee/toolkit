import { TypedAction } from "redoodle";
import { Note } from "../notesTypes";

export namespace NotesActions {
  export const setActive = TypedAction.define("notes::set-active")<Note | undefined>();
}
