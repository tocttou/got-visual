import * as types from "../actions/action-types";
import initialState from "./initial-state";
import { IFilterOut } from "../actions/filter-out-actions";

export default function changeFilterOutStateReducer(
  state = initialState.get("filterOut"),
  action: IFilterOut
) {
  switch (action.type) {
    case types.FILTER_OUT: {
      return action.payload.filterOut;
    }
    default:
      return state;
  }
}
