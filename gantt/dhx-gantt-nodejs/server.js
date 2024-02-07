var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');

var port = 1337;
var app = express();

app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: true}));

app.all(/api/, function(req, res, next) {
  console.log(`\n${req.method} ${req.url} ---> ${JSON.stringify(req.body, '\t', 2)}` );
  res.status(200).end();
});

app.listen(port, function() {
  console.log("Server is running on port " + port + "...");
});