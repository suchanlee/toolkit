import * as React from "react";
import { KeyboardNavSupportedInput } from "../../../shared-components/KeyboardNavSupportedInput";

require("./TodoInput.scss");

export namespace TodoInput {
  export interface Props {
    onPanelClose(): void;
  }
}

export class TodoInput extends React.PureComponent<TodoInput.Props> {
  public render() {
    return (
      <div className="todos-todo-input-container">
        <KeyboardNavSupportedInput
          className="todos-todo-input"
          autoFocus={true}
          placeholder="Add todo..."
          onKeyUp={this.handleKeyUp}
        />
      </div>
    );
  }

  private handleKeyUp = (evt: React.KeyboardEvent) => {
    if (evt.key === "Escape") {
      this.props.onPanelClose();
    }
  };
}
