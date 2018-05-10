import { WATCH_FOR_HIDE_NAMES, IHideNamesPayload } from "./action-types";
import { IInitialState } from "../reducers/initial-state";

export interface IHideNames {
  type: string;
  payload: IHideNamesPayload;
}

export const toggleHideNames: (
  newValue: IInitialState["hideNames"]
) => IHideNames = newValue => {
  return {
    type: WATCH_FOR_HIDE_NAMES,
    payload: { hideNames: newValue }
  };
};
