import isUrl from "is-url";
import { createSelector } from "reselect";
import { RootState } from "../../../states/rootState";
import { normalizeString } from "../../../utils/stringUtils";

export const selectReading = (state: RootState) => state.readings;
export const selectReadingInputValue = (state: RootState) => state.readings.inputValue;
export const selectReadingFilter = (state: RootState) => state.readings.filter;
export const selectReadingReadings = (state: RootState) => state.readings.readings;

export const selectFilteredReadings = createSelector(
  selectReadingReadings,
  selectReadingFilter,
  selectReadingInputValue,
  (readings, filter, inputValue) => {
    let filteredReadings = readings;

    if (filter !== "ALL") {
      filteredReadings = filteredReadings.filter(r => r.status === filter);
    }

    if (inputValue.trim().length > 0 && !isUrl(inputValue)) {
      const normInputValue = normalizeString(inputValue);
      filteredReadings = filteredReadings.filter(r => {
        return `${normalizeString(r.title)} ${normalizeString(
          r.description ?? ""
        )} ${normalizeString(r.value)}`.indexOf(normInputValue);
      });
    }

    return filteredReadings;
  }
);
