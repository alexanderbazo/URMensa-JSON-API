/*eslint-env node */
"use strict";

(function() {

  const Config = require("../config.json"), 
    schedule = require("node-schedule"),
    URMHelper = require("./helper/URM_Helper"),
    URMMessageGenerator = require("./helper/URM_MessageGenerator"),
    URMDatabase = require("./db/URM_Database"),
    URMDownloader = require("./db/URM_Downloader"),
    URMServer = require("./srv/URM_Server");

  let msgFactory = new URMMessageGenerator.MessageGenerator(),
    downloader = new URMDownloader.Downloader(),
    database = new URMDatabase.Database(downloader, Config),
    server = new URMServer.Server(msgFactory);

  function run() {
    schedule.scheduleJob(Config.Schedule, database.update);
    database.update();
    server.start(Config.Port, database);
  }

  return {
    run: run,
  };

}().run());