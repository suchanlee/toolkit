import { setWith, TypedReducer } from "redoodle";
import { KeyNavListActions } from "../actions/keyNavListActions";
import { createInitialKeyNavListState, KeyNavListState } from "../states/keyNavListState";

export const keyNavListReducer = TypedReducer.builder<KeyNavListState>()
  .withHandler(KeyNavListActions.reset.TYPE, _state => {
    return createInitialKeyNavListState();
  })
  .withHandler(KeyNavListActions.moveUp.TYPE, state => {
    return setWith(state, {
      current: {
        ...state.current,
        row: Math.max(state.current.row - 1, 0)
      }
    });
  })
  .withHandler(KeyNavListActions.moveDown.TYPE, state => {
    return setWith(state, {
      current: {
        ...state.current,
        row: state.current.row + 1
      }
    });
  })
  .build();
