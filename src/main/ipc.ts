import { Menu } from "electron";
import { ipcMain } from "electron-better-ipc";
import { grabIt, GrabItResponse } from "grabity";
import { IpcEvent } from "../shared/ipcEvent";
import { readData } from "./data/readData";
import { writeData } from "./data/writeData";

export function registerMainIpcListeners() {
  ipcMain.answerRenderer<GrabItResponse>(IpcEvent.REQUEST_URL_METADATA, (url: unknown) => {
    return grabIt(url as string);
  });

  ipcMain.answerRenderer<void>(IpcEvent.WRITE_DATA, (args: unknown) => {
    const { fileName, data } = args as { fileName: string; data: object };
    writeData(fileName, data);
  });

  ipcMain.answerRenderer<object>(IpcEvent.READ_DATA, (fileName: unknown) => {
    return readData(fileName as string);
  });

  ipcMain.answerRenderer<void>(IpcEvent.SET_MENU_ENABLED, (args: unknown) => {
    const { menuId, enabled } = args as { menuId: string; enabled: boolean };
    const menu = Menu.getApplicationMenu();

    if (menu != null) {
      const menuItem = menu.getMenuItemById(menuId);
      if (menuItem != null) {
        menuItem.enabled = enabled;
      }
    }
  });
}
