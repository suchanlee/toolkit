import * as React from "react";
import { NoteList } from "./NoteList";
import { NotePanel } from "./NotePanel";
import { NotesFilter } from "./NotesFilter";
import { NotesInput } from "./NotesInput";

export namespace Notes {
  export interface Props {}
}

export class Notes extends React.PureComponent<Notes.Props> {
  public render() {
    return (
      <div className="notes">
        <NotesInput />
        <NotesFilter />
        <NoteList />
        <NotePanel />
      </div>
    );
  }
}
