import { Checkbox } from "@blueprintjs/core";
import * as React from "react";
import { connect } from "react-redux";
import { RootState } from "../../../states/rootState";
import { ArchiveStatus } from "../../../types/types";
import { NotesActions } from "../redux/notesActions";
import { selectNotesFilter } from "../redux/notesSelectors";

require("./NotesFilter.scss");

export namespace NotesFilter {
  export interface StoreProps {
    filter: ArchiveStatus;
  }

  export interface DispatchProps {
    setFilter: typeof NotesActions.setFilter;
  }

  export type Props = StoreProps & DispatchProps;
}

class NotesFilterInternal extends React.PureComponent<NotesFilter.Props> {
  public render() {
    return (
      <div className="notes-filter">
        <Checkbox
          onChange={this.handleChange}
          checked={this.props.filter === ArchiveStatus.ARCHIVED}
          label="View archived notes"
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

function mapStateToProps(state: RootState): NotesFilter.StoreProps {
  return {
    filter: selectNotesFilter(state)
  };
}

const mapDispatchToProps: NotesFilter.DispatchProps = {
  setFilter: NotesActions.setFilter
};

const enhanceWithRedux = connect(mapStateToProps, mapDispatchToProps);
export const NotesFilter = enhanceWithRedux(NotesFilterInternal);
