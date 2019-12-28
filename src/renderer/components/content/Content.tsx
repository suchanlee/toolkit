import * as React from "react";
import { connect } from "react-redux";
import { selectNavigationActive } from "../../selectors/navigationSelectors";
import { RootState } from "../../states/rootState";
import { Nav } from "../../types/types";

export namespace Content {
  export interface StoreProps {
    currentNav: Nav;
  }

  export type Props = StoreProps;
}

class ContentInternal extends React.PureComponent<Content.Props> {
  public render() {
    return <div className="content">{this.props.currentNav}</div>;
  }
}

function mapStateToProps(state: RootState): Content.StoreProps {
  return {
    currentNav: selectNavigationActive(state)
  };
}

const enhanceWithRedux = connect(mapStateToProps);
export const Content = enhanceWithRedux(ContentInternal);
