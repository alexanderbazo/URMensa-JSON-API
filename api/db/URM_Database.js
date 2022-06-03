/*eslint-env node */
"use strict";

var URMDatabase = function(downloader, Config) {

  var menu = [],
    othMenu = [],
    passauMenu = [],
    ptMenu = [],
    votes = {};

  function save() {
    // TODO: Check why file can not be opened
    // var fs = require("fs");
    // fs.writeFile("Config.VotesFile", JSON.stringify(votes));
  }

  function initVotes() {
    votes = require(Config.VotesFile);
    votes = JSON.parse(votes);
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

    for (let i = 0; i < Config.LocationCodes.length; i++) {
      url = Config.APIPathTemplate;
      url = url.replace("{{stwnoWeekNumber}}", stwnoWeekNumber);
      url = url.replace("{{timestamp}}", timestamp);
      url = url.replace("UNI-R", Config.LocationCodes[i]);

      downloader.get(Config.APIHost, url, Config.LocationCodes[i],
        function(data, place) {
          switch (place) {
            case "HS-R-tag":
                othMenu = data;
                console.log("Got Data for OTH");
              break;
            case "UNI-P":
                passauMenu = data;
                console.log("Got Data for Passau");
              break;
            case "UNI-R": 
              menu = data;
              console.log("Got Data for Regensburg");
              break;
            case "Cafeteria-PT":
              ptMenu = data;
              console.log("Got data for PT");
              break;
          }
          // menu = data;
          initVotes();
        });
    }
  }

  function filterByDay(day, element) {
    return element.day.toUpperCase() === day.toUpperCase();
  }

  function getMenuForDay(day) {
    var menuForDay = menu.filter(filterByDay.bind(this, day));
    return menuForDay;
  }

  function getMenuForDayAndPlace(day, place) {
    var menuForDay;

    if (place === "uni") {
      menuForDay = menu.filter(filterByDay.bind(this, day));
    } else if (place === "passau") {
      menuForDay = passauMenu.filter(filterByDay.bind(this, day));
    } else if (place === "oth") {
      menuForDay = othMenu.filter(filterByDay.bind(this, day));
    } else if (place === "pt") {
      menuForDay = ptMenu.filter(filterByDay.bind(this, day));
    }

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
    downvoteElement: downvoteElement,
    getMenuForDayAndPlace: getMenuForDayAndPlace,
  };
};

exports.Database = URMDatabase;