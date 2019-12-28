import { Reading, ReadingStatus, ReadingStatusFilter } from "../types/types";

export interface ReadingState {
  readings: readonly Reading[];
  filter: ReadingStatusFilter;
  inputValue: string;
}

export function createInitialReadingState(): ReadingState {
  return {
    readings: [],
    filter: ReadingStatus.ACTIVE,
    inputValue: ""
  };
}
