import { ipcMain } from "electron-better-ipc";
import { grabIt, GrabItResponse } from "grabity";
import { IpcEvent } from "../shared/ipcEvent";

export function registerMainIpcListeners() {
  ipcMain.answerRenderer<GrabItResponse>(IpcEvent.REQUEST_URL_METADATA, (url: unknown) => {
    return grabIt(url as string);
  });
}
