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
                "votes": {
                    "api/data/votes.json": function (fs, fd, done) {
                        fs.writeSync(fd, "{}");
                        done();
                    }
                }
            },
            "copy": {
                main: {
                    files: [{
                        expand: true,
                        src: ["node_modules/*"],
                        dest: "api/"
                    }]
                }
            }
        });
        // dependencies
        grunt.loadNpmTasks("grunt-npm-install");
        grunt.loadNpmTasks("grunt-eslint");
        grunt.loadNpmTasks("grunt-contrib-copy");
        grunt.loadNpmTasks("grunt-file-creator");
        // tasks
        grunt.registerTask("default", ["npm-install:express:cors:body-parser:csvtojson:http:iconv-lite:csvtojson:node-schedule:node-uuid:validator:sleep", "eslint", "file-creator", "copy"]);
    };
}());
