(function () {
    "use strict";
    /* global module */
    module.exports = function (grunt) {
        grunt.initConfig({
            pkg: grunt.file.readJSON("package.json"),
            eslint: {
                target: "api/"
            },
            copy: {
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
        // tasks
        //grunt.registerTask("default", ["eslint", "npm-install:lodash:async"]);

        grunt.registerTask("default", ["eslint", "npm-install:express:cors:body-parser:http:iconv-lite:csvtojson:node-schedule", "copy"]);
    };
}());
