import * as mousetrap from "mousetrap";
import * as React from "react";
import { connect } from "react-redux";
import { FloatingMenuActions } from "../../actions/floatingMenuActions";
import { NavigationActions } from "../../actions/navigationActions";
import { Views } from "../../views/view";

export namespace KeyboardShortcuts {
  export interface DispatchProps {
    showFloatingMenu: typeof FloatingMenuActions.show;
    hideFloatingMenu: typeof FloatingMenuActions.hide;
    setNav: typeof NavigationActions.setNav;
  }

  export type Props = DispatchProps;
}

class KeyboardShortcutsInternal extends React.PureComponent<KeyboardShortcuts.Props> {
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
    Views.forEach((view, index) => {
      // start from index 1 for easier keyboard nav
      mousetrap.bind(`command+${index + 1}`, () => this.props.setNav(view.name));
    });
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
}

const SLASH_IGNORED_TAG_NAMES = new Set(["input", "textarea", "select"]);

const mapDispatchToProps: KeyboardShortcuts.DispatchProps = {
  showFloatingMenu: FloatingMenuActions.show,
  hideFloatingMenu: FloatingMenuActions.hide,
  setNav: NavigationActions.setNav
};

const enhanceWithRedux = connect(undefined, mapDispatchToProps);
export const KeyboardShortcuts = enhanceWithRedux(KeyboardShortcutsInternal);
