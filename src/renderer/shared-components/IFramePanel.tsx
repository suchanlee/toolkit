import * as React from "react";
import { PanelContainer } from "./PanelContainer";

require("./IFramePanel.scss");

export namespace IFramePanel {
  export interface Props {
    title?: string;
    url: string;
    isOpen: boolean;
    onClose(): void;
  }
}

export class IFramePanel extends React.PureComponent<IFramePanel.Props> {
  public render() {
    if (!this.props.isOpen) {
      return null;
    }

    return (
      <PanelContainer
        isOpen={this.props.isOpen}
        title={this.props.title ?? this.props.url}
        onClose={this.props.onClose}
      >
        <iframe className="iframe-panel-iframe" src={this.props.url} />
      </PanelContainer>
    );
  }
}
