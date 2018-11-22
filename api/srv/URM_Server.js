/*eslint-env node */
"use strict";

var URMServer = function(newMsgFactory) {

  var msgFactory = newMsgFactory,
    app,
    server,
    db;

  function init() {
    let express = require("express"),
      cors = require("cors"),
      bodyParser = require("body-parser");
    app = express();
    app.use(cors());
    app.use(bodyParser.json({
      strict: false,
    }));

    app.use(bodyParser.urlencoded({
      extended: true,
    }));

    app.get("/mensa", function(req, res) {
      res.redirect("http://132.199.139.24/~baa56852/www/mensa/");
    });

    app.all("/mensa/uni/upvote/*", function(req, res) {
      let id = req.originalUrl.substring(req.originalUrl.lastIndexOf("/") +
          1, req.originalUrl.length),
        result = msgFactory.getErrorMessage("error while upvoting item " +
          id);
      result = db.upvoteElement(parseInt(id));
      res.send(JSON.stringify(result));
    });

    app.all("/mensa/uni/downvote/*", function(req, res) {
      let id = req.originalUrl.substring(req.originalUrl.lastIndexOf("/") +
          1, req.originalUrl.length),
        result = msgFactory.getErrorMessage(
          "error while donwvoting item " + id);
      result = db.downvoteElement(parseInt(id));
      res.send(JSON.stringify(result));
    });

    app.get("/mensa/uni/*", function(req, res) {
      let day = req.originalUrl.substring(req.originalUrl.lastIndexOf("/") +
          1, req.originalUrl.length),
        menu = db.getMenuForDay(day);
      res.send(JSON.stringify(menu));
    });
  }

  function start(port, database) {
    let fs = require("fs"),
      https = require("https");
    db = database;
    server = https.createServer({
      key: fs.readFileSync("./certs/server.key"),
      cert: fs.readFileSync("./certs/server.cert"),
    }, app);
    server.listen(port);
  }

  init();

  return {
    start: start,
  };
};

exports.Server = URMServer;