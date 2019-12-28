import * as mousetrap from "mousetrap";
import * as React from "react";
import { connect } from "react-redux";
import { FloatingMenuActions } from "../../actions/floatingMenuActions";

export namespace KeyboardNavigation {
  export interface DispatchProps {
    showFloatingMenu: typeof FloatingMenuActions.show;
    hideFloatingMenu: typeof FloatingMenuActions.hide;
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
    mousetrap.bind("esc", this.props.hideFloatingMenu);
    mousetrap.bind("/", this.handleSlashPress);
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
}

const mapDispatchToProps: KeyboardNavigation.DispatchProps = {
  showFloatingMenu: FloatingMenuActions.show,
  hideFloatingMenu: FloatingMenuActions.hide
};

const enhanceWithRedux = connect(undefined, mapDispatchToProps);
export const KeyboardNavigation = enhanceWithRedux(KeyboardNavigationInternal);
