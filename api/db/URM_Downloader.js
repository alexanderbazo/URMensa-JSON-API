/* eslint-env node */
"use strict";

var URMDownloader = function() {

  var Http = require("http"),
    Iconv = require("iconv-lite"),
    csv = require("csvtojson");

  function parseData(callback, res) {
    var lines = "";
    res.on("data", function(data) {
      var utf8String = Iconv.decode(new Buffer(data), "ISO-8859-1");
      lines = lines.concat(utf8String);
    });

    res.on("end", function() {
      transformData(lines, callback);
    });
  }

  function transformData(data, callback) {
    csv({
      delimiter: ";",
    }).fromString(data).then(function(jsonObj) {
      let items = jsonObj;
      for (let i = 0; i < items.length; i += 1) {
        let item = items[i];
        if (item.name === undefined) {
          items.splice(i, 1);
        } else {
          item.renameProperty("tag", "day");
          item.renameProperty("warengruppe", "category");
          item.renameProperty("kennz", "labels");
          if (item.name.indexOf("(") !== -1) {
            item.name = item.name.substring(0, item.name.indexOf(
              "(")).trim();
          }
          item.cost = {
            students: item.stud,
            employees: item.bed,
            guests: item.gast,
          };
          delete item.stud;
          delete item.bed;
          delete item.gast;
          delete item.datum;
          delete item.preis;
        }
      }
      callback(items);
    });
  }

  function get(host, path, place, callback) {
    Http.get({
      host: host,
      path: path,
      encoding: null,
    }, parseData.bind(this, function(data) {
      callback(data, place);
    } ));
  }

  return {
    get: get,
  };
};

exports.Downloader = URMDownloader;