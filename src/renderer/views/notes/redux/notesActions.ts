import { TypedAction } from "redoodle";
import { ArchiveStatus } from "../../../types/types";
import { Note, NotesById } from "../notesTypes";

export namespace NotesActions {
  export const setActiveId = TypedAction.define("notes::set-active-id")<string | undefined>();
  export const addOpenedId = TypedAction.define("notes::add-opened-id")<string>();
  export const removeOpenedId = TypedAction.define("notes::remove-opened-id")<string>();
  export const setQuery = TypedAction.define("notes::set-query")<string>();
  export const addNote = TypedAction.define("notes::add-note")<Note>();
  export const setNoteValue = TypedAction.define("notes::set-note-value")<SetNoteValuePayload>();
  export const setArchiveStatus = TypedAction.define("notes::set-reading-status")<
    SetStatusPayload
  >();
  export const setFilter = TypedAction.define("notes::set-filter")<ArchiveStatus>();
  export const deleteNote = TypedAction.define("notes::delete-note")<DeleteNotePayload>();
  export const deleteNotesIfEmpty = TypedAction.define("notes::delete-notes-if-empty")<
    DeleteNotesIfEmptyPayload
  >();

  export interface SetStatusPayload {
    id: string;
    status: ArchiveStatus;
  }

  export interface SetNoteValuePayload {
    id: string;
    value: string;
  }

  export interface DeleteNotePayload {
    id: string;
  }

  export interface DeleteNotesIfEmptyPayload {
    ids: readonly string[];
  }
}

export namespace NotesInternalActions {
  export const setNotes = TypedAction.define("internal-notes::set-notes")<NotesById>();
}
