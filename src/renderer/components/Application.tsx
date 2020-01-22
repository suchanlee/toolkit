import { Classes } from "@blueprintjs/core";
import classNames from "classnames";
import * as React from "react";
import { hot } from "react-hot-loader/root";
import { Banner } from "./banner/Banner";
import { Content } from "./content/Content";
import { TopMenu } from "./top-menu/TopMenu";

require("./Application.scss");

export const Application = hot(() => (
  <div className={classNames(Classes.DARK, "application")}>
    <Banner />
    <TopMenu />
    <Content />
  </div>
));
