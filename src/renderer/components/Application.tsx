import { hot } from "react-hot-loader/root";
import * as React from "react";
import { KeyboardNavigation } from "./keyboard/KeyboardNavigation";
import { FloatingMenu } from "./floating-menu/FloatingMenu";

export const Application = hot(() => (
  <div id="application">
    <KeyboardNavigation />
    <FloatingMenu />
  </div>
));
