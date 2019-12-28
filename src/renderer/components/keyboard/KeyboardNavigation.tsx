import * as mousetrap from "mousetrap";
import * as React from "react";
import { connect } from "react-redux";
import { FloatingMenuActions } from "../../actions/floatingMenuActions";
import { NavigationActions } from "../../actions/navigationActions";
import { Nav } from "../../types/types";

export namespace KeyboardNavigation {
  export interface DispatchProps {
    showFloatingMenu: typeof FloatingMenuActions.show;
    hideFloatingMenu: typeof FloatingMenuActions.hide;
    setNav: typeof NavigationActions.setNav;
  }

  export type Props = DispatchProps;
}

class KeyboardNavigationInternal extends React.PureComponent<KeyboardNavigation.Props> {
  public componentDidMount() {
    this.registerKeyboardListeners();
  }

  public componentWillUnmount() {
    this.unregisterKeyboardListeners();
  }

  public render() {
    return null;
  }

  private registerKeyboardListeners() {
    // floating menu
    mousetrap.bind("esc", this.props.hideFloatingMenu);
    mousetrap.bind("/", this.handleSlashPress);

    // navigation
    mousetrap.bind("command+1", this.handleCommandPlusOnePress);
    mousetrap.bind("command+2", this.handleCommandPlusTwoPress);
    mousetrap.bind("command+3", this.handleCommandPlusThreePress);
    mousetrap.bind("command+4", this.handleCommandPlusFourPress);
  }

  private unregisterKeyboardListeners() {
    mousetrap.reset();
  }

  private handleSlashPress = (evt: KeyboardEvent) => {
    this.props.showFloatingMenu();
    // prevent default of this keypress as it will cause the floating menu
    // input to have the "/" key registered and set as value
    // evt.stopPropagation();
    evt.preventDefault();
  };

  private handleCommandPlusOnePress = () => this.props.setNav(Nav.TODOS);
  private handleCommandPlusTwoPress = () => this.props.setNav(Nav.READINGS);
  private handleCommandPlusThreePress = () => this.props.setNav(Nav.NOTES);
  private handleCommandPlusFourPress = () => this.props.setNav(Nav.JS);
}

const mapDispatchToProps: KeyboardNavigation.DispatchProps = {
  showFloatingMenu: FloatingMenuActions.show,
  hideFloatingMenu: FloatingMenuActions.hide,
  setNav: NavigationActions.setNav
};

const enhanceWithRedux = connect(undefined, mapDispatchToProps);
export const KeyboardNavigation = enhanceWithRedux(KeyboardNavigationInternal);
