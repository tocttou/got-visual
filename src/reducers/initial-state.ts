import * as Immutable from "immutable";

export interface IInitialState {
  searchBox: string;
  group: string;
  relationship: [
    "parents",
    "parentOf",
    "siblings",
    "marriedEngaged",
    "killed",
    "killedBy",
    "serves",
    "servedBy",
    "allies",
    "abducted"
  ];
  filterOut: [
    "male",
    "female",
    "unknownsex",
    "royal",
    "kingsguard",
    "stark",
    "targaryen",
    "baratheon",
    "lannister",
    "greyjoy",
    "tyrell",
    "martell",
    "frey",
    "tully",
    "commonfolk"
  ];
  clusterOutliers: boolean;
  hideNames: boolean;
  numActiveCharacters: number;
  numActiveRelationships: number;
  network: INetwork;
}

export interface INode extends Immutable.Map<string, string | number | object> {
  id: number | string;
  label: string;
  color: IColor;
  houseName: string;
  royal: boolean;
  sex: "male" | "female" | "unknownsex";
  kingsguard: boolean;
  shape: "circle";
  margin: 10;
}

export interface INetwork
  extends Immutable.Map<string, Immutable.List<INode | IEdge>> {
  nodes: Immutable.List<INode>;
  edges: Immutable.List<IEdge>;
}

export interface IColor extends Immutable.Map<string, string> {
  border: string;
  background: string;
}

export interface IFont extends Immutable.Map<string, object> {
  color: IColor;
}

export interface IEdge extends Immutable.Map<string, string | number> {
  from: number;
  to: number;
  label: string;
  font: IFont;
}

export interface IImmutableInitialState extends Immutable.Map<any, any> {
  toJS(): IInitialState;
  get<K extends keyof IInitialState>(key: K): IInitialState[K];
}

export default Immutable.Map({
  searchBox: "",
  group: "none",
  relationship: Immutable.fromJS(["marriedEngaged"]),
  filterOut: Immutable.fromJS([]),
  clusterOutliers: false,
  hideNames: false,
  numActiveCharacters: 0,
  numActiveRelationships: 0,
  network: Immutable.Map({
    nodes: Immutable.fromJS([]),
    edges: Immutable.fromJS([])
  })
});
