import { watchSearchBox } from "./searchbox-saga";
import { watchGroup } from "./group-saga";
import { watchRelationship } from "./relationship-saga";
import { watchFilterOut } from "./filter-out-saga";
import { watchClusterOutliers } from "./cluster-outliers-saga";
import { watchHideNames } from "./hide-names-saga";
import { watchNumActiveCharacters } from "./num-active-characters-saga";
import { watchNumActiveRelationships } from "./num-active-relationships-saga";
import { watchNetwork } from "./network-saga";
import { watchCommit } from "./commit-saga";
import { SagaIterator } from "redux-saga";
import { all, call } from "redux-saga/effects";

export default function* rootSaga(): SagaIterator {
  yield all([
    call(watchSearchBox),
    call(watchGroup),
    call(watchRelationship),
    call(watchFilterOut),
    call(watchClusterOutliers),
    call(watchHideNames),
    call(watchNumActiveCharacters),
    call(watchNumActiveRelationships),
    call(watchNetwork),
    call(watchCommit)
  ]);
}
