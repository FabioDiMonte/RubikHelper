/**
 * Created by fdimonte on 23/04/2015.
 */

var RubikCube = (function($, RubikUtils){

    /**
     * RubikCube Class
     *
     * @constructor
     */
    function RubikCube(ID,options) {

        this.$el = $('#'+ID);
        if(this.$el.length==0) throw new Error('rubik cube not drawn: given ID does not exists in dom');

        this._options = {
            pieceSize: 30,
            showAxis: false
        };

        this._currentCube = RubikUtils.service.cloneCube(RubikUtils.pieces.cube);

        $.extend(this._options,options);

    }

    /**
     * RubikCube prototype
     *
     * @type {{willRender: Function, didRender: Function, render: Function, getCube: Function, setCube: Function, execute: Function, getPiece: Function, setPiece: Function, updateColors: Function, axisRotation: Function, rotatedPieces: Function, orientedPiece: Function}}
     */
    RubikCube.prototype = {

        /******************************
         * OVERRIDABLE METHODS
         ******************************/

        willRender: function(){},
        didRender: function(){},
        render: function(pieces){
            this.willRender();
            //do something with pieces
            this.didRender();
        },

        /******************************
         * PUBLIC METHODS
         ******************************/

        getCube: function(){
            return getObjectFromCube.call(this);
        },
        setCube: function(c){
            setCubeFromObject.call(this,c);
        },
        execute: function(s,d){
            setCubeFromSequence.call(this,s,d);
        },

        // ** PIECE getters/setters ** //

        getPiece: function(p){
            return RubikUtils.service.getStickersFromPiece(p,this._currentCube,true);
        },
        setPiece: function(p,s){
            setPieceFromStickers.call(this,p,s);
        },
        
        // ** SERVICE METHODS ** //

        updateColors: function(colorsObject) {
            $.extend(RubikUtils.colors,colorsObject);
            this.render();
        },
        axisRotation: function(move){
            var face = move.charAt(0);
            var sign = move.charAt(1);
            var i=sign=='-'?-1:1;
            var rx=face=='L'||face=='M'?-1: face=='R'?+1: 0;
            var ry=face=='U'||face=='E'?-1: face=='D'?+1: 0;
            var rz=face=='F'||face=='S'?-1: face=='B'?+1: 0;

            rx=(face=='x'?+1:rx)*i;
            ry=(face=='y'?-1:ry)*i;
            rz=(face=='z'?-1:rz)*i;

            var axis = ((rx!=0)?'x': (ry!=0)?'y': (rz!=0)?'z': face);
            var dir = ((rx>0||ry>0||rz>0)?'+': (rx<0||ry<0||rz<0)?'-': sign);
            return axis+dir;
        },
        rotatedPieces: function(move){
            var ret = {};

            if(move){
                var face = move.charAt(0);
                var t,target,piece;
                var pieces=null;

                !pieces && RubikUtils.pieces.axis[face]!=null   && (pieces=RubikUtils.pieces.pieces);//TODO: possibly fix axis rotation array
                !pieces && RubikUtils.pieces.slices[face]!=null && (pieces=RubikUtils.pieces.slices[face]);
                !pieces && RubikUtils.pieces.faces[face]!=null  && (pieces=RubikUtils.pieces.faces[face]);

                for (t in pieces) {
                    if(pieces.hasOwnProperty(t)){
                        target = RubikUtils.service.targetOf(pieces[t]);
                        piece = this.orientedPiece(target,move);
                        ret[target] = RubikUtils.service.getStickersFromPiece(piece,this._currentCube,true);
                    }
                }
            }

            return ret;
        },
        orientedPiece: function(target,move){
            var axis = this.axisRotation(move);
            var faces = RubikUtils.pieces.axis[axis.charAt(0)];
            var dir = axis.charAt(1)=='-'?-1:+1;

            var stickers = target.split('');
            var l,idx,next,stk;
            var ret = [];

            for (l=0; l<stickers.length; l++) {

                stk = stickers[l];
                idx = faces.indexOf(stk);

                if(idx==-1) ret.push(stk);
                else {
                    next = idx+dir;
                    next = (next<0)?faces.length-1: (next>=faces.length)?0: next;
                    ret.push(faces[next]);
                }

            }

            return ret.join('');
        }

    };

    /******************************
     * PRIVATE METHODS
     ******************************/

    // ** CUBE getters/setters ** //
    function getObjectFromCube(){
        return RubikUtils.service.cloneCube(this._currentCube);
    }
    function setCubeFromObject(cube){
        this._currentCube = RubikUtils.service.cloneCube(cube);
        this.render();
    }
    function setCubeFromSequence(sequence,duration){
        var C = getObjectFromCube.call(this);
        var move,m=0;
        var _this = this;

        function iteration(move){
            $.extend(C, _this.rotatedPieces(move));
            setCubeFromObject.call(_this,C);
        }
        function timeout(){
            if(sequence.length>0){
                setTimeout(function(){
                    iteration(sequence[m++]);
                    if(m<sequence.length) timeout();
                },duration);
            }
        }

        if(duration) timeout();
        else for(move=0;move<sequence.length;move++) iteration(sequence[move]);
    }

    function setPieceFromStickers(piece,stickers){
        this._currentCube[RubikUtils.service.targetOf(piece)] = RubikUtils.service.rotate(stickers, RubikUtils.service.getRotation(piece,true));
        this.render();
    }

    return RubikCube;

}(jQuery, RubikUtils));
