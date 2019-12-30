import * as React from "react";
import { ReadingInput } from "./ReadingInput";
import { ReadingList } from "./ReadingList";
import { ReadingPanel } from "./ReadingPanel";

require("./Readings.scss");

export namespace Readings {
  export interface Props {}
}

export class Readings extends React.PureComponent<Readings.Props> {
  public render() {
    return (
      <div className="readings">
        <ReadingInput />
        <ReadingList />
        <ReadingPanel />
      </div>
    );
  }
}
