import { Icon, IconName } from "@blueprintjs/core";
import classNames from "classnames";
import * as React from "react";

require("./ItemActionButton.scss");

export namespace ItemActionButton {
  export interface Props {
    className?: string;
    icon: IconName;
    backgroundColor: string;
    title?: string;
    onClick(evt: React.SyntheticEvent): void;
  }
}

export class ItemActionButton extends React.PureComponent<ItemActionButton.Props> {
  public render() {
    return (
      <div
        className={classNames("item-action-button", this.props.className)}
        onClick={this.props.onClick}
        title={this.props.title}
        style={{
          backgroundColor: this.props.backgroundColor
        }}
      >
        <Icon className="item-action-button-icon" icon={this.props.icon} />
      </div>
    );
  }
}
