import {put, select, takeLatest} from "redux-saga/effects";
import {GROUP, WATCH_FOR_GROUP} from "../actions/action-types";
import {IGroup} from "../actions/group-actions";

export function* takeAction(action: IGroup) {
  yield put({ ...action, ...{ type: GROUP } });
}

export function* watchGroup() {
  yield takeLatest(WATCH_FOR_GROUP, takeAction);
}
