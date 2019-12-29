import { setWith, TypedReducer } from "redoodle";
import { NavigationActions } from "../actions/navigationActions";
import { NavigationState } from "../states/navigationState";

export const navigationReducer = TypedReducer.builder<NavigationState>()
  .withHandler(NavigationActions.setNav.TYPE, (state, active) => {
    return setWith(state, { activeView: active });
  })
  .build();
