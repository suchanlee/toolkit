import { Checkbox, Icon } from "@blueprintjs/core";
import classNames from "classnames";
import { noop } from "lodash-es";
import * as React from "react";
import { Draggable } from "react-beautiful-dnd";
import { connect } from "react-redux";
import { KeyNavListActions } from "../../../actions/keyNavListActions";
import { selectKeyNavListLocations } from "../../../selectors/keyNavListSelectors";
import { RootState } from "../../../states/rootState";
import { TodosActions } from "../redux/todosActions";
import { Todo, TodoDate, TodoStatus } from "../redux/todosTypes";
import { linkifyText } from "../utils/linkifyText";

require("./TodoItem.scss");

export namespace TodoItem {
  export interface OwnProps {
    date: TodoDate;
    todo: Todo;
    listId: string;
    rowIndex: number;
    dndIndex: number;
    isReadonly: boolean;
    isDragDisabled: boolean;
  }

  export interface StoreProps {
    isActive: boolean;
  }

  export interface DispatchProps {
    remove: typeof TodosActions.removeTodo;
    setStatus: typeof TodosActions.setTodoStatus;
    keyNavSet: typeof KeyNavListActions.set;
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
    const { todo, isReadonly, dndIndex, isDragDisabled, isActive } = this.props;

    return (
      <Draggable draggableId={todo.id} index={dndIndex} isDragDisabled={isDragDisabled}>
        {provided => (
          <React.Fragment>
            <div
              className={classNames("todos-todo-item", {
                "-active": isActive
              })}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              ref={provided.innerRef}
            >
              <span
                className={classNames("todos-todo-item-status-indicator", {
                  "-not-started": todo.status === TodoStatus.NOT_STARTED,
                  "-in-progress": todo.status === TodoStatus.IN_PROGRESS,
                  "-finished": todo.status === TodoStatus.FINISHED
                })}
              />
              <Checkbox
                checked={todo.status === TodoStatus.FINISHED}
                indeterminate={todo.status === TodoStatus.IN_PROGRESS}
                onChange={isReadonly ? noop : this.handleItemClick}
                className="todos-todo-checkbox"
                labelElement={
                  <span
                    className={classNames("todos-todo-item-label", {
                      "-finished": todo.status === TodoStatus.FINISHED
                    })}
                  >
                    {linkifyText(todo.value)}
                  </span>
                }
              />

              {!isReadonly && (
                <Icon
                  className="todos-todo-remove-icon"
                  icon="cross"
                  title="Click to remove this todo"
                  onClick={this.handleRemoveClick}
                />
              )}
            </div>
          </React.Fragment>
        )}
      </Draggable>
    );
  }

  private handleItemClick = () => {
    this.changeStatus();
    this.props.keyNavSet({
      id: this.props.listId,
      location: {
        row: this.props.rowIndex
      }
    });
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

  private handleKeyDown = (evt: KeyboardEvent) => {
    if (evt.metaKey && evt.key === "Backspace") {
      this.props.remove({ date: this.props.date, todoId: this.props.todo.id });
    }
  };

  private bindKeyUp() {
    document.addEventListener("keyup", this.handleKeyUp);
    document.addEventListener("keydown", this.handleKeyDown);
  }

  private unbindKeyUp() {
    document.removeEventListener("keyup", this.handleKeyUp);
    document.removeEventListener("keydown", this.handleKeyDown);
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
  setStatus: TodosActions.setTodoStatus,
  keyNavSet: KeyNavListActions.set
};

const enhance = connect(mapStoreToProps, mapDispatchToProps);
export const TodoItem = enhance(TodoItemInternal);
