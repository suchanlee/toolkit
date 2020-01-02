import * as React from "react";
import { Note } from "../notesTypes";
import { getNoteParts } from "../utils/notesUtils";

export namespace NoteItem {
  export interface Props {
    note: Note;
  }
}

export class NoteItem extends React.PureComponent<NoteItem.Props> {
  public render() {
    const { title, summary } = getNoteParts(this.props.note);
    return (
      <div className="note-item">
        <div className="note-item-title" title={title}>
          {title}
        </div>
        <div className="note-item-description" title={summary}>
          {summary}
        </div>
      </div>
    );
  }
}
