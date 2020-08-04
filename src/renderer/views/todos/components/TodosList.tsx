import { groupBy } from "lodash-es";
import * as React from "react";
import { DragDropContext, Draggable, DragStart, Droppable, DropResult } from "react-beautiful-dnd";
import { connect } from "react-redux";
import { defaultMemoize } from "reselect";
import { KeyNavListActions } from "../../../actions/keyNavListActions";
import { selectKeyNavListLocations } from "../../../selectors/keyNavListSelectors";
import { createInitialKeyNavListLocation } from "../../../states/keyNavListState";
import { RootState } from "../../../states/rootState";
import { TodosActions } from "../redux/todosActions";
import { selectActiveTodosDay, selectTodosIsReadonly } from "../redux/todosSelectors";
import { Todo, TodosDay } from "../redux/todosTypes";
import { TODO_DEFAULT_GROUP } from "../todosObjects";
import { getTodoGroups } from "../utils/todoGroupUtils";
import { TodoItem } from "./TodoItem";

require("./TodosList.scss");

export namespace TodosList {
  export interface OwnProps {
    listId: string;
    setEscapeKeyCloseDisabled(isDisabled: boolean): void;
  }

  export interface StoreProps {
    day: TodosDay | undefined;
    isReadonly: boolean;
    isLastRow: boolean;
  }

  export interface DispatchProps {
    moveTodo: typeof TodosActions.moveTodo;
    moveGroup: typeof TodosActions.moveGroup;
    keyNavInit: typeof KeyNavListActions.init;
    keyNavRemove: typeof KeyNavListActions.remove;
    keyNavMoveUp: typeof KeyNavListActions.moveUp;
    keyNavMoveDown: typeof KeyNavListActions.moveDown;
  }

  export type Props = OwnProps & StoreProps & DispatchProps;

  export type State = {
    isDraggingGroup: boolean;
    isDraggingTodo: boolean;
  };
}

const GROUP_DRAGGABLE_ID = "group";
const TODOS_DROPPABLE_ID_PREFIX = "todos-";

class TodosListInternal extends React.PureComponent<TodosList.Props> {
  public state: TodosList.State = {
    isDraggingGroup: false,
    isDraggingTodo: false
  };

  public componentDidMount() {
    this.props.keyNavInit({ id: this.props.listId });
    document.addEventListener("keydown", this.handleKeyDown);
  }

  public componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeyDown);
    this.props.keyNavRemove({ id: this.props.listId });
  }

  public render() {
    if (this.props.day == null) {
      return;
    }

    const { day, isReadonly, listId } = this.props;
    const { isDraggingGroup, isDraggingTodo } = this.state;
    const groupedTodos = this.getGroupedTodos(day.todos);
    const groups = getTodoGroups(day.todos);
    let rowIndex = 0;
    return (
      <DragDropContext onDragEnd={this.handleDragEnd} onDragStart={this.handleDragStart}>
        <Droppable
          droppableId={GROUP_DRAGGABLE_ID}
          isDropDisabled={this.props.isReadonly || isDraggingTodo}
          type="droppableSubItem"
        >
          {provided => (
            <div className="todos-list" ref={provided.innerRef} {...provided.droppableProps}>
              {groups.map((g, index) => {
                const group = g ?? TODO_DEFAULT_GROUP;
                return (
                  // tslint:disable-next-line: no-increment-decrement
                  <Draggable
                    key={group}
                    draggableId={group}
                    index={index}
                    isDragDisabled={isReadonly || isDraggingTodo}
                  >
                    {provided => (
                      <div
                        className="todos-list-group-container"
                        ref={provided.innerRef}
                        {...provided.dragHandleProps}
                        {...provided.draggableProps}
                      >
                        <div className="todos-list-group">{group}</div>
                        <Droppable
                          droppableId={`${TODOS_DROPPABLE_ID_PREFIX}${group}`}
                          isDropDisabled={isDraggingGroup || isReadonly}
                          type="droppableSubItem"
                        >
                          {provided => (
                            <div>
                              <div ref={provided.innerRef} {...provided.droppableProps}>
                                {groupedTodos[g!].map((todo, index) => (
                                  <TodoItem
                                    key={todo.id}
                                    todo={todo}
                                    date={day.date}
                                    isReadonly={isReadonly}
                                    isDragDisabled={isDraggingGroup || isReadonly}
                                    listId={listId}
                                    // tslint:disable-next-line: no-increment-decrement
                                    rowIndex={rowIndex++}
                                    dndIndex={index}
                                  />
                                ))}
                              </div>
                              {provided.placeholder}
                            </div>
                          )}
                        </Droppable>
                      </div>
                    )}
                  </Draggable>
                );
              })}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    );
  }

  private handleKeyDown = (evt: KeyboardEvent) => {
    if (!this.props.isReadonly) {
      switch (evt.key) {
        case "ArrowUp":
          this.props.keyNavMoveUp({ id: this.props.listId });
          evt.preventDefault();
          break;
        case "ArrowDown":
          if (!this.props.isLastRow) {
            this.props.keyNavMoveDown({ id: this.props.listId });
            evt.preventDefault();
          }
          break;
        default:
        // noop
      }
    }
  };

  private handleDragStart = (initial: DragStart) => {
    if (initial.source.droppableId === GROUP_DRAGGABLE_ID) {
      this.setState({
        isDraggingGroup: initial.source.droppableId === GROUP_DRAGGABLE_ID,
        isDraggingTodo: false
      });
    } else if (initial.source.droppableId.startsWith(TODOS_DROPPABLE_ID_PREFIX)) {
      this.setState({
        isDraggingGroup: false,
        isDraggingTodo: true
      });
    }
  };

  private handleDragEnd = (result: DropResult) => {
    if (this.props.day == null) {
      return;
    }

    if (result.source.droppableId === GROUP_DRAGGABLE_ID) {
      if (this.state.isDraggingGroup) {
        this.setState({ isDraggingGroup: false });
      }

      if (result.destination?.droppableId === GROUP_DRAGGABLE_ID) {
        this.props.moveGroup({
          date: this.props.day.date,
          fromIndex: result.source.index,
          toIndex: result.destination.index
        });
      }
    } else if (result.source.droppableId.startsWith(TODOS_DROPPABLE_ID_PREFIX)) {
      if (this.state.isDraggingTodo) {
        this.setState({ isDraggingTodo: false });

        if (result.destination?.droppableId.startsWith(TODOS_DROPPABLE_ID_PREFIX)) {
          const fromGroup = getGroupFromTodosDroppableId(result.source.droppableId);
          const toGroup = getGroupFromTodosDroppableId(result.destination.droppableId);
          this.props.moveTodo({
            fromGroup,
            toGroup,
            date: this.props.day.date,
            fromLocalIndex: result.source.index,
            toLocalIndex: result.destination.index
          });
        }
      }
    }
  };

  private getGroupedTodos = defaultMemoize((todos: readonly Todo[]) =>
    groupBy(todos, todo => todo.group)
  );
}

function getGroupFromTodosDroppableId(todosDroppableId: string) {
  const group = todosDroppableId.replace(TODOS_DROPPABLE_ID_PREFIX, "");
  return group === TODO_DEFAULT_GROUP ? undefined : group;
}

function mapStateToProps(state: RootState, ownProps: TodosList.OwnProps): TodosList.StoreProps {
  const location =
    selectKeyNavListLocations(state)[ownProps.listId] ?? createInitialKeyNavListLocation();
  const day = selectActiveTodosDay(state);
  return {
    day,
    isReadonly: selectTodosIsReadonly(state),
    isLastRow: day != null && location.row === day.todos.length - 1
  };
}

const mapDispatchToProps: TodosList.DispatchProps = {
  moveTodo: TodosActions.moveTodo,
  moveGroup: TodosActions.moveGroup,
  keyNavInit: KeyNavListActions.init,
  keyNavRemove: KeyNavListActions.remove,
  keyNavMoveUp: KeyNavListActions.moveUp,
  keyNavMoveDown: KeyNavListActions.moveDown
};

const enhance = connect(mapStateToProps, mapDispatchToProps);
export const TodosList = enhance(TodosListInternal);
