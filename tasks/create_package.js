
module.exports = function(grunt) {

    function filesList(path,base){
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
                path!=base && ret.rows.push('pkg["'+packageName+'"]["'+className+'"]='+className+';');
            }
            else if(s.isDirectory()){
                var fl = filesList(path+v+'/',base);
                ret.rows.push('pkg["'+v+'"]={};');
                ret.rows = ret.rows.concat(fl.rows);
                ret.packages = ret.packages.concat(fl.packages);
            }
        });

        return ret;
    }

    // --- METHOD tasks --- //

    // Full GraphicEngine packages
    grunt.registerTask('create_package','',function(){
        var ln = grunt.util.linefeed,
            fl = filesList('src/'),
            rows = fl.rows.join(ln),
            packages = fl.packages.join(','),
            title = grunt.config.get('pkg').title,
            output = [];

        output.push('var '+title+'Package = (function('+packages+'){');
        output.push('var pkg={};');
        output.push(rows);
        output.push('return pkg;');
        output.push('}('+packages+'));');

        grunt.file.write('target/'+title+'Package.js', output.join(ln));
        grunt.log.write('Created '+title+'Package.js file'+grunt.util.linefeed);
    });

};
