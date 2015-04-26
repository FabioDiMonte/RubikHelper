
module.exports = function(grunt) {

    /****************************************
     *
     * PROJECT CONFIGURATION
     *
     ****************************************/

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        opt: {
            nl: grunt.util.linefeed,

            libs: {
                graphicengine: 'dependencies/GraphicEngine/public/graphicengine-latest.min.js'
            },

            // header for minified full package
            header_min: '/*! <%= pkg.title %> - v<%= pkg.version %> - ' + '<%= grunt.template.today("yyyy-mm-dd") %> */<%= opt.nl %>',

            // header for minified standalone tools
            header_min_sa: '/*! <%= toolName %> - v<%= pkg.version %> - ' + '<%= grunt.template.today("yyyy-mm-dd") %> */<%= opt.nl %>',

            // wrapper for full package
            header_main: '<%= opt.header_min %>'+
            'var <%= pkg.title %> = (function(){' + '<%= opt.nl %>'+
            'var pkgVersion = "v<%= pkg.version %>";' + '<%= opt.nl %>',
            footer_main: '<%= opt.nl %>'+
            'return <%= pkg.title %>Package;}());',

            // wrapper for standalone tool
            header_sa: '<%= opt.header_min_sa %>'+
            'var <%= toolName %> = (function(){' + '<%= opt.nl %>'+
            'var pkgVersion = "v<%= pkg.version %>";' + '<%= opt.nl %>',
            footer_sa: '<%= opt.nl %>'+
            'return <%= toolName %>;}());'

        },

        /********************
         * CONCAT FILES
         ********************/
        concat: {
            options: {
                separator: grunt.util.linefeed
            },

            // ALL PACKAGES
            packages: {
                src: [
                    'src/static/RubikUtils.js',
                    'src/static/RubikSolver.js',
                    'src/static/RubikTeacher.js',
                    'src/cube/RubikCube.js',
                    'src/cube/RubikCubeIso.js'
                ],
                dest: 'target/temp/packages.js'
            },

            // FULL PROJECT
            main: {
                options: {banner: '<%= opt.header_main %>', footer: '<%= opt.footer_main %>'},
                src: [
                    '<%= opt.libs.graphicengine %>',
                    'target/temp/packages.js',
                    'target/<%= pkg.title %>Package.js'
                ],
                dest: 'target/<%= pkg.name %>-<%= pkg.version %>.js'
            },

            // STANDALONE TOOLS
            sa_utils: {
                options: {banner: '<%= opt.header_sa %>', footer: '<%= opt.footer_sa %>'},
                src: [
                    'src/static/RubikUtils.js'
                ],
                dest: 'target/sa/RubikUtils-<%= pkg.version %>.js'
            },
            sa_solver: {
                options: {banner: '<%= opt.header_sa %>', footer: '<%= opt.footer_sa %>'},
                src: [
                    'src/static/RubikUtils.js',
                    'src/static/RubikSolver.js'
                ],
                dest: 'target/sa/RubikSolver-<%= pkg.version %>.js'
            },
            sa_teacher: {
                options: {banner: '<%= opt.header_sa %>', footer: '<%= opt.footer_sa %>'},
                src: [
                    'src/static/RubikTeacher.js'
                ],
                dest: 'target/sa/RubikTeacher-<%= pkg.version %>.js'
            },
            sa_cube: {
                options: {banner: '<%= opt.header_sa %>', footer: '<%= opt.footer_sa %>'},
                src: [
                    'src/static/RubikUtils.js',
                    'src/cube/RubikCube.js'
                ],
                dest: 'target/sa/RubikCube-<%= pkg.version %>.js'
            },
            sa_cubeIso: {
                options: {banner: '<%= opt.header_sa %>', footer: '<%= opt.footer_sa %>'},
                src: [
                    '<%= opt.libs.graphicengine %>',
                    'src/static/RubikUtils.js',
                    'src/cube/RubikCube.js',
                    'src/cube/RubikCubeIso.js'
                ],
                dest: 'target/sa/RubikCubeIso-<%= pkg.version %>.js'
            }

        },

        /********************
         * MINIFY FILES
         ********************/
        uglify: {

            main: {
                options: { banner: '<%= opt.header_min %>' },
                files: {'target/<%= pkg.name %>-<%= pkg.version %>.min.js': ['target/<%= pkg.name %>-<%= pkg.version %>.js']}
            },

            tool: {
                options: { banner: '<%= opt.header_min_sa %>' },
                files: {'target/sa/<%= toolName %>-<%= pkg.version %>.min.js':['target/sa/<%= toolName %>-<%= pkg.version %>.js']}
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
                        expand: true,flatten: true,filter: 'isFile',
                        src: ['target/<%= pkg.name %>*'],
                        dest: 'build/<%= pkg.version %>/'
                    }
                ]
            },

            standalone: {
                files: [
                    {
                        expand: true,flatten: true,filter: 'isFile',
                        src: ['target/sa/*'],
                        dest: 'build/<%= pkg.version %>/tools/'
                    }
                ]
            },

            deploy: {
                files: [
                    {
                        expand: true,flatten: true,filter: 'isFile',
                        opt: {from:'<%= pkg.name %>',to:'<%= pkg.name %>-latest'},
                        dest: 'public/', src: ['build/<%= pkg.version %>/<%= pkg.name %>-<%= pkg.version %>.min.js'],
                        rename: function(dest, src) {return dest + src.replace(/[0-9]/g,'').replace(/-\.\./,'').replace(this.opt.from,this.opt.to);}
                    },
                    {
                        expand: true,flatten: true,filter: 'isFile',
                        src: ['build/<%= pkg.version %>/<%= pkg.name %>-<%= pkg.version %>.min.js'],
                        dest: 'public/<%= pkg.version %>/'
                    },
                    {
                        expand: true,flatten: true,filter: 'isFile',
                        src: ['build/<%= pkg.version %>/tools/Rubik*-<%= pkg.version %>.min.js'],
                        dest: 'public/<%= pkg.version %>/tools/'
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

    // External tasks
    grunt.loadTasks('tasks');

    // Full tasks
    grunt.registerTask('build', ['clean:target', 'create_package', 'concat:packages', 'concat:main', 'uglify:main', 'copy:main', 'clean:target']);
    grunt.registerTask('deploy', ['clean:deploy', 'build', 'tools', 'copy:deploy']);

    // Default task
    grunt.registerTask('default', ['build']);

};
