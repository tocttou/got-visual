import { WATCH_FOR_FILTER_OUT, IFilterOutPayload } from "./action-types";
import { IInitialState } from "../reducers/initial-state";

export interface IFilterOut {
  type: string;
  payload: IFilterOutPayload;
}

export const changeFilterOut: (
  filterOut: IInitialState["filterOut"]
) => IFilterOut = newFilterOut => {
  return {
    type: WATCH_FOR_FILTER_OUT,
    payload: { filterOut: newFilterOut }
  };
};
