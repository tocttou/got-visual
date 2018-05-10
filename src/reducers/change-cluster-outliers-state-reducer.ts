import * as types from "../actions/action-types";
import initialState from "./initial-state";
import { IClusterOutliers } from "../actions/cluster-outliers-actions";

export default function changeClusterOutliersStateReducer(
  state = initialState.get("clusterOutliers"),
  action: IClusterOutliers
) {
  switch (action.type) {
    case types.CLUSTER_OUTLIERS: {
      return action.payload.clusterOutliers;
    }
    default:
      return state;
  }
}
