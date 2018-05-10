import {
  WATCH_FOR_CLUSTER_OUTLIERS,
  IClusterOutliersPayload
} from "./action-types";
import { IInitialState } from "../reducers/initial-state";

export interface IClusterOutliers {
  type: string;
  payload: IClusterOutliersPayload;
}

export const toggleClusterOutliers: (
  newValue: IInitialState["clusterOutliers"]
) => IClusterOutliers = newValue => {
  return {
    type: WATCH_FOR_CLUSTER_OUTLIERS,
    payload: { clusterOutliers: newValue }
  };
};
