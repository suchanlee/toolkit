import classNames from "classnames";
import * as React from "react";

export namespace KeyNavListItem {
  export interface Props<T> {
    className?: string;
    item: T;
    onItemSelect: (item: T) => void;
  }
}

export class KeyNavListItem<T> extends React.PureComponent<KeyNavListItem.Props<T>> {
  public render() {
    return (
      <div
        className={classNames("key-nav-list-item", this.props.className)}
        onClick={this.handleClick}
      >
        {this.props.children}
      </div>
    );
  }

  private handleClick = () => {
    this.props.onItemSelect(this.props.item);
  };
}
