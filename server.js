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
  let newNote = req.body;
  let allIds = dbExport.map((x) => x.id);
  let maxId = Math.max(...allIds, 0);
  newNote.id = maxId + 1;
  dbExport.push(newNote);
  res.json("Success");
});

app.delete("/api/notes/:noteId", (req, res) => {
  console.log("Deleted id: " + req.params.noteId);
  let indexOfNoteToRemove = dbExport.findIndex(
    (x) => x.id == req.params.noteId
  );
  console.log("indexOfNoteToRemove: " + indexOfNoteToRemove);
  dbExport.splice(indexOfNoteToRemove, 1);
  res.json("Success");
});

// listening
app.listen(PORT, () => {
  console.log("listening on port: " + PORT);
});
