import { WATCH_FOR_GROUP, IGroupPayload } from "./action-types";

export interface IGroup {
  type: string;
  payload: IGroupPayload;
}

export const changeGrouping: (group: string) => IGroup = newGroup => {
  return { type: WATCH_FOR_GROUP, payload: { group: newGroup } };
};
