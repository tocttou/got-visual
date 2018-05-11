import { IInitialState } from "../reducers/initial-state";
import * as Immutable from "immutable";

export const colorMap = {
  sex: {
    male: "blue",
    female: "pink",
    unknownsex: "#d3d3d3"
  },
  houseName: {
    Stark: "#C08080",
    Targaryen: "#C0C000",
    Baratheon: "#FFC040",
    Lannister: "#d3d3d3",
    Greyjoy: "#80FFC0",
    Tyrell: "#40FF80",
    Martell: "#C0FFFF",
    Frey: "#80C0FF",
    Tully: "#40C0FF",
    commonfolk: "#FFC0FF"
  }
};

export function changeNodeColor(
  selector: string,
  nodesObject: IInitialState["network"]["nodes"]
) {
  const list = nodesObject
    .toKeyedSeq()
    .toArray()
    .map(it => it.toJS());
  const json = list.map(it => ({
    ...it,
    color: {
      border: colorMap[selector][it[selector]],
      background: colorMap[selector][it[selector]]
    }
  }));
  return Immutable.fromJS(json);
}

export function revertNodeColor(
  nodesObject: IInitialState["network"]["nodes"]
) {
  const list = nodesObject
    .toKeyedSeq()
    .toArray()
    .map(it => it.toJS());
  return Immutable.fromJS(
    list.map(it => ({
      ...it,
      color: {
        border: "#d3d3d3",
        background: "#d3d3d3"
      }
    }))
  );
}
