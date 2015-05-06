(function () {
    "use strict";
    /* global module */
    module.exports = function (grunt) {
        grunt.initConfig({
            "pkg": grunt.file.readJSON("package.json"),
            "eslint": {
                target: "api/"
            },
            "file-creator": {
                "keys": {
                    "api/data/keys.json": function (fs, fd, done) {
                        fs.writeSync(fd, "{}");
                        done();
                    }
                },
                "votes": {
                    "api/data/votes.json": function (fs, fd, done) {
                        fs.writeSync(fd, "{}");
                        done();
                    }
                },
                "email": {
                    "api/data/email.json": function (fs, fd, done) {
                        fs.writeSync(fd, "{\"user\": \"EMAIL\",\"pass\": \"PASSWORD\", \"service\": \"gmail\"}");
                        done();
                    }
                }
            },
            "copy": {
                main: {
                    files: [
                        {
                            expand: true,
                            src: ["node_modules/*"],
                            dest: "api/"
                        }
                    ]
                }
            }
        });
        // dependencies
        grunt.loadNpmTasks("grunt-npm-install");
        grunt.loadNpmTasks("grunt-eslint");
        grunt.loadNpmTasks("grunt-contrib-copy");
        grunt.loadNpmTasks("grunt-file-creator");
        // tasks
        grunt.registerTask("default", ["npm-install:express:cors:body-parser:http:iconv-lite:csvtojson:node-schedule:node-uuid:validator:nodemailer:nodemailer-smtp-transport", "eslint", "file-creator", "copy"]);
    };
}());
