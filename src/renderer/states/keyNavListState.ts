import { KeyNavListLocation } from "../types/types";

export interface KeyNavListState {
  current: KeyNavListLocation;
}

export function createInitialKeyNavListState(): KeyNavListState {
  return {
    current: {
      row: -1
    }
  };
}
