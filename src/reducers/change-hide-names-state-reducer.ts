import * as types from "../actions/action-types";
import initialState from "./initial-state";
import { IHideNames } from "../actions/hide-names-actions";

export default function changeHideNamesStateReducer(
  state = initialState.get("hideNames"),
  action: IHideNames
) {
  switch (action.type) {
    case types.HIDE_NAMES: {
      return action.payload.hideNames;
    }
    default:
      return state;
  }
}
