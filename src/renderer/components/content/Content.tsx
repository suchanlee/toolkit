import * as React from "react";
import { connect } from "react-redux";
import { selectNavigationActive } from "../../selectors/navigationSelectors";
import { RootState } from "../../states/rootState";
import { Nav } from "../../types/types";
import { Readings } from "../readings/Readings";

require("./Content.scss");

export namespace Content {
  export interface StoreProps {
    currentNav: Nav;
  }

  export type Props = StoreProps;
}

class ContentInternal extends React.PureComponent<Content.Props> {
  public render() {
    return <div className="content">{this.renderContent()}</div>;
  }

  private renderContent() {
    const { currentNav } = this.props;
    switch (currentNav) {
      case Nav.READINGS:
        return <Readings />;
      default:
        return currentNav;
    }
  }
}

function mapStateToProps(state: RootState): Content.StoreProps {
  return {
    currentNav: selectNavigationActive(state)
  };
}

const enhanceWithRedux = connect(mapStateToProps);
export const Content = enhanceWithRedux(ContentInternal);
