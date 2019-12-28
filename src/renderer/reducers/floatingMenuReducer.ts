import { TypedReducer } from "redoodle";
import { FloatingMenuState } from "../states/floatingMenuState";
import { FloatingMenuActions } from "../actions/floatingMenuActions";

export const floatingMenuReducer = TypedReducer.builder<FloatingMenuState>()
  .withHandler(FloatingMenuActions.show.TYPE, state => {
    if (state.isShown) {
      return state;
    }

    return {
      ...state,
      isShown: true
    };
  })
  .withHandler(FloatingMenuActions.hide.TYPE, state => {
    if (!state.isShown) {
      return state;
    }

    return {
      ...state,
      isShown: false
    };
  })
  .withHandler(FloatingMenuActions.setQuery.TYPE, (state, query) => {
    return {
      ...state,
      query
    };
  })
  .build();
