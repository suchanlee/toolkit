import classNames from "classnames";
import React from "react";

import "./InfoBanner.scss";

export namespace InfoBanner {
  export interface Props {
    className?: string;
    text: string;
  }
}

export function InfoBanner(props: InfoBanner.Props) {
  return <div className={classNames("info-banner", props.className)}>{props.text}</div>;
}
