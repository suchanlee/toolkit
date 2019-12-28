import { Classes } from "@blueprintjs/core";
import * as React from "react";
import { hot } from "react-hot-loader/root";
import { FloatingMenu } from "./floating-menu/FloatingMenu";
import { KeyboardNavigation } from "./keyboard/KeyboardNavigation";

require("./Application.scss");

export const Application = hot(() => (
  <div className={Classes.DARK}>
    <p>foo bar</p>
    <KeyboardNavigation />
    <FloatingMenu />
  </div>
));
