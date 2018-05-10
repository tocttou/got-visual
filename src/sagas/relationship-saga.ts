import { put, select, takeLatest } from "redux-saga/effects";
import { WATCH_FOR_RELATIONSHIP, RELATIONSHIP } from "../actions/action-types";
import { IRelationship } from "../actions/relationship-actions";
import { fetchNetwork } from "../api/fetchNetwork";
import * as Immutable from "immutable";
import { changeNetwork } from "../actions/network-actions";

const getState = state => state;

export function* takeAction(action: IRelationship) {
  const state = yield select(getState);
  const modifiedState = state.set(
    "relationship",
    Immutable.List(action.payload.relationship)
  );
  const newNetwork = yield fetchNetwork(modifiedState);
  yield put({ ...action, ...{ type: RELATIONSHIP } });
  if (newNetwork !== null) {
    yield put(changeNetwork(newNetwork));
  }
}

export function* watchRelationship() {
  const state = yield select(getState);
  const newNetwork = yield fetchNetwork(state);
  yield put(changeNetwork(newNetwork));
  yield takeLatest(WATCH_FOR_RELATIONSHIP, takeAction);
}
