export type Iso8601String = string & {
  __brand: "IsoString";
};

export type KeyedByDate<T> = Record<string, T>;

export interface KeyNavListLocation {
  row: number;
}

export enum EntryType {
  TODO = "TODO",
  READING = "READING",
  NOTE = "NOTE",
  CODE = "CODE"
}

export interface Entry {
  id: string;
  type: EntryType;
  value: string;
  // created date
  date: Iso8601String;
}

export enum ArchiveStatus {
  ACTIVE = "ACTIVE",
  ARCHIVED = "ARCHIVED"
}

export interface ArchivableEntry extends Entry {
  archiveStatus: ArchiveStatus;
}
