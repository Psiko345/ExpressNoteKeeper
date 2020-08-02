// requirements
const express = require("express");
const path = require("path");
const dbExport = require("./db/db.json");
const fs = require("fs");

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
  let newNote = req.body;
  let allIds = dbExport.map((x) => x.id);
  let maxId = Math.max(...allIds, 0);
  newNote.id = maxId + 1;
  dbExport.push(newNote);
  saveDb();
  res.json("Success");
});

app.delete("/api/notes/:noteId", (req, res) => {
  console.log("Deleted id: " + req.params.noteId);
  let indexOfNoteToRemove = dbExport.findIndex(
    (x) => x.id == req.params.noteId
  );
  dbExport.splice(indexOfNoteToRemove, 1);
  saveDb();
  res.json("Success");
});

// listening
app.listen(PORT, () => {
  console.log("listening on port: " + PORT);
});

function saveDb() {
  writeToFile("./db/db.json", JSON.stringify(dbExport));
}

function writeToFile(fileName, data) {
  fs.writeFile(fileName, data, function (err) {
    if (err) throw err;
  });
}
