import { setWith, TypedReducer } from "redoodle";
import { FloatingMenuActions } from "../actions/floatingMenuActions";
import { FloatingMenuState } from "../states/floatingMenuState";

export const floatingMenuReducer = TypedReducer.builder<FloatingMenuState>()
  .withHandler(FloatingMenuActions.show.TYPE, state => {
    if (state.isShown) {
      return state;
    }

    return setWith(state, { isShown: true });
  })
  .withHandler(FloatingMenuActions.hide.TYPE, state => {
    if (!state.isShown) {
      return state;
    }

    return setWith(state, { isShown: false, query: "" });
  })
  .withHandler(FloatingMenuActions.setQuery.TYPE, (state, query) => {
    return setWith(state, { query });
  })
  .build();
