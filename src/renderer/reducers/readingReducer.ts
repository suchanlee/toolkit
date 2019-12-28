import { setWith, TypedReducer } from "redoodle";
import { ReadingActions } from "../actions/readingActions";
import { ReadingState } from "../states/readingState";

export const readingReducer = TypedReducer.builder<ReadingState>()
  .withHandler(ReadingActions.setInputValue.TYPE, (state, inputValue) => {
    return setWith(state, { inputValue });
  })
  .withHandler(ReadingActions.setFilter.TYPE, (state, filter) => {
    return setWith(state, { filter });
  })
  .build();
