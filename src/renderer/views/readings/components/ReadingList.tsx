import * as React from "react";
import { connect, ConnectedComponent } from "react-redux";
import { KeyNavList, KeyNavListInternal } from "../../../shared-components/KeyNavList";
import { RootState } from "../../../states/rootState";
import { hashString } from "../../../utils/stringUtils";
import { Reading } from "../readingsTypes";
import { selectFilteredReadings } from "../redux/readingsSelectors";
import { ReadingSummary } from "./ReadingSummary";

// hack due connected component not properly supporting generic components
const KNL = KeyNavList as ConnectedComponent<
  typeof KeyNavListInternal,
  KeyNavList.OwnProps<Reading>
>;

export namespace ReadingList {
  export interface StoreProps {
    readings: readonly Reading[];
  }

  export type Props = StoreProps;
}

class ReadingListInternal extends React.PureComponent<ReadingList.Props> {
  public render() {
    return (
      <KNL
        className="reading-list"
        items={this.props.readings}
        getItemKey={getItemKey}
        onItemSelect={this.handleSelect}
        renderItem={renderItem}
      />
    );
  }

  private handleSelect = (reading: Reading) => {
    alert(reading.title);
  };
}

function getItemKey(reading: Reading) {
  return `${hashString(reading.value)}`;
}

function renderItem(reading: Reading) {
  return <ReadingSummary reading={reading} />;
}

function mapStateToProps(state: RootState): ReadingList.StoreProps {
  return {
    readings: selectFilteredReadings(state)
  };
}

const enhanceWithRedux = connect(mapStateToProps);
export const ReadingList = enhanceWithRedux(ReadingListInternal);
