import { Icon } from "@blueprintjs/core";
import classNames from "classnames";
import { ipcRenderer } from "electron-better-ipc";
import * as React from "react";
import { IpcEvent } from "../../../../shared/ipcEvent";
import { NoteIdentifier } from "../notesTypes";
import "./NoteTabs.scss";

export namespace NoteTabs {
  export interface Props {
    activeNoteId: string;
    noteIdentifiers: readonly NoteIdentifier[];
    onClickTab(id: string): void;
    onCloseTab(id: string): void;
  }
}

export class NoteTabs extends React.PureComponent<NoteTabs.Props> {
  public componentDidMount() {
    disableCommandWCloseApp();
  }

  public componentWillUnmount() {
    setTimeout(() => {
      enableCommandWCloseApp();
    }, 100);
  }

  public render() {
    const { noteIdentifiers } = this.props;
    if (noteIdentifiers.length === 0) {
      return null;
    }

    return (
      <div className="note-tabs">
        {noteIdentifiers.map(identifier => this.renderTab(identifier))}
      </div>
    );
  }

  private renderTab(identifer: NoteIdentifier) {
    return (
      <div
        key={identifer.id}
        className={classNames("note-tab", {
          "-active": this.props.activeNoteId === identifer.id
        })}
        onClick={() => this.handleTabClick(identifer.id)}
      >
        <span className="note-tab-title">{identifer.title}</span>
        <Icon
          className="note-tab-close"
          icon="small-cross"
          onClick={evt => this.handleCloseClick(identifer.id, evt)}
        />
      </div>
    );
  }

  private handleTabClick = (id: string) => {
    this.props.onClickTab(id);
  };

  private handleCloseClick = (id: string, evt: React.SyntheticEvent) => {
    this.props.onCloseTab(id);
    // prevent click event propgating to note tab
    evt.stopPropagation();
  };
}

async function disableCommandWCloseApp() {
  await ipcRenderer.callMain(IpcEvent.SET_MENU_ENABLED, { menuId: "close", enabled: false });
}

async function enableCommandWCloseApp() {
  await ipcRenderer.callMain(IpcEvent.SET_MENU_ENABLED, { menuId: "close", enabled: true });
}
