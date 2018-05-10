import { put, takeLatest } from "redux-saga/effects";
import { WATCH_FOR_HIDE_NAMES, HIDE_NAMES } from "../actions/action-types";
import { IHideNames } from "../actions/hide-names-actions";

export function* takeAction(action: IHideNames) {
  yield put({ ...action, ...{ type: HIDE_NAMES } });
}

export function* watchHideNames() {
  yield takeLatest(WATCH_FOR_HIDE_NAMES, takeAction);
}
