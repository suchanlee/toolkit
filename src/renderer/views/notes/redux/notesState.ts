import { NotesById } from "../notesTypes";

export interface NotesState {
  query: string;
  notes: NotesById;
  activeId: string | undefined;
}

export function createInitialNotesState(): NotesState {
  return {
    query: "",
    notes: {},
    activeId: undefined
  };
}
