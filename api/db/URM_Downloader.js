/* eslint-env node */
"use strict";

var URMDownloader = function() {

  var Http = require("http"),
    Iconv = require("iconv-lite"),
    csv = require("csvtojson"),
    jsonMealContent= require("../../mealContents");
    console.log(typeof jsonMealContent);
    //objectMealContent = JSON.parse(jsonMealContent);   
    

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
          item.contentInformation = getContentInformationFromTitle(item.name);
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

  function getContentInformationFromTitle(title) {
    let contentInformation = [],
      regex = new RegExp(/\((.*?)\)/g),
      results = title.match(regex);
    if (results === null) {
      return contentInformation;
    }
    for (let i = 0; i < results.length; i++) {
      let currentGroup = results[i].substring(1, results[i].length - 1).split(
        ",");
      for (let j = 0; j < currentGroup.length; j++) {
        if (contentInformation.includes(currentGroup[j]) === false) {
          contentInformation.push(currentGroup[j]);
        }
      }
    }
    return translateContentInformation(contentInformation);
  }

  function translateContentInformation(contentInformation) {
      //console.log(contentInformation);
      //getDictionary();
    for (let i = 0; i < contentInformation.length; i++) {
        if(jsonMealContent[contentInformation[i]]){
            contentInformation[i] = jsonMealContent[contentInformation[i]];
        }
        else{
            console.log(contentInformation[i]);
        }
    }
    return contentInformation;
  }
    
  function getDictionary(){
      //var jsonDictionary = await fetch("./data_class.json");
      var jsonDictionary = require("../../mealContents")
      console.log(jsonDictionary);
  }

  function get(host, path, callback) {
    Http.get({
      host: host,
      path: path,
      encoding: null,
    }, parseData.bind(this, callback));
  }

  return {
    get: get,
  };
};

exports.Downloader = URMDownloader;