"use strict";
/*eslint-env node */

var URMDatabase = function (newDownloader) {
    var downloader = newDownloader,
        menu = [],

        update = function () {
            console.log("updating");
            var weekNumber = (new Date()).getWeek();
            downloader.get("www.stwno.de", "/infomax/daten-extern/csv/UNI-R/" + weekNumber + ".csv", function (data) {
                menu = data;
            });
        },

        filterByDay = function (day, element) {
            return element.day.toUpperCase() === day.toUpperCase();
        },

        getMenuForDay = function (day) {
            var menuForDay = menu.filter(filterByDay.bind(this, day));
            return menuForDay;
        };

    return {
        update: update,
        getMenuForDay: getMenuForDay
    };
};

exports.Database = URMDatabase;
