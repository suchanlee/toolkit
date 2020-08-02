import { Intent } from "@blueprintjs/core";
import * as React from "react";
import { connect } from "react-redux";
import { selectKeyNavListLocations } from "../../../selectors/keyNavListSelectors";
import { KNL_NON_SELECTING_ROW } from "../../../states/keyNavListState";
import { RootState } from "../../../states/rootState";
import { InfoBanner } from "../../notes/components/InfoBanner";

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
    return <InfoBanner intent={this.getIntent()} value={this.getText()} />;
  }

  private getIntent() {
    const { isReadonly, isSelectingTodo } = this.props;
    if (isReadonly) {
      return Intent.DANGER;
    } else if (!isReadonly && isSelectingTodo) {
      return Intent.PRIMARY;
    } else if (!isReadonly && !isSelectingTodo) {
      return Intent.SUCCESS;
    } else {
      return undefined;
    }
  }

  private getText() {
    if (this.props.isReadonly) {
      return "NON-TODAY TODOS ARE READ ONLY";
    } else if (this.props.isSelectingTodo) {
      return "PRESS ENTER TO UPDATE STATUS / ⌘+BACKSPACE TO DELETE";
    } else {
      return "PRESS ENTER TO ADD DAY TODO / ⌘+ENTER TO ADD TO SPECIFIC GROUP";
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
