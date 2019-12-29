import { Icon } from "@blueprintjs/core";
import classNames from "classnames";
import { shell } from "electron";
import * as React from "react";
import { Reading } from "../readingsTypes";

require("./ReadingSummary.scss");

export namespace ReadingSummary {
  export interface Props {
    className?: string;
    reading: Reading;
  }
}

export class ReadingSummary extends React.PureComponent<ReadingSummary.Props> {
  public render() {
    const { imageUrl, title, description } = this.props.reading;
    return (
      <div className={classNames("reading-summary", this.props.className)}>
        <div className="reading-summary-img" style={{ backgroundImage: `url(${imageUrl})` }} />
        <div className="reading-summary-text">
          <div className="reading-summary-title">
            {title}
            <Icon
              className="reading-summary-share-icon"
              icon="share"
              onClick={this.handleTitleClick}
              iconSize={12}
            />
          </div>
          <div className="reading-summary-description">
            {description ?? "No description available."}
          </div>
        </div>
      </div>
    );
  }

  private handleTitleClick = () => {
    shell.openExternal(this.props.reading.value);
  };
}
