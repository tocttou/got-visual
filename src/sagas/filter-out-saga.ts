import { put, select, takeLatest } from "redux-saga/effects";
import { WATCH_FOR_FILTER_OUT, FILTER_OUT } from "../actions/action-types";
import { IFilterOut } from "../actions/filter-out-actions";

export function* takeAction(action: IFilterOut) {
  yield put({ ...action, ...{ type: FILTER_OUT } });
}

export function* watchFilterOut() {
  yield takeLatest(WATCH_FOR_FILTER_OUT, takeAction);
}
