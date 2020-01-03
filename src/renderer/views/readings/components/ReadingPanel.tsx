import * as React from "react";
import { connect } from "react-redux";
import { IFramePanel } from "../../../shared-components/IFramePanel";
import { RootState } from "../../../states/rootState";
import { Reading } from "../readingsTypes";
import { ReadingsActions } from "../redux/readingsActions";
import { selectReadingsActive } from "../redux/readingsSelectors";

export namespace ReadingPanel {
  export interface StoreProps {
    reading: Reading | undefined;
  }

  export interface DispatchProps {
    setActive: typeof ReadingsActions.setActive;
  }

  export type Props = StoreProps & DispatchProps;
}

class ReadingPanelInternal extends React.PureComponent<ReadingPanel.Props> {
  public render() {
    const { reading } = this.props;
    if (reading == null) {
      return null;
    }

    return (
      <IFramePanel
        isOpen={reading != null}
        title={reading.title}
        url={reading.value}
        onClose={this.handleClose}
      />
    );
  }

  private handleClose = () => {
    this.props.setActive(undefined);
  };
}

function mapStateToProps(state: RootState): ReadingPanel.StoreProps {
  return {
    reading: selectReadingsActive(state)
  };
}

const mapDispatchToProps: ReadingPanel.DispatchProps = {
  setActive: ReadingsActions.setActive
};

const enhanceWithRedux = connect(mapStateToProps, mapDispatchToProps);
export const ReadingPanel = enhanceWithRedux(ReadingPanelInternal);
