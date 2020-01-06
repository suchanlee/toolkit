import * as React from "react";
import { CodePanel } from "./CodePanel";

require("./Code.scss");

export namespace Code {
  export interface Props {}
}

export class Code extends React.PureComponent<Code.Props> {
  public render() {
    return (
      <div className="code">
        <CodePanel />
      </div>
    );
  }
}
