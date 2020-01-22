import { ipcRenderer } from "electron-better-ipc";
import { TypedAction } from "redoodle";
import { all, put, takeEvery } from "redux-saga/effects";
import { IpcEvent } from "../../shared/ipcEvent";
import { BannerActions, BannerInternalActions } from "../actions/bannerActions";

const BANNER_FILE_NAME = "banner";

export function* bannerSaga() {
  yield initializeBanner();
  yield all([yield takeEvery(BannerActions.set.TYPE, setBanner)]);
}

function* initializeBanner() {
  const banner: string | undefined = yield ipcRenderer.callMain(
    IpcEvent.READ_DATA,
    BANNER_FILE_NAME
  );

  yield put(BannerInternalActions.set(banner));
}

function* setBanner(action: TypedAction<string | undefined>) {
  const banner = action.payload;
  yield put(BannerInternalActions.set(banner));
  writeBanner(banner);
}

function writeBanner(banner: string | undefined) {
  ipcRenderer.callMain(IpcEvent.WRITE_DATA, {
    fileName: BANNER_FILE_NAME,
    data: banner
  });
}
