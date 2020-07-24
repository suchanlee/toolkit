import { Classes, Icon } from "@blueprintjs/core";
import classNames from "classnames";
import React from "react";

require("./PanelContainer.scss");

export namespace PanelContainer {
  export interface Props {
    className?: string;
    title: string;
    isOpen: boolean;
    onClose(): void;
  }
}

export class PanelContainer extends React.PureComponent<PanelContainer.Props> {
  public componentDidMount() {
    window.addEventListener("keyup", this.handleKeyUp);
  }

  public componentWillUnmount() {
    window.removeEventListener("keyup", this.handleKeyUp);
  }

  public render() {
    if (!this.props.isOpen) {
      return null;
    }

    return (
      <div className="panel-container-overlay">
        <div className={classNames("panel-container", Classes.ELEVATION_2, this.props.className)}>
          <div className="panel-container-header">
            <span className="panel-container-title">{this.props.title}</span>
            <span className="panel-container-close" onClick={this.props.onClose}>
              <Icon className="panel-container-close-icon" icon="cross" iconSize={10} />
            </span>
          </div>
          {this.props.children}
        </div>
      </div>
    );
  }

  private handleKeyUp = (evt: KeyboardEvent) => {
    if (evt.key === "Escape" && this.props.isOpen) {
      this.props.onClose();
    }
  };
}
