import { Classes } from "@blueprintjs/core";
import classNames from "classnames";
import * as React from "react";
import { connect } from "react-redux";
import { NavigationActions } from "../../actions/navigationActions";
import { selectNavigationActiveView } from "../../selectors/navigationSelectors";
import { RootState } from "../../states/rootState";
import { Views } from "../../views/view";
import { BannerMenuItem } from "./BannerMenuItem";

import "./TopMenu.scss";

export namespace TopMenu {
  export interface StoreProps {
    currentView: string;
  }

  export interface DispatchProps {
    setNav: typeof NavigationActions.setNav;
  }

  export type Props = StoreProps & DispatchProps;
}

class TopMenuInternal extends React.PureComponent<TopMenu.Props> {
  public render() {
    return (
      <div className={classNames("top-menu", Classes.ELEVATION_0)}>
        <span className="top-menu-views">{Views.map(view => this.renderMenuItem(view.name))}</span>
        <span className="top-menu-others">
          <BannerMenuItem />
        </span>
      </div>
    );
  }

  private renderMenuItem(viewName: string) {
    return (
      <span
        key={viewName}
        className={classNames("top-menu-item", { "-active": this.props.currentView === viewName })}
        onClick={() => this.props.setNav(viewName)}
      >
        {viewName.toUpperCase()}
      </span>
    );
  }
}

function mapStateToProps(state: RootState): TopMenu.StoreProps {
  return {
    currentView: selectNavigationActiveView(state)
  };
}

const mapDispatchToProps: TopMenu.DispatchProps = {
  setNav: NavigationActions.setNav
};

const enhanceWithRedux = connect(mapStateToProps, mapDispatchToProps);
export const TopMenu = enhanceWithRedux(TopMenuInternal);
