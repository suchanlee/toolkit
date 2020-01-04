import { TypedAction } from "redoodle";
import { ArchiveStatus } from "../../../types/types";
import { Reading, ReadingsById, ReadingStatusFilter } from "../readingsTypes";

export namespace ReadingsActions {
  export const setInputValue = TypedAction.define("readings::set-input-value")<string>();
  export const setFilter = TypedAction.define("readings::set-filter")<ReadingStatusFilter>();
  export const setActive = TypedAction.define("readings::set-active")<Reading | undefined>();
  export const addReading = TypedAction.define("readings::add-reading")<Reading>();
  export const setArchiveStatus = TypedAction.define("readings::set-reading-status")<
    SetStatusPayload
  >();

  export interface SetStatusPayload {
    id: string;
    status: ArchiveStatus;
  }
}

export namespace ReadingsInternalActions {
  export const setReadings = TypedAction.define("internal-readings::set-readings")<ReadingsById>();
}
