import { setWith, TypedReducer } from "redoodle";
import { Reading } from "../readingsTypes";
import {
  ReadingActions,
  ReadingActions as ReadingsActions,
  ReadingsInternalActions
} from "./readingsActions";
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
  .withHandler(ReadingActions.setReadingStatus.TYPE, (state, payload) => {
    const index = state.readings.findIndex(r => r.id === payload.id);
    if (index === -1) {
      return state;
    }

    const reading: Reading = {
      ...state.readings[index],
      status: payload.status
    };
    const readings = [...state.readings];
    readings[index] = reading;
    return setWith(state, { readings });
  })
  .withHandler(ReadingsInternalActions.setReadings.TYPE, (state, readings) => {
    return setWith(state, { readings });
  })
  .build();
