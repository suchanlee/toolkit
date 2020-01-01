import { Checkbox } from "@blueprintjs/core";
import * as React from "react";
import { connect } from "react-redux";
import { RootState } from "../../../states/rootState";
import { ReadingStatus, ReadingStatusFilter } from "../readingsTypes";
import { ReadingActions } from "../redux/readingsActions";
import { selectReadingsFilter } from "../redux/readingsSelectors";

require("./ReadingListFilter.scss");

export namespace ReadingListFilter {
  export interface StoreProps {
    filter: ReadingStatusFilter;
  }

  export interface DispatchProps {
    setFilter: typeof ReadingActions.setFilter;
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
          label="Show archived readings"
        />
      </div>
    );
  }

  private handleChange = () => {
    if (this.props.filter === "ALL") {
      this.props.setFilter(ReadingStatus.ACTIVE);
    } else {
      this.props.setFilter("ALL");
    }
  };
}

function mapStateToProps(state: RootState): ReadingListFilter.StoreProps {
  return {
    filter: selectReadingsFilter(state)
  };
}

const mapDispatchToProps: ReadingListFilter.DispatchProps = {
  setFilter: ReadingActions.setFilter
};

const enhanceWithRedux = connect(mapStateToProps, mapDispatchToProps);
export const ReadingListFilter = enhanceWithRedux(ReadingListFilterInternal);
