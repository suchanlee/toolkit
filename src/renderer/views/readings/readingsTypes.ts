import { Entry, EntryType } from "../../types/types";

export interface Reading extends Entry {
  type: EntryType.READING;
  title: string;
  description?: string;
  imageUrl?: string;
  status: ReadingStatus;
}

export enum ReadingStatus {
  ACTIVE = "ACTIVE",
  ARCHIVED = "ARCHIVED"
}

export type ReadingStatusFilter = ReadingStatus | "ALL";
