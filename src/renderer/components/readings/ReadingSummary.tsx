import { shell } from "electron";
import * as React from "react";
import { Reading } from "../../types/types";

require("./ReadingSummary.scss");

export namespace ReadingSummary {
  export interface Props {
    reading: Reading;
  }
}

export class ReadingSummary extends React.PureComponent<ReadingSummary.Props> {
  public render() {
    const { imageUrl, title, description } = this.props.reading;
    return (
      <div className="reading-summary">
        <div className="reading-summary-img" style={{ backgroundImage: `url(${imageUrl})` }} />
        <div className="reading-summary-text">
          <div className="reading-summary-title">
            <a onClick={this.handleTitleClick}>{title}</a>
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
