import * as Immutable from "immutable";
import {
  IEdge,
  IImmutableInitialState,
  INetwork,
  INode
} from "../reducers/initial-state";
import axios from "axios";
const { rootUrl, proxyPort } = require("../config");

export function whatToFilter(filterOut): string {
  const filter = [];
  const temp = new Set(filterOut);
  if (temp.has("male")) {
    filter.push('u1.sex <> "male" AND u2.sex <> "male"');
  }
  if (temp.has("female")) {
    filter.push('u1.sex <> "female" AND u2.sex <> "female"');
  }
  if (temp.has("unknownsex")) {
    filter.push('u1.sex <> "unknownsex" AND u2.sex <> "unknownsex"');
  }
  if (temp.has("royal")) {
    filter.push("NOT EXISTS(u1.royal) AND NOT EXISTS(u2.royal)");
  }
  if (temp.has("kingsguard")) {
    filter.push("NOT EXISTS(u1.kingsguard) AND NOT EXISTS(u2.kingsguard)");
  }
  if (temp.has("stark")) {
    filter.push('u1.houseName <> "Stark" AND u2.houseName <> "Stark"');
  }
  if (temp.has("targaryen")) {
    filter.push('u1.houseName <> "Targaryen" AND u2.houseName <> "Targaryen"');
  }
  if (temp.has("baratheon")) {
    filter.push('u1.houseName <> "Baratheon" AND u2.houseName <> "Baratheon"');
  }
  if (temp.has("lannister")) {
    filter.push('u1.houseName <> "Lannister" AND u2.houseName <> "Lannister"');
  }
  if (temp.has("greyjoy")) {
    filter.push('u1.houseName <> "Greyjoy" AND u2.houseName <> "Greyjoy"');
  }
  if (temp.has("tyrell")) {
    filter.push('u1.houseName <> "Tyrell" AND u2.houseName <> "Tyrell"');
  }
  if (temp.has("martell")) {
    filter.push('u1.houseName <> "Martell" AND u2.houseName <> "Martell"');
  }
  if (temp.has("frey")) {
    filter.push('u1.houseName <> "Frey" AND u2.houseName <> "Frey"');
  }
  if (temp.has("tully")) {
    filter.push('u1.houseName <> "Tully" AND u2.houseName <> "Tully"');
  }
  if (temp.has("commonfolk")) {
    filter.push(
      'u1.houseName <> "commonfolk" AND u2.houseName <> "commonfolk"'
    );
  }
  return filter.join(" AND ");
}
export function getLabel(str) {
  const map = {
    parents: "PARENTS",
    parentOf: "PARENT_OF",
    siblings: "SIBLINGS",
    marriedEngaged: "MARRIED/ENGAGED",
    killed: "KILLED",
    killedBy: "KILLED_BY",
    serves: "SERVES",
    servedBy: "SERVED_BY",
    allies: "ALLIES",
    abducted: "ABDUCTED(_BY)"
  };
  return map[str];
}
export function makeNode(u) {
  return Immutable.fromJS({
    id: u.characterName,
    label: u.characterName,
    color: Immutable.Map({
      border: "#d3d3d3",
      background: "#d3d3d3"
    }),
    houseName: u.houseName,
    royal: typeof u.royal !== "undefined" ? u.royal : false,
    sex: u.sex,
    kingsguard: typeof u.kingsguard !== "undefined" ? u.kingsguard : false,
    shape: "circle",
    margin: 10
  });
}

export function makeEdge(u1, u2, relationship, i: number) {
  return Immutable.fromJS({
    from: u1.characterName,
    to: u2.characterName,
    label: getLabel(relationship[i]),
    font: Immutable.Map({
      color: "#90EE90"
    })
  });
}

export function transformResponse(response): INetwork {
  const pattern = response.p;
  const relationship = response["type(r)"];
  const nodes = new Set();
  const edges = [];
  for (let i = 0; i < Object.keys(pattern).length; i++) {
    const u1 = pattern[i][0];
    const u2 = pattern[i][2];
    const node1: INode = makeNode(u1);
    const node2: INode = makeNode(u2);
    const edge: IEdge = makeEdge(u1, u2, relationship, i);
    nodes.add(node1);
    nodes.add(node2);
    edges.push(edge);
  }
  return Immutable.fromJS({
    nodes: nodes.entries(),
    edges
  });
}

export function transformResponse3Way(response): INetwork {
  const pattern = response.p;
  const relationship1 = response["type(r1)"];
  const relationship2 = response["type(r2)"];
  const nodes = new Set();
  const edges = [];
  for (let i = 0; i < Object.keys(pattern).length; i++) {
    const u1 = pattern[i][0];
    const u2 = pattern[i][2];
    const node1: INode = makeNode(u1);
    const node2: INode = makeNode(u2);
    const edge1: IEdge = makeEdge(u1, u2, relationship1, i);
    const edge2: IEdge = makeEdge(u2, u1, relationship2, i);
    nodes.add(node1);
    nodes.add(node2);
    edges.push(edge1);
    edges.push(edge2);
  }
  return Immutable.fromJS({
    nodes: nodes.entries(),
    edges
  });
}

export async function executeQuery(query) {
  try {
    const result = await axios.post(`${rootUrl}:${proxyPort}/`, {
      query
    });
    return result.data.response.result;
  } catch (e) {
    throw e;
  }
}

export function buildQuery(state: IImmutableInitialState): string | null {
  const relationship = `r:${state.get("relationship").join("|")}`;
  let filter = whatToFilter(state.get("filterOut"));
  if (relationship === "r:") {
    return null;
  }
  filter = filter.trim().length === 0 ? "" : `WHERE ${filter}`;
  return `MATCH p=(u1:Character)-[${relationship}]->(u2:Character) ${filter} RETURN p, type(r)`;
}
