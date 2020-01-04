import { v4 as uuid } from "uuid";
import { ArchiveStatus, EntryType, Iso8601String } from "../../types/types";
import { Note } from "./notesTypes";

export function createNote(args: {
  value: string;
  tags: readonly string[];
  archiveStatus?: ArchiveStatus;
}): Note {
  return {
    id: uuid(),
    type: EntryType.NOTE,
    value: args.value,
    tags: args.tags,
    lastModified: new Date().toISOString() as Iso8601String,
    date: new Date().toISOString() as Iso8601String,
    archiveStatus: args.archiveStatus ?? ArchiveStatus.ACTIVE
  };
}
