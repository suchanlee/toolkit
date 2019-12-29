import classNames from "classnames";
import * as mousetrap from "mousetrap";
import * as React from "react";
import { connect } from "react-redux";
import { KeyNavListActions } from "../actions/keyNavListActions";
import { KeyNavListLocation } from "../types/types";
import { KeyNavListItem } from "./KeyNavListItem";

export namespace KeyNavList {
  export interface OwnProps<T> {
    className?: string;
    itemClassName?: string;
    items: readonly T[];
    onItemSelect: (item: T) => void;
    getItemKey: (item: T) => string;
    renderItem: (item: T) => JSX.Element;
  }

  export interface StoreProps {
    current: KeyNavListLocation;
  }

  export interface DispatchProps {
    reset: typeof KeyNavListActions.reset;
    moveUp: typeof KeyNavListActions.moveUp;
    moveDown: typeof KeyNavListActions.moveDown;
  }

  export type Props<T> = OwnProps<T> & StoreProps & DispatchProps;
}

class KeyNavListInternal<T> extends React.PureComponent<KeyNavList.Props<T>> {
  public componentDidMount() {
    mousetrap.bind("up", this.props.moveUp);
    mousetrap.bind("down", this.handleDown);
    mousetrap.bind("enter", this.handleEnter);
  }

  public componentWillUnmount() {
    mousetrap.unbind("up");
    mousetrap.unbind("down");
    mousetrap.unbind("enter");
    this.props.reset();
  }

  public render() {
    return (
      <div className={classNames("key-nav-list", this.props.className)}>
        {this.props.items.map(item => (
          <KeyNavListItem
            key={this.props.getItemKey(item)}
            className={this.props.itemClassName}
            item={item}
            onItemSelect={this.props.onItemSelect}
          >
            {this.props.renderItem(item)}
          </KeyNavListItem>
        ))}
      </div>
    );
  }

  private handleDown = () => {
    const { items, current, moveDown } = this.props;
    if (items.length - 1 > current.row) {
      moveDown();
    }
  };

  private handleEnter = () => {
    const { onItemSelect, items, current } = this.props;
    const { row } = current;
    onItemSelect(items[row]);
  };
}

const mapDispatchToProps: KeyNavList.DispatchProps = {
  reset: KeyNavListActions.reset,
  moveUp: KeyNavListActions.moveUp,
  moveDown: KeyNavListActions.moveDown
};

const enhanceWithRedux = connect(undefined, mapDispatchToProps);
export const KeyNavList = enhanceWithRedux(KeyNavListInternal);
