"use strict";
/*eslint-env node */

var URMDatabase = function (newDownloader) {
    var downloader = newDownloader,
        menu = [],
        //read from file: ID,name,up,down
        votes = [],

        initVotes = function () {
            //load from file
            //iterate menu
            //add dish if not exist < create id
            //get votes and store in item
        },

        update = function () {
            console.log("updating");
            var stwnoWeekNumber = (new Date()).getWeek() - 1,
                timestamp = parseInt(Date.now() / 1000);
            downloader.get("www.stwno.de", "/infomax/daten-extern/csv/UNI-R/" + stwnoWeekNumber + ".csv?t=" + timestamp, function (data) {
                menu = data;
                initVotes();
            });
        },

        save = function () {
            //save votes to file

        },

        filterByDay = function (day, element) {
            return element.day.toUpperCase() === day.toUpperCase();
        },

        getMenuForDay = function (day) {
            var menuForDay = menu.filter(filterByDay.bind(this, day));
            return menuForDay;
        },

        upvoteElement = function (id) {},

        downvoteElement = function (id) {};

    return {
        update: update,
        getMenuForDay: getMenuForDay,
        upvoteElement: upvoteElement,
        downvoteElement: downvoteElement
    };
};

exports.Database = URMDatabase;
