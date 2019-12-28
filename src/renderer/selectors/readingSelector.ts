import { RootState } from "../states/rootState";

export const selectReading = (state: RootState) => state.reading;
export const selectReadingInputValue = (state: RootState) => state.reading.inputValue;
