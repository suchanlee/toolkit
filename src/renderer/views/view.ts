import { keyBy } from "lodash-es";
import { View } from "../types/viewTypes";
import { createNotesView } from "./notes/notesView";
import { createReadingsView } from "./readings/readingsView";
import { createTodosView } from "./todos/todosView";

export const Views: readonly View<any>[] = [
  createTodosView(),
  createNotesView(),
  createReadingsView()
];
export const ViewsByName = keyBy(Views, v => v.name);
