import * as types from "../actions/action-types";
import initialState from "./initial-state";
import { INumActiveRelationships } from "../actions/insights-actions";

export default function changeNumActiveRelationshipsStateReducer(
  state = initialState.get("numActiveRelationships"),
  action: INumActiveRelationships
) {
  switch (action.type) {
    case types.NUM_ACTIVE_RELATIONSHIPS: {
      return action.payload.numActiveRelationships;
    }
    default:
      return state;
  }
}
