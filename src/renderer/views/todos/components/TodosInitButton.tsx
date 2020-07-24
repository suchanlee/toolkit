import { Alert, Button, Callout, Classes } from "@blueprintjs/core";
import classNames from "classnames";
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

  export interface State {
    isOpen: boolean;
  }
}

class TodosInitButtonInternal extends React.PureComponent<
  TodosInitButton.Props,
  TodosInitButton.State
> {
  public state: TodosInitButton.State = {
    isOpen: false
  };

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
        <Alert
          className={classNames(Classes.DARK, "todos-init-alert")}
          isOpen={this.state.isOpen}
          onClose={this.handleClose}
          onOpened={this.handleOpened}
          onCancel={this.handleCancel}
          onConfirm={this.handleConfirm}
          canEscapeKeyCancel={true}
          intent="primary"
          confirmButtonText="Yes (Y or Enter)"
          cancelButtonText="No (N)"
        >
          <p>Would you like to inherit todos from the latest available todo day?</p>
        </Alert>
      </Callout>
    );
  }

  private handleKeyDown = () => this.setState({ isOpen: true });
  private handleClose = () => this.setState({ isOpen: false });

  private handleCancel = () => this.props.initToday({ shouldInherit: false });
  private handleConfirm = () => this.props.initToday({ shouldInherit: true });

  private handleOpened = () => {
    mousetrap.bind(["y", "enter"], (evt: KeyboardEvent) => {
      mousetrap.unbind(["y", "enter"]);
      mousetrap.unbind("n");
      this.props.initToday({ shouldInherit: true });
      evt.preventDefault(); // prevet key input being triggered
    });

    mousetrap.bind("n", (evt: KeyboardEvent) => {
      mousetrap.unbind(["y", "enter"]);
      mousetrap.unbind("n");
      this.props.initToday({ shouldInherit: false });
      evt.preventDefault(); // prevet key input being triggered
    });
  };

  private handleClick = () => {
    this.setState({ isOpen: true });
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
