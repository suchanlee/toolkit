import { Entry, EntryType, Iso8601String } from "../../types/types";

export interface Note extends Entry {
  type: EntryType.NOTE;
  tags: readonly string[];
  lastModified: Iso8601String;
}

export interface NoteParts {
  title: string;
  summary: string;
}
