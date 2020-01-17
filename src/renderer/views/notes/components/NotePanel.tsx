import * as React from "react";
import { connect } from "react-redux";
import { CodeMirrorEditor } from "../../../shared-components/CodeMirrorEditor";
import { PanelContainer } from "../../../shared-components/PanelContainer";
import { RootState } from "../../../states/rootState";
import { Note } from "../notesTypes";
import { NotesActions } from "../redux/notesActions";
import { selectNotesActiveNote } from "../redux/notesSelectors";
import { getNoteTitle } from "../utils/notesUtils";

require("./NotePanel.scss");

export namespace NotePanel {
  export interface StoreProps {
    note: Note | undefined;
  }

  export interface DispatchProps {
    setActiveId: typeof NotesActions.setActiveId;
    setNoteValue: typeof NotesActions.setNoteValue;
    removeNote: typeof NotesActions.removeNote;
  }

  export type Props = StoreProps & DispatchProps;
}

class NotePanelInternal extends React.PureComponent<NotePanel.Props> {
  public render() {
    const { note } = this.props;
    return (
      <PanelContainer
        isOpen={note != null}
        onClose={this.handleClose}
        title={note != null ? getNoteTitle(note) : ""}
      >
        {note != null && (
          <CodeMirrorEditor
            value={note.value}
            onChange={this.handleChange}
            onKeyUp={this.handleKeyUp}
          />
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

  private handleKeyUp = (evt: KeyboardEvent) => {
    if (evt.key === "Escape") {
      this.closePanel();
    }
  };

  private closePanel() {
    // keep track fo this now since when active id is unset,
    // the `note` value becomes undefined
    const shouldDeleteNote = this.props.note?.value.trim().length === 0;
    const noteId = this.props.note?.id;

    this.props.setActiveId(undefined);

    if (noteId != null && shouldDeleteNote) {
      this.props.removeNote({ id: noteId });
    }
  }
}

function mapStateToProps(state: RootState): NotePanel.StoreProps {
  return {
    note: selectNotesActiveNote(state)
  };
}

const mapDispatchToProps: NotePanel.DispatchProps = {
  setActiveId: NotesActions.setActiveId,
  setNoteValue: NotesActions.setNoteValue,
  removeNote: NotesActions.removeNote
};

const enhanceWithRedux = connect(mapStateToProps, mapDispatchToProps);
export const NotePanel = enhanceWithRedux(NotePanelInternal);
