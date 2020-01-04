import { Colors } from "@blueprintjs/core";
import * as React from "react";
import { ItemActionButton } from "../../../shared-components/ItemActionButton";
import { ArchiveStatus } from "../../../types/types";
import { Note } from "../notesTypes";
import { NotesActions } from "../redux/notesActions";
import { getNoteParts } from "../utils/notesUtils";

require("./NoteItem.scss");

export namespace NoteItem {
  export interface Props {
    note: Note;
    setArchiveStatus: typeof NotesActions.setArchiveStatus;
  }
}

export class NoteItem extends React.PureComponent<NoteItem.Props> {
  public render() {
    const { title, summary } = getNoteParts(this.props.note);
    const { archiveStatus } = this.props.note;
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

        <ItemActionButton
          className="note-item-archive"
          icon={archiveStatus === ArchiveStatus.ACTIVE ? "archive" : "unarchive"}
          title={archiveStatus === ArchiveStatus.ACTIVE ? "Archive" : "Unarchive"}
          onClick={this.handleArchiveClick}
          backgroundColor={archiveStatus === ArchiveStatus.ACTIVE ? "" : Colors.GREEN3}
        />
      </div>
    );
  }

  private handleArchiveClick = (evt: React.SyntheticEvent) => {
    const { note, setArchiveStatus } = this.props;
    setArchiveStatus({
      id: note.id,
      status:
        note.archiveStatus === ArchiveStatus.ACTIVE ? ArchiveStatus.ARCHIVED : ArchiveStatus.ACTIVE
    });

    // prevent KNLItem selection
    evt.stopPropagation();
  };
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
