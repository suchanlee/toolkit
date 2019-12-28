import classnames from "classnames";
import { Classes, InputGroup, Overlay } from "@blueprintjs/core";
import * as React from "react";
import { RootState } from "../../states/rootState";
import {
  selectFloatingMenuQuery,
  selectFloatingMenuIsShown
} from "../../selectors/floatingMenuSelectors";
import { connect } from "react-redux";
import { FloatingMenuActions } from "../../actions/floatingMenuActions";

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
          <InputGroup
            autoFocus={true}
            className="floating-menu-input"
            onChange={this.handleInputChange}
            onKeyUp={this.handleInputKeyUp}
            value={this.props.query}
          />
        </div>
      </Overlay>
    );
  }

  private handleInputKeyUp = (evt: React.KeyboardEvent) => {
    if (evt.key === "esc") {
      this.props.hideFloatingMenu();
    }
  };

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
