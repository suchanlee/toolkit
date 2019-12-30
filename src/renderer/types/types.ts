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
  NOTE = "NOTE"
}

export interface Entry {
  id: string;
  type: EntryType;
  value: string;
  date: Iso8601String;
}
