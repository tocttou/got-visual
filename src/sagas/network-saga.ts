import { put, takeLatest } from "redux-saga/effects";
import { WATCH_FOR_NETWORK, NETWORK } from "../actions/action-types";
import { INetwork } from "../actions/network-actions";

export function* takeAction(action: INetwork) {
  yield put({ ...action, ...{ type: NETWORK } });
}

export function* watchNetwork() {
  yield takeLatest(WATCH_FOR_NETWORK, takeAction);
}
