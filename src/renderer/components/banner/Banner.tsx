import { EditableText } from "@blueprintjs/core";
import React, { useCallback, useState } from "react";
import { connect } from "react-redux";
import { BannerActions } from "../../actions/bannerActions";
import { selectBannerValue } from "../../selectors/bannerSelectors";
import { RootState } from "../../states/rootState";
import { InfoBanner } from "../../views/notes/components/InfoBanner";
import "./Banner.scss";

export namespace Banner {
  export interface StoreProps {
    value: string | undefined;
  }

  export interface DispatchProps {
    setBanner: typeof BannerActions.set;
  }

  export type Props = StoreProps & DispatchProps;

  export interface State {
    inputValue: string;
  }
}

const BannerInternal = React.memo((props: Banner.Props) => {
  if (props.value == null) {
    return null;
  }

  const [inputValue, setInputValue] = useState<string>(props.value);

  const handleChange = useCallback((value: string) => {
    setInputValue(value);
  }, []);

  const handleConfirm = useCallback((value: string) => {
    const trimmedValue = value.trim();
    if (trimmedValue.length === 0) {
      props.setBanner(undefined);
    } else {
      props.setBanner(trimmedValue);
    }
  }, []);

  const swallowKeyDown = useCallback((evt: React.KeyboardEvent) => {
    if (evt.key === "Enter") {
      evt.stopPropagation();
      evt.nativeEvent.stopPropagation();
      evt.nativeEvent.stopImmediatePropagation();
      evt.preventDefault();
    }
  }, []);

  const input = (
    <div onKeyDown={swallowKeyDown}>
      <EditableText value={inputValue} onChange={handleChange} onConfirm={handleConfirm} />
    </div>
  );
  return <InfoBanner className="banner-info-banner" value={input} />;
});

function mapStateToProps(state: RootState): Banner.StoreProps {
  return {
    value: selectBannerValue(state)
  };
}

const mapDispatchToProps: Banner.DispatchProps = {
  setBanner: BannerActions.set
};

const enhance = connect(mapStateToProps, mapDispatchToProps);
export const Banner = enhance(BannerInternal);
