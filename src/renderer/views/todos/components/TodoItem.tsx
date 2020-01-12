import { Checkbox, Icon } from "@blueprintjs/core";
import classNames from "classnames";
import * as React from "react";
import { Todo, TodoStatus } from "../redux/todosTypes";

require("./TodoItem.scss");

export namespace TodoItem {
  export interface Props {
    todo: Todo;
  }
}

export class TodoItem extends React.PureComponent<TodoItem.Props> {
  public render() {
    const { todo } = this.props;
    return (
      <div className="todos-todo-item">
        <Checkbox
          checked={todo.status === TodoStatus.FINISHED}
          indeterminate={todo.status === TodoStatus.IN_PROGRESS}
          className="todos-todo-checkbox"
          labelElement={
            <span
              className={classNames("todos-todo-item-label", {
                "-finished": todo.status === TodoStatus.FINISHED
              })}
            >
              {todo.value}
            </span>
          }
        />

        <Icon className="todos-todo-remove-icon" icon="cross" title="Click to remove this todo" />
      </div>
    );
  }
}
