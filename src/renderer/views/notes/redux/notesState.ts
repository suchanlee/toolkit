import { Note } from "../notesTypes";

export interface NotesState {
  query: string;
  notes: NotesById;
  activeId: string | undefined;
}

export type NotesById = {
  [id: string]: Note;
};

export function createInitialNotesState(): NotesState {
  return {
    query: "",
    notes: {},
    activeId: undefined
  };
}
