
module.exports = function(grunt) {

    grunt.registerTask('standalone','',function(tool,skipCopy){
        if(['utils','solver','teacher','cube','cubeIso'].indexOf(tool)==-1) grunt.log.error('wrong tool');
        else
        {
            grunt.config.set('toolName','Rubik'+(tool[0].toUpperCase()+tool.substr(1)));
            grunt.task.run(
                'concat:sa_'+tool,
                'uglify:tool'
            );
            if(!skipCopy) grunt.task.run('copy:standalone');
        }
    });

    grunt.registerTask('tools', [
        'clean:target',
        'standalone:utils:true',
        'standalone:solver:true',
        'standalone:teacher:true',
        'standalone:cube:true',
        'standalone:cubeIso:true',
        'copy:standalone',
        'clean:target'
    ]);

};
