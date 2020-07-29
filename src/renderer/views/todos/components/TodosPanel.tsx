import * as React from "react";
import { connect } from "react-redux";
import { v4 as uuid } from "uuid";
import { PanelContainer } from "../../../shared-components/PanelContainer";
import { RootState } from "../../../states/rootState";
import { TodosActions } from "../redux/todosActions";
import {
  selectActiveTodosDay,
  selectTodosGroups,
  selectTodosIsReadonly
} from "../redux/todosSelectors";
import { TodoGroup, TodosDay } from "../redux/todosTypes";
import { todoDateToStr } from "../utils/todoDateUtils";
import { TodoInput } from "./TodoInput";
import { TodosList } from "./TodosList";
import { TodosPanelBanner } from "./TodosPanelBanner";

require("./TodosPanel.scss");

export namespace TodosPanel {
  export interface StoreProps {
    active: TodosDay | undefined;
    isReadonly: boolean;
    groups: readonly TodoGroup[];
  }

  export interface DispatchProps {
    setActive: typeof TodosActions.setActive;
  }

  export type Props = StoreProps & DispatchProps;

  export interface State {
    isCloseDisabled: boolean;
  }
}

class TodosPanelInternal extends React.PureComponent<TodosPanel.Props, TodosPanel.State> {
  private listId = uuid();

  public state: TodosPanel.State = {
    isCloseDisabled: false
  };

  public render() {
    const { active, isReadonly, groups } = this.props;
    return (
      <PanelContainer
        className="todos-panel-container"
        title={active != null ? `Todos for ${todoDateToStr(active.date)}` : "Active date not set."}
        isOpen={active != null}
        onClose={this.handleClose}
      >
        {active != null && (
          <div className="todos-panel">
            <TodosPanelBanner listId={this.listId} isReadonly={isReadonly} />
            {!isReadonly && <TodoInput listId={this.listId} />}
            <TodosList
              listId={this.listId}
              day={active}
              isReadonly={isReadonly}
              groups={groups}
              setEscapeKeyCloseDisabled={this.setEscapeKeyCloseDisabled}
            />
          </div>
        )}
      </PanelContainer>
    );
  }

  private handleClose = () => {
    if (!this.state.isCloseDisabled) {
      this.props.setActive(undefined);
    }
  };

  private setEscapeKeyCloseDisabled = (isDisabled: boolean) => {
    this.setState({ isCloseDisabled: isDisabled });
  };
}

function mapStateToProps(state: RootState): TodosPanel.StoreProps {
  return {
    active: selectActiveTodosDay(state),
    isReadonly: selectTodosIsReadonly(state),
    groups: selectTodosGroups(state)
  };
}

const mapDispatchToProps: TodosPanel.DispatchProps = {
  setActive: TodosActions.setActive
};

const enhance = connect(mapStateToProps, mapDispatchToProps);
export const TodosPanel = enhance(TodosPanelInternal);
