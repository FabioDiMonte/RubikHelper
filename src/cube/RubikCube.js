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

        this.options = {
            pieceSize: 30,
            showAxis: false
        };

        this.currentCube = RubikUtils.service.cloneCube(RubikUtils.pieces.cube);

        $.extend(this.options,options);

    }

    /**
     * RubikCube prototype
     *
     * @type {{willRender: Function, didRender: Function, render: Function, getCube: Function, setCube: Function, execute: Function, getObjectFromCube: Function, setCubeFromObject: Function, setCubeFromSequence: Function, getPiece: Function, setPiece: Function, setPieceFromStickers: Function, updateColors: Function, axisRotation: Function, rotatedPieces: Function, orientedPiece: Function}}
     */
    RubikCube.prototype = {

        /******************************
         * OVERRIDABLE METHODS
         ******************************/

        willRender: function(){},
        didRender: function(){},
        render: function(piecesToRender){
            this.willRender();
            //do something with piecesToRender
            this.didRender();
        },

        /******************************
         * PUBLIC METHODS
         ******************************/

        getCube: function(){
            return this.getObjectFromCube();
        },
        setCube: function(c){
            this.setCubeFromObject(c);
        },
        execute: function(s,d){
            this.setCubeFromSequence(s,d);
        },

        // ** CUBE getters/setters ** //
        getObjectFromCube: function(){
            return RubikUtils.service.cloneCube(this.currentCube);
        },
        setCubeFromObject: function(cube){
            this.currentCube = RubikUtils.service.cloneCube(cube);
            this.render();
        },
        setCubeFromSequence: function(sequence,duration){
            var C = this.getObjectFromCube();
            var move,m=0;
            var _this = this;

            function iteration(move){
                $.extend(C, _this.rotatedPieces(move));
                _this.setCubeFromObject(C);
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
        },

        // ** PIECE getters/setters ** //

        getPiece: function(p){
            return RubikUtils.service.getStickersFromPiece(p,this.currentCube,true);
        },
        setPiece: function(p,s){
            this.setPieceFromStickers(p,s);
        },

        setPieceFromStickers: function(piece,stickers){
            this.currentCube[RubikUtils.service.targetOf(piece)] = RubikUtils.service.rotate(stickers, RubikUtils.service.getRotation(piece,true));
            this.render();
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
                        ret[target] = RubikUtils.service.getStickersFromPiece(piece,this.currentCube,true);
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


    return RubikCube;

}(jQuery, RubikUtils));
