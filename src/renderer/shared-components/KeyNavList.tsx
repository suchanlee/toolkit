import classNames from "classnames";
import * as mousetrap from "mousetrap";
import * as React from "react";
import { connect } from "react-redux";
import { KeyNavListActions } from "../actions/keyNavListActions";
import { selectKeyNavListLocations } from "../selectors/keyNavListSelectors";
import { createInitialKeyNavListLocation } from "../states/keyNavListState";
import { RootState } from "../states/rootState";
import { KeyNavListLocation } from "../types/types";
import { KeyNavListItem } from "./KeyNavListItem";

export namespace KeyNavList {
  export interface OwnProps<T> {
    className?: string;
    id: string;
    itemClassName?: string;
    ignoredKeys?: Set<string>;
    items: readonly T[];
    onItemSelect: (item: T) => void;
    getItemKey: (item: T) => string;
    renderItem: (item: T, listId: string, index: number) => JSX.Element;
  }

  export interface StoreProps {
    location: KeyNavListLocation;
  }

  export interface DispatchProps {
    init: typeof KeyNavListActions.init;
    reset: typeof KeyNavListActions.remove;
    moveUp: typeof KeyNavListActions.moveUp;
    moveDown: typeof KeyNavListActions.moveDown;
  }

  export type Props<T> = OwnProps<T> & StoreProps & DispatchProps;
}

export class KeyNavListInternal<T> extends React.PureComponent<KeyNavList.Props<T>> {
  public componentDidMount() {
    this.props.init({ id: this.props.id });
    mousetrap.bind("up", this.handleUp);
    mousetrap.bind("down", this.handleDown);
    mousetrap.bind("enter", this.handleEnter);
  }

  public componentWillUnmount() {
    mousetrap.unbind("up");
    mousetrap.unbind("down");
    mousetrap.unbind("enter");
    this.props.reset({ id: this.props.id });
  }

  public render() {
    return (
      <div className={classNames("key-nav-list", this.props.className)}>
        {this.props.items.map((item, index) => (
          <KeyNavListItem
            key={this.props.getItemKey(item)}
            className={this.props.itemClassName}
            listId={this.props.id}
            row={index}
            item={item}
            onItemSelect={this.props.onItemSelect}
          >
            {this.props.renderItem(item, this.props.id, index)}
          </KeyNavListItem>
        ))}
      </div>
    );
  }

  private handleUp = (evt: KeyboardEvent) => {
    if (!this.props.ignoredKeys?.has(evt.key) && this.props.location.row > 0) {
      this.props.moveUp({ id: this.props.id });
      evt.preventDefault();
    }
  };

  private handleDown = (evt: KeyboardEvent) => {
    const { items, location: current, moveDown } = this.props;
    if (!this.props.ignoredKeys?.has(evt.key) && items.length - 1 > current.row) {
      moveDown({ id: this.props.id });
    }
    evt.preventDefault();
  };

  private handleEnter = (evt: KeyboardEvent) => {
    if (this.props.ignoredKeys?.has(evt.key)) {
      return;
    }

    const { onItemSelect, items, location: current } = this.props;
    const { row } = current;
    onItemSelect(items[row]);
  };
}

function mapStateToProps(
  state: RootState,
  ownProps: KeyNavList.OwnProps<any>
): KeyNavList.StoreProps {
  return {
    location: selectKeyNavListLocations(state)[ownProps.id] ?? createInitialKeyNavListLocation()
  };
}

const mapDispatchToProps: KeyNavList.DispatchProps = {
  init: KeyNavListActions.init,
  reset: KeyNavListActions.remove,
  moveUp: KeyNavListActions.moveUp,
  moveDown: KeyNavListActions.moveDown
};

const enhanceWithRedux = connect(mapStateToProps, mapDispatchToProps);
export const KeyNavList = enhanceWithRedux(KeyNavListInternal);
