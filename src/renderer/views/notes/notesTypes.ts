import { ArchivableEntry, EntryType, Iso8601String } from "../../types/types";

export interface Note extends ArchivableEntry {
  type: EntryType.NOTE;
  tags: readonly string[];
  lastModified: Iso8601String;
}

export type NotesById = {
  [id: string]: Note;
};

export interface NoteParts {
  title: string;
  summary: string;
}

export interface NoteIdentifier {
  title: string;
  id: string;
}
