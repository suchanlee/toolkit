import { Checkbox, Icon } from "@blueprintjs/core";
import classNames from "classnames";
import * as React from "react";
import { connect } from "react-redux";
import { selectKeyNavListLocations } from "../../../selectors/keyNavListSelectors";
import { RootState } from "../../../states/rootState";
import { TodosActions } from "../redux/todosActions";
import { Todo, TodoDate, TodoStatus } from "../redux/todosTypes";

require("./TodoItem.scss");

export namespace TodoItem {
  export interface OwnProps {
    date: TodoDate;
    todo: Todo;
    listId: string;
    rowIndex: number;
  }

  export interface StoreProps {
    isActive: boolean;
  }

  export interface DispatchProps {
    remove: typeof TodosActions.removeTodo;
    setStatus: typeof TodosActions.setTodoStatus;
  }

  export type Props = OwnProps & StoreProps & DispatchProps;
}

class TodoItemInternal extends React.PureComponent<TodoItem.Props> {
  public componentDidMount() {
    if (this.props.isActive) {
      this.bindKeyUp();
    }
  }

  public componentDidUpdate(prevProps: TodoItem.Props) {
    if (!prevProps.isActive && this.props.isActive) {
      this.bindKeyUp();
    } else if (prevProps.isActive && !this.props.isActive) {
      this.unbindKeyUp();
    }
  }

  public componentWillUnmount() {
    this.unbindKeyUp();
  }

  public render() {
    const { todo } = this.props;
    return (
      <div className="todos-todo-item" onClick={this.handleItemClick}>
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

        <Icon
          className="todos-todo-remove-icon"
          icon="cross"
          title="Click to remove this todo"
          onClick={this.handleRemoveClick}
        />
      </div>
    );
  }

  private handleItemClick = () => {
    this.changeStatus();
  };

  private handleRemoveClick = (evt: React.SyntheticEvent) => {
    this.props.remove({ date: this.props.date, todoId: this.props.todo.id });
    // prevent propagation to the item element
    evt.stopPropagation();
  };

  private handleKeyUp = (evt: KeyboardEvent) => {
    if (evt.key === "Enter") {
      this.changeStatus();
    }
  };

  private bindKeyUp() {
    document.addEventListener("keyup", this.handleKeyUp);
  }

  private unbindKeyUp() {
    document.removeEventListener("keyup", this.handleKeyUp);
  }

  private changeStatus() {
    const { setStatus, todo, date } = this.props;
    const newStatus =
      todo.status === TodoStatus.NOT_STARTED
        ? TodoStatus.IN_PROGRESS
        : todo.status === TodoStatus.IN_PROGRESS
        ? TodoStatus.FINISHED
        : TodoStatus.NOT_STARTED;
    setStatus({ date, todoId: todo.id, status: newStatus });
  }
}

function mapStoreToProps(rootState: RootState, ownProps: TodoItem.OwnProps): TodoItem.StoreProps {
  const location = selectKeyNavListLocations(rootState)[ownProps.listId];
  return {
    isActive: location?.row === ownProps.rowIndex
  };
}

const mapDispatchToProps: TodoItem.DispatchProps = {
  remove: TodosActions.removeTodo,
  setStatus: TodosActions.setTodoStatus
};

const enhance = connect(mapStoreToProps, mapDispatchToProps);
export const TodoItem = enhance(TodoItemInternal);
