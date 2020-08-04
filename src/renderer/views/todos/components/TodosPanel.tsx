import * as React from "react";
import { connect } from "react-redux";
import { v4 as uuid } from "uuid";
import { PanelContainer } from "../../../shared-components/PanelContainer";
import { RootState } from "../../../states/rootState";
import { TodosActions } from "../redux/todosActions";
import { selectTodosActiveDate, selectTodosIsReadonly } from "../redux/todosSelectors";
import { TodoDate } from "../redux/todosTypes";
import { todoDateToStr } from "../utils/todoDateUtils";
import { TodoInput } from "./TodoInput";
import { TodosList } from "./TodosList";
import { TodosPanelBanner } from "./TodosPanelBanner";

require("./TodosPanel.scss");

export namespace TodosPanel {
  export interface StoreProps {
    activeDate: TodoDate | undefined;
    isReadonly: boolean;
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
    const { activeDate, isReadonly } = this.props;
    return (
      <PanelContainer
        className="todos-panel-container"
        title={
          activeDate != null ? `Todos for ${todoDateToStr(activeDate)}` : "Active date not set."
        }
        isOpen={activeDate != null}
        onClose={this.handleClose}
      >
        {activeDate != null && (
          <div className="todos-panel">
            <TodosPanelBanner listId={this.listId} isReadonly={isReadonly} />
            {!isReadonly && (
              <TodoInput
                listId={this.listId}
                setEscapeKeyCloseDisabled={this.setEscapeKeyCloseDisabled}
              />
            )}
            <TodosList
              listId={this.listId}
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
    activeDate: selectTodosActiveDate(state),
    isReadonly: selectTodosIsReadonly(state)
  };
}

const mapDispatchToProps: TodosPanel.DispatchProps = {
  setActive: TodosActions.setActive
};

const enhance = connect(mapStateToProps, mapDispatchToProps);
export const TodosPanel = enhance(TodosPanelInternal);
