import * as React from "react";
import { Note } from "../notesTypes";
import { getNoteParts } from "../utils/notesUtils";

require("./NoteItem.scss");

export namespace NoteItem {
  export interface Props {
    note: Note;
  }
}

export class NoteItem extends React.PureComponent<NoteItem.Props> {
  public render() {
    const { title, summary } = getNoteParts(this.props.note);
    const lastModifiedDate = new Date(this.props.note.lastModified);

    return (
      <div className="note-item">
        <div className="note-item-title" title={title}>
          {title}
        </div>
        <div className="note-item-description" title={summary}>
          <span className="note-item-date">{formatDate(lastModifiedDate)}</span>
          {summary}
        </div>
      </div>
    );
  }
}

function formatDate(date: Date) {
  if (isToday(date)) {
    const hour = date.getHours();
    const isPm = hour >= 12;
    return `${isPm ? hour - 12 : hour}:${`${date.getMinutes()}`.padStart(2, "0")} ${
      isPm ? "PM" : "AM"
    }`;
  } else {
    return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
  }
}

function isToday(date: Date) {
  return date.toDateString() === new Date().toDateString();
}
