// Dependencies
var express = require("express");
var path = require("path");
var fs = require("fs");
// Setting up Express App
var app = express();
var PORT = process.env.PORT || 3000;
// Sets up the Express app to handle data parsing
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
// =====================================
// require route file
require("./routes/apiroutes.js")(app);
require("./routes/htmlroutes.js")(app);

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function () {
  console.log("App listening on PORT " + PORT);
});
