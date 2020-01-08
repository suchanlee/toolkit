import * as React from "react";
import { Todo } from "../redux/todosTypes";

export namespace TodoItem {
  export interface Props {
    todo: Todo;
  }
}

export class TodoItem extends React.PureComponent<TodoItem.Props> {
  public render() {
    return <div className="todos-todo-item">{this.props.todo.value}</div>;
  }
}
