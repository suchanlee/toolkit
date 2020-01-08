import * as React from "react";
import { KeyboardNavSupportedInput } from "../../../shared-components/KeyboardNavSupportedInput";
import { TodosActions } from "../redux/todosActions";
import { TodoType } from "../redux/todosTypes";

require("./TodoInput.scss");

export namespace TodoInput {
  export interface Props {
    addTodo: typeof TodosActions.addTodo;
    onPanelClose(): void;
  }
  export interface State {
    value: string;
  }
}

export class TodoInput extends React.PureComponent<TodoInput.Props, TodoInput.State> {
  public state: TodoInput.State = {
    value: ""
  };

  public render() {
    return (
      <div className="todos-todo-input-container">
        <KeyboardNavSupportedInput
          className="todos-todo-input"
          autoFocus={true}
          value={this.state.value}
          placeholder="Write and press Enter to add day todo, ⌘+Enter for week todo"
          onChange={this.handleChange}
          onKeyUp={this.handleKeyUp}
          onKeyDown={this.handleKeyDown}
        />
      </div>
    );
  }

  private handleChange = (evt: React.SyntheticEvent<HTMLInputElement>) => {
    this.setState({ value: evt.currentTarget.value });
  };

  private handleKeyUp = (evt: React.KeyboardEvent) => {
    if (evt.key === "Escape") {
      this.props.onPanelClose();
    }
  };

  // command + key doesn't get triggered in key up, so use key down
  private handleKeyDown = (evt: React.KeyboardEvent) => {
    if (evt.key === "Enter") {
      this.props.addTodo({
        value: this.state.value,
        type: evt.metaKey ? TodoType.WEEK : TodoType.DAY
      });
      this.setState({ value: "" });
    }
  };
}
