import { TypedAction } from "redoodle";

export namespace NavigationActions {
  export const setNav = TypedAction.define("navigation::set-nav")<string>();
}
