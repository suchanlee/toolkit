import { Classes } from "@blueprintjs/core";
import * as React from "react";
import { hot } from "react-hot-loader/root";
import { TopMenu } from "./top-menu/TopMenu";

require("./Application.scss");

export const Application = hot(() => (
  <div className={Classes.DARK}>
    <TopMenu />
  </div>
));
