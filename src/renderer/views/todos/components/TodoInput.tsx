import * as React from "react";
import { KeyNavListActions } from "../../../actions/keyNavListActions";
import { KeyboardNavSupportedInput } from "../../../shared-components/KeyboardNavSupportedInput";
import { TodosActions } from "../redux/todosActions";
import { TodoType } from "../redux/todosTypes";

require("./TodoInput.scss");

export namespace TodoInput {
  export interface Props {
    listId: string;
    addTodo: typeof TodosActions.addTodo;
    initLocation: typeof KeyNavListActions.init;
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
    const { value } = evt.currentTarget;
    this.setState({ value });
    // reset location to prevent clashing with todo item interaction
    this.props.initLocation({ id: this.props.listId });
  };

  private handleKeyUp = (evt: React.KeyboardEvent) => {
    if (evt.key === "Escape") {
      this.props.onPanelClose();
    }
  };

  // command + key doesn't get triggered in key up, so use key down
  private handleKeyDown = (evt: React.KeyboardEvent) => {
    if (evt.key === "Enter") {
      if (this.state.value.trim().length > 0) {
        this.props.addTodo({
          value: this.state.value,
          type: evt.metaKey ? TodoType.WEEK : TodoType.DAY
        });
        this.setState({ value: "" });
      }
    }
  };
}
