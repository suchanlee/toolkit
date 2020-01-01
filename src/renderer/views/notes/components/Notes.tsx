import * as React from "react";
import { NoteList } from "./NoteList";

export namespace Notes {
  export interface Props {}
}

export class Notes extends React.PureComponent<Notes.Props> {
  public render() {
    return (
      <div className="notes">
        <NoteList />
      </div>
    );
  }
}
