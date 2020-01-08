import { Button, Callout } from "@blueprintjs/core";
import * as mousetrap from "mousetrap";
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
  public componentDidMount() {
    mousetrap.bind("command+n", this.handleKeyDown);
  }

  public componentWillUnmount() {
    mousetrap.unbind("command+n");
  }

  public render() {
    if (this.props.hasToday) {
      return null;
    }

    return (
      <Callout className="todos-init-button" intent="primary" icon={null}>
        <Button text="Initialize todos for today (⌘N)" minimal={true} onClick={this.handleClick} />
      </Callout>
    );
  }

  private handleClick = () => {
    this.props.initToday();
  };

  private handleKeyDown = this.props.initToday;
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
