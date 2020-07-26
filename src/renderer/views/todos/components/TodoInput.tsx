import * as React from "react";
import { connect } from "react-redux";
import { KeyNavListActions } from "../../../actions/keyNavListActions";
import { selectKeyNavListLocations } from "../../../selectors/keyNavListSelectors";
import { KeyboardNavSupportedInput } from "../../../shared-components/KeyboardNavSupportedInput";
import { KNL_NON_SELECTING_ROW } from "../../../states/keyNavListState";
import { RootState } from "../../../states/rootState";
import { TodosActions } from "../redux/todosActions";

require("./TodoInput.scss");

export namespace TodoInput {
  export interface OwnProps {
    listId: string;
  }

  export interface StoreProps {
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
  }
}

class TodoInputInternal extends React.PureComponent<TodoInput.Props, TodoInput.State> {
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
          placeholder="Write and press Enter to add todo"
          onChange={this.handleChange}
          onKeyUp={this.handleKeyUp}
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
      this.props.setActive(undefined);
    } else if (evt.key === "Enter" && !this.props.isSelectingTodo) {
      if (this.state.value.trim().length > 0) {
        this.props.addTodo({
          value: this.state.value
        });
        this.setState({ value: "" });
      }
    }
  };
}

function mapStateToProps(state: RootState, ownProps: TodoInput.OwnProps): TodoInput.StoreProps {
  const location = selectKeyNavListLocations(state)[ownProps.listId];
  return {
    isSelectingTodo: location?.row !== KNL_NON_SELECTING_ROW
  };
}

const mapDispatchToProps: TodoInput.DispatchProps = {
  setActive: TodosActions.setActive,
  addTodo: TodosActions.addTodo,
  initLocation: KeyNavListActions.init
};

const enhance = connect(mapStateToProps, mapDispatchToProps);
export const TodoInput = enhance(TodoInputInternal);
