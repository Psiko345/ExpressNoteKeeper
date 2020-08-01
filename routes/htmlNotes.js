const path = require("path");

module.exports = (app) => {
  app.get("/notes", (req, res) =>
    res.sendfile(path.join(__dirname, "../webpages/notes.html"))
  );

  app.get("/", (req, res) =>
    res.sendFile(path.join(__dirname, "../webpages/index.html"))
  );
};
