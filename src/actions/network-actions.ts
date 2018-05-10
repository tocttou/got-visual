import { WATCH_FOR_NETWORK, INetworkPayload } from "./action-types";
import { IInitialState } from "../reducers/initial-state";

export interface INetwork {
  type: string;
  payload: INetworkPayload;
}

export const changeNetwork: (
  newValue: IInitialState["network"]
) => INetwork = newValue => {
  return {
    type: WATCH_FOR_NETWORK,
    payload: { network: newValue }
  };
};
