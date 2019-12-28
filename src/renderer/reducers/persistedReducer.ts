import { TypedReducer } from "redoodle";
import { InternalPersistedActions } from "../actions/persistedActions";
import { PersistedState } from "../states/persistedState";

export const persistedReducer = TypedReducer.builder<PersistedState>()
  .withHandler(InternalPersistedActions.setPersistedState.TYPE, (_state, payload) => {
    return payload;
  })
  .build();
