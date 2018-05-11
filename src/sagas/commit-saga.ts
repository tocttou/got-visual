import { put, select, takeLatest } from "redux-saga/effects";
import { WATCH_FOR_COMMIT } from "../actions/action-types";
import { changeNetwork } from "../actions/network-actions";
import { fetchNetwork } from "../api/fetch-network";
import { changeNodeColor, revertNodeColor } from "./utils";

const getState = state => state;

export function* takeAction() {
  const state = yield select(getState);
  let newNetwork = yield fetchNetwork(state);
  if (newNetwork !== null) {
    switch (state.get("group")) {
      case "none": {
        newNetwork = newNetwork.set(
          "nodes",
          revertNodeColor(newNetwork.get("nodes"))
        );
        break;
      }
      case "sex": {
        newNetwork = newNetwork.set(
          "nodes",
          changeNodeColor("sex", newNetwork.get("nodes"))
        );
        break;
      }
      case "houseName": {
        newNetwork = newNetwork.set(
          "nodes",
          changeNodeColor("houseName", newNetwork.get("nodes"))
        );
      }
    }
    yield put(changeNetwork(newNetwork));
  }
}

export function* watchCommit() {
  yield takeLatest(WATCH_FOR_COMMIT, takeAction);
}
