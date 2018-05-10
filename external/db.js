const config = require("../src/config/index");
const neo4j = require("simple-neo4j");
module.exports = new neo4j({
  username: config.dbUser,
  password: config.dbPassword
});
