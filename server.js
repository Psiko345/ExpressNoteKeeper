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
  newNote.id = 2; // find max id in db - function called max, find maximum value of object
  const maxId
  dbExport.push(newNote);
  res.json("Success");
});

app.delete("/api/notes/:noteId", (req, res) => {
  console.log("Deleted: " + req.params.noteId);
  // find note with noteId - look through dbExport, find note that has that id in the array and delete
  // delete note from db -
  res.json("Success");
});

// listening
app.listen(PORT, () => {
  console.log("listening on port: " + PORT);
});
