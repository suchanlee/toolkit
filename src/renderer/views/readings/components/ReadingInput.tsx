import { Button, Classes } from "@blueprintjs/core";
import classNames from "classnames";
import isUrl from "is-url";
import * as React from "react";
import { connect } from "react-redux";
import { KeyboardNavSupportedInput } from "../../../shared-components/KeyboardNavSupportedInput";
import { RootState } from "../../../states/rootState";
import { ReadingActions } from "../redux/readingsActions";
import { selectReadingInputValue } from "../redux/readingsSelectors";
import { ReadingUrlPreview } from "./ReadingUrlPreview";

require("./ReadingInput.scss");

export namespace ReadingInput {
  export interface StoreProps {
    value: string;
  }

  export interface DispatchProps {
    setValue: typeof ReadingActions.setInputValue;
  }

  export type Props = StoreProps & DispatchProps;
}

class ReadingInputInternal extends React.PureComponent<ReadingInput.Props> {
  public render() {
    return (
      <div className="reading-input-container">
        <KeyboardNavSupportedInput
          autoFocus={true}
          className="reading-input"
          placeholder="Type url to add or to search..."
          value={this.props.value}
          onChange={this.handleChange}
        />
        {isUrl(this.props.value) && (
          <React.Fragment>
            <Button
              title="Add url to reading list"
              className={classNames("reading-input-add-button", Classes.SMALL)}
              icon="plus"
            />
            <ReadingUrlPreview url={this.props.value} />
          </React.Fragment>
        )}
      </div>
    );
  }

  private handleChange = (evt: React.SyntheticEvent<HTMLInputElement>) => {
    this.props.setValue(evt.currentTarget.value);
  };
}

function mapStateToProps(state: RootState): ReadingInput.StoreProps {
  return {
    value: selectReadingInputValue(state)
  };
}

const mapDispatchToProps: ReadingInput.DispatchProps = {
  setValue: ReadingActions.setInputValue
};

const enhanceWithRedux = connect(mapStateToProps, mapDispatchToProps);
export const ReadingInput = enhanceWithRedux(ReadingInputInternal);
