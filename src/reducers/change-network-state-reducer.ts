import * as types from "../actions/action-types";
import initialState from "./initial-state";
import { INetwork } from "../actions/network-actions";

export default function changeNetworkStateReducer(
  state = initialState.get("network"),
  action: INetwork
) {
  switch (action.type) {
    case types.NETWORK: {
      return action.payload.network;
    }
    default:
      return state;
  }
}
