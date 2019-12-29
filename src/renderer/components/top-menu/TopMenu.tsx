import { Classes } from "@blueprintjs/core";
import classNames from "classnames";
import * as React from "react";
import { connect } from "react-redux";
import { NavigationActions } from "../../actions/navigationActions";
import { selectNavigationActive } from "../../selectors/navigationSelectors";
import { RootState } from "../../states/rootState";
import { Nav } from "../../types/types";

require("./TopMenu.scss");

const MENU_ITEMS = [Nav.TODOS, Nav.READINGS, Nav.NOTES, Nav.JS];

export namespace TopMenu {
  export interface StoreProps {
    currentNav: Nav;
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
        {MENU_ITEMS.map(nav => this.renderMenuItem(nav))}
      </div>
    );
  }

  private renderMenuItem(nav: Nav) {
    return (
      <span
        key={nav}
        className={classNames("top-menu-item", { "-active": this.props.currentNav === nav })}
        onClick={() => this.props.setNav(nav)}
      >
        {nav}
      </span>
    );
  }
}

function mapStateToProps(state: RootState): TopMenu.StoreProps {
  return {
    currentNav: selectNavigationActive(state)
  };
}

const mapDispatchToProps: TopMenu.DispatchProps = {
  setNav: NavigationActions.setNav
};

const enhanceWithRedux = connect(mapStateToProps, mapDispatchToProps);
export const TopMenu = enhanceWithRedux(TopMenuInternal);
