import { ipcRenderer } from "electron-better-ipc";
import { setWith, TypedAction } from "redoodle";
import { put, select, takeEvery } from "redux-saga/effects";
import { IpcEvent } from "../../../../shared/ipcEvent";
import { Reading, ReadingsById } from "../readingsTypes";
import { ReadingsActions, ReadingsInternalActions } from "./readingsActions";
import { selectReadingsReadings } from "./readingsSelectors";

const READINGS_FILE_NAME = "readings";

export function* readingsSaga() {
  yield initializeReadings();
  yield takeEvery(ReadingsActions.addReading.TYPE, addReading);
  yield takeEvery(ReadingsActions.setReadingStatus.TYPE, setReadingStatus);
}

function* initializeReadings() {
  let readings: ReadingsById | undefined = yield ipcRenderer.callMain(
    IpcEvent.READ_DATA,
    READINGS_FILE_NAME
  );

  if (readings == null) {
    readings = {};
  }

  yield put(ReadingsInternalActions.setReadings(readings));
}

function* addReading(action: TypedAction<Reading>) {
  const currentReadings: ReadingsById = yield select(selectReadingsReadings);
  const newReadings: ReadingsById = setWith(currentReadings, {
    [action.payload.id]: action.payload
  });

  yield put(ReadingsActions.setInputValue(""));
  yield put(ReadingsInternalActions.setReadings(newReadings));
  writeReadings(newReadings);
}

function* setReadingStatus(action: TypedAction<ReadingsActions.SetReadingStatusPayload>) {
  const currentReadings: ReadingsById = yield select(selectReadingsReadings);
  const reading = currentReadings[action.payload.id];

  if (reading == null) {
    return;
  }

  const newReadings: ReadingsById = setWith(currentReadings, {
    [reading.id]: setWith(reading, {
      status: action.payload.status
    })
  });

  yield put(ReadingsInternalActions.setReadings(newReadings));
  writeReadings(newReadings);
}

function writeReadings(readings: ReadingsById) {
  ipcRenderer.callMain(IpcEvent.WRITE_DATA, {
    fileName: READINGS_FILE_NAME,
    data: readings
  });
}
