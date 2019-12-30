import { ipcRenderer } from "electron-better-ipc";
import { TypedAction } from "redoodle";
import { put, select, takeEvery } from "redux-saga/effects";
import { IpcEvent } from "../../../../shared/ipcEvent";
import { Reading } from "../readingsTypes";
import { ReadingActions, ReadingsInternalActions } from "./readingsActions";
import { selectReadingsReadings } from "./readingsSelectors";

const READINGS_FILE_NAME = ".readings";

export function* readingsSaga() {
  yield initializeReadings();
  yield takeEvery(ReadingActions.addReading.TYPE, addReading);
}

function* initializeReadings() {
  const readings: readonly Reading[] = yield ipcRenderer.callMain(
    IpcEvent.READ_DATA,
    READINGS_FILE_NAME
  );
  if (readings != null) {
    yield put(ReadingsInternalActions.setReadings(readings));
  }
}

function* addReading(action: TypedAction<Reading>) {
  const currentReadings: readonly Reading[] = yield select(selectReadingsReadings);
  const newReadings: readonly Reading[] = [action.payload, ...currentReadings];
  yield put(ReadingActions.setInputValue(""));
  yield put(ReadingsInternalActions.setReadings(newReadings));
  writeReadings(newReadings);
}

function writeReadings(readings: readonly Reading[]) {
  ipcRenderer.callMain(IpcEvent.WRITE_DATA, {
    fileName: READINGS_FILE_NAME,
    data: readings
  });
}
