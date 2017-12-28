var express = require("express");
var path = require("path");
var bodyParser = require('body-parser');
var session = require('express-session');
require('./server/config/mongoose.js');

var route_setter = require('./server/config/routes.js');
var app = express();

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'angular-journal/dist')));
app.use(session({secret: 'samzojournal', cookie: {maxAge: 60000000}}));

route_setter(app);

var server = app.listen(8000, function () {
    console.log("listening on port 8000");
});