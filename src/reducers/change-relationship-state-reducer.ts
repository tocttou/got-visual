import * as types from "../actions/action-types";
import initialState from "./initial-state";
import { IRelationship } from "../actions/relationship-actions";

export default function changeRelationshipStateReducer(
  state = initialState.get("relationship"),
  action: IRelationship
) {
  switch (action.type) {
    case types.RELATIONSHIP: {
      return action.payload.relationship;
    }
    default:
      return state;
  }
}
