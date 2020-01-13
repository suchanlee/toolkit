import { ArchiveStatus } from "../../../types/types";
import { Reading, ReadingsById, ReadingStatusFilter } from "../readingsTypes";

export interface ReadingsState {
  readings: ReadingsById;
  filter: ReadingStatusFilter;
  inputValue: string;
  active: Reading | undefined;
}

export const READINGS_STATE_KEY = "readings" as "readings";

export type WithReadingsState = {
  [READINGS_STATE_KEY]: ReadingsState;
};

export function createInitialReadingsState(): ReadingsState {
  return {
    readings: {},
    filter: ArchiveStatus.ACTIVE,
    inputValue: "",
    active: undefined
  };
}
