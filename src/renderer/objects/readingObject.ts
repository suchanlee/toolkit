import { EntryType, Iso8601String, Reading, ReadingStatus } from "../types/types";

export function createReadingObject(args: {
  url: string;
  title: string;
  description?: string;
  imageUrl?: string;
  status?: ReadingStatus;
}): Reading {
  return {
    type: EntryType.READING,
    value: args.url,
    title: args.title,
    description: args.description,
    imageUrl: args.imageUrl,
    status: args.status ?? ReadingStatus.ACTIVE,
    date: new Date().toISOString() as Iso8601String
  };
}
