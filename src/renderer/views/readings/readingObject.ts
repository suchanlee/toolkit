import { v4 as uuid } from "uuid";
import { ArchiveStatus, EntryType, Iso8601String } from "../../types/types";
import { Reading } from "./readingsTypes";

export function createReadingObject(args: {
  url: string;
  title: string;
  description?: string;
  imageUrl?: string;
  archiveStatus?: ArchiveStatus;
}): Reading {
  return {
    id: uuid(),
    type: EntryType.READING,
    value: args.url,
    title: args.title,
    description: args.description,
    imageUrl: args.imageUrl,
    archiveStatus: args.archiveStatus ?? ArchiveStatus.ACTIVE,
    date: new Date().toISOString() as Iso8601String
  };
}
