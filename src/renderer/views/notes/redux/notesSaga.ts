import { ipcRenderer } from "electron-better-ipc";
import { isEmpty } from "lodash-es";
import { setWith, TypedAction } from "redoodle";
import { put, select, takeEvery } from "redux-saga/effects";
import { IpcEvent } from "../../../../shared/ipcEvent";
import { Iso8601String } from "../../../types/types";
import { Note, NotesById } from "../notesTypes";
import { NotesActions, NotesInternalActions } from "./notesActions";
import { selectNotesNotes } from "./notesSelectors";

const NOTES_FILE_NAME = "notes";

export function* notesSaga() {
  yield initializeNotes();
  yield takeEvery(NotesActions.addNote.TYPE, addNote);
  yield takeEvery(NotesActions.setNoteValue.TYPE, setNoteValue);
}

function* initializeNotes() {
  let notes: NotesById = yield ipcRenderer.callMain(IpcEvent.READ_DATA, NOTES_FILE_NAME);

  if (notes == null || isEmpty(notes)) {
    notes = {};
  }

  if (notes != null) {
    yield put(NotesInternalActions.setNotes(notes));
  }
}

function* addNote(action: TypedAction<Note>) {
  const currentNotes: NotesById = yield select(selectNotesNotes);
  const newNotes: NotesById = {
    ...currentNotes,
    [action.payload.id]: action.payload
  };
  yield put(NotesInternalActions.setNotes(newNotes));
  writeNotes(newNotes);
}

function* setNoteValue(action: TypedAction<NotesActions.SetNoteValuePayload>) {
  const { id, value } = action.payload;
  const currentNotes: NotesById = yield select(selectNotesNotes);
  const newNotes: NotesById = {
    ...currentNotes,
    [id]: setWith(currentNotes[id], {
      value,
      lastModified: new Date().toISOString() as Iso8601String
    })
  };

  yield put(NotesInternalActions.setNotes(newNotes));
  writeNotes(newNotes);
}

function writeNotes(notes: NotesById) {
  ipcRenderer.callMain(IpcEvent.WRITE_DATA, {
    fileName: NOTES_FILE_NAME,
    data: notes
  });
}
