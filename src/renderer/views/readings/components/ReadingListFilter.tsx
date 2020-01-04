import { Checkbox } from "@blueprintjs/core";
import * as React from "react";
import { connect } from "react-redux";
import { RootState } from "../../../states/rootState";
import { ArchiveStatus } from "../../../types/types";
import { ReadingStatusFilter } from "../readingsTypes";
import { ReadingsActions } from "../redux/readingsActions";
import { selectReadingsFilter } from "../redux/readingsSelectors";

require("./ReadingListFilter.scss");

export namespace ReadingListFilter {
  export interface StoreProps {
    filter: ReadingStatusFilter;
  }

  export interface DispatchProps {
    setFilter: typeof ReadingsActions.setFilter;
  }

  export type Props = StoreProps & DispatchProps;
}

class ReadingListFilterInternal extends React.PureComponent<ReadingListFilter.Props> {
  public render() {
    return (
      <div className="reading-list-filter">
        <Checkbox
          onChange={this.handleChange}
          checked={this.props.filter === "ALL"}
          label="View archived readings"
        />
      </div>
    );
  }

  private handleChange = () => {
    if (this.props.filter === ArchiveStatus.ACTIVE) {
      this.props.setFilter(ArchiveStatus.ARCHIVED);
    } else {
      this.props.setFilter(ArchiveStatus.ACTIVE);
    }
  };
}

function mapStateToProps(state: RootState): ReadingListFilter.StoreProps {
  return {
    filter: selectReadingsFilter(state)
  };
}

const mapDispatchToProps: ReadingListFilter.DispatchProps = {
  setFilter: ReadingsActions.setFilter
};

const enhanceWithRedux = connect(mapStateToProps, mapDispatchToProps);
export const ReadingListFilter = enhanceWithRedux(ReadingListFilterInternal);
