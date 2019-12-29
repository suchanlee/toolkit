export type Iso8601String = string & {
  __brand: "IsoString";
};

export type KeyedByDate<T> = Record<string, T>;

export enum Nav {
  TODOS = "TODOS",
  READINGS = "READINGS",
  NOTES = "NOTES",
  JS = "JS"
}

export interface KeyNavListLocation {
  row: number;
}

export enum EntryType {
  TODO = "TODO",
  READING = "READING",
  NOTE = "NOTE"
}

export interface Entry {
  type: EntryType;
  value: string;
  date: Iso8601String;
}

export interface Todo extends Entry {
  type: EntryType.TODO;
  status: TodoStatus;
}

export enum TodoStatus {
  NOT_STARTED = "NOT_STARTED",
  IN_PROGRESS = "IN_PROGRESS",
  FINISHED = "FINISHED"
}

export interface Reading extends Entry {
  type: EntryType.READING;
  status: TodoStatus;
}

export enum ReadingStatus {
  ACTIVE = "ACTIVE",
  ARCHIVED = "ARCHIVED"
}

export type ReadingStatusFilter = ReadingStatus | "ALL";
