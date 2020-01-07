import * as React from "react";
import { connect, ConnectedComponent } from "react-redux";
import { v4 as uuid } from "uuid";
import { KeyNavList, KeyNavListInternal } from "../../../shared-components/KeyNavList";
import { RootState } from "../../../states/rootState";
import { Reading } from "../readingsTypes";
import { ReadingsActions } from "../redux/readingsActions";
import { selectFilteredReadings, selectReadingsInputValueIsUrl } from "../redux/readingsSelectors";
import { ReadingItem } from "./ReadingItem";

// hack due connected component not properly supporting generic components
const KNL = KeyNavList as ConnectedComponent<
  typeof KeyNavListInternal,
  KeyNavList.OwnProps<Reading>
>;

const IGNORED_KEYS = new Set(["Enter"]);

export namespace ReadingList {
  export interface StoreProps {
    readings: readonly Reading[];
    isInputValueUrl: boolean;
    // getActiveReading(): Reading | undefined;
  }

  export interface DispatchProps {
    setActive: typeof ReadingsActions.setActive;
  }

  export type Props = StoreProps & DispatchProps;
}

class ReadingListInternal extends React.PureComponent<ReadingList.Props> {
  private listId = uuid();

  public render() {
    return (
      <KNL
        className="reading-list"
        id={this.listId}
        items={this.props.readings}
        ignoredKeys={this.getIgnoredKeys()}
        getItemKey={getItemKey}
        onItemSelect={this.handleSelect}
        renderItem={renderItem}
      />
    );
  }

  private handleSelect = (reading: Reading) => {
    this.props.setActive(reading);
  };

  private getIgnoredKeys() {
    if (this.props.isInputValueUrl) {
      return IGNORED_KEYS;
    } else {
      return undefined;
    }
  }
}

function getItemKey(reading: Reading) {
  return reading.id;
}

function renderItem(reading: Reading, listId: string, index: number) {
  return <ReadingItem reading={reading} listId={listId} index={index} />;
}

function mapStateToProps(state: RootState): ReadingList.StoreProps {
  return {
    readings: selectFilteredReadings(state),
    isInputValueUrl: selectReadingsInputValueIsUrl(state)
  };
}

const mapDispatchToProps: ReadingList.DispatchProps = {
  setActive: ReadingsActions.setActive
};

const enhanceWithRedux = connect(mapStateToProps, mapDispatchToProps);
export const ReadingList = enhanceWithRedux(ReadingListInternal);
