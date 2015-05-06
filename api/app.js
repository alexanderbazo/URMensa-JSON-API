"use strict";
/*eslint-env node */

require("./helper/URM_Helper");
var URMMessageGenerator = require("./helper/URM_MessageGenerator");
var URMDatabase = require("./db/URM_Database");
var URMDownloader = require("./db/URM_Downloader");
var URMEmailClient = require("./db/URM_EmailClient");
var URMServer = require("./srv/URM_Server");
var schedule = require("node-schedule");

var msgFactory = new URMMessageGenerator.MessageGenerator();
var emailClient = new URMEmailClient.EmailClient();
var downloader = new URMDownloader.Downloader();
var database = new URMDatabase.Database(downloader);
var server = new URMServer.Server(msgFactory, emailClient);

schedule.scheduleJob("0 0 * * *", database.update);
database.update();
server.start(9001, database);
