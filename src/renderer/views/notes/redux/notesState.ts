import { ArchiveStatus } from "../../../types/types";
import { NotesById } from "../notesTypes";

export interface NotesState {
  query: string;
  notes: NotesById;
  activeId: string | undefined;
  openedIds: readonly string[];
  filter: ArchiveStatus;
}

export const NOTES_STATE_KEY = "notes" as "notes";

export type WithNotesState = {
  [NOTES_STATE_KEY]: NotesState;
};

export function createInitialNotesState(): NotesState {
  return {
    query: "",
    notes: {},
    activeId: undefined,
    openedIds: [],
    filter: ArchiveStatus.ACTIVE
  };
}
