import * as React from "react";
import { v4 as uuid } from "uuid";
import { ReadingBanner } from "./ReadingBanner";
import { ReadingInput } from "./ReadingInput";
import { ReadingList } from "./ReadingList";
import { ReadingListFilter } from "./ReadingListFilter";
import { ReadingPanel } from "./ReadingPanel";
import "./Readings.scss";

export namespace Readings {
  export interface Props {}
}

export class Readings extends React.PureComponent<Readings.Props> {
  private listId = uuid();

  public render() {
    return (
      <div className="readings">
        <ReadingBanner listId={this.listId} />
        <ReadingInput listId={this.listId} />
        <ReadingListFilter />
        <ReadingList listId={this.listId} />
        <ReadingPanel />
      </div>
    );
  }
}
