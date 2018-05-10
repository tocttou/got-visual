import changeSearchBoxStateReducer from "./change-searchbox-state-reducer";
import changeGroupStateReducer from "./change-group-state-reducer";
import changeRelationshipStateReducer from "./change-relationship-state-reducer";
import changeFilterOutStateReducer from "./change-filter-out-state-reducer";
import changeClusterOutliersStateReducer from "./change-cluster-outliers-state-reducer";
import changeHideNamesStateReducer from "./change-hide-names-state-reducer";
import changeNumActiveCharactersStateReducer from "./change-num-active-characters-state-reducer";
import changeNumActiveRelationshipsStateReducer from "./change-num-active-relationships-state-reducer";
import changeNetworkStateReducer from "./change-network-state-reducer";
const { combineReducers } = require("redux-immutable");

const rootReducer = combineReducers({
  searchBox: changeSearchBoxStateReducer,
  group: changeGroupStateReducer,
  relationship: changeRelationshipStateReducer,
  filterOut: changeFilterOutStateReducer,
  clusterOutliers: changeClusterOutliersStateReducer,
  hideNames: changeHideNamesStateReducer,
  numActiveCharacters: changeNumActiveCharactersStateReducer,
  numActiveRelationships: changeNumActiveRelationshipsStateReducer,
  network: changeNetworkStateReducer
});

export default rootReducer;
