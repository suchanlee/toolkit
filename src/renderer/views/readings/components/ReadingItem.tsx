import { Colors } from "@blueprintjs/core";
import { shell } from "electron";
import * as React from "react";
import { connect } from "react-redux";
import { selectKeyNavListCurrent } from "../../../selectors/keyNavListSelectors";
import { ItemActionButton } from "../../../shared-components/ItemActionButton";
import { RootState } from "../../../states/rootState";
import { ArchiveStatus } from "../../../types/types";
import { Reading } from "../readingsTypes";
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
    setArchiveStatus: typeof ReadingsActions.setArchiveStatus;
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
        <ItemActionButton
          className="reading-item-archive"
          icon={reading.archiveStatus === ArchiveStatus.ACTIVE ? "archive" : "unarchive"}
          title={reading.archiveStatus === ArchiveStatus.ACTIVE ? "Archive" : "Unarchive"}
          onClick={this.handleArchiveClick}
          backgroundColor={reading.archiveStatus === ArchiveStatus.ACTIVE ? "" : Colors.GREEN3}
        />
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
    const { reading, setArchiveStatus } = this.props;
    setArchiveStatus({
      id: reading.id,
      status:
        reading.archiveStatus === ArchiveStatus.ACTIVE
          ? ArchiveStatus.ARCHIVED
          : ArchiveStatus.ACTIVE
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
  setArchiveStatus: ReadingsActions.setArchiveStatus
};

const enhanceWithRedux = connect(mapStateToProps, mapDispatchToProps);
export const ReadingItem = enhanceWithRedux(ReadingItemInternal);
