import * as React from "react";
import { connect, ConnectedComponent } from "react-redux";
import { KeyNavList, KeyNavListInternal } from "../../../shared-components/KeyNavList";
import { RootState } from "../../../states/rootState";
import { Note } from "../notesTypes";
import { NotesActions } from "../redux/notesActions";
import { selectFilteredNotes, selectNotesHasActive } from "../redux/notesSelectors";
import { NoteItem } from "./NoteItem";

// hack due connected component not properly supporting generic components
const KNL = KeyNavList as ConnectedComponent<typeof KeyNavListInternal, KeyNavList.OwnProps<Note>>;

const IGNORED_KEYS = new Set(["Enter", "Up", "Down"]);

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

class NoteListInternal extends React.PureComponent<NoteList.Props> {
  public render() {
    return (
      <KNL
        className="note-list"
        items={this.props.notes}
        ignoredKeys={this.getIgnoredKeys()}
        getItemKey={getItemKey}
        onItemSelect={this.handleSelect}
        renderItem={this.renderItem}
      />
    );
  }

  private handleSelect = (note: Note) => {
    this.props.setActive(note.id);
  };

  private getIgnoredKeys() {
    if (this.props.hasActive) {
      return IGNORED_KEYS;
    } else {
      return undefined;
    }
  }

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
