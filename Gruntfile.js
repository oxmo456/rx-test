module.exports = function (grunt) {

    grunt.initConfig({
        connect: {
            server: {
                options: {
                    keepalive: false,
                    port: 1977,
                    hostname: "*",
                    base: "./server"
                }
            }
        },
        ngmin: {
            dev: {
                src: [
                    "src/js/**/module.js",
                    "src/js/**/*.provider.js",
                    "src/js/**/config*.js",
                    "src/js/**/*.js"
                ],
                dest: "tmp/js/main.js"
            }
        },
        concat: {
            dev: {
                src: ["src/js/.use-strict", "src/js/.prefix", "tmp/js/polyfills.js", "tmp/js/main.js", "src/js/.suffix"],
                dest: "server/js/main.js"
            },
            polyfills: {
                src: ["src/polyfills/**/*.js"],
                dest: "tmp/js/polyfills.js"
            }
        },
        watch: {
            scripts: {
                files: ["src/**/*.js"],
                tasks: ["ngmin:dev", "concat:dev"],
                options: {
                    nospawn: true
                }
            },
            polyfills: {
                files: ["src/polyfills/**/*.js"],
                tasks: ["concat:polyfills", "concat:dev"],
                options: {
                    nospawn: true
                }
            },
            html: {
                files: ["src/**/*.html"],
                tasks: ["copy:html"],
                options: {
                    nospawn: true
                }
            },
            less: {
                files: ["src/less/**/*.less"],
                tasks: ["less:dev"],
                options: {
                    nospawn: true
                }
            },
            config: {
                files: ["src/config/*.json"],
                tasks: ["copy:config"],
                options: {
                    nospawn: true
                }
            },
            locales: {
                files: ["src/locales/*.json"],
                tasks: ["copy:locales"],
                options: {
                    nospawn: true
                }
            },
            media: {
                files: ["src/media/**/*"],
                tasks: ["copy:media"]
            },
            data: {
                files: ["src/data/**/*"],
                tasks: ["copy:data"]
            }
        },
        copy: {
            html: {
                files: [
                    {expand: true, src: ["**/*.html"], cwd: "src/", dest: "server/"}
                ]
            },
            components: {
                files: [
                    {expand: true, src: ["angular*/*"], cwd: "bower_components/", dest: "server/components/"},
                    {expand: true, src: ["rxjs/*"], cwd: "bower_components/", dest: "server/components/"},
                    {expand: true, src: ["bootstrap/**/*.*"], cwd: "bower_components/", dest: "server/components/"}
                ]
            },
            fonts: {
                files: [
                    {expand: true, src: ["fonts/**/*"], cwd: "src/", dest: "server/"}
                ]
            },
            config: {
                files: [
                    {expand: true, src: ["config/*.json"], cwd: "src/", dest: "server/"}
                ]
            },
            locales: {
                files: [
                    {expand: true, src: ["locales/*.json"], cwd: "src/", dest: "server/"}
                ]
            },
            media: {
                files: [
                    {expand: true, src: ["**"], cwd: "src/media/", dest: "server/media/"}
                ]
            },
            data: {
                files: [
                    {expand: true, src: ["**"], cwd: "src/data/", dest: "server/data/"}
                ]
            }
        },
        less: {
            dev: {
                files: {
                    "server/css/styles.css": ["src/less/styles.less"]
                }
            }
        },
        karma: {
            unit: {
                configFile: "karma.conf.js",
                runnerPort: 9999,
                singleRun: true,
                browsers: ["PhantomJS"]
            }
        },
        htmlmin: {
            dist: {
                options: {
                    removeComments: true,
                    collapseWhitespace: true
                },
                files: [
                    {expand: true, src: ["**/*.html"], cwd: "src/", dest: "server/"}
                ]
            }
        },
        clean: {
            dev: ["server/*", "tmp/*"]
        },
        uglify: {
            dev: {
                files: {
                    "server/js/main.min.js": ["server/js/main.js"]
                }
            }
        }
    });


    grunt.loadNpmTasks("grunt-contrib-connect");
    grunt.loadNpmTasks("grunt-ngmin");
    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks("grunt-contrib-copy");
    grunt.loadNpmTasks("grunt-contrib-concat");
    grunt.loadNpmTasks("grunt-contrib-less");
    grunt.loadNpmTasks("grunt-karma");
    grunt.loadNpmTasks("grunt-contrib-htmlmin");
    grunt.loadNpmTasks("grunt-contrib-clean");
    grunt.loadNpmTasks("grunt-contrib-uglify");

    grunt.registerTask("dev-build", ["ngmin:dev", "concat:polyfills", "concat:dev", "copy", "less:dev"]);
    grunt.registerTask("dev-watch", ["watch"]);

    //start a server for development purposes
    grunt.registerTask("server-dev", ["clean:dev", "dev-build", "connect:server", "dev-watch"]);

    //default server (dev)
    grunt.registerTask("server", ["server-dev"]);

};