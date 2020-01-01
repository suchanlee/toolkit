import { TypedReducer } from "redoodle";
import { NotesState } from "./notesState";

export const notesReducer = TypedReducer.builder<NotesState>().build();
