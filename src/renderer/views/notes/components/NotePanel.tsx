import * as React from "react";
import { connect } from "react-redux";
import { CodeMirrorEditor } from "../../../shared-components/CodeMirrorEditor";
import { PanelContainer } from "../../../shared-components/PanelContainer";
import { RootState } from "../../../states/rootState";
import { createNote } from "../noteObject";
import { Note, NoteIdentifier } from "../notesTypes";
import { NotesActions } from "../redux/notesActions";
import { selectNotesActiveNote, selectOpenedNoteIdentifiers } from "../redux/notesSelectors";
import { getNoteTitle } from "../utils/notesUtils";
import { NoteTabs } from "./NoteTabs";

require("./NotePanel.scss");

export namespace NotePanel {
  export interface StoreProps {
    note: Note | undefined;
    openedNoteIdentifiers: readonly NoteIdentifier[];
  }

  export interface DispatchProps {
    setActiveId: typeof NotesActions.setActiveId;
    setNoteValue: typeof NotesActions.setNoteValue;
    addNote: typeof NotesActions.addNote;
    removeNote: typeof NotesActions.removeNote;
    removeOpenedId: typeof NotesActions.removeOpenedId;
  }

  export type Props = StoreProps & DispatchProps;
}

class NotePanelInternal extends React.PureComponent<NotePanel.Props> {
  public render() {
    const { note, openedNoteIdentifiers } = this.props;
    return (
      <PanelContainer
        isOpen={note != null}
        onClose={this.handleClose}
        title={note != null ? getNoteTitle(note) : ""}
      >
        {note != null && (
          <React.Fragment>
            <NoteTabs
              activeNoteId={note.id}
              noteIdentifiers={openedNoteIdentifiers}
              onClickTab={this.handleTabClick}
              onCloseTab={this.handleTabClose}
            />
            <CodeMirrorEditor
              value={note.value}
              onChange={this.handleChange}
              onKeyDown={this.handleKeyDown}
            />
          </React.Fragment>
        )}
      </PanelContainer>
    );
  }

  private handleClose = () => {
    this.closePanel();
  };

  private handleChange = (value: string) => {
    if (this.props.note != null) {
      this.props.setNoteValue({
        id: this.props.note.id,
        value: value
      });
    }
  };

  private handleKeyDown = (evt: KeyboardEvent) => {
    if (evt.key === "Escape") {
      this.closePanel();
    } else if (evt.key === "n" && evt.metaKey) {
      this.addNote();
      evt.preventDefault();
    } else if (evt.key === "w" && evt.metaKey) {
      this.handleTabClose(this.props.note!.id);
    }
  };

  private handleTabClick = (id: string) => {
    this.props.setActiveId(id);
  };

  private handleTabClose = (id: string) => {
    if (id === this.props.note?.id) {
      const { openedNoteIdentifiers } = this.props;
      const currentIndex = openedNoteIdentifiers.findIndex(identifier => identifier.id === id);
      let nextActiveId: string | undefined;

      if (openedNoteIdentifiers[currentIndex + 1] != null) {
        nextActiveId = openedNoteIdentifiers[currentIndex + 1].id;
      } else if (openedNoteIdentifiers[currentIndex - 1] != null) {
        nextActiveId = openedNoteIdentifiers[currentIndex - 1].id;
      }
      this.props.setActiveId(nextActiveId);
    }

    this.maybeDeleteNote();
    this.props.removeOpenedId(id);
  };

  private closePanel() {
    this.maybeDeleteNote();
    this.props.setActiveId(undefined);
  }

  private addNote() {
    const note = createNote({ value: "", tags: [] });
    this.props.addNote(note);
    this.props.setActiveId(note.id);
  }

  private maybeDeleteNote() {
    if (this.props.note == null) {
      return;
    }

    if (this.props.note.value.trim().length === 0) {
      this.props.removeNote({ id: this.props.note.id });
    }
  }
}

function mapStateToProps(state: RootState): NotePanel.StoreProps {
  return {
    note: selectNotesActiveNote(state),
    openedNoteIdentifiers: selectOpenedNoteIdentifiers(state)
  };
}

const mapDispatchToProps: NotePanel.DispatchProps = {
  addNote: NotesActions.addNote,
  setActiveId: NotesActions.setActiveId,
  setNoteValue: NotesActions.setNoteValue,
  removeNote: NotesActions.removeNote,
  removeOpenedId: NotesActions.removeOpenedId
};

const enhanceWithRedux = connect(mapStateToProps, mapDispatchToProps);
export const NotePanel = enhanceWithRedux(NotePanelInternal);
