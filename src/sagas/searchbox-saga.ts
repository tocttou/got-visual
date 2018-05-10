import { delay } from "redux-saga";
import { put, takeLatest } from "redux-saga/effects";
import { WATCH_FOR_SEARCH_BOX, SEARCH_BOX } from "../actions/action-types";
import { ISearchBox } from "../actions/searchbox-actions";

export function* takeAction(action: ISearchBox) {
  yield delay(1000);
  yield put({ ...action, ...{ type: SEARCH_BOX } });
}

export function* watchSearchBox() {
  yield takeLatest(WATCH_FOR_SEARCH_BOX, takeAction);
}
