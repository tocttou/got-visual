import { IInitialState } from "../reducers/initial-state";

export const SEARCH_BOX = "SEARCH_BOX";
export const GROUP = "GROUP";
export const RELATIONSHIP = "RELATIONSHIP";
export const FILTER_OUT = "FILTER_OUT";
export const CLUSTER_OUTLIERS = "CLUSTER_OUTLIERS";
export const HIDE_NAMES = "HIDE_NAMES";
export const NUM_ACTIVE_CHARACTERS = "NUM_ACTIVE_CHARACTERS";
export const NUM_ACTIVE_RELATIONSHIPS = "NUM_ACTIVE_RELATIONSHIPS";
export const NETWORK = "NETWORK";

export interface ISearchBoxPayload {
  searchBox: IInitialState["searchBox"];
}
export interface IGroupPayload {
  group: IInitialState["group"];
}
export interface IRelationshipPayload {
  relationship: IInitialState["relationship"];
}
export interface IFilterOutPayload {
  filterOut: IInitialState["filterOut"];
}
export interface IClusterOutliersPayload {
  clusterOutliers: IInitialState["clusterOutliers"];
}
export interface IHideNamesPayload {
  hideNames: IInitialState["hideNames"];
}
export interface INumActiveCharactersPayload {
  numActiveCharacters: IInitialState["numActiveCharacters"];
}
export interface INumActiveRelationshipsPayload {
  numActiveRelationships: IInitialState["numActiveRelationships"];
}
export interface INetworkPayload {
  network: IInitialState["network"];
}

export const WATCH_FOR_SEARCH_BOX = "WATCH_FOR_SEARCH_BOX";
export const WATCH_FOR_GROUP = "WATCH_FOR_GROUP";
export const WATCH_FOR_RELATIONSHIP = "WATCH_FOR_RELATIONSHIP";
export const WATCH_FOR_FILTER_OUT = "WATCH_FOR_FILTER_OUT";
export const WATCH_FOR_CLUSTER_OUTLIERS = "WATCH_FOR_CLUSTER_OUTLIERS";
export const WATCH_FOR_HIDE_NAMES = "WATCH_FOR_HIDE_NAMES";
export const WATCH_FOR_NUM_ACTIVE_CHARACTERS =
  "WATCH_FOR_NUM_ACTIVE_CHARACTERS";
export const WATCH_FOR_NUM_ACTIVE_RELATIONSHIPS =
  "WATCH_FOR_NUM_ACTIVE_RELATIONSHIPS";
export const WATCH_FOR_NETWORK = "WATCH_FOR_NETWORK";
export const WATCH_FOR_COMMIT = "WATCH_FOR_COMMIT";
