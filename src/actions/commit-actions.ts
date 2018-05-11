import { WATCH_FOR_COMMIT } from "./action-types";

export interface ICommitChanges {
  type: string;
}

export const commitChanges: () => ICommitChanges = () => {
  return {
    type: WATCH_FOR_COMMIT
  };
};
