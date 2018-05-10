import * as types from "../actions/action-types";
import initialState from "./initial-state";
import { IGroup } from "../actions/group-actions";

export default function changeGroupStateReducer(
  state = initialState.get("group"),
  action: IGroup
) {
  switch (action.type) {
    case types.GROUP: {
      return action.payload.group;
    }
    default:
      return state;
  }
}
