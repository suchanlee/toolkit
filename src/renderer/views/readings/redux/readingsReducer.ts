import { setWith, TypedReducer } from "redoodle";
import { ReadingActions as ReadingsActions, ReadingsInternalActions } from "./readingsActions";
import { ReadingsState } from "./readingsState";

export const readingsReducer = TypedReducer.builder<ReadingsState>()
  .withHandler(ReadingsActions.setInputValue.TYPE, (state, inputValue) => {
    return setWith(state, { inputValue });
  })
  .withHandler(ReadingsActions.setFilter.TYPE, (state, filter) => {
    return setWith(state, { filter });
  })
  .withHandler(ReadingsActions.setActive.TYPE, (state, active) => {
    return setWith(state, { active });
  })
  .withHandler(ReadingsInternalActions.setReadings.TYPE, (state, readings) => {
    return setWith(state, { readings });
  })
  .build();
