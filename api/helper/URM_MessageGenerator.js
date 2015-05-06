"use strict";
/*eslint-env node */

var URMMessageGenerator = function () {
    var getErrorMessage = function (msg, data) {
            var result = {
                status: "error",
                msg: msg
            };
            if (typeof (data) !== undefined) {
                result.data = data;
            }
            return result;
        },

        getMessage = function (msg, data) {
            var result = {
                status: "information",
                msg: msg
            };
            if (typeof (data) !== undefined) {
                result.data = data;
            }
            return result;
        };

    return {
        getMessage: getMessage,
        getErrorMessage: getErrorMessage
    };
};

exports.MessageGenerator = URMMessageGenerator;
