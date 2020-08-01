// requirements
const express = require("express");

// config
const app = express();
const PORT = process.env.PORT || 8080;

// data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// routes
require("./routes/htmlNotes")(app);
require("/routes/apiNotes")(app);

// listening
app.listen(PORT, () => {
  console.log("listening on port: " + PORT);
});
