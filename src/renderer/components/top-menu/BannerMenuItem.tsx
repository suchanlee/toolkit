import classNames from "classnames";
import React, { useCallback } from "react";
import { connect } from "react-redux";
import { BannerActions } from "../../actions/bannerActions";
import { selectBannerHasValue } from "../../selectors/bannerSelectors";
import { RootState } from "../../states/rootState";

export namespace BannerMenuItem {
  export interface StoreProps {
    hasValue: boolean;
  }

  export interface DispatchProps {
    setBanner: typeof BannerActions.set;
  }

  export type Props = StoreProps & DispatchProps;
}

const BannerMenuItemInternal = React.memo((props: BannerMenuItem.Props) => {
  if (props.hasValue) {
    return null;
  }

  const handleClick = useCallback(() => {
    props.setBanner("<CLICK AND CHANGE ME // EMPTY BANNER REMOVES IT>");
  }, []);

  return (
    <span className={classNames("top-menu-item", "banner-menu-item")} onClick={handleClick}>
      SET BANNER
    </span>
  );
});

function mapStateToProps(state: RootState): BannerMenuItem.StoreProps {
  return {
    hasValue: selectBannerHasValue(state)
  };
}

const mapDispatchToProps: BannerMenuItem.DispatchProps = {
  setBanner: BannerActions.set
};

const enhance = connect(mapStateToProps, mapDispatchToProps);
export const BannerMenuItem = enhance(BannerMenuItemInternal);
