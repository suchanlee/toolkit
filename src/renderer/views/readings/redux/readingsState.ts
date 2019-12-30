import { EntryType, Iso8601String } from "../../../types/types";
import { Reading, ReadingStatus, ReadingStatusFilter } from "../readingsTypes";

export interface ReadingsState {
  readings: readonly Reading[];
  filter: ReadingStatusFilter;
  inputValue: string;
  active: Reading | undefined;
}

export function createInitialReadingsState(): ReadingsState {
  return {
    readings: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => ({
      type: EntryType.READING,
      value: `https://www.nytimes.com/2019/12/28/us/mississippi-ice-raids-poultry-plants.html#${num}`,
      date: new Date().toISOString() as Iso8601String,
      title: `${num} - After ICE Raids, a Reckoning in Mississippi’s Chicken Country`,
      description:
        "A series of federal immigration raids swept up nearly 700 undocumented workers, creating opportunities — and some ethical concerns — for American-born residents.",
      status: ReadingStatus.ACTIVE
    })),
    filter: ReadingStatus.ACTIVE,
    inputValue: "",
    active: undefined
  };
}
