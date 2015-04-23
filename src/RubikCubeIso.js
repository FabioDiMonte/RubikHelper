/**
 * Created by fdimonte on 23/04/2015.
 */

var RubikCubeIso = (function(RubikUtils, RubikCube, GraphicEngine){

    var ge = new GraphicEngine(),
        Point  = ge.packages.core.Point,
        Sprite = ge.packages.display.Sprite,
        Shape  = ge.packages.display.Shape,
        Text   = ge.packages.display.Text;

    /**
     * RubikCubeISO Class
     *
     * @constructor
     */
    function RubikCubeISO(ID,options) {
        RubikCube.call(this,ID,options);

        this.renderOrder = ['DBL','DB','DRB','DL','D','DR','DLF','DF','DFR','BL','B','BR','L','R','FL','F','FR','ULB','UB','UBR','UL','U','UR','UFL','UF','URF'];
        this.renderOptions = {
            backfaces: false,
            highlights: []
        };

        this.iso = {
            container: this.$el,
            engine: ge
        };

        this.iso.engine.init(this.iso.container,{
            worldSizeWidth: 400,
            worldSizeHeight: 300
        });
        this.iso.layer = this.iso.engine.addLayer('cube');
        this.iso.console = this.iso.engine.addLayer('console');

        var info = this.iso.console.addChild(new Text('cubeletInfo'));
        info.position = new Point(-200,120);
        info.setFont('Open Sans',20);

        this.render();

    }

    /**
     * RubikCubeISO prototype
     *
     * @type {RubikCube}
     */
    RubikCubeISO.prototype = Object.create(RubikCube.prototype);

    /* *******************************
     * OVERRIDE SUPER CLASS METHODS
     * *******************************/

    RubikCubeISO.prototype.willRender = function(){};
    RubikCubeISO.prototype.didRender = function(){
        this.iso.layer.render();
        this.options.showAxis && this.iso.engine.draw.axis(this.iso.layer,200);
    };
    RubikCubeISO.prototype.render = function(piecesToRender){
        var stickers;

        this.willRender();
        this.renderOrder.forEach(function(piece){
            if(this.renderOptions.highlights.length==0){
                stickers = this.currentCube[piece];
                (!piecesToRender || piecesToRender.indexOf(piece)>-1) && this.drawPiece(piece,stickers,false,this.renderOptions.backfaces);
            }else{
                stickers = this.renderOptions.highlights.indexOf(piece)>-1 ? 'light' : 'grey';
                this.drawPiece(piece,stickers,true,this.renderOptions.backfaces);
            }
        }.bind(this));
        this.didRender();

        return true;
    };

    /* *******************************
     * IMPLEMENT CUSTOM METHODS
     * *******************************/

    RubikCubeISO.prototype.getImage       = function() { return this.iso.layer.getCanvas().toDataURL(); };
    RubikCubeISO.prototype.backfaceState  = function() { return this.renderOptions.backfaces; };
    RubikCubeISO.prototype.backfaceToggle = function(f){ this.toggleRenderBackFaces(f); };
    RubikCubeISO.prototype.highlight      = function(p){ this.highlightPieces(p); };

    // ** RENDERING METHODS ** //

    RubikCubeISO.prototype.highlightPieces = function(pieces){
        var targets=[];
        if(pieces){
            pieces.forEach(function(piece){
                targets.push(RubikUtils.service.targetOf(piece));
            }.bind(this));
        }
        this.renderOptions.highlights = targets;
        this.render();
    };
    RubikCubeISO.prototype.toggleRenderBackFaces = function(forceVal){
        this.renderOptions.backfaces = forceVal!=null?forceVal:!this.renderOptions.backfaces;
        this.render();
    };

    // ** DRAWING METHODS ** //

    RubikCubeISO.prototype.drawPiece = function(position,stickers,fullColor,drawBack){
        stickers || (stickers=position);

        var size = this.options.pieceSize;
        var origin = new Point(-size/2,-size/2,-size/2);

        var fills = [],
            indexes = [ //note: this is the same order as in drawCube method
                position.indexOf('U'),
                position.indexOf('R'),
                position.indexOf('F'),
                position.indexOf('D'),
                position.indexOf('B'),
                position.indexOf('L')
            ];

        var face_name,face_obj;
        for(var i=0; i<indexes.length; i++){
            face_name = indexes[i] == -1 ? null : stickers.charAt(indexes[i]);

            if(!drawBack || i>=3){
                face_obj = {
                    name  : face_name,
                    color : !face_name ? null : fullColor ? RubikUtils.colors[stickers] : RubikUtils.colors[face_name]
                };
            }

            fills.push(face_obj);
        }

        var pz = position.indexOf('D')!=-1 ? -1 : position.indexOf('U')!=-1 ?  1 : 0,
            py = position.indexOf('F')!=-1 ?  1 : position.indexOf('B')!=-1 ? -1 : 0,
            px = position.indexOf('L')!=-1 ? -1 : position.indexOf('R')!=-1 ?  1 : 0;

        var isFull = true;

        if(!this.iso.layer._children['_piece_'+position])
            this.addCube(position, origin.add([size*px,size*py,size*pz]), size, isFull);

        this.drawCube(position, stickers, size, {fills:fills,stroke:RubikUtils.colors.core}, isFull);
    };
    RubikCubeISO.prototype.addCube = function(name, origin, size, full_cube) {

        var cube = new Sprite('_piece_'+name);
        cube.set('position',name);

        if(full_cube){
            cube.addChild(new Shape('_face_D')).set('position','D').position = origin.add([0, 0, 0]);
            cube.addChild(new Shape('_face_B')).set('position','B').position = origin.add([0, 0, 0]);
            cube.addChild(new Shape('_face_L')).set('position','L').position = origin.add([0, 0, 0]);
        }
        cube.addChild(new Shape('_face_U')).set('position','U').position = origin.add([0, 0, size]);
        cube.addChild(new Shape('_face_R')).set('position','R').position = origin.add([size, 0, 0]);
        cube.addChild(new Shape('_face_F')).set('position','F').position = origin.add([0, size, 0]);

        this.iso.layer.addChild(cube);

    };
    RubikCubeISO.prototype.drawCube = function(name, pieceName, size, colors, full_cube) {

        var cube = this.iso.layer._children['_piece_'+name];
        if(!cube) return;

        cube.set('sticker',pieceName);

        var names = colors.fills.map( function(o){ return o && o.name; } );
        var style = {
            fills: colors.fills.map( function(o){ return o && o.color; } ),
            color: colors.stroke
        };

        if(full_cube && style.fills && style.fills.length==6) {
            this.setShape( cube._children['_face_D'], arrayLastValue(names, 3), 'get3DPolygonSquare'     , size, !style.fills ? null : arrayLastValue(style.fills, 3), style.color );
            this.setShape( cube._children['_face_B'], arrayLastValue(names, 4), 'get3DPolygonSquareLeft' , size, !style.fills ? null : arrayLastValue(style.fills, 4), style.color );
            this.setShape( cube._children['_face_L'], arrayLastValue(names, 5), 'get3DPolygonSquareRight', size, !style.fills ? null : arrayLastValue(style.fills, 5), style.color );
        }
        this.setShape( cube._children['_face_U'], arrayLastValue(names, 0), 'get3DPolygonSquare'     , size, !style.fills ? null : arrayLastValue(style.fills, 0), style.color );
        this.setShape( cube._children['_face_R'], arrayLastValue(names, 1), 'get3DPolygonSquareRight', size, !style.fills ? null : arrayLastValue(style.fills, 1), style.color );
        this.setShape( cube._children['_face_F'], arrayLastValue(names, 2), 'get3DPolygonSquareLeft' , size, !style.fills ? null : arrayLastValue(style.fills, 2), style.color );

    };
    RubikCubeISO.prototype.setShape = function(child, value, squareType, size, fill, stroke) {

        if(!fill)
            child.setRenderInfo( null );
        else
            child.setRenderInfo( this.iso.engine.draw[squareType](size), {strokeColor:fill==null?null:stroke, fillColor:fill, strokeSize:1} );

        child.set('sticker',value);

    };

    /* *******************************
     * PRIVATE METHODS
     * *******************************/

    function arrayLastValue(array,index) {
        return array.length>index ? array[index] : array[array.length-1];
    }

    return RubikCubeISO;

}(RubikUtils, RubikCube, GraphicEngine));
