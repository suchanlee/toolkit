import { Classes, Icon } from "@blueprintjs/core";
import classNames from "classnames";
import * as mousetrap from "mousetrap";
import * as React from "react";

require("./IFramePanel.scss");

export namespace IFramePanel {
  export interface Props {
    className?: string;
    title?: string;
    url: string;
    isOpen: boolean;
    onClose(): void;
  }
}

export class IFramePanel extends React.PureComponent<IFramePanel.Props> {
  public componentDidMount() {
    mousetrap.bind("esc", this.props.onClose);
  }

  public componentWillUnmount() {
    mousetrap.unbind("esc");
  }

  public render() {
    if (!this.props.isOpen) {
      return null;
    }

    return (
      <div className="iframe-panel-overlay">
        <div
          className={classNames(
            "iframe-panel-container",
            Classes.ELEVATION_2,
            this.props.className
          )}
        >
          <div className="iframe-panel-header">
            <span className="iframe-panel-title">{this.props.title ?? this.props.url}</span>
            <span className="iframe-panel-close" onClick={this.props.onClose}>
              <Icon className="iframe-panel-close-icon" icon="cross" iconSize={10} />
            </span>
          </div>
          <iframe className="iframe-panel-iframe" src={this.props.url} />
        </div>
      </div>
    );
  }
}
