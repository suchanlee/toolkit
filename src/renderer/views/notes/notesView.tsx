import React from "react";
import { View } from "../../types/viewTypes";
import { Notes } from "./components/Notes";

export const NotesView: View<any> = {
  name: "Notes",
  element: <Notes />
};
