import {
  WATCH_FOR_NUM_ACTIVE_CHARACTERS,
  WATCH_FOR_NUM_ACTIVE_RELATIONSHIPS,
  INumActiveCharactersPayload,
  INumActiveRelationshipsPayload
} from "./action-types";
import { IInitialState } from "../reducers/initial-state";

export interface INumActiveCharacters {
  type: string;
  payload: INumActiveCharactersPayload;
}

export interface INumActiveRelationships {
  type: string;
  payload: INumActiveRelationshipsPayload;
}

export interface IInsightInterface {
  updateNumActiveCharacters: (
    newValue: IInitialState["numActiveCharacters"]
  ) => INumActiveCharacters;
  updateNumActiveRelationships: (
    newValue: IInitialState["numActiveRelationships"]
  ) => INumActiveRelationships;
}

export const updateNumActiveCharacters: (
  newValue: IInitialState["numActiveCharacters"]
) => INumActiveCharacters = newValue => {
  return {
    type: WATCH_FOR_NUM_ACTIVE_CHARACTERS,
    payload: { numActiveCharacters: newValue }
  };
};

export const updateNumActiveRelationships: (
  newValue: IInitialState["numActiveRelationships"]
) => INumActiveRelationships = newValue => {
  return {
    type: WATCH_FOR_NUM_ACTIVE_RELATIONSHIPS,
    payload: { numActiveRelationships: newValue }
  };
};
