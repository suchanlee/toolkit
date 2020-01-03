import * as React from "react";
import { connect } from "react-redux";
import { MonacoEditor } from "../../../shared-components/monaco/MonacoEditor";
import { PanelContainer } from "../../../shared-components/PanelContainer";
import { RootState } from "../../../states/rootState";
import { Note } from "../notesTypes";
import { NotesActions } from "../redux/notesActions";
import { selectNotesActiveNote } from "../redux/notesSelectors";
import { getNoteTitle } from "../utils/notesUtils";

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
        {note != null && <MonacoEditor value={note.value} onChange={this.handleChange} />}
      </PanelContainer>
    );
  }

  private handleClose = () => {
    this.props.setActiveId(undefined);
  };

  private handleChange = (value: string) => {
    if (this.props.note != null) {
      this.props.setNoteValue({
        id: this.props.note.id,
        value: value
      });
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
