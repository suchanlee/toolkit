import { Intent } from "@blueprintjs/core";
import classNames from "classnames";
import React from "react";
import "./InfoBanner.scss";

export namespace InfoBanner {
  export interface Props {
    className?: string;
    intent?: Intent;
    value: string | JSX.Element;
  }
}

export const InfoBanner = React.memo((props: InfoBanner.Props) => {
  return (
    <div
      className={classNames("info-banner", props.className, {
        "-primary": props.intent === Intent.PRIMARY,
        "-danger": props.intent === Intent.DANGER,
        "-success": props.intent === Intent.SUCCESS,
        "-warning": props.intent === Intent.WARNING
      })}
    >
      {props.value}
    </div>
  );
});
