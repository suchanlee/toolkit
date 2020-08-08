import classNames from "classnames";
import * as React from "react";
import { connect, ConnectedComponent } from "react-redux";
import { KeyNavListActions } from "../actions/keyNavListActions";
import { selectKeyNavListLocations } from "../selectors/keyNavListSelectors";
import { createInitialKeyNavListLocation } from "../states/keyNavListState";
import { RootState } from "../states/rootState";
import { KeyNavListItem } from "./KeyNavListItem";

export namespace KeyNavList {
  export interface OwnProps<T> {
    className?: string;
    id: string;
    itemClassName?: string;
    ignoredKeys?: Set<"ArrowUp" | "ArrowDown" | "Enter">;
    isDisabled?: boolean;
    items: readonly T[];
    onItemSelect: (item: T) => void;
    getItemKey: (item: T) => string;
    renderItem: (item: T, index: number, listId: string) => JSX.Element;
  }

  export interface StoreProps {
    isLastRow: boolean;
  }

  export interface DispatchProps {
    init: typeof KeyNavListActions.init;
    remove: typeof KeyNavListActions.remove;
    moveUp: typeof KeyNavListActions.moveUp;
    moveDown: typeof KeyNavListActions.moveDown;
  }

  export type Props<T> = OwnProps<T> & StoreProps & DispatchProps;
}

class KeyNavListInternal<T> extends React.Component<KeyNavList.Props<T>> {
  public shouldComponentUpdate(nextProps: KeyNavList.Props<T>) {
    return nextProps.isDisabled == null || !nextProps.isDisabled;
  }

  public componentDidMount() {
    this.props.init({ id: this.props.id });
    // use document.addEventListener since we need to support multiple
    // KNLs rendered at any given time and mousetrap only allows global
    document.addEventListener("keydown", this.handleKeyDown);
  }

  public componentWillUnmount() {
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
            isSelectionDisabled={
              (this.props.ignoredKeys != null && this.props.ignoredKeys.has("Enter")) ||
              this.props.isDisabled === true
            }
            onItemSelect={this.props.onItemSelect}
          >
            {this.props.renderItem(item, index, this.props.id)}
          </KeyNavListItem>
        ))}
      </div>
    );
  }

  private handleKeyDown = (evt: KeyboardEvent) => {
    if (this.props.isDisabled !== true) {
      switch (evt.key) {
        case "ArrowUp":
          if (!this.props.ignoredKeys?.has(evt.key)) {
            this.props.moveUp({ id: this.props.id });
            evt.preventDefault();
          }
          break;
        case "ArrowDown":
          if (!this.props.ignoredKeys?.has(evt.key) && !this.props.isLastRow) {
            this.props.moveDown({ id: this.props.id });
            evt.preventDefault();
          }
          break;
        default:
        // noop
      }
    }
  };
}

function mapStateToProps(
  state: RootState,
  ownProps: KeyNavList.OwnProps<any>
): KeyNavList.StoreProps {
  const location =
    selectKeyNavListLocations(state)[ownProps.id] ?? createInitialKeyNavListLocation();
  return {
    isLastRow: location.row === ownProps.items.length - 1
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
