import { KeyNavListLocation } from "../types/types";

export interface KeyNavListState {
  locationsById: {
    [id: string]: KeyNavListLocation;
  };
}

export function createInitialKeyNavListLocation(): KeyNavListLocation {
  return {
    row: -1
  };
}

export function createInitialKeyNavListState(): KeyNavListState {
  return {
    locationsById: {}
  };
}
