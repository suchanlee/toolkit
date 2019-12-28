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
    mousetrap.bind("/", this.handleSlashKeyUp);

    // navigation
    mousetrap.bind("command+1", this.handleCommandPlusOneKeyUp);
    mousetrap.bind("command+2", this.handleCommandPlusTwoKeyUp);
    mousetrap.bind("command+3", this.handleCommandPlusThreeKeyUp);
    mousetrap.bind("command+4", this.handleCommandPlusFourKeyUp);
  }

  private unregisterKeyboardListeners() {
    mousetrap.reset();
  }

  private handleSlashKeyUp = (evt: ExtendedKeyboardEvent) => {
    const target = (evt.target ?? evt.srcElement) as HTMLElement | null;
    if (target == null || !SLASH_IGNORED_TAG_NAMES.has(target.tagName?.toLowerCase())) {
      this.props.showFloatingMenu();
      // prevent default of this keyUp as it will cause the floating menu
      // input to have the "/" key registered and set as value
      // evt.stopPropagation();
      evt.preventDefault();
    }
  };

  private handleCommandPlusOneKeyUp = () => this.props.setNav(Nav.TODOS);
  private handleCommandPlusTwoKeyUp = () => this.props.setNav(Nav.READINGS);
  private handleCommandPlusThreeKeyUp = () => this.props.setNav(Nav.NOTES);
  private handleCommandPlusFourKeyUp = () => this.props.setNav(Nav.JS);
}

const SLASH_IGNORED_TAG_NAMES = new Set(["input", "textarea", "select"]);

const mapDispatchToProps: KeyboardNavigation.DispatchProps = {
  showFloatingMenu: FloatingMenuActions.show,
  hideFloatingMenu: FloatingMenuActions.hide,
  setNav: NavigationActions.setNav
};

const enhanceWithRedux = connect(undefined, mapDispatchToProps);
export const KeyboardNavigation = enhanceWithRedux(KeyboardNavigationInternal);
