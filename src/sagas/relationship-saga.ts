import { put, select, takeLatest } from "redux-saga/effects";
import { WATCH_FOR_RELATIONSHIP, RELATIONSHIP } from "../actions/action-types";
import { IRelationship } from "../actions/relationship-actions";
import { fetchNetwork } from "../api/fetch-network";
import * as Immutable from "immutable";
import { changeNetwork } from "../actions/network-actions";

const getState = state => state;

export function* takeAction(action: IRelationship) {
  yield put({ ...action, ...{ type: RELATIONSHIP } });
}

export function* watchRelationship() {
  const state = yield select(getState);
  const newNetwork = yield fetchNetwork(state);
  yield put(changeNetwork(newNetwork));
  yield takeLatest(WATCH_FOR_RELATIONSHIP, takeAction);
}
