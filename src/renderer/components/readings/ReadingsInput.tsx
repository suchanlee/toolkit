import { Button, Classes } from "@blueprintjs/core";
import classNames from "classnames";
import isUrl from "is-url";
import * as React from "react";
import { connect } from "react-redux";
import { ReadingActions } from "../../actions/readingActions";
import { selectReadingInputValue } from "../../selectors/readingSelector";
import { KeyboardNavSupportedInput } from "../../shared-components/KeyboardNavSupportedInput";
import { RootState } from "../../states/rootState";
import { ReadingsUrlPreview } from "./ReadingsUrlPreview";

require("./ReadingsInput.scss");

export namespace ReadingsInput {
  export interface StoreProps {
    value: string;
  }

  export interface DispatchProps {
    setValue: typeof ReadingActions.setInputValue;
  }

  export type Props = StoreProps & DispatchProps;
}

class ReadingsInputInternal extends React.PureComponent<ReadingsInput.Props> {
  public render() {
    return (
      <div className="readings-input-container">
        <KeyboardNavSupportedInput
          autoFocus={true}
          className="readings-input"
          placeholder="Type url to add or to search..."
          value={this.props.value}
          onChange={this.handleChange}
        />
        {isUrl(this.props.value) && (
          <React.Fragment>
            <Button
              title="Add url to reading list"
              className={classNames("readings-input-add-button", Classes.SMALL)}
              icon="plus"
            />
            <ReadingsUrlPreview url={this.props.value} />
          </React.Fragment>
        )}
      </div>
    );
  }

  private handleChange = (evt: React.SyntheticEvent<HTMLInputElement>) => {
    this.props.setValue(evt.currentTarget.value);
  };
}

function mapStateToProps(state: RootState): ReadingsInput.StoreProps {
  return {
    value: selectReadingInputValue(state)
  };
}

const mapDispatchToProps: ReadingsInput.DispatchProps = {
  setValue: ReadingActions.setInputValue
};

const enhanceWithRedux = connect(mapStateToProps, mapDispatchToProps);
export const ReadingsInput = enhanceWithRedux(ReadingsInputInternal);
