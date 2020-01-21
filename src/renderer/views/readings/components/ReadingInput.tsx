import { Button, Classes } from "@blueprintjs/core";
import classNames from "classnames";
import * as React from "react";
import { connect } from "react-redux";
import { AsyncValue } from "../../../async/asyncTypes";
import { asyncLoading, isFailedLoading, isLoaded } from "../../../async/asyncUtils";
import { KeyboardNavSupportedInput } from "../../../shared-components/KeyboardNavSupportedInput";
import { RootState } from "../../../states/rootState";
import { createReadingObject } from "../readingObject";
import { Reading } from "../readingsTypes";
import { ReadingsActions } from "../redux/readingsActions";
import {
  selectReadingsInputValue,
  selectReadingsInputValueIsUrl
} from "../redux/readingsSelectors";
import { ReadingUrlPreview } from "./ReadingUrlPreview";

require("./ReadingInput.scss");

export namespace ReadingInput {
  export interface StoreProps {
    value: string;
    isValueUrl: boolean;
  }

  export interface DispatchProps {
    setValue: typeof ReadingsActions.setInputValue;
    addReading: typeof ReadingsActions.addReading;
  }

  export type Props = StoreProps & DispatchProps;

  export interface State {
    reading: AsyncValue<Reading>;
  }
}

class ReadingInputInternal extends React.PureComponent<ReadingInput.Props, ReadingInput.State> {
  public state: ReadingInput.State = {
    reading: asyncLoading()
  };

  public render() {
    return (
      <div className="reading-input-container">
        <KeyboardNavSupportedInput
          autoFocus={true}
          className="reading-input"
          placeholder="Type url to add or to search..."
          value={this.props.value}
          onChange={this.handleChange}
          onKeyUp={this.handleKeyUp}
        />
        {this.props.isValueUrl && (
          <React.Fragment>
            <Button
              title="Add url to reading list"
              className={classNames("reading-input-add-button", Classes.SMALL)}
              icon="plus"
              onClick={this.handleAddClick}
            />
            <ReadingUrlPreview
              reading={this.state.reading}
              onReadingChange={this.handleReadingChange}
              url={this.props.value}
            />
          </React.Fragment>
        )}
      </div>
    );
  }

  private handleChange = (evt: React.SyntheticEvent<HTMLInputElement>) => {
    this.props.setValue(evt.currentTarget.value);
  };

  private handleKeyUp = (evt: React.KeyboardEvent<HTMLInputElement>) => {
    if (evt.key === "Enter") {
      this.maybeAddReading();
      // stopPropagation to stop key nav list item from selecting
      evt.stopPropagation();
    }
  };

  private handleAddClick = () => {
    this.maybeAddReading();
  };

  private handleReadingChange = (reading: AsyncValue<Reading>) => {
    this.setState({ reading });
  };

  private maybeAddReading() {
    if (isLoaded(this.state.reading)) {
      this.props.addReading(this.state.reading.value);
      this.setState({ reading: asyncLoading() });
    } else if (isFailedLoading(this.state.reading) && this.props.isValueUrl) {
      // sometimes websites don't allow you to fetch info, in which case
      // we should still support adding urls
      const reading = createReadingObject({
        url: this.props.value,
        title: this.props.value,
        description: "No description"
      });
      this.props.addReading(reading);
      this.setState({ reading: asyncLoading() });
    }
  }
}

function mapStateToProps(state: RootState): ReadingInput.StoreProps {
  return {
    value: selectReadingsInputValue(state),
    isValueUrl: selectReadingsInputValueIsUrl(state)
  };
}

const mapDispatchToProps: ReadingInput.DispatchProps = {
  setValue: ReadingsActions.setInputValue,
  addReading: ReadingsActions.addReading
};

const enhanceWithRedux = connect(mapStateToProps, mapDispatchToProps);
export const ReadingInput = enhanceWithRedux(ReadingInputInternal);
