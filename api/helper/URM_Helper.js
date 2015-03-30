(function () {
    "use strict";
    /*eslint no-extend-native:0 */

    //source: http://stackoverflow.com/questions/4647817/javascript-object-rename-key
    Object.defineProperty(
        Object.prototype,
        "renameProperty", {
            writable: false, // Cannot alter this property
            enumerable: false, // Will not show up in a for-in loop.
            configurable: false, // Cannot be deleted via the delete operator
            value: function (oldName, newName) {
                // Check for the old property name to
                // avoid a ReferenceError in strict mode.
                if (this.hasOwnProperty(oldName)) {
                    this[newName] = this[oldName];
                    delete this[oldName];
                }
                return this;
            }
        }
    );

    //source: http://weeknumber.net/how-to/javascript
    Date.prototype.getWeek = function () {
        var date = new Date(this.getTime());
        date.setHours(0, 0, 0, 0);
        // Thursday in current week decides the year.
        date.setDate(date.getDate() + 3 - (date.getDay() + 6) % 7);
        // January 4 is always in week 1.
        var week1 = new Date(date.getFullYear(), 0, 4);
        // Adjust to Thursday in week 1 and count number of weeks from date to week1.
        return 1 + Math.round(((date.getTime() - week1.getTime()) / 86400000 - 3 + (week1.getDay() + 6) % 7) / 7);
    };

    //source: http://stackoverflow.com/questions/3066586/get-string-in-yyyymmdd-format-from-js-date-object
    Date.prototype.toReadableString = function () {
        var yyyy = this.getFullYear().toString();
        var mm = (this.getMonth() + 1).toString(); // getMonth() is zero-based
        var dd = this.getDate().toString();
        var h = this.getDay().toString();
        var m = this.getMinutes().toString();
        return yyyy + "-" + (mm[1] ? mm : "0" + mm[0]) + "-" + (dd[1] ? dd : "0" + dd[0]) + " (" + h + ":" + m + ")"; // padding
    };
}());
