var URMServer = function (newMsgFactory, responseDelayinMicroSeconds) {
    "use strict";
    /*eslint-env node */

    var sleep = require("sleep");
    var msgFactory = newMsgFactory,
        app,
        /*eslint-disable */
        server,
        /*eslint-enable */
        db;

    function init() {
        var express = require("express"),
            cors = require("cors"),
            bodyParser = require("body-parser");
        app = express();
        app.use(cors());
        app.use(bodyParser.json({
            strict: false
        }));

        app.use(bodyParser.urlencoded({
            extended: true
        }));

        app.get("/mensa", function (req, res) {
            res.redirect("http://132.199.139.24/~baa56852/www/mensa/");
        });

        app.all("/mensa/uni/upvote/*", function (req, res) {
            var id = req.originalUrl.substring(req.originalUrl.lastIndexOf("/") + 1, req.originalUrl.length),
                result = msgFactory.getErrorMessage("error while upvoting item " + id);
            result = db.upvoteElement(parseInt(id));
            if (responseDelayinMicroSeconds) {
                sleep.usleep(responseDelayinMicroSeconds);
            }
            res.send(JSON.stringify(result));
        });

        app.all("/mensa/uni/downvote/*", function (req, res) {
            var id = req.originalUrl.substring(req.originalUrl.lastIndexOf("/") + 1, req.originalUrl.length),
                result = msgFactory.getErrorMessage("error while donwvoting item " + id);
            result = db.downvoteElement(parseInt(id));
            if (responseDelayinMicroSeconds) {
                sleep.usleep(responseDelayinMicroSeconds);
            }
            res.send(JSON.stringify(result));
        });

        app.get("/mensa/uni/*", function (req, res) {
            var day = req.originalUrl.substring(req.originalUrl.lastIndexOf("/") + 1, req.originalUrl.length),
                menu = db.getMenuForDay(day);
            if (responseDelayinMicroSeconds) {
                sleep.usleep(responseDelayinMicroSeconds);
            }
            res.send(JSON.stringify(menu));
        });
    }

    function start(port, database) {
        db = database;
        server = app.listen(port);
    }

    function stop() {}

    init();

    return {
        start: start,
        stop: stop
    };
};

exports.Server = URMServer;
