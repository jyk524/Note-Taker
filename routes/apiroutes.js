// DEPENDECIES ===================================
const fs = require("fs");
// const path = require("path");

module.exports = function (app) {
  // ability to read the file while grabbing the database json file
  app.get("/api/notes", function (req, res) {
    fs.readFile("db/db.json", "utf8", function (err, data) {
      // if there is an error within reading the file, the file will be thrown out by using the throw syntax
      if (err) throw err;
      // parses the data so it can be in object format for the website
      data = JSON.parse(data);
      // responds with the json data
      res.json(data);
    });
  });

  // POST API ====================================
  app.post("/api/notes", function (req, res) {
    fs.readFile("db/db.json", "utf8", function (err, database) {
      // if there is an error within reading the file, the file will be thrown out by using the throw syntax
      if (err) throw err;
      // parses the note id, title, text,
      database = JSON.parse(database);
      var newNote = req.body;
      // Proposition: We want each new id to be one greater than the last elements id
      // newNote.id = database.length + 1;
      // If there are no notes, you end up breaking because you can't make a new note id.
      if (database.length === 0) {
        // if no notes set the first note to ID 1
        newNote.id = 1;
      } else {
        // will add one to the last note in the database when posted
        const lastElementId = database[database.length - 1].id;
        newNote.id = lastElementId + 1;
      }
      // pushes the new note into the database
      database.push(newNote);
      // stringifies the data to be usable about the
      database = JSON.stringify(database);
      // writes the new file into the database
      fs.writeFile("db/db.json", database, function (err) {
        if (err) throw err;
        res.sendStatus(200);
      });
    });
  });

  // setting up for /api/notes post route
  // DELETE API ==================================
  // setting up for /api/notes/:id
  app.delete("/api/notes/:id", function (req, res) {
    // create variable where id is equal to the ID parameter fromt he client
    const id = parseInt(req.params.id);
    fs.readFile("db/db.json", "utf8", function (err, database) {
      // if there is an error within reading the file, the file will be thrown out by using the throw syntax
      if (err) throw err;
      database = JSON.parse(database);
      //filter keeps everything for which the function in filter returns true.
      var newDatabase = database.filter((note) => {
        return note.id !== id;
      });

      // alternative filter method where filter would go
      // let newDatabase = [];
      // for (var i = 0; i < database.length; i++) {
      //   if (database[i].id !== id) {
      //     newDatabase.push(database[i]);
      //   }
      // }

      // stringifies the newDatabase to be usable by the db
      newDatabase = JSON.stringify(newDatabase);
      fs.writeFile("db/db.json", newDatabase, function (err) {
        if (err) throw err;
        res.sendStatus(200);
      });
    });
  });
};
