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
    `MERGE (${characterVariable1})-[:${relationship}]-(${characterVariable2})`
  );
};

const relationshipInsertionQueries = (character, relationship) => {
  const queries = [];
  if (typeof character[relationship] === "string") {
    queries.push(
      relationshipInsertionQuery(
        character["characterName"],
        character[relationship],
        relationship
      )
    );
  } else if (Array.isArray(character[relationship])) {
    for (let relative of character[relationship]) {
      queries.push(
        relationshipInsertionQuery(
          character["characterName"],
          relative,
          relationship
        )
      );
    }
  }
  return queries;
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
