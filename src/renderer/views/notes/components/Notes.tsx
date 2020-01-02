import * as React from "react";
import { NoteList } from "./NoteList";
import { NotePanel } from "./NotePanel";
import { NotesInput } from "./NotesInput";

export namespace Notes {
  export interface Props {}
}

export class Notes extends React.PureComponent<Notes.Props> {
  public render() {
    return (
      <div className="notes">
        <NotesInput />
        <NoteList />
        <NotePanel />
      </div>
    );
  }
}
