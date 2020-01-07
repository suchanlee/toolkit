import { Button } from "@blueprintjs/core";
import * as React from "react";
import { connect } from "react-redux";
import { RootState } from "../../../states/rootState";
import { TodosActions } from "../redux/todosActions";
import { selectTodosHasToday } from "../redux/todosSelectors";

require("./TodosInitButton.scss");

export namespace TodosInitButton {
  export interface StoreProps {
    hasToday: boolean;
  }

  export interface DispatchProps {
    initToday: typeof TodosActions.initToday;
  }

  export type Props = StoreProps & DispatchProps;
}

class TodosInitButtonInternal extends React.PureComponent<TodosInitButton.Props> {
  public render() {
    if (this.props.hasToday) {
      return null;
    }

    return (
      <div className="todos-init-button">
        <Button text="Initialize todos for today" onClick={this.handleClick} />
      </div>
    );
  }

  private handleClick = () => {
    this.props.initToday();
  };
}

function mapStateToProps(state: RootState): TodosInitButton.StoreProps {
  return {
    hasToday: selectTodosHasToday(state)
  };
}

const mapDispatchToProps: TodosInitButton.DispatchProps = {
  initToday: TodosActions.initToday
};

const enhance = connect(mapStateToProps, mapDispatchToProps);
export const TodosInitButton = enhance(TodosInitButtonInternal);
