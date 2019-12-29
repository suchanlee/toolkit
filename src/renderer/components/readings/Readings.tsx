import * as React from "react";
import { ReadingsInput } from "./ReadingsInput";
import { ReadingsList } from "./ReadingsList";

export namespace Readings {
  export interface Props {}
}

export class Readings extends React.PureComponent<Readings.Props> {
  public render() {
    return (
      <div className="readings">
        <ReadingsInput />
        <ReadingsList />
      </div>
    );
  }
}
