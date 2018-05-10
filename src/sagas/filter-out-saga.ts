import { put, select, takeLatest } from "redux-saga/effects";
import { WATCH_FOR_FILTER_OUT, FILTER_OUT } from "../actions/action-types";
import { IFilterOut } from "../actions/filter-out-actions";
import { fetchNetwork } from "../api/fetchNetwork";
import * as Immutable from "immutable";
import { changeNetwork } from "../actions/network-actions";

const getState = state => state;

export function* takeAction(action: IFilterOut) {
  const state = yield select(getState);
  const modifiedState = state.set(
    "filterOut",
    Immutable.List(action.payload.filterOut)
  );
  const newNetwork = yield fetchNetwork(modifiedState);
  yield put({ ...action, ...{ type: FILTER_OUT } });
  if (newNetwork !== null) {
    yield put(changeNetwork(newNetwork));
  }
}

export function* watchFilterOut() {
  yield takeLatest(WATCH_FOR_FILTER_OUT, takeAction);
}
