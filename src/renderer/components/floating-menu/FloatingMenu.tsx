import { Classes, Overlay } from "@blueprintjs/core";
import classnames from "classnames";
import * as React from "react";
import { connect } from "react-redux";
import { FloatingMenuActions } from "../../actions/floatingMenuActions";
import {
  selectFloatingMenuIsShown,
  selectFloatingMenuQuery
} from "../../selectors/floatingMenuSelectors";
import { KeyboardNavSupportedInput } from "../../shared-components/KeyboardNavSupportedInput";
import { RootState } from "../../states/rootState";

require("./FloatingMenu.scss");

export namespace FloatingMenu {
  export interface StoreProps {
    isShown: boolean;
    query: string;
  }

  export interface DispatchProps {
    hideFloatingMenu: typeof FloatingMenuActions.hide;
    setQuery: typeof FloatingMenuActions.setQuery;
  }

  export type Props = StoreProps & DispatchProps;
}

class FloatingMenuInternal extends React.PureComponent<FloatingMenu.Props> {
  public render() {
    return (
      <Overlay
        isOpen={this.props.isShown}
        onClose={this.props.hideFloatingMenu}
        hasBackdrop={false}
        transitionDuration={50}
      >
        <div className={classnames("floating-menu", Classes.ELEVATION_2)}>
          <KeyboardNavSupportedInput
            autoFocus={true}
            className={classnames("floating-menu-input", "mousetrap")}
            onChange={this.handleInputChange}
            value={this.props.query}
          />
        </div>
      </Overlay>
    );
  }

  private handleInputChange = (evt: React.SyntheticEvent<HTMLInputElement>) => {
    const { setQuery, isShown } = this.props;
    if (isShown) {
      setQuery(evt.currentTarget.value);
    }
  };
}

function mapStateToProps(state: RootState): FloatingMenu.StoreProps {
  return {
    isShown: selectFloatingMenuIsShown(state),
    query: selectFloatingMenuQuery(state)
  };
}

const mapDispatchToProps: FloatingMenu.DispatchProps = {
  hideFloatingMenu: FloatingMenuActions.hide,
  setQuery: FloatingMenuActions.setQuery
};

const enhanceWithRedux = connect(mapStateToProps, mapDispatchToProps);
export const FloatingMenu = enhanceWithRedux(FloatingMenuInternal);
