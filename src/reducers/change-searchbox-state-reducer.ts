import * as types from "../actions/action-types";
import initialState from "./initial-state";
import { ISearchBox } from "../actions/searchbox-actions";

export default function changeSearchBoxStateReducer(
  state = initialState.get("searchBox"),
  action: ISearchBox
) {
  switch (action.type) {
    case types.SEARCH_BOX: {
      return action.payload.searchBox;
    }
    default:
      return state;
  }
}
