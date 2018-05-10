import { put, takeLatest } from "redux-saga/effects";
import {
  WATCH_FOR_NUM_ACTIVE_CHARACTERS,
  NUM_ACTIVE_CHARACTERS
} from "../actions/action-types";
import { INumActiveCharacters } from "../actions/insights-actions";

export function* takeAction(action: INumActiveCharacters) {
  yield put({ ...action, ...{ type: NUM_ACTIVE_CHARACTERS } });
}

export function* watchNumActiveCharacters() {
  yield takeLatest(WATCH_FOR_NUM_ACTIVE_CHARACTERS, takeAction);
}
