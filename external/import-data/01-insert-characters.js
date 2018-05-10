const { cleanCharacters, males, females } = require("./clean");
const neo = require("../db");

const characterInsertionQuery = character => {
  const params = {};
  for (let key of Object.keys(character)) {
    if (key === "characterName") params[key] = character[key];
    if (key === "characterImageThumb") params[key] = character[key];
    if (key === "nickname") params[key] = character[key];
    if (key === "royal") params[key] = character[key];
    if (key === "kingsguard") params[key] = character[key];
    if (key === "houseName") params[key] = character[key];
  }
  if (typeof params["houseName"] === "undefined")
    params["houseName"] = "commonfolk";
  if (males.indexOf(character["characterName"]) > -1) params["sex"] = "male";
  else if (females.indexOf(character["characterName"]) > -1)
    params["sex"] = "female";
  else params["sex"] = "unknownsex";
  const characterVariable = character["characterName"]
    .split(" ")
    .join("")
    .replace(/[#'\-]/g, "");
  return `Merge (${characterVariable}:Character ${cleanParams(
    JSON.stringify(params)
  )})`;
};

const cleanParams = params => params.replace(/"([^(")"]+)":/g, "$1:");

const charactersToInsert = [];

const insertSelfOrChildren = (character, selector, queue) => {
  if (typeof character[selector] === "string") {
    if (
      typeof charactersToInsert.find(
        it => it["characterName"] === character[selector]
      ) === "undefined"
    ) {
      queue.push({ characterName: character[selector] });
    }
  } else if (Array.isArray(character[selector])) {
    for (let child of character[selector]) {
      if (
        typeof charactersToInsert.find(it => it["characterName"] === child) ===
        "undefined"
      ) {
        queue.push({ characterName: child });
      }
    }
  }
};

for (let character of cleanCharacters) charactersToInsert.push(character);
for (let character of cleanCharacters) {
  insertSelfOrChildren(character, "parents", charactersToInsert);
  insertSelfOrChildren(character, "killedBy", charactersToInsert);
  insertSelfOrChildren(character, "killed", charactersToInsert);
  insertSelfOrChildren(character, "servedBy", charactersToInsert);
  insertSelfOrChildren(character, "parentOf", charactersToInsert);
  insertSelfOrChildren(character, "siblings", charactersToInsert);
  insertSelfOrChildren(character, "marriedEngaged", charactersToInsert);
  insertSelfOrChildren(character, "serves", charactersToInsert);
  insertSelfOrChildren(character, "guardianOf", charactersToInsert);
  insertSelfOrChildren(character, "allies", charactersToInsert);
  insertSelfOrChildren(character, "abductedBy", charactersToInsert);
  insertSelfOrChildren(character, "abducted", charactersToInsert);
}

for (let character of charactersToInsert) {
  neo
    .execute({ query: characterInsertionQuery(character) })
    .catch(err => console.log(err));
}
