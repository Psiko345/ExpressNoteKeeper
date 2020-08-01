// requirements
const express = require("express");
const path = require("path");
const dbExport = require("./db/db.json");

// config
const app = express();
const PORT = process.env.PORT || 8080;

// data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname + "/public")));

// routes

app.get("/notes", (req, res) =>
  res.sendFile(path.join(__dirname, "./webpages/notes.html"))
);

app.get("/", (req, res) =>
  res.sendFile(path.join(__dirname, "./webpages/index.html"))
);

app.get("/api/notes", (req, res) => {
  console.log(dbExport);
  res.json(dbExport);
});

app.post("/api/notes", (req, res) => {
  console.log(req.body);
  dbExport.push(req.body);
  res.success();
});

// listening
app.listen(PORT, () => {
  console.log("listening on port: " + PORT);
});
