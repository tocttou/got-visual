import { WATCH_FOR_RELATIONSHIP, IRelationshipPayload } from "./action-types";
import { IInitialState } from "../reducers/initial-state";

export interface IRelationship {
  type: string;
  payload: IRelationshipPayload;
}

export const changeRelationship: (
  relationship: IInitialState["relationship"]
) => IRelationship = newRelationship => {
  return {
    type: WATCH_FOR_RELATIONSHIP,
    payload: { relationship: newRelationship }
  };
};
