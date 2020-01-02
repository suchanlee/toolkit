import { app } from "electron";
import fs from "fs";
import path from "path";
import { writeData } from "./writeData";

export function readData(fileName: string) {
  const filePath = path.join(app.getPath("userData"), `${fileName}.json`);
  let data: string;

  const hasFile = fs.existsSync(filePath);
  if (!hasFile) {
    writeData(fileName, {});
  }

  try {
    data = fs.readFileSync(filePath, "utf8");
  } catch (e) {
    console.warn(`Failed to read file for path: ${filePath}`, e);
    return {};
  }

  try {
    return JSON.parse(data);
  } catch (e) {
    console.warn(`Failed to parse JSON for file: ${filePath}`, e);
    return {};
  }
}
