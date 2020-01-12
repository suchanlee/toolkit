import classNames from "classnames";
import * as React from "react";
import { connect } from "react-redux";
import { selectKeyNavListLocations } from "../../../selectors/keyNavListSelectors";
import { KNL_NON_SELECTING_ROW } from "../../../states/keyNavListState";
import { RootState } from "../../../states/rootState";

require("./TodosPanelBanner.scss");

export namespace TodosPanelBanner {
  export interface OwnProps {
    listId: string;
    isReadonly: boolean;
  }

  export interface StoreProps {
    isSelectingTodo: boolean;
  }

  export type Props = OwnProps & StoreProps;
}

class TodosPanelBannerInternal extends React.PureComponent<TodosPanelBanner.Props> {
  public render() {
    const { isReadonly, isSelectingTodo } = this.props;
    return (
      <div
        className={classNames("todos-panel-banner", {
          "-readonly": isReadonly,
          "-selection": !isReadonly && isSelectingTodo,
          "-input": !isReadonly && !isSelectingTodo
        })}
      >
        {this.renderContent()}
      </div>
    );
  }

  private renderContent() {
    if (this.props.isReadonly) {
      return "NON-TODAY TODOS ARE READ ONLY";
    } else if (this.props.isSelectingTodo) {
      return "PRESS ENTER TO UPDATE STATUS";
    } else {
      return "PRESS ENTER TO ADD DAY TODO, ⌘+ENTER FOR WEEK TODO";
    }
  }
}

export function mapStatetoProps(
  state: RootState,
  ownProps: TodosPanelBanner.OwnProps
): TodosPanelBanner.StoreProps {
  const location = selectKeyNavListLocations(state)[ownProps.listId];
  return {
    isSelectingTodo: location?.row !== KNL_NON_SELECTING_ROW
  };
}

const enhance = connect(mapStatetoProps);
export const TodosPanelBanner = enhance(TodosPanelBannerInternal);
