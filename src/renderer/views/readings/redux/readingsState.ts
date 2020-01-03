import { Reading, ReadingsById, ReadingStatus, ReadingStatusFilter } from "../readingsTypes";

export interface ReadingsState {
  readings: ReadingsById;
  filter: ReadingStatusFilter;
  inputValue: string;
  active: Reading | undefined;
}

export function createInitialReadingsState(): ReadingsState {
  return {
    readings: {},
    filter: ReadingStatus.ACTIVE,
    inputValue: "",
    active: undefined
  };
}
