var rCube,rUI;

$(document).ready(function(){
    rCube = new RubikHelper.cube.RubikCubeIso( 'isocube', {pieceSize:40} );
    rUI   = new RubikHelperUI.RHMainUI( 'isocube-ui', rCube );
});
