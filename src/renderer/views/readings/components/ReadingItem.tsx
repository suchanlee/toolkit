import { Icon } from "@blueprintjs/core";
import classNames from "classnames";
import { shell } from "electron";
import * as mousetrap from "mousetrap";
import * as React from "react";
import { connect } from "react-redux";
import { selectKeyNavListCurrent } from "../../../selectors/keyNavListSelectors";
import { RootState } from "../../../states/rootState";
import { Reading, ReadingStatus } from "../readingsTypes";
import { ReadingActions } from "../redux/readingsActions";
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
    setStatus: typeof ReadingActions.setReadingStatus;
  }

  export type Props = OwnProps & StoreProps & DispatchProps;
}

class ReadingItemInternal extends React.PureComponent<ReadingItem.Props> {
  public componentDidMount() {
    if (this.props.isKeyNavListActive) {
      this.bindKeyUp();
    }
  }

  public componentDidUpdate(prevProps: ReadingItem.Props) {
    if (!prevProps.isKeyNavListActive && this.props.isKeyNavListActive) {
      this.bindKeyUp();
    } else if (prevProps.isKeyNavListActive && !this.props.isKeyNavListActive) {
      this.unbindKeyUp();
    }
  }

  public componentWillUnmount() {
    this.unbindKeyUp();
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

  private bindKeyUp() {
    mousetrap.bind("command+enter", this.handleKeyUp);
  }

  private unbindKeyUp() {
    mousetrap.unbind("command+enter");
  }

  private handleKeyUp = () => {
    shell.openExternal(this.props.reading.value);
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
  setStatus: ReadingActions.setReadingStatus
};

const enhanceWithRedux = connect(mapStateToProps, mapDispatchToProps);
export const ReadingItem = enhanceWithRedux(ReadingItemInternal);
