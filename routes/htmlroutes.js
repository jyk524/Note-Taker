// DEPENDECIES ===================================
const path = require("path");
var express = require("express");
var app = express();

// Display notes.html while using the GET METHOD
module.exports = function (app) {
  // display notes.html while using the GET METHOD
  app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/notes.html"));
  });
  app.get("/*", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/index.html"));
  });
};
