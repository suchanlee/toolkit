import { Note } from "../notesTypes";

export interface NotesState {
  query: string;
  notes: readonly Note[];
  active: Note | undefined;
}

export function createInitialNotesState(): NotesState {
  return {
    query: "",
    notes: [],
    active: undefined
  };
}
