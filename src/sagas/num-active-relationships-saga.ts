import { put, takeLatest } from "redux-saga/effects";
import {
  WATCH_FOR_NUM_ACTIVE_RELATIONSHIPS,
  NUM_ACTIVE_RELATIONSHIPS
} from "../actions/action-types";
import { INumActiveRelationships } from "../actions/insights-actions";

export function* takeAction(action: INumActiveRelationships) {
  yield put({ ...action, ...{ type: NUM_ACTIVE_RELATIONSHIPS } });
}

export function* watchNumActiveRelationships() {
  yield takeLatest(WATCH_FOR_NUM_ACTIVE_RELATIONSHIPS, takeAction);
}
