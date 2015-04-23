
module.exports = function(grunt) {

    /****************************************
     *
     * PROJECT CONFIGURATION
     *
     ****************************************/

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        opt: {
            header: '/*! <%= pkg.title %> - v<%= pkg.version %> - ' + '<%= grunt.template.today("yyyy-mm-dd") %> */',
            footer: '',
            nl: grunt.util.linefeed
        },

        /********************
         * CONCAT FILES
         ********************/
        concat: {
            options: {
                //separator: grunt.util.linefeed+';'+grunt.util.linefeed
            },

            rh_package: {
                src: [
                    'src/RubikUtils.js',
                    'src/RubikCube.js',
                    'src/RubikCubeIso.js'
                ],
                dest: 'target/temp/rh_package.js'
            },

            main: {
                options: {
                    banner: '<%= opt.header %><%= opt.nl %>'+
                    'var RubikCubeIso = (function(){' + '<%= opt.nl %>'+
                    'var rhVersion = "v<%= pkg.version %>";' + '<%= opt.nl %>',
                    footer: '<%= opt.nl %>'+
                    'return RubikCubeIso;}());'
                },
                src: [
                    'src/modules/GraphicEngine/index.js',
                    'target/temp/rh_package.js'
                ],
                dest: 'target/<%= pkg.name %>-<%= pkg.version %>.js'
            }

        },

        /********************
         * MINIFY FILES
         ********************/
        uglify: {

            main: {
                options: { banner: '<%= opt.header %><%= opt.nl %>' },
                files: {'target/<%= pkg.name %>-<%= pkg.version %>.min.js': ['target/<%= pkg.name %>-<%= pkg.version %>.js']}
            }

        },

        /********************
         * CLEAN
         ********************/
        clean: {

            target : ['target'],
            build  : ['build'],
            deploy : ['public/<%= pkg.version %>'],
            all    : ['target','build','public/<%= pkg.version %>']

        },

        /********************
         * COPY
         ********************/
        copy: {

            main: {
                files: [
                    {
                        expand: true,
                        flatten: true,
                        filter: 'isFile',
                        src: ['target/<%= pkg.name %>*'],
                        dest: 'build/<%= pkg.version %>/'
                    }
                ]
            },

            deploy: {
                files: [
                    {
                        expand: true,
                        flatten: true,
                        filter: 'isFile',
                        src: ['build/<%= pkg.version %>/<%= pkg.name %>-<%= pkg.version %>.min.js'],
                        dest: 'public/<%= pkg.version %>/'
                    }
                ]
            }

        }

    });

    /****************************************
     *
     * LOAD PLUGINS
     *
     ****************************************/

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-copy');

    /****************************************
     *
     * REGISTER TASKS
     *
     ****************************************/

    // --- METHOD tasks --- //

    // --- ALIAS tasks --- //

    // Full tasks
    grunt.registerTask('build', ['clean:target', 'concat:rh_package', 'concat:main', 'uglify:main', 'copy:main', 'clean:target']);
    grunt.registerTask('deploy', ['clean:deploy', 'build', 'copy:deploy']);

    // Default task
    grunt.registerTask('default', ['build']);

};
