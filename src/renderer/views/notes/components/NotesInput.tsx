import { Button, ControlGroup } from "@blueprintjs/core";
import * as mousetrap from "mousetrap";
import * as React from "react";
import { connect } from "react-redux";
import { KeyboardNavSupportedInput } from "../../../shared-components/KeyboardNavSupportedInput";
import { RootState } from "../../../states/rootState";
import { createNote } from "../noteObject";
import { NotesActions } from "../redux/notesActions";
import { selectNotesQuery } from "../redux/notesSelectors";

require("./NotesInput.scss");

export namespace NotesInput {
  export interface StoreProps {
    query: string;
  }

  export interface DispatchProps {
    setQuery: typeof NotesActions.setQuery;
    addNote: typeof NotesActions.addNote;
    setActiveId: typeof NotesActions.setActiveId;
  }

  export type Props = StoreProps & DispatchProps;
}

class NotesInputInternal extends React.PureComponent<NotesInput.Props> {
  public componentDidMount() {
    mousetrap.bind("command+n", this.handleCommandNPress);
  }

  public componentWillUnmount() {
    mousetrap.unbind("command+n");
  }

  public render() {
    return (
      <ControlGroup className="notes-input-container">
        <KeyboardNavSupportedInput
          autoFocus={true}
          className="notes-input"
          placeholder="Search for notes..."
          value={this.props.query}
          onChange={this.handleInputChange}
        />
        <Button icon="plus" title="Add new note (⌘N)" onClick={this.handleButtonClick} />
      </ControlGroup>
    );
  }

  private handleInputChange = (evt: React.SyntheticEvent<HTMLInputElement>) => {
    this.props.setQuery(evt.currentTarget.value);
  };

  private handleButtonClick = () => {
    this.addNote();
  };

  private handleCommandNPress = () => {
    this.addNote();
  };

  private addNote() {
    const note = createNote({ value: "", tags: [] });
    this.props.addNote(note);
    this.props.setActiveId(note.id);
  }
}

function mapStateToProps(state: RootState): NotesInput.StoreProps {
  return {
    query: selectNotesQuery(state)
  };
}

const mapDispatchToProps: NotesInput.DispatchProps = {
  setQuery: NotesActions.setQuery,
  addNote: NotesActions.addNote,
  setActiveId: NotesActions.setActiveId
};

const enhanceWithRedux = connect(mapStateToProps, mapDispatchToProps);
export const NotesInput = enhanceWithRedux(NotesInputInternal);
