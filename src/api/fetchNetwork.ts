import { IImmutableInitialState } from "../reducers/initial-state";
import { buildQuery, executeQuery, transformResponse } from "./utils";

export async function fetchNetwork(state: IImmutableInitialState) {
  const query = buildQuery(state);
  let transformed = null;
  if (query !== null) {
    const response = await executeQuery(query);
    transformed = transformResponse(response);
  }
  return transformed;
}
