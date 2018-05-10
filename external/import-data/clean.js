const fs = require("fs");
const fullCharacters = JSON.parse(fs.readFileSync("./characters-full.json"));
const genders = JSON.parse(fs.readFileSync("./characters-gender.json"));
const males = genders["gender"][0]["characters"];
const females = genders["gender"][1]["characters"];

// Clean the data to remove unimportant characters
const characterWeight = character => {
  let weight = 0;
  for (let key of Object.keys(character)) {
    if (typeof character[key] === "string") weight += 1;
    else if (typeof character[key] === "boolean") weight += Infinity;
    else if (typeof character[key] === "object") {
      if (Array.isArray(character[key])) weight += character[key].length + 1;
      else weight += Object.getOwnPropertyNames(character[key]).length + 1;
    }
  }
  return weight;
};

const cleanCharacters = fullCharacters["characters"].filter(
  character => characterWeight(character) > 7
);

module.exports = {
  cleanCharacters,
  males,
  females
};
