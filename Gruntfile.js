
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

            header: '/*! <%= pkg.title %> - v<%= pkg.version %> - ' + '<%= grunt.template.today("yyyy-mm-dd") %> */',
            footer: '',

            header_tool: '/*! <%= toolName %> - v<%= pkg.version %> - ' + '<%= grunt.template.today("yyyy-mm-dd") %> */',
            footer_tool: '',

            header_main: '<%= opt.header %><%= opt.nl %>'+
            'var <%= pkg.title %> = (function(){' + '<%= opt.nl %>'+
            'var pkgVersion = "v<%= pkg.version %>";' + '<%= opt.nl %>',
            footer_main: '<%= opt.nl %>'+
            'return RubikHelper;}());',

            header_sa: '<%= opt.header_tool %>' + '<%= opt.nl %>'+
            'var <%= toolName %> = (function(){' + '<%= opt.nl %>'+
            'var pkgVersion = "v<%= pkg.version %>";' + '<%= opt.nl %>',
            footer_sa: '<%= opt.nl %>'+
            'return <%= toolName %>;}());',

            path_graphicengine: 'dependencies/GraphicEngine/public/graphicengine-latest.min.js'
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
                    '<%= opt.path_graphicengine %>',
                    'target/temp/packages.js',
                    'target/RHPackage.js',
                    'src/RubikHelper.js'
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
                    '<%= opt.path_graphicengine %>',
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
                options: { banner: '<%= opt.header %><%= opt.nl %>' },
                files: {'target/<%= pkg.name %>-<%= pkg.version %>.min.js': ['target/<%= pkg.name %>-<%= pkg.version %>.js']}
            },

            tool: {
                options: { banner: '<%= opt.header_tool %><%= opt.nl %>' },
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
                        dest: 'build/<%= pkg.version %>/'
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
                        src: ['build/<%= pkg.version %>/Rubik*-<%= pkg.version %>.min.js'],
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
    grunt.registerTask('build', ['clean:target', 'create_package:rh', 'concat:packages', 'concat:main', 'uglify:main', 'copy:main', 'clean:target']);
    grunt.registerTask('deploy', ['clean:deploy', 'build', 'tools', 'copy:deploy']);

    // Default task
    grunt.registerTask('default', ['build']);

};
