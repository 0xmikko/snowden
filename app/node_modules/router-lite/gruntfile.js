module.exports = function(grunt){
    grunt.initConfig({
        uglify: {                              // Task
            dist: {
                files: {                         // Dictionary of files
                    'dist/router-lite.min.js' : 'dist/router-lite.js'
                }
            }
        },
        browserify : {
            dist : {
                files : {
                    'dist/router-lite.js' : ['src/build.js']
                },
                options : {
                    browserifyOptions : {debug : false},
                    transform : [
                        ['babelify']
                    ]
                }
            }
        },
        watch : {
            dist : {
                files : ['src/**/*.js'],
                tasks : ['browserify','uglify']
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.registerTask('default', ['browserify','uglify','watch']);
}