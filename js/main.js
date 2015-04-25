var rCube,rUI;

$(document).ready(function(){
    var tag = 'release_0.1.0';
    var ver = 'latest';
    loadHelper(tag,ver,true);

    function loadHelper(tag,ver,min,local){
        var path = local&&!min?ver+'/':'';
        var file = path+'rubikhelper-'+ver+(min?'.min':'')+'.js';
        var hosts = {
            local  : '../RubikHelper/public/'+file,
            remote : 'https://raw.githubusercontent.com/FabioDiMonte/RubikHelper/'+tag+'/public/'+file
        };
        var script = $('<script/>')
            .attr('type','text/javascript')
            .on('load',function(){
                rCube = new RubikHelper.cube.RubikCubeIso( 'isocube', {pieceSize:40} );
                rUI   = new RubikHelper.ui.RHMainUI( 'isocube-ui', rCube );
            });
        $('head').eq(0).append(script);
        script.attr('src',local?hosts.local:hosts.remote);
    }
});
