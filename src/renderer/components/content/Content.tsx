import * as React from "react";
import { connect } from "react-redux";
import { selectNavigationActiveView } from "../../selectors/navigationSelectors";
import { RootState } from "../../states/rootState";
import { ViewsByName } from "../../views/view";

require("./Content.scss");

export namespace Content {
  export interface StoreProps {
    currentView: string;
  }

  export type Props = StoreProps;
}

class ContentInternal extends React.PureComponent<Content.Props> {
  public render() {
    return <div className="content">{this.renderContent()}</div>;
  }

  private renderContent() {
    const { currentView } = this.props;
    const view = ViewsByName[currentView];
    if (view != null) {
      return view.element;
    }

    return `Unable to find view from: ${currentView}`;
  }
}

function mapStateToProps(state: RootState): Content.StoreProps {
  return {
    currentView: selectNavigationActiveView(state)
  };
}

const enhanceWithRedux = connect(mapStateToProps);
export const Content = enhanceWithRedux(ContentInternal);
