import { Intent } from "@blueprintjs/core";
import React from "react";
import { connect } from "react-redux";
import { selectKeyNavListLocations } from "../../../selectors/keyNavListSelectors";
import { KNL_NON_SELECTING_ROW } from "../../../states/keyNavListState";
import { RootState } from "../../../states/rootState";
import { InfoBanner } from "../../notes/components/InfoBanner";

export namespace ReadingBanner {
  export interface StoreProps {
    isSelectingReading: boolean;
  }

  export interface OwnProps {
    listId: string;
  }

  export type Props = StoreProps & OwnProps;
}

function ReadingBannerInternal(props: ReadingBanner.Props) {
  const text = props.isSelectingReading
    ? "ENTER TO OPEN IN PANEL, ⌘+ENTER TO OPEN IN BROWSER"
    : "PASTE URL AND PRESS ENTER TO ADD";

  return <InfoBanner intent={props.isSelectingReading ? Intent.PRIMARY : undefined} text={text} />;
}

function mapStoreProps(
  state: RootState,
  ownProps: ReadingBanner.OwnProps
): ReadingBanner.StoreProps {
  const location = selectKeyNavListLocations(state)[ownProps.listId];
  return {
    isSelectingReading: location?.row !== KNL_NON_SELECTING_ROW
  };
}

const enhance = connect(mapStoreProps);
export const ReadingBanner = enhance(ReadingBannerInternal);
