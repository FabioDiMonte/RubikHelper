/**
 * Created by fdimonte on 23/04/2015.
 */

var RubikCubeIso = (function(RubikUtils, RubikCube, GraphicEngine){

    var Engine = GraphicEngine.core.Engine,
        Point  = GraphicEngine.core.Point,
        Sprite = GraphicEngine.display.Sprite,
        Shape  = GraphicEngine.display.Shape,
        Text   = GraphicEngine.display.Text;

    /**
     * RubikCubeISO Class
     *
     * @constructor
     */
    function RubikCubeISO(ID,options) {
        RubikCube.call(this,ID,options);

        this._renderOptions = {
            order: ['DBL','DB','DRB','DL','D','DR','DLF','DF','DFR','BL','B','BR','L','R','FL','F','FR','ULB','UB','UBR','UL','U','UR','UFL','UF','URF'],
            backfaces: false,
            highlights: []
        };

        this.iso = {
            container: this.$el,
            engine: new Engine()
        };

        this.iso.engine.init(this.iso.container,{
            worldSizeWidth: 400,
            worldSizeHeight: 300
        });
        this.iso.layer = this.iso.engine.addLayer('cube',true);
        this.iso.console = this.iso.engine.addLayer('console');

        var info = this.iso.console.addChild(new Text('cubeletInfo'));
        info._position = new Point(-200,120);
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
        this.iso.layer._render();
        this._options.showAxis && this.iso.engine.drawUtils.axis(this.iso.layer,200);
    };
    RubikCubeISO.prototype.render = function(piecesToRender){
        var stickers;

        this.willRender();
        this._renderOptions.order.forEach(function(piece){
            if(this._renderOptions.highlights.length==0){
                stickers = this._currentCube[piece];
                (!piecesToRender || piecesToRender.indexOf(piece)>-1) && drawPiece.call(this,piece,stickers,false,this._renderOptions.backfaces);
            }else{
                stickers = this._renderOptions.highlights.indexOf(piece)>-1 ? 'light' : 'grey';
                drawPiece.call(this,piece,stickers,true,this._renderOptions.backfaces);
            }
        }.bind(this));
        this.didRender();

        return true;
    };

    /* *******************************
     * IMPLEMENT CUSTOM METHODS
     * *******************************/

    RubikCubeISO.prototype.getImage       = function() { return this.iso.layer.getCanvas().toDataURL(); };
    RubikCubeISO.prototype.backfaceState  = function() { return this._renderOptions.backfaces; };
    RubikCubeISO.prototype.backfaceToggle = function(f){ toggleRenderBackFaces.call(this,f); };
    RubikCubeISO.prototype.highlight      = function(p){ highlightPieces.call(this,p); };

    /* *******************************
     * PRIVATE METHODS
     * *******************************/

    // ** RENDERING METHODS ** //

    function toggleRenderBackFaces(forceVal) {
        this._renderOptions.backfaces = forceVal!=null?forceVal:!this._renderOptions.backfaces;
        this.render();
    }
    function highlightPieces(pieces) {
        var targets=[];
        if(pieces){
            pieces.forEach(function(piece){
                targets.push(RubikUtils.service.targetOf(piece));
            }.bind(this));
        }
        this._renderOptions.highlights = targets;
        this.render();
    }
    
    // ** DRAWING METHODS ** //
    
    function drawPiece(position,stickers,fullColor,drawBack) {
        stickers || (stickers=position);

        var size = this._options.pieceSize;
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
            addCube.call(this,position, origin.add(new Point(size*px,size*py,size*pz)), size, isFull);

        drawCube.call(this,position, stickers, size, {fills:fills,stroke:RubikUtils.colors.core}, isFull);
    }
    function addCube(name, origin, size, full_cube) {

        var cube = new Sprite('_piece_'+name);
        cube.set('position',name);

        if(full_cube){
            cube.addChild(new Shape('_face_D')).set('position','D')._position = origin.add(new Point(0, 0, 0));
            cube.addChild(new Shape('_face_B')).set('position','B')._position = origin.add(new Point(0, 0, 0));
            cube.addChild(new Shape('_face_L')).set('position','L')._position = origin.add(new Point(0, 0, 0));
        }
        cube.addChild(new Shape('_face_U')).set('position','U')._position = origin.add(new Point(0, 0, size));
        cube.addChild(new Shape('_face_R')).set('position','R')._position = origin.add(new Point(size, 0, 0));
        cube.addChild(new Shape('_face_F')).set('position','F')._position = origin.add(new Point(0, size, 0));

        this.iso.layer.addChild(cube);

    }
    function drawCube(name, pieceName, size, colors, full_cube) {

        var cube = this.iso.layer._children['_piece_'+name];
        if(!cube) return;

        cube.set('sticker',pieceName);

        var names = colors.fills.map( function(o){ return o && o.name; } );
        var style = {
            fills: colors.fills.map( function(o){ return o && o.color; } ),
            color: colors.stroke
        };

        if(full_cube && style.fills && style.fills.length==6) {
            setShape.call( this, cube._children['_face_D'], arrayLastValue(names, 3), 'get3DPolygonSquare'     , size, !style.fills ? null : arrayLastValue(style.fills, 3), style.color );
            setShape.call( this, cube._children['_face_B'], arrayLastValue(names, 4), 'get3DPolygonSquareLeft' , size, !style.fills ? null : arrayLastValue(style.fills, 4), style.color );
            setShape.call( this, cube._children['_face_L'], arrayLastValue(names, 5), 'get3DPolygonSquareRight', size, !style.fills ? null : arrayLastValue(style.fills, 5), style.color );
        }
        setShape.call( this, cube._children['_face_U'], arrayLastValue(names, 0), 'get3DPolygonSquare'     , size, !style.fills ? null : arrayLastValue(style.fills, 0), style.color );
        setShape.call( this, cube._children['_face_R'], arrayLastValue(names, 1), 'get3DPolygonSquareRight', size, !style.fills ? null : arrayLastValue(style.fills, 1), style.color );
        setShape.call( this, cube._children['_face_F'], arrayLastValue(names, 2), 'get3DPolygonSquareLeft' , size, !style.fills ? null : arrayLastValue(style.fills, 2), style.color );

    }
    function setShape(child, value, squareType, size, fill, stroke) {

        if(!fill)
            child.setRenderInfo( null );
        else
            child.setRenderInfo( this.iso.engine.drawUtils[squareType](size), {strokeColor:fill==null?null:stroke, fillColor:fill, strokeSize:1} );

        child.set('sticker',value);

    }

    function arrayLastValue(array,index) {
        return array.length>index ? array[index] : array[array.length-1];
    }

    return RubikCubeISO;

}(RubikUtils, RubikCube, GraphicEngine));
