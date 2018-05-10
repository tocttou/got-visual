import * as types from "../actions/action-types";
import initialState from "./initial-state";
import { INumActiveCharacters } from "../actions/insights-actions";

export default function changeNumActiveCharactersStateReducer(
  state = initialState.get("numActiveCharacters"),
  action: INumActiveCharacters
) {
  switch (action.type) {
    case types.NUM_ACTIVE_CHARACTERS: {
      return action.payload.numActiveCharacters;
    }
    default:
      return state;
  }
}
