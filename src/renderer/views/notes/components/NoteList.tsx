import * as React from "react";
import { connect } from "react-redux";
import { v4 as uuid } from "uuid";
import { createKNL } from "../../../shared-components/KeyNavList";
import { RootState } from "../../../states/rootState";
import { Note } from "../notesTypes";
import { NotesActions } from "../redux/notesActions";
import { selectFilteredNotes, selectNotesHasActive } from "../redux/notesSelectors";
import { NoteItem } from "./NoteItem";

require("./NoteList.scss");

const KNL = createKNL<Note>();

export namespace NoteList {
  export interface StoreProps {
    notes: readonly Note[];
    hasActive: boolean;
  }

  export interface DispatchProps {
    setActive: typeof NotesActions.setActiveId;
    setArchiveStatus: typeof NotesActions.setArchiveStatus;
  }

  export type Props = StoreProps & DispatchProps;
}

class NoteListInternal extends React.Component<NoteList.Props> {
  private listId = uuid();

  public shouldComponentUpdate(nextProps: NoteList.Props) {
    // we dont want to re-render everytime note value changes
    return !nextProps.hasActive;
  }

  public render() {
    if (this.props.notes.length === 0) {
      return <p className="note-list-non-ideal-state">No notes.</p>;
    }
    return (
      <KNL
        className="note-list"
        id={this.listId}
        items={this.props.notes}
        isDisabled={this.props.hasActive}
        getItemKey={getItemKey}
        onItemSelect={this.handleSelect}
        renderItem={this.renderItem}
      />
    );
  }

  private handleSelect = (note: Note) => {
    this.props.setActive(note.id);
  };

  private renderItem = (note: Note) => {
    return <NoteItem note={note} setArchiveStatus={this.props.setArchiveStatus} />;
  };
}

function getItemKey(note: Note) {
  return note.id;
}

function mapStateToProps(state: RootState): NoteList.StoreProps {
  return {
    notes: selectFilteredNotes(state),
    hasActive: selectNotesHasActive(state)
  };
}

const mapDispatchToProps: NoteList.DispatchProps = {
  setActive: NotesActions.setActiveId,
  setArchiveStatus: NotesActions.setArchiveStatus
};

const enhanceWithRedux = connect(mapStateToProps, mapDispatchToProps);
export const NoteList = enhanceWithRedux(NoteListInternal);
