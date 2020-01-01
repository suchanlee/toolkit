import { v4 as uuid } from "uuid";
import { EntryType, Iso8601String } from "../../types/types";
import { Note } from "./notesTypes";

export function createNote(args: { value: string; tags: readonly string[] }): Note {
  return {
    id: uuid(),
    type: EntryType.NOTE,
    value: args.value,
    tags: args.tags,
    lastModified: new Date().toISOString() as Iso8601String,
    date: new Date().toISOString() as Iso8601String
  };
}
