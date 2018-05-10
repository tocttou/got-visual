import { WATCH_FOR_SEARCH_BOX, ISearchBoxPayload } from "./action-types";

export interface ISearchBox {
  type: string;
  payload: ISearchBoxPayload;
}

export const searchAndHighlightCharacter: (
  content: string
) => ISearchBox = content => {
  return { type: WATCH_FOR_SEARCH_BOX, payload: { searchBox: content } };
};
