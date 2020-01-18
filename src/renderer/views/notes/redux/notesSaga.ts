import { ipcRenderer } from "electron-better-ipc";
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
  yield takeEvery(NotesActions.deleteNote.TYPE, deleteNote);
  yield takeEvery(NotesActions.deleteNotesIfEmpty.TYPE, deleteNotesIfEmpty);
  yield takeEvery(NotesActions.setNoteValue.TYPE, setNoteValue);
  yield takeEvery(NotesActions.setArchiveStatus.TYPE, setNoteStatus);
}

function* initializeNotes() {
  let notes: NotesById = yield ipcRenderer.callMain(IpcEvent.READ_DATA, NOTES_FILE_NAME);

  if (notes == null) {
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

function* deleteNote(action: TypedAction<NotesActions.DeleteNotePayload>) {
  const currentNotes: NotesById = yield select(selectNotesNotes);
  const newNotes: NotesById = { ...currentNotes };
  delete newNotes[action.payload.id];
  yield put(NotesInternalActions.setNotes(newNotes));
  writeNotes(newNotes);
}

function* deleteNotesIfEmpty(action: TypedAction<NotesActions.DeleteNotesIfEmptyPayload>) {
  const currentNotes: NotesById = yield select(selectNotesNotes);
  const newNotes: NotesById = { ...currentNotes };

  for (const id of action.payload.ids) {
    const note = currentNotes[id];
    if (note?.value.trim().length === 0) {
      delete newNotes[id];
    }
  }

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

function* setNoteStatus(action: TypedAction<NotesActions.SetStatusPayload>) {
  const currentNotes: NotesById = yield select(selectNotesNotes);
  const note = currentNotes[action.payload.id];

  if (note == null) {
    return;
  }

  const newNotes: NotesById = setWith(currentNotes, {
    [note.id]: setWith(note, {
      archiveStatus: action.payload.status
    })
  });

  yield put(NotesInternalActions.setNotes(newNotes));
  writeNotes(newNotes);
}

function writeNotes(notes: NotesById) {
  ipcRenderer.callMain(IpcEvent.WRITE_DATA, {
    fileName: NOTES_FILE_NAME,
    data: notes
  });
}
