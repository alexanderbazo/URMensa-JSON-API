"use strict";
/*eslint-env node */

var URMDatabase = function (newDownloader) {
    var downloader = newDownloader,
        menu = [],
        votes = {},

        save = function () {
            var fs = require("fs");
            fs.writeFile("./data/votes.json", JSON.stringify(votes));
        },

        initVotes = function () {
            votes = require("../data/votes");
            menu.forEach(function (item) {
                if (!votes.hasOwnProperty(item.name)) {
                    item.id = Object.keys(votes).length + 1;
                    item.upvotes = 0;
                    item.downvotes = 0;
                    votes[item.name] = {
                        id: item.id,
                        upvotes: 0,
                        downvotes: 0
                    };
                } else {
                    item.id = votes[item.name].id;
                    item.upvotes = votes[item.name].upvotes;
                    item.downvotes = votes[item.name].downvotes;
                }
            });
            save();
        },

        update = function () {
            console.log("updating (" + (new Date()).toReadableString() + ")");
            var stwnoWeekNumber = (new Date()).getWeek() - 1,
                timestamp = parseInt(Date.now() / 1000);
            downloader.get("www.stwno.de", "/infomax/daten-extern/csv/UNI-R/" + stwnoWeekNumber + ".csv?t=" + timestamp, function (data) {
                menu = data;
                initVotes();
            });
        },


        filterByDay = function (day, element) {
            return element.day.toUpperCase() === day.toUpperCase();
        },

        getMenuForDay = function (day) {
            var menuForDay = menu.filter(filterByDay.bind(this, day));
            return menuForDay;
        },

        getMenuItemFromId = function (id) {
            for (var i = 0; i < menu.length; i++) {
                if (menu[i].id === id) {
                    return menu[i];
                }
            }
            return undefined;
        },

        modifyVotesForElement = function (id, voting) {
            var menuItem = getMenuItemFromId(id);
            if (menuItem === undefined) {
                return {
                    status: "error",
                    msg: "id not found in current menu"
                };
            } else {
                menuItem[voting] += 1;
                votes[menuItem.name][voting] += 1;
                save();
                return {
                    status: "ok",
                    msg: "voting accepted",
                    data: menuItem
                };
            }
        },

        upvoteElement = function (id) {
            var result = modifyVotesForElement(id, "upvotes");
            return result;
        },

        downvoteElement = function (id) {
            var result = modifyVotesForElement(id, "downvotes");
            return result;
        };

    return {
        update: update,
        getMenuForDay: getMenuForDay,
        upvoteElement: upvoteElement,
        downvoteElement: downvoteElement
    };
};

exports.Database = URMDatabase;
