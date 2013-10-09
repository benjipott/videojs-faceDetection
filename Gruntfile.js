'use strict';

module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({
        // Metadata.
        pkg: grunt.file.readJSON('package.json'),
        banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
            '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
            '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
            '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
            ' Licensed <%= pkg.license %> */\n',
        clean: {
            files: ['dist']
        },

        concat: {
            options: {
                separator: ''
            },
            dist: {
                src: ['src/videojs.pluginBase.js','src/videojs.faceDetection.js', 'src/component/**/*.js'],
                dest: 'dist/videojs.faceDetection.js'
            }
        },

        uglify: {
            dist: {
                src: 'dist/videojs.faceDetection.js',
                dest: 'dist/videojs.faceDetection.min.js'
            },
        },
        copy: {
            dist: {
                src: 'src/videojs.faceDetection.css',
                dest: 'dist/videojs.faceDetection.css'
            }
        },
        cssmin: {
            dist: {
                src: 'src/videojs.faceDetection.css',
                dest: 'dist/videojs.faceDetection.min.css'
            }
        },
        usebanner: {
            taskName: {
                options: {
                    position: 'top',
                    banner: '<%= banner %>'
                },
                files: {
                    src: [
                        'dist/videojs.faceDetection.js',
                        'dist/videojs.faceDetection.min.js',
                        'dist/videojs.faceDetection.min.css',
                        'dist/videojs.faceDetection.css'
                    ]
                }
            }
        }
    });

    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-banner');

    // Default task.
    grunt.registerTask('default', ['clean', 'concat', 'uglify', 'copy', 'cssmin', 'usebanner']);

};
