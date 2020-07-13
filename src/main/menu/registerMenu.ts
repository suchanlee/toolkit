import { app, Menu, MenuItemConstructorOptions } from "electron";

export function registerMenu() {
  const isMac = process.platform === "darwin";
  const separator = "separator" as "separator";

  // Based on https://github.com/electron/electron/blob/master/docs/api/menu.md
  const template: MenuItemConstructorOptions[] = [
    ...(isMac
      ? [
          {
            label: app.name,
            submenu: [
              { role: "about" as "about" },
              { type: separator },
              { role: "services" as "services" },
              { type: separator },
              { role: "hide" as "hide" },
              { role: "hideOthers" as "hideOthers" },
              { role: "unhide" as "unhide" },
              { type: separator },
              { role: "quit" as "quit" }
            ]
          }
        ]
      : []),
    {
      label: "File",
      submenu: [
        isMac
          ? {
              // can't use "close" role as that doesn't support disabling menu item
              label: "Close Window",
              accelerator: "CommandOrControl+W",
              id: "close",
              registerAccelerator: true,
              click: (_menuItem: Electron.MenuItem, browserWindow: Electron.BrowserWindow) => {
                if (browserWindow != null) {
                  browserWindow.close();
                }
              }
            }
          : { role: "quit" as "quit" }
      ]
    },
    {
      label: "Edit",
      submenu: [
        { role: "undo" as "undo" },
        { role: "redo" as "redo" },
        { type: separator },
        { role: "cut" as "cut" },
        { role: "copy" as "copy" },
        { role: "paste" as "paste" },
        ...(isMac
          ? [
              { role: "pasteAndMatchStyle" as "pasteAndMatchStyle" },
              { role: "delete" as "delete" },
              { role: "selectAll" as "selectAll" },
              { type: separator },
              {
                label: "Speech",
                submenu: [
                  { role: "startSpeaking" as "startSpeaking" },
                  { role: "stopSpeaking" as "stopSpeaking" }
                ]
              }
            ]
          : [
              { role: "delete" as "delete" },
              { type: separator },
              { role: "selectAll" as "selectAll" }
            ])
      ]
    },
    {
      label: "View",
      submenu: [
        { role: "reload" as "reload" },
        { role: "forceReload" as "forceReload" },
        { role: "toggleDevTools" as "toggleDevTools" },
        { type: separator },
        { role: "resetZoom" as "resetZoom" },
        { role: "zoomIn" as "zoomIn", accelerator: "CommandOrControl+=" },
        { role: "zoomOut" as "zoomOut" },
        { type: separator },
        { role: "togglefullscreen" as "togglefullscreen" }
      ]
    },
    {
      label: "Window",
      submenu: [
        { role: "minimize" as "minimize" },
        { role: "zoom" as "zoom" },
        ...(isMac
          ? [
              { type: separator },
              { role: "front" as "front" },
              { type: separator },
              { role: "window" as "window" }
            ]
          : [{ role: "close" as "close" }])
      ]
    }
  ];

  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
}
