"use strict";
/*eslint-env node */

var URMEmailClient = function () {
    var nodemailer = require("nodemailer");
    var smtpTransport = require("nodemailer-smtp-transport");
    var config = require("../data/email.json");
    var transporter = nodemailer.createTransport(smtpTransport({
        service: config.service,
        auth: config
    }));

    var send = function (sender, receiver, subject, msg) {
        transporter.sendMail({
            from: sender,
            to: receiver,
            subject: subject,
            text: msg
        }, function (error, response) {
            if (error) {
                console.log(error);
            } else {
                console.log("Message sent: " + response.message);
            }
        });
    };

    return {
        send: send
    };
};

exports.EmailClient = URMEmailClient;
