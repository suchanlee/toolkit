import { v4 as uuid } from "uuid";
import { EntryType, Iso8601String } from "../../types/types";
import { Reading, ReadingStatus } from "./readingsTypes";

export function createReadingObject(args: {
  url: string;
  title: string;
  description?: string;
  imageUrl?: string;
  status?: ReadingStatus;
}): Reading {
  return {
    id: uuid(),
    type: EntryType.READING,
    value: args.url,
    title: args.title,
    description: args.description,
    imageUrl: args.imageUrl,
    status: args.status ?? ReadingStatus.ACTIVE,
    date: new Date().toISOString() as Iso8601String
  };
}
