import { app } from "electron";
import fs from "fs";
import path from "path";

export function writeData(fileName: string, data: object) {
  const filePath = path.join(app.getPath("userData"), `${fileName}.json`);
  fs.writeFileSync(filePath, JSON.stringify(data));
}
