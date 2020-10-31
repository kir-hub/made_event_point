"use strict";

require('./server/dbMongo/mongoose');

var http = require('http');

var express = require('express');

var router = require('./server/router');

var cors = require('cors');

var controller = require('./socketInit');

var handlerError = require('./server/handlerError/handler');

var PORT = process.env.PORT || 9632;
var app = express();
app.use(cors());
app.use(express.json());
app.use('/public', express["static"]('public'));
app.use(router);
app.use(handlerError);
var server = http.createServer(app);
server.listen(PORT, function () {
  return console.log("Example app listening on port ".concat(PORT, "!"));
});
controller.createConnection(server);