import { Icon } from "@blueprintjs/core";
import classNames from "classnames";
import { shell } from "electron";
import * as React from "react";
import { connect } from "react-redux";
import { selectKeyNavListCurrent } from "../../../selectors/keyNavListSelectors";
import { RootState } from "../../../states/rootState";
import { Reading, ReadingStatus } from "../readingsTypes";
import { ReadingsActions } from "../redux/readingsActions";
import { ReadingSummary } from "./ReadingSummary";

require("./ReadingItem.scss");

export namespace ReadingItem {
  export interface OwnProps {
    index: number;
    reading: Reading;
  }

  export interface StoreProps {
    isKeyNavListActive: boolean;
  }

  export interface DispatchProps {
    setStatus: typeof ReadingsActions.setReadingStatus;
  }

  export type Props = OwnProps & StoreProps & DispatchProps;
}

class ReadingItemInternal extends React.PureComponent<ReadingItem.Props> {
  public componentDidMount() {
    if (this.props.isKeyNavListActive) {
      this.bindKeyDown();
    }
  }

  public componentDidUpdate(prevProps: ReadingItem.Props) {
    if (!prevProps.isKeyNavListActive && this.props.isKeyNavListActive) {
      this.bindKeyDown();
    } else if (prevProps.isKeyNavListActive && !this.props.isKeyNavListActive) {
      this.unbindKeyDown();
    }
  }

  public componentWillUnmount() {
    this.unbindKeyDown();
  }

  public render() {
    const { reading } = this.props;
    return (
      <div className="reading-item">
        <ReadingSummary reading={reading} />
        <div
          className={classNames("reading-item-archive", {
            "-archive": reading.status === ReadingStatus.ACTIVE,
            "-unarchive": reading.status === ReadingStatus.ARCHIVED
          })}
          title={reading.status === ReadingStatus.ACTIVE ? "Archive" : "Unarchive"}
          onClick={this.handleArchiveClick}
        >
          <Icon
            icon={reading.status === ReadingStatus.ACTIVE ? "archive" : "unarchive"}
            className="reading-item-archive-icon"
          />
        </div>
      </div>
    );
  }

  private bindKeyDown() {
    // use document.addEventListener instead of mousetrap because
    // mousetrap registers only one event per key at a time and when
    // multiple items bind and unbind, can run into race conditions where
    // the bind in itemA happens first and then itemB unbinds.
    document.addEventListener("keydown", this.handleKeyDown);
  }

  private unbindKeyDown() {
    document.removeEventListener("keydown", this.handleKeyDown);
  }

  private handleKeyDown = (evt: KeyboardEvent) => {
    if (evt.key === "Enter" && evt.metaKey) {
      shell.openExternal(this.props.reading.value);
    }
  };

  private handleArchiveClick = (evt: React.SyntheticEvent) => {
    const { reading, setStatus } = this.props;
    setStatus({
      id: reading.id,
      status:
        reading.status === ReadingStatus.ACTIVE ? ReadingStatus.ARCHIVED : ReadingStatus.ACTIVE
    });

    // prevent KNLItem selection
    evt.stopPropagation();
  };
}

function mapStateToProps(state: RootState, ownProps: ReadingItem.OwnProps): ReadingItem.StoreProps {
  const current = selectKeyNavListCurrent(state);
  return {
    isKeyNavListActive: current.row === ownProps.index
  };
}

const mapDispatchToProps: ReadingItem.DispatchProps = {
  setStatus: ReadingsActions.setReadingStatus
};

const enhanceWithRedux = connect(mapStateToProps, mapDispatchToProps);
export const ReadingItem = enhanceWithRedux(ReadingItemInternal);
