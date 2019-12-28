import { TypedReducer } from "redoodle";
import { PersistedState } from "../states/persistedState";
import { InternalPersistedActions } from "../actions/persistedActions";

export const persistedReducer = TypedReducer.builder<PersistedState>()
  .withHandler(InternalPersistedActions.setPersistedState.TYPE, (_state, payload) => {
    return payload;
  })
  .build();
