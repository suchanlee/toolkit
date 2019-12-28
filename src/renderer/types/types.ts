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

export interface Todo {
  status: TodoStatus;
  description: string;
  date: Iso8601String;
}

export enum TodoStatus {
  NOT_STARTED = "NOT_STARTED",
  IN_PROGRESS = "IN_PROGRESS",
  FINISHED = "FINISHED"
}
