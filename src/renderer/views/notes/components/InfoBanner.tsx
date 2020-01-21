import { Intent } from "@blueprintjs/core";
import classNames from "classnames";
import React from "react";
import "./InfoBanner.scss";

export namespace InfoBanner {
  export interface Props {
    className?: string;
    intent?: Intent;
    text: string;
  }
}

export function InfoBanner(props: InfoBanner.Props) {
  return (
    <div
      className={classNames("info-banner", props.className, {
        "-primary": props.intent === Intent.PRIMARY,
        "-danger": props.intent === Intent.DANGER,
        "-success": props.intent === Intent.SUCCESS,
        "-warning": props.intent === Intent.WARNING
      })}
    >
      {props.text}
    </div>
  );
}
