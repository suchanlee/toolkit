import { TypedAction } from "redoodle";
import { Nav } from "../types/types";

export namespace NavigationActions {
  export const setNav = TypedAction.define("navigation::set-nav")<Nav>();
}
