import * as React from "react";
import { connect } from "react-redux";
import { KeyNavListActions } from "../../../actions/keyNavListActions";
import { selectKeyNavListLocations } from "../../../selectors/keyNavListSelectors";
import { KeyboardNavSupportedInput } from "../../../shared-components/KeyboardNavSupportedInput";
import { KNL_NON_SELECTING_ROW } from "../../../states/keyNavListState";
import { RootState } from "../../../states/rootState";
import { TodosActions } from "../redux/todosActions";
import { selectTodosActiveDayGroups } from "../redux/todosSelectors";
import { TodosInputDialog } from "./TodosInputDialog";

require("./TodoInput.scss");

export namespace TodoInput {
  export interface OwnProps {
    listId: string;
    setEscapeKeyCloseDisabled(isDisabled: boolean): void;
  }

  export interface StoreProps {
    groups: readonly (string | undefined)[];
    isSelectingTodo: boolean;
  }

  export interface DispatchProps {
    addTodo: typeof TodosActions.addTodo;
    setActive: typeof TodosActions.setActive;
    initLocation: typeof KeyNavListActions.init;
  }

  export type Props = OwnProps & StoreProps & DispatchProps;

  export interface State {
    value: string;
    isDialogOpen: boolean;
  }
}

class TodoInputInternal extends React.PureComponent<TodoInput.Props, TodoInput.State> {
  public state: TodoInput.State = {
    value: "",
    isDialogOpen: false
  };

  private inputRef = React.createRef<KeyboardNavSupportedInput>();

  public render() {
    return (
      <React.Fragment>
        <div className="todos-todo-input-container">
          <KeyboardNavSupportedInput
            ref={this.inputRef}
            className="todos-todo-input"
            autoFocus={true}
            value={this.state.value}
            placeholder="Write and press Enter to add todo, ⌘+Enter to add todo to specific group"
            onChange={this.handleChange}
            onKeyUp={this.handleKeyUp}
            onKeyDown={this.handleKeyDown}
          />
        </div>
        <TodosInputDialog
          isOpen={this.state.isDialogOpen}
          groups={this.props.groups}
          onClose={this.closeDialog}
          addTodo={this.addTodoForGroup}
        />
      </React.Fragment>
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
      this.props.setActive(undefined);
    }
  };

  private handleKeyDown = (evt: React.KeyboardEvent) => {
    if (evt.key === "Enter" && !this.props.isSelectingTodo && this.state.value.trim().length > 0) {
      if (evt.metaKey) {
        this.openDialog();
      } else {
        this.props.addTodo({
          value: this.state.value
        });
        this.setState({ value: "" });
      }
    }
  };

  private openDialog = () => {
    this.setState({ isDialogOpen: true });
    this.props.setEscapeKeyCloseDisabled(true);
  };

  private closeDialog = () => {
    this.setState({ isDialogOpen: false });

    // need to make sure that esc doesn't close the whole panel by enabling it too fast
    setTimeout(() => {
      this.props.setEscapeKeyCloseDisabled(false);
      this.inputRef.current?.focus();
    }, 200);
  };

  private addTodoForGroup = (group?: string) => {
    const payload: TodosActions.AddTodoPayload =
      group != null ? { group, value: this.state.value } : { value: this.state.value };
    this.props.addTodo(payload);
    this.closeDialog();
    this.setState({ value: "" });
  };
}

function mapStateToProps(state: RootState, ownProps: TodoInput.OwnProps): TodoInput.StoreProps {
  const location = selectKeyNavListLocations(state)[ownProps.listId];
  return {
    isSelectingTodo: location?.row !== KNL_NON_SELECTING_ROW,
    groups: selectTodosActiveDayGroups(state)
  };
}

const mapDispatchToProps: TodoInput.DispatchProps = {
  setActive: TodosActions.setActive,
  addTodo: TodosActions.addTodo,
  initLocation: KeyNavListActions.init
};

const enhance = connect(mapStateToProps, mapDispatchToProps);
export const TodoInput = enhance(TodoInputInternal);
