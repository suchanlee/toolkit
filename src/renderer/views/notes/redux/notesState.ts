import { ArchiveStatus } from "../../../types/types";
import { NotesById } from "../notesTypes";

export interface NotesState {
  query: string;
  notes: NotesById;
  activeId: string | undefined;
  filter: ArchiveStatus;
}

export function createInitialNotesState(): NotesState {
  return {
    query: "",
    notes: {},
    activeId: undefined,
    filter: ArchiveStatus.ACTIVE
  };
}
