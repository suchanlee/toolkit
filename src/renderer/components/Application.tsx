import { Classes } from "@blueprintjs/core";
import classNames from "classnames";
import * as React from "react";
import { hot } from "react-hot-loader/root";
import { Content } from "./content/Content";
import { TopMenu } from "./top-menu/TopMenu";

require("./Application.scss");

export const Application = hot(() => (
  <div className={classNames(Classes.DARK, "application")}>
    <TopMenu />
    <Content />
  </div>
));
