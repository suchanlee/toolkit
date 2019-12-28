import { Button, Classes } from "@blueprintjs/core";
import classnames from "classnames";
import isUrl from "is-url";
import * as React from "react";
import { KeyboardNavSupportedInput } from "../../shared-components/KeyboardNavSupportedInput";

require("./ReadingsInput.scss");

export namespace ReadingsInput {
  export interface Props {}

  export interface State {
    value: string;
  }
}

export class ReadingsInput extends React.PureComponent<ReadingsInput.Props, ReadingsInput.State> {
  public state: ReadingsInput.State = {
    value: ""
  };

  public render() {
    return (
      <div className="readings-input-container">
        <KeyboardNavSupportedInput
          autoFocus={true}
          className="readings-input"
          placeholder="Type url to add or to search..."
          value={this.state.value}
          onChange={this.handleChange}
        />
        {isUrl(this.state.value) && (
          <Button
            title="Add url to reading list"
            className={classnames("readings-input-add-button", Classes.SMALL)}
            icon="plus"
          />
        )}
      </div>
    );
  }

  private handleChange = (evt: React.SyntheticEvent<HTMLInputElement>) => {
    this.setState({ value: evt.currentTarget.value });
  };
}
