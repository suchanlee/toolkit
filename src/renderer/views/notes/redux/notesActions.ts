import { TypedAction } from "redoodle";
import { ArchiveStatus } from "../../../types/types";
import { Note, NotesById } from "../notesTypes";

export namespace NotesActions {
  export const setActiveId = TypedAction.define("notes::set-active-id")<string | undefined>();
  export const addOpenedId = TypedAction.define("notes::add-opened-id")<string>();
  export const removeOpenedId = TypedAction.define("notes::remove-opened-id")<string>();
  export const setQuery = TypedAction.define("notes::set-query")<string>();
  export const addNote = TypedAction.define("notes::add-note")<Note>();
  export const removeNote = TypedAction.define("notes::remove-note")<RemoveNotePayload>();
  export const setNoteValue = TypedAction.define("notes::set-note-value")<SetNoteValuePayload>();
  export const setArchiveStatus = TypedAction.define("notes::set-reading-status")<
    SetStatusPayload
  >();
  export const setFilter = TypedAction.define("notes::set-filter")<ArchiveStatus>();

  export interface SetStatusPayload {
    id: string;
    status: ArchiveStatus;
  }

  export interface SetNoteValuePayload {
    id: string;
    value: string;
  }

  export interface RemoveNotePayload {
    id: string;
  }
}

export namespace NotesInternalActions {
  export const setNotes = TypedAction.define("internal-notes::set-notes")<NotesById>();
}
