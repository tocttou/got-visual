import { put, takeLatest } from "redux-saga/effects";
import { WATCH_FOR_CLUSTER_OUTLIERS, CLUSTER_OUTLIERS } from "../actions/action-types";
import { IClusterOutliers } from "../actions/cluster-outliers-actions";

export function* takeAction(action: IClusterOutliers) {
  yield put({ ...action, ...{ type: CLUSTER_OUTLIERS } });
}

export function* watchClusterOutliers() {
  yield takeLatest(WATCH_FOR_CLUSTER_OUTLIERS, takeAction);
}
