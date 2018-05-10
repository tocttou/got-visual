const express = require("express");
const app = express();
const neo = require("../db");

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(express.json());
app.use(express.urlencoded());

app.post("/", async (req, res) => {
  const query = req.body.query;
  try {
    const response = await neo.execute({ query });
    res.json({ status: "success", response });
  } catch (e) {
    console.log(e);
    res.json({ status: "error", message: e });
  }
});

app.listen(3000, () => console.log("App listening on port 3000!"));
