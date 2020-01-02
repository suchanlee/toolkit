import * as React from "react";
import { connect } from "react-redux";
import { PanelContainer } from "../../../shared-components/PanelContainer";
import { RootState } from "../../../states/rootState";
import { Note } from "../notesTypes";
import { NotesActions } from "../redux/notesActions";
import { selectNotesActive } from "../redux/notesSelectors";
import { getNoteTitle } from "../utils/notesUtils";

export namespace NotePanel {
  export interface StoreProps {
    note: Note | undefined;
  }

  export interface DispatchProps {
    setActive: typeof NotesActions.setActive;
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
        <textarea />
      </PanelContainer>
    );
  }

  private handleClose = () => {
    this.props.setActive(undefined);
  };
}

function mapStateToProps(state: RootState): NotePanel.StoreProps {
  return {
    note: selectNotesActive(state)
  };
}

const mapDispatchToProps: NotePanel.DispatchProps = {
  setActive: NotesActions.setActive
};

const enhanceWithRedux = connect(mapStateToProps, mapDispatchToProps);
export const NotePanel = enhanceWithRedux(NotePanelInternal);
