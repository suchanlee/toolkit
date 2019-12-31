import classNames from "classnames";
import * as mousetrap from "mousetrap";
import * as React from "react";
import { connect } from "react-redux";
import { KeyNavListActions } from "../actions/keyNavListActions";
import { selectKeyNavListCurrent } from "../selectors/keyNavListSelectors";
import { RootState } from "../states/rootState";
import { KeyNavListLocation } from "../types/types";
import { KeyNavListItem } from "./KeyNavListItem";

export namespace KeyNavList {
  export interface OwnProps<T> {
    className?: string;
    itemClassName?: string;
    ignoredKeys?: Set<string>;
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

export class KeyNavListInternal<T> extends React.PureComponent<KeyNavList.Props<T>> {
  public componentDidMount() {
    mousetrap.bind("up", this.handleUp);
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
        {this.props.items.map((item, index) => (
          <KeyNavListItem
            key={this.props.getItemKey(item)}
            className={this.props.itemClassName}
            row={index}
            item={item}
            onItemSelect={this.props.onItemSelect}
          >
            {this.props.renderItem(item)}
          </KeyNavListItem>
        ))}
      </div>
    );
  }

  private handleUp = (evt: KeyboardEvent) => {
    if (!this.props.ignoredKeys?.has(evt.key) && this.props.current.row > 0) {
      this.props.moveUp();
      evt.preventDefault();
    }
  };

  private handleDown = (evt: KeyboardEvent) => {
    const { items, current, moveDown } = this.props;
    if (!this.props.ignoredKeys?.has(evt.key) && items.length - 1 > current.row) {
      moveDown();
    }
    evt.preventDefault();
  };

  private handleEnter = (evt: KeyboardEvent) => {
    if (this.props.ignoredKeys?.has(evt.key)) {
      return;
    }

    const { onItemSelect, items, current } = this.props;
    const { row } = current;
    onItemSelect(items[row]);
  };
}

function mapStateToProps(state: RootState): KeyNavList.StoreProps {
  return {
    current: selectKeyNavListCurrent(state)
  };
}

const mapDispatchToProps: KeyNavList.DispatchProps = {
  reset: KeyNavListActions.reset,
  moveUp: KeyNavListActions.moveUp,
  moveDown: KeyNavListActions.moveDown
};

const enhanceWithRedux = connect(mapStateToProps, mapDispatchToProps);
export const KeyNavList = enhanceWithRedux(KeyNavListInternal);
