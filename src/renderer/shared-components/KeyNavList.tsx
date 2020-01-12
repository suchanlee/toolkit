import classNames from "classnames";
import * as React from "react";
import { connect, ConnectedComponent } from "react-redux";
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
    ignoredKeys?: Set<"ArrowUp" | "ArrowDown" | "Enter">;
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
    remove: typeof KeyNavListActions.remove;
    moveUp: typeof KeyNavListActions.moveUp;
    moveDown: typeof KeyNavListActions.moveDown;
  }

  export type Props<T> = OwnProps<T> & StoreProps & DispatchProps;
}

class KeyNavListInternal<T> extends React.PureComponent<KeyNavList.Props<T>> {
  public componentDidMount() {
    this.props.init({ id: this.props.id });
    // use document.addEventListener since we need to support multiple
    // KNLs rendered at any given time and mousetrap only allows global
    document.addEventListener("keyup", this.handleKeyUp);
    document.addEventListener("keydown", this.handleKeyDown);
  }

  public componentWillUnmount() {
    document.removeEventListener("keyup", this.handleKeyUp);
    document.removeEventListener("keydown", this.handleKeyDown);
    this.props.remove({ id: this.props.id });
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

  private handleKeyDown = (evt: KeyboardEvent) => {
    const { items, location, moveDown } = this.props;

    switch (evt.key) {
      case "ArrowUp":
        if (!this.props.ignoredKeys?.has(evt.key) && location.row > 0) {
          this.props.moveUp({ id: this.props.id });
          evt.preventDefault();
        }
        return;
      case "ArrowDown":
        if (!this.props.ignoredKeys?.has(evt.key) && items.length - 1 > location.row) {
          moveDown({ id: this.props.id });
          evt.preventDefault();
        }
        return;
      default:
      // noop
    }
  };

  private handleKeyUp = (evt: KeyboardEvent) => {
    if (evt.key === "Enter") {
      const { items, onItemSelect, ignoredKeys, location } = this.props;
      if (ignoredKeys?.has(evt.key)) {
        return;
      }

      onItemSelect(items[location.row]);
    }
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
  remove: KeyNavListActions.remove,
  moveUp: KeyNavListActions.moveUp,
  moveDown: KeyNavListActions.moveDown
};

const enhanceWithRedux = connect(mapStateToProps, mapDispatchToProps);
const KeyNavList = enhanceWithRedux(KeyNavListInternal);

// hack due connected component not properly supporting generic components
export function createKNL<T>() {
  return KeyNavList as ConnectedComponent<typeof KeyNavListInternal, KeyNavList.OwnProps<T>>;
}
