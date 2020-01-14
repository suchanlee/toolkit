import { app, BrowserWindow } from "electron";
import * as path from "path";
import * as url from "url";
import { registerMainIpcListeners } from "./ipc";
import { registerMenu } from "./menu/registerMenu";

let win: BrowserWindow | null;

const IS_PRODUCTION = process.env.NODE_ENV === "production";

const installExtensions = async () => {
  const installer = require("electron-devtools-installer");
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
  const extensions = ["REACT_DEVELOPER_TOOLS", "REDUX_DEVTOOLS"];

  return Promise.all(
    extensions.map(name => installer.default(installer[name], forceDownload))
  ).catch(console.log);
};

const createWindow = async () => {
  if (!IS_PRODUCTION) {
    await installExtensions();
  }

  win = new BrowserWindow({ width: 400, height: 650 });

  if (!IS_PRODUCTION) {
    process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = "1";
    win.loadURL(`http://localhost:2003`);
  } else {
    win.loadURL(
      url.format({
        pathname: path.join(__dirname, "index.html"),
        protocol: "file:",
        slashes: true
      })
    );
  }

  if (!IS_PRODUCTION) {
    // Open DevTools, see https://github.com/electron/electron/issues/12438 for why we wait for dom-ready
    win.webContents.once("dom-ready", () => {
      win!.webContents.openDevTools();
    });
  }

  registerMenu();

  win.on("closed", () => {
    win = null;
  });
};

app.on("ready", createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (win === null) {
    createWindow();
  }
});

if (!IS_PRODUCTION) {
  app.setName("Toolkit");
  app.setPath("userData", path.join(app.getPath("appData"), app.getName()));
}

registerMainIpcListeners();
