import { keyBy } from "lodash-es";
import { View } from "../types/viewTypes";
import { CodeView } from "./code/codeView";
import { NotesView } from "./notes/notesView";
import { ReadingsView } from "./readings/readingsView";
import { TodosView } from "./todos/todosView";

export const Views: readonly View<any>[] = [TodosView, ReadingsView, NotesView, CodeView];

export const ViewsByName = keyBy(Views, v => v.name);
