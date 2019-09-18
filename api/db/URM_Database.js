/*eslint-env node */
"use strict";

var URMDatabase = function(downloader, Config) {

  var menu = [],
    votes = {};

  function save() {
    // TODO: Check why file can not be opened
    //var fs = require("fs");
     //fs.writeFile("Config.VotesFile", JSON.stringify(votes));   
  }

  function initVotes() {
    votes = require(Config.VotesFile);

    
      
    menu.forEach(function(item) {
      if (!votes.hasOwnProperty(item.name)) {
        item.id = Object.keys(votes).length + 1;
        item.upvotes = 0;
        item.downvotes = 0;
        votes[item.name] = {
          id: item.id,
          upvotes: 0,
          downvotes: 0,
        };
      } else {
        item.id = votes[item.name].id;
        item.upvotes = votes[item.name].upvotes;
        item.downvotes = votes[item.name].downvotes;
      }
    });
    save();
  }

  function update() {
    console.log("updating (" + (new Date()).toReadableString() + ")");
    let stwnoWeekNumber = (new Date()).getWeek(),
      timestamp = parseInt(Date.now() / 1000),
      url = Config.APIPathTemplate;
    console.log(url)
    url = url.replace("{{stwnoWeekNumber}}", stwnoWeekNumber);
    console.log(url)
    url = url.replace("{{timestamp}}", timestamp);
    console.log(url);
    downloader.get(Config.APIHost, url,
      function(data) {
        menu = data;
        initVotes();
      });
  }

  function filterByDay(day, element) {
    return element.day.toUpperCase() === day.toUpperCase();
  }

  function getMenuForDay(day) {
    var menuForDay = menu.filter(filterByDay.bind(this, day));
    return menuForDay;
  }

  function getMenuItemFromId(id) {
    for (let i = 0; i < menu.length; i++) {
      if (menu[i].id === id) {
        return menu[i];
      }
    }
    return undefined;
  }

  function modifyVotesForElement(id, voting) {
    var menuItem = getMenuItemFromId(id);
    if (menuItem === undefined) {
      return {
        status: "error",
        msg: "id not found in current menu",
      };
    }
    if (menuItem[voting] === Number.MAX_VALUE) {
      return {
        status: "ok",
        msg: "voting accepted, vote limit reached",
        data: menuItem,
      };
    }
    menuItem[voting] += 1;
    votes[menuItem.name][voting] += 1;
    save();
    return {
      status: "ok",
      msg: "voting accepted",
      data: menuItem,
    };

  }

  function upvoteElement(id) {
    var result = modifyVotesForElement(id, "upvotes");
    return result;
  }

  function downvoteElement(id) {
    var result = modifyVotesForElement(id, "downvotes");
    return result;
  }

  return {
    update: update,
    getMenuForDay: getMenuForDay,
    upvoteElement: upvoteElement,
    downvoteElement: downvoteElement
  };
};

exports.Database = URMDatabase;