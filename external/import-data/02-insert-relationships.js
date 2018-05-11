const { cleanCharacters, males, females } = require("./clean");
const neo = require("../db");
const relationships = [
  "parents",
  "killedBy",
  "killed",
  "servedBy",
  "parentOf",
  "siblings",
  "marriedEngaged",
  "serves",
  "guardianOf",
  "allies",
  "abductedBy",
  "abducted"
];

const relationshipInsertionQuery = (
  characterName1,
  characterName2,
  relationship
) => {
  const characterVariable1 = characterName1
    .split(" ")
    .join("")
    .replace(/[#'\-]/g, "");
  const characterVariable2 = characterName2
    .split(" ")
    .join("")
    .replace(/[#'\-]/g, "");
  return (
    `MATCH (${characterVariable1}:Character {characterName: "${characterName1}"}), ` +
    `(${characterVariable2}:Character {characterName: "${characterName2}"}) ` +
    `MERGE (${characterVariable1})-[:${relationship}]->(${characterVariable2})`
  );
};

const relationshipInsertionQueries = (character, relationship) => {
  const queries = [];
  if (typeof character[relationship] === "string") {
    queryPusher(
      character["characterName"],
      character[relationship],
      relationship,
      queries
    );
  } else if (Array.isArray(character[relationship])) {
    for (let relative of character[relationship]) {
      queryPusher(character["characterName"], relative, relationship, queries);
    }
  }
  return queries;
};

const queryPusher = (character1, character2, relationship, queries) => {
  queries.push(
    relationshipInsertionQuery(character1, character2, relationship)
  );
  if (
    relationship === "siblings" ||
    relationship === "marriedEngaged" ||
    relationship === "allies"
  ) {
    queries.push(
      relationshipInsertionQuery(character2, character1, relationship)
    );
  }
  if (relationship === "parents") {
    queries.push(
      relationshipInsertionQuery(character2, character1, "parentOf")
    );
  }
  if (relationship === "parentOf") {
    queries.push(
      relationshipInsertionQuery(character2, character1, "parents")
    );
  }
};

for (let relationship of relationships) {
  for (let character of cleanCharacters) {
    const queries = relationshipInsertionQueries(character, relationship);
    if (queries.length !== 0) {
      for (let query of queries) {
        neo.execute({ query }).catch(err => console.log(err));
      }
    }
  }
}
