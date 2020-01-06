import * as React from "react";
import { connect } from "react-redux";
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
          <textarea
            className="note-panel-textarea"
            placeholder="Write note here..."
            autoFocus={true}
            value={note.value}
            onChange={this.handleChange}
            onKeyUp={this.handleKeyUp}
          />
        )}
      </PanelContainer>
    );
  }

  private handleClose = () => {
    this.props.setActiveId(undefined);
  };

  private handleChange = (evt: React.SyntheticEvent<HTMLTextAreaElement>) => {
    if (this.props.note != null) {
      this.props.setNoteValue({
        id: this.props.note.id,
        value: evt.currentTarget.value
      });
    }
  };

  private handleKeyUp = (evt: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (evt.key === "Escape") {
      this.props.setActiveId(undefined);
    }
  };
}

function mapStateToProps(state: RootState): NotePanel.StoreProps {
  return {
    note: selectNotesActiveNote(state)
  };
}

const mapDispatchToProps: NotePanel.DispatchProps = {
  setActiveId: NotesActions.setActiveId,
  setNoteValue: NotesActions.setNoteValue
};

const enhanceWithRedux = connect(mapStateToProps, mapDispatchToProps);
export const NotePanel = enhanceWithRedux(NotePanelInternal);
