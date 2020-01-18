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
    onNavTab(direction: "left" | "right"): void;
    onClickTab(id: string): void;
    onCloseTab(id: string): void;
  }
}

export class NoteTabs extends React.PureComponent<NoteTabs.Props> {
  public componentDidMount() {
    disableCommandWCloseApp();
    document.addEventListener("keydown", this.handleKeydown);
  }

  public componentWillUnmount() {
    // want to delay a bit before calling so that the cmd+W command doesn't
    // close the application
    setTimeout(() => {
      enableCommandWCloseApp();
    }, 100);
    document.removeEventListener("keydown", this.handleKeydown);
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

  private handleKeydown = (evt: KeyboardEvent) => {
    if (evt.metaKey && evt.altKey) {
      if (evt.key === "ArrowLeft") {
        this.props.onNavTab("left");
      } else if (evt.key === "ArrowRight") {
        this.props.onNavTab("right");
      }
    }
  };

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
