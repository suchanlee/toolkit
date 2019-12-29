import * as React from "react";
import { connect, ConnectedComponent } from "react-redux";
import { selectFilteredReadings } from "../../selectors/readingSelectors";
import { KeyNavList, KeyNavListInternal } from "../../shared-components/KeyNavList";
import { RootState } from "../../states/rootState";
import { Reading } from "../../types/types";
import { hashString } from "../../utils/stringUtils";
import { ReadingSummary } from "./ReadingSummary";

// hack due connected component not properly supporting generic components
const KNL = KeyNavList as ConnectedComponent<
  typeof KeyNavListInternal,
  KeyNavList.OwnProps<Reading>
>;

export namespace ReadingsList {
  export interface StoreProps {
    readings: readonly Reading[];
  }

  export type Props = StoreProps;
}

class ReadingsListInternal extends React.PureComponent<ReadingsList.Props> {
  public render() {
    return (
      <KNL
        className="readings-list"
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

function mapStateToProps(state: RootState): ReadingsList.StoreProps {
  return {
    readings: selectFilteredReadings(state)
  };
}

const enhanceWithRedux = connect(mapStateToProps);
export const ReadingsList = enhanceWithRedux(ReadingsListInternal);
