import { ArchivableEntry, ArchiveStatus, EntryType } from "../../types/types";

export interface Reading extends ArchivableEntry {
  type: EntryType.READING;
  title: string;
  description?: string;
  imageUrl?: string;
}

export type ReadingStatusFilter = ArchiveStatus | "ALL";

export type ReadingsById = {
  [id: string]: Reading;
};
