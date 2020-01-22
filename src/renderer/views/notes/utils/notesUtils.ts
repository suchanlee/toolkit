import { Note, NoteParts } from "../notesTypes";

export function getNoteTitle(note: Note): string {
  const firstLine = note.value
    .slice(0, 100)
    .trim()
    .split("\n")[0];

  if (firstLine.trim().length > 0) {
    return firstLine;
  } else {
    return "Untitled";
  }
}

export function getNoteParts(note: Note): NoteParts {
  const title = getNoteTitle(note);
  const summary = note.value
    .slice(title.length)
    .slice(0, 500)
    .trim();
  return { title, summary };
}
