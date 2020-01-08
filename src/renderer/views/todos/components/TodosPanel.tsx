import * as React from "react";
import { connect } from "react-redux";
import { PanelContainer } from "../../../shared-components/PanelContainer";
import { RootState } from "../../../states/rootState";
import { TodosActions } from "../redux/todosActions";
import { selectActiveTodosDay } from "../redux/todosSelectors";
import { TodosDay } from "../redux/todosTypes";
import { todoDateToStr } from "../utils/todoDateUtils";
import { TodoInput } from "./TodoInput";
import { TodosList } from "./TodosList";

require("./TodosPanel.scss");

export namespace TodosPanel {
  export interface StoreProps {
    active: TodosDay | undefined;
  }

  export interface DispatchProps {
    setActive: typeof TodosActions.setActive;
    addTodo: typeof TodosActions.addTodo;
  }

  export type Props = StoreProps & DispatchProps;
}

class TodosPanelInternal extends React.PureComponent<TodosPanel.Props> {
  public render() {
    const { active } = this.props;

    return (
      <PanelContainer
        className="todos-panel-container"
        title={active != null ? `Todos for ${todoDateToStr(active.date)}` : "Active date not set."}
        isOpen={active != null}
        onClose={this.handleClose}
      >
        {active != null && (
          <div className="todos-panel">
            <TodoInput addTodo={this.props.addTodo} onPanelClose={this.handleClose} />
            <TodosList day={active} />
          </div>
        )}
      </PanelContainer>
    );
  }

  private handleClose = () => {
    this.props.setActive(undefined);
  };
}

function mapStateToProps(state: RootState): TodosPanel.StoreProps {
  return {
    active: selectActiveTodosDay(state)
  };
}

const mapDispatchToProps: TodosPanel.DispatchProps = {
  setActive: TodosActions.setActive,
  addTodo: TodosActions.addTodo
};

const enhance = connect(mapStateToProps, mapDispatchToProps);
export const TodosPanel = enhance(TodosPanelInternal);
