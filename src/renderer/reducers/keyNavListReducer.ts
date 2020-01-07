import { setWith, TypedReducer } from "redoodle";
import { KeyNavListActions } from "../actions/keyNavListActions";
import { createInitialKeyNavListLocation, KeyNavListState } from "../states/keyNavListState";

export const keyNavListReducer = TypedReducer.builder<KeyNavListState>()
  .withHandler(KeyNavListActions.init.TYPE, (state, payload) => {
    return setWith(state, {
      locationsById: {
        ...state.locationsById,
        [payload.id]: createInitialKeyNavListLocation()
      }
    });
  })
  .withHandler(KeyNavListActions.remove.TYPE, (state, payload) => {
    const newLocationsById = { ...state.locationsById };
    delete newLocationsById[payload.id];
    return setWith(state, {
      locationsById: newLocationsById
    });
  })
  .withHandler(KeyNavListActions.set.TYPE, (state, payload) => {
    return setWith(state, {
      locationsById: {
        ...state.locationsById,
        [payload.id]: payload.location
      }
    });
  })
  .withHandler(KeyNavListActions.moveUp.TYPE, (state, payload) => {
    return setWith(state, {
      locationsById: {
        ...state.locationsById,
        [payload.id]: {
          row: Math.max(state.locationsById[payload.id].row - 1, 0)
        }
      }
    });
  })
  .withHandler(KeyNavListActions.moveDown.TYPE, (state, payload) => {
    return setWith(state, {
      locationsById: {
        ...state.locationsById,
        [payload.id]: {
          row: state.locationsById[payload.id].row + 1
        }
      }
    });
  })
  .build();
