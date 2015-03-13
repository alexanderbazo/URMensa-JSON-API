"use strict";
/*eslint-env node */
var URMServer = function () {
    var server,
        db,
        init = function () {
            var express = require("express"),
                cors = require("cors"),
                bodyParser = require("body-parser");
            server = express();
            server.use(cors());
            server.use(bodyParser.json({
                strict: false
            }));


            server.get("/mensa", function (req, res) {
                res.redirect("http://132.199.139.24/~baa56852/www/mensa/");
            });

            server.get("/mensa/uni/*", function (req, res) {
                var day = req.originalUrl.substring(req.originalUrl.lastIndexOf("/") + 1, req.originalUrl.length),
                    menu = db.getMenuForDay(day);
                res.send(JSON.stringify(menu));
            });
        },

        start = function (port, database) {
            db = database;
            server.listen(port);
        },

        stop = function () {};

    init();

    return {
        start: start,
        stop: stop
    };
};


exports.Server = URMServer;
