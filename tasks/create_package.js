
module.exports = function(grunt) {

    function filesList(path,base,name){
        base || (base=path);

        var className,packageName,
            fs = require('fs'),
            files = fs.readdirSync(path),
            ret = {
                packages: [],
                rows: []
            };

        files.forEach(function(v){
            var s = fs.statSync(path+v);
            if(s.isFile()){
                className = v.replace('.js','');
                packageName = path.replace(base,'').replace('/','');
                path!=base && ret.packages.push(className);
                path!=base && ret.rows.push(name+'["'+packageName+'"]["'+className+'"]='+className+';');
            }
            else if(s.isDirectory()){
                var fl = filesList(path+v+'/',base,name);
                ret.rows.push(name+'["'+v+'"]={};');
                ret.rows = ret.rows.concat(fl.rows);
                ret.packages = ret.packages.concat(fl.packages);
            }
        });

        return ret;
    }

    // --- METHOD tasks --- //

    // Full GraphicEngine packages
    grunt.registerTask('create_package','',function(name){
        if(!name) grunt.log.error('no name passed');

        var nameFull = name.toUpperCase()+'Package',
            nameShort = name.toLowerCase()+'p';

        var ln = grunt.util.linefeed,
            fl = filesList('src/',null,nameShort),
            rows = fl.rows.join(ln),
            packages = fl.packages.join(','),
            output = [];

        output.push('var '+nameFull+' = (function('+packages+'){');
        output.push('var '+nameShort+'={};');
        output.push(rows);
        output.push('return '+nameShort+';');
        output.push('}('+packages+'));');

        grunt.file.write('target/'+nameFull+'.js', output.join(ln));

        grunt.log.write('Created '+nameFull+'.js file'+grunt.util.linefeed);
    });

};
