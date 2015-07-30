/**
 * Created by fdimonte on 23/04/2015.
 */

var RubikUtils = (function(){

    return {

        /**
         * All colors used by RubikCube and UI
         */
        colors: {
            U : '#ffff00',
            D : '#ffffff',
            F : '#ff0000',
            B : '#ffaa00',
            L : '#0000ff',
            R : '#008800',

            light : '#ffff00',
            grey  : '#cccccc',
            core  : '#222222'
        },

        /**
         * All patterns from M2/R2
         */
        patterns: {

            /* ################### ORIENTATION PATTERNS ################### */

            /* -- orient edges -- */
            p_O4U: " (M'U)4   (MU)4 ",
            p_O4D: " (M'D)4   (MD)4 ",// x2 [O4U] x2
            p_O4F: " (M'F)4   (MF)4 ",// x  [O4U] x'
            p_O4B: " (M'B)4   (MB)4 ",// x' [O4U] x
            p_O2U: " (M'U)3 U (MU)3 U ",
            p_O2D: " (M'D)3 D (MD)3 D ",// x2 [O2U] x2
            p_O2F: " (M'F)3 F (MF)3 F ",// x  [O2U] x'
            p_O2B: " (M'B)3 B (MB)3 B ",// x' [O2U] x
            p_O6L: " (R'FRU)5 ",
            p_O6R: " ([O6L])m ",

            /* -- orient corners -- */
            p_CW2: " (U'RU) R' (U'RU) ",
            p_CC2: " ([CW2])i ",
            p_CW3: " ((UR)'UR)2 ",
            p_CC3: " ([CW3])i ",

            /* -- parity -- */
            p_PTJ: " (L'U2) LU (L'U2) (RU') L (RU')i ",
            p_PTN: " ((L'UR') U2 (L'UR')')2 U ",
            p_PAR: " (U'F2) [PTJ] (U'F2)i ",
            p_PRN: " (F2y) [PTN] (F2y)i",

            /* ################### EDGES PERMUTATIONS ################### */

            /* -- median oriented -- */
            s_UB: " ",
            s_UF: " (U2 M')2 ",
            s_DB: " ([UF])i ",
            /* -- right oriented -- */
            s_UR: " R'U RU' ",
            s_DR: " U R RU' ",
            s_FR: "  URU' ",
            s_BR: " ([FR])i ",
            /* -- left oriented -- */
            s_UL: " ([UR])m ",
            s_DL: " ([DR])m ",
            s_FL: " ([FR])m ",
            s_BL: " ([BR])m ",

            /* -- median not oriented -- */
            s_BU: " [UB] ",
            s_FU: " [UF] ",
            s_BD: " [DB] ",
            /* -- right not oriented -- */
            s_RU: " x' ([BR])' ",
            s_RD: " x' ([FR])' ",
            s_RF: " x' ([DR])' ",
            s_RB: " x' ([UR])' ",
            /* -- left not oriented -- */
            s_LU: " x' (([BR])')m ",
            s_LD: " x' (([FR])')m ",
            s_LF: " x' (([DR])')m ",
            s_LB: " x' (([UR])')m ",

            /* ################### CORNERS PERMUTATIONS ################### */

            /* -- right oriented -- */
            s_UBR: " ",
            s_URF: " U' (R F' RM' U R2 U') (MR' F R U R2') ",//" U' R F' L x U R2 U' x' L' F R U R2 ",
            s_DRB: " ([URF])i ",
            /* -- left oriented -- */
            s_ULB: " (LU)' (LU)",
            s_UFL: " L U'L' U [ULB] ",// L [LBU] [ULB]
            s_DLF: " U' L2 U ",
            s_DBL: " [DLF] [ULB] ",

            /* -- UBR not oriented -- */
            s_BRU: " (U'L'U) L (U'L'U) ",// [LBU] L [LBU]
            s_RUB: " ([BRU])i ",
            /* -- URF not oriented -- */
            s_RFU: " (F'R) (UR2U') R' (FR) (UR2U') R ",
            s_FUR: " R2 U' RM'x L2M2 (ULU') R' (UL'U') L'R'U ",
            /* -- DRB not oriented -- */
            s_RBD: " R'UR2U'R'F'RUR2U'R'F ",
            s_BDR: " RUR' DL2 x2 U'RU L2x2 U'D'R ",
            /* -- ULB not oriented -- */
            s_LBU: " (U'L'U) ",
            s_BUL: " y RUR2U'R' y' ",
            /* -- UFL not oriented -- */
            s_FLU: " R' (ULU') ",
            s_LUF: " L' (U'L'U) ",// L' [LBU]
            /* -- DLF not oriented -- */
            s_LFD: " L2 (U'L'U) ",// L2 [LBU]
            s_FDL: " (U'L'U) L' (U'LU)",// [LBU] L' ([LBU])'
            /* -- DBL not oriented -- */
            s_BLD: " (U'LU) ",// ([LBU])i
            s_LDB: " L (U'L'U) "// L [LBU]

        },

        /**
         * Utility object that stores useful infos about pieces
         */
        pieces: {

            M2 : ['M2'],
            R2 : ['R2'],

            opposites: {
                buffers: {
                    edges: ['DF','FD','UB','BU'],
                    corners: ['DFR','RDF','FRD', 'UBR','RUB','BRU']
                },
                normals: {
                    edges: ['UF','FU','DB','BD'],
                    corners: ['URF','FUR','RFU', 'DRB','BDR','RBD']
                }
            },

            buffers: {
                edge: 'DF',
                corner: 'DFR'
            },

            cube: {
                U:'U',D:'D',F:'F',B:'B',L:'L',R:'R',
                DF:'DF',DR:'DR',DB:'DB',DL:'DL',UF:'UF',UR:'UR',UB:'UB',UL:'UL',FR:'FR',BR:'BR',FL:'FL',BL:'BL',
                DFR:'DFR',DRB:'DRB',DBL:'DBL',DLF:'DLF',URF:'URF',UBR:'UBR',ULB:'ULB',UFL:'UFL'
            },

            pieces: [
                'U','D','F','B','L','R',
                'DF','DR','DB','DL','UF','UR','UB','UL','FR','BR','FL','BL',
                'DFR','DRB','DBL','DLF','URF','UBR','ULB','UFL'
            ],

            faces: {
                U: ['ULB','UB','UBR','UL','U','UR','UFL','UF','URF'],
                D: ['DLF','DF','DFR','DL','D','DR','DBL','DB','DRB'],
                F: ['FLU','FU','FUR','FL','F','FR','FDL','FD','FRD'],
                B: ['BRU','BU','BUL','BR','B','BL','BDR','BD','BLD'],
                L: ['LBU','LU','LUF','LB','L','LF','LDB','LD','LFD'],
                R: ['RFU','RU','RUB','RF','R','RB','RDF','RD','RBD']
            },

            slices: {
                M: ['F','U','B','D','UF','UB','DB','DF'],
                E: ['F','R','B','L','FL','FR','BL','BR'],
                S: ['U','R','D','L','UL','UR','DR','DL']
            },

            axis: {
                x: ['U','F','D','B'],// L || R'
                y: ['F','L','B','R'],// U || D'
                z: ['U','R','D','L'] // F || B'
            },

            noUnsetup: ['UF','DB','FU','BD','DRB','RBD','BDR','URF','RFU','FUR']

        },

        /**
         * Group of methods which return BOOLEAN values to check the type of the given 'move'
         */
        is: {

            /**
             * Returns TRUE if the given string is actually a cube's face
             *
             * @param m {String}  the face to search for
             * @returns {Boolean} true if ['u'|'d'|'f'|'b'|'l'|'r'] (lower or upper case)
             */
            face     : function(m) { return (/^[udfblr]$/i).test(m); },

            /**
             * Returns TRUE if the given string is actually a cube's slice
             *
             * @param m {String}  the slice to search for
             * @returns {Boolean} true if ['m'|'e'|'s'] (lower or upper case)
             */
            slice    : function(m) { return (/^[mes]$/i).test(m); },

            /**
             * Returns TRUE if the given string is actually a cube rotation
             *
             * @param m {String}  the axis to search for
             * @returns {Boolean} true if ['x'|'y'|'z'] (lower or upper case)
             */
            axis     : function(m) { return (/^[xyz]$/i).test(m); },

            /**
             * Returns TRUE if the given string is a correct move (face, slice or axis)
             *
             * @param m {String}  the move to search for
             * @returns {Boolean} true if is a face, a slice or an axis
             */
            move     : function(m) { return (RubikUtils.is.face(m)||RubikUtils.is.slice(m)||RubikUtils.is.axis(m)); },

            /**
             * Returns TRUE if the given string is actually a modifier
             *
             * @param m {String}  the sign to search for
             * @returns {Boolean} true if the sign is a modifier
             */
            modifier : function(m) { return (/^[2i'\-\+]$/).test(m); },

            /**
             * Returns TRUE if the given string is actually a single rotation (face, slice or axis followed by a modifier)
             *
             * @param m {String}  the move to search for
             * @returns {Boolean} true if the move is a rotation
             */
            rotation : function(m) { return (/^[udfblrmesxyz][2i'\-\+]?$/i).test(m); },

            /**
             * Returns TRUE if the given string is actually a median piece
             *
             * @param m {String}  the piece to search for
             * @returns {Boolean} true if the piece is from median slice
             */
            median   : function(m) { return (/^([ud][fb]|[fb][ud])$/i).test(m); },

            /**
             * Returns TRUE if the given string is actually a stored pattern
             * (ie. orient edges, orient corners or parity patterns)
             *
             * @param m {String}  the pattern to search for
             * @returns {Boolean} true if the oriented piece is a property of RubikHelper.patterns
             */
            pattern  : function(m) { return (/^(o[24][udfb]|o6[lr]|c[cw][23]|pt[jn]|par|prn)$/i).test(m); },

            /**
             * Returns TRUE if the given string is actually a cube's piece (edge or corner)
             *
             * @param m {String}  the piece to search for
             * @returns {Boolean} true if the oriented piece is a property of CubeObject
             */
            piece    : function(m) { return (/^(?:([udfblr])(?!.*\1)){2,3}$/i).test(m); },
            //piece    : function(m) { return (RubikUtils.pieces.cube[RubikUtils.service.targetOf(piece.toUpperCase())]!=null); },

            /**
             * Returns TRUE if the given string is actually an edge piece
             *
             * @param m {String}  the piece to search for
             * @returns {Boolean} true if the piece is an edge
             */
            edge     : function(m) { return (m.length==2 && RubikUtils.is.piece(m)); },

            /**
             * Returns TRUE if the given string is actually a corner piece
             *
             * @param m {String}  the piece to search for
             * @returns {Boolean} true if the piece is a corner
             */
            corner   : function(m) { return (m.length==3 && RubikUtils.is.piece(m)); },

            /**
             * Returns TRUE if the given string is actually a buffer piece
             *
             * @param m {String}  the piece to search for
             * @returns {Boolean} true if the piece is a buffer (edge or corner)
             */
            buffer   : function(m) { return ((RubikUtils.is.edge(m) && RubikUtils.service.targetOf(m)==RubikUtils.pieces.buffers.edge) || (RubikUtils.is.corner(m) && RubikUtils.service.targetOf(m)==RubikUtils.pieces.buffers.corner)); }

        },

        /**
         * Group of methods which return a BOOLEAN values if the given 'move' can be processed as intended
         */
        canbe: {

            /**
             * Returns TRUE if move can be negative
             *
             * @param m {String}  the move to get the negative of
             * @returns {Boolean} true if the move can be negative
             */
            negative : function(m) { return (m.length==1 || m.charAt(1)=='+' || m.charAt(1)=='-'); },

            /**
             * Returns TRUE if move could be mirrored
             *
             * @param m {String}  the move to get the mirror of
             * @returns {Boolean} true if the move can be mirrored
             */
            mirror   : function(m) { return (RubikUtils.canbe.negative(m) || m.charAt(1)=='2'); },

            /**
             * Returns TRUE if move IS one of 'only' param or IS NOT one of 'but' param
             *
             * @param move {String}       the move to check the acceptance criteria
             * @param only {String|Array} the only move/moves to be accepted
             * @param but {String|Array}  the move/moves to be NOT accepted
             * @returns {Boolean}         true if the move is accepted
             */
            accepted : function(move, only, but) {
                var doMe = ((!only && !but) || (only=='' && but==''));
                if(only && typeof(only)=='string') doMe = (only.length==1 && only==move.charAt(0));
                if(only && only instanceof Array)  doMe = (only.indexOf(move)>-1);
                if(but && typeof(but)=='string')   doMe = !(but.length==1 && but==move.charAt(0));
                if(but && but instanceof Array)    doMe = (but.indexOf(move)==-1);
                return doMe;
            }

        },

        /**
         * Group of service methods used inside and outside the Rubik-family Classes
         */
        service: {

            /**
             * Returns the correct orientation of a piece
             * (eg. 'RFU'->'URF', 'URF'->'URF', 'RF'->'FR' )
             *
             * @param piece {String} the piece you are searching for
             * @returns {String}     the correct orientation of piece
             */
            targetOf: function(piece) {
                var u,d,f,b,i,
                    t=piece.toUpperCase();

                if(RubikUtils.pieces.cube[t]==null){

                    u=t.indexOf('U');
                    d=t.indexOf('D');
                    f=t.indexOf('F');
                    b=t.indexOf('B');

                    i = u>-1?u : d>-1?d : f>-1?f : b>-1?b : null;
                    if(i)t=t.substr(i)+t.substr(0,i);
                }

                return t;
            },

            /**
             * Count how many times the given `move` appears into `pattern`
             *
             * @param pattern {Array} the pattern to search into
             * @param move {String}   the move to search for
             * @returns {Number}      the count of move into pattern
             */
            moveCounter: function(pattern, move) {
                var c=0;
                for(var m in pattern) if(pattern.hasOwnProperty(m))
                    c+= Number(pattern[m]==move);

                return c;
            },

            /**
             * Returns an object representing the scrambled cube
             *
             * @param cube {Object} an object representing the scrambled cube (it can contain only unoriented/unpermuted pieces)
             * @returns {Object}    the full cube with unoriented/unpermuted pieces
             */
            cloneCube: function(cube) {
                var p,ret={};
                for(p in RubikUtils.pieces.cube) if(RubikUtils.pieces.cube.hasOwnProperty(p))
                    ret[p] = cube&&cube[p] ? cube[p] : RubikUtils.pieces.cube[p];

                return ret;
            },

            /**
             * Returns the position of the given stickers inside the scrambled cube
             *
             * @param stickers {String}  the stickers you are searching for
             * @param cube {Object}      the scrambled cube to search into
             * @returns {String|Boolean} the target position of stickers or FALSE if it's not a piece of cube
             */
            getPieceFromStickers: function(stickers, cube) {
                var p,rot;
                for(p in cube) {
                    if(cube.hasOwnProperty(p)){
                        if(cube[p]==stickers || cube[p]==RubikUtils.service.rotate(stickers,-1) || cube[p]==RubikUtils.service.rotate(stickers,1)) {
                            rot = RubikUtils.service.getRotation(cube[p]);
                            return RubikUtils.service.rotate(p,rot);
                        }
                    }
                }
                return false;
            },

            /**
             * Returns the current stickers of the given piece inside the scrambled cube
             * Note: it returns the ordered stickers depending on the requested 'piece', excepts for median edges
             * Note: if includeMedian==TRUE it will compute m-edges too
             *
             * eg. (with an unscrambled cube)
             *     getStickersFromPiece('FUR',cube,false); // 'FUR'
             *     getStickersFromPiece('FU',cube,false);  // 'UF'
             *     getStickersFromPiece('FU',cube,true);   // 'FU'
             *
             * @param piece {String}
             * @param cube {Object}
             * @param includeMedian {Boolean}
             * @returns {String}
             */
            getStickersFromPiece: function(piece, cube, includeMedian) {
                var target = RubikUtils.service.targetOf(piece);
                var stickers = cube[target];
                var ordered = [];
                var s,idx;

                if(piece==target || (!includeMedian && RubikUtils.is.median(piece))) return stickers;

                for(s=0;s<stickers.length;s++){
                    idx=target.indexOf(piece.charAt(s));
                    ordered.push(stickers.charAt(idx));
                }
                return ordered.join('');
            },

            /**
             * Returns the rotation of a corner, if it's an edge will return true if flipped
             * Note: with toTarget=false
             *       eg. FRD-> -1, RDF-> 1, DFR-> 0, FU-> true, ...
             *
             *       with toTarget=true
             *       eg. FRD-> 1, RDF-> -1, DFR-> 0, FU-> true, ...
             *
             * @param piece {String}     the piece to get its rotation
             * @param toTarget {Boolean} whether you want to know its current rotation (FALSE), or the one needed to get it correctly oriented (TRUE)
             * @returns {Number|Boolean} the actual rotation of requested piece (+1 or -1, 0 if it's oriented)
             */
            getRotation: function(piece, toTarget) {
                if(piece.length==2) return (piece!=RubikUtils.service.targetOf(piece));

                var rot = null,
                    target = RubikUtils.service.targetOf(piece);

                if(piece==target) rot=0;
                else {
                    if(RubikUtils.service.rotate(piece, 1)==target) rot=toTarget? 1:-1;
                    if(RubikUtils.service.rotate(piece,-1)==target) rot=toTarget?-1: 1;
                }
                return rot;
            },

            /**
             * Returns the given piece rotated clockwise or counter-clockwise (eg. FU->UF, DFR->FRD|RDF )
             *
             * @param piece {String} the piece to rotate
             * @param dir {Number}   the rotation to be applied on piece (1, -1, 0)
             * @returns {string}     the rotated piece
             */
            rotate: function(piece, dir) {
                var i = (dir!==0 && (piece.length===2 || dir===-1)) ? 1 : 2;
                return dir===0||dir===false ? piece : piece.substr(i)+piece.substr(0,i);
            },

            /**
             * Replace the given `move` with `rep` inside the `moves` array
             *
             * @param moves {Array} the list of moves to search into
             * @param move {String} the move to search for
             * @param rep {String}  the replacing move
             * @returns {Array}     the new sequence with replaced moves
             */
            replaceMove: function(moves, move, rep) {
                var m,ret=[];
                for(m=0;m<moves.length;m++){
                    if(moves[m].charAt(0)==move)
                        ret.push(rep+moves[m].substr(1));
                    else
                        ret.push(moves[m]);
                }
                return ret;
            },

            /**
             * Returns an array of faces which will be no longer accepted for creating a piece
             *
             * @param piece {String|Array} could be 'URF' or ['U','R','F']
             * @returns {Array}
             */
            notAcceptedWithPiece: function(piece) {
                var axis = RubikUtils.pieces.axis,
                    faces = RubikUtils.pieces.faces;

                var temp_axis,
                    disabled = [];

                if(piece.length>=1) {
                    if     (axis.x.indexOf(piece[0]) == -1) temp_axis = axis.x;
                    else if(axis.y.indexOf(piece[0]) == -1) temp_axis = axis.y;
                    else if(axis.z.indexOf(piece[0]) == -1) temp_axis = axis.z;

                    for(var f in faces) {
                        if(faces.hasOwnProperty(f) && temp_axis.indexOf(f) == -1) disabled.push(f);
                    }
                }
                if(piece.length>=2){
                    var dir =
                        (piece[0]=='U' || piece[0]=='F' || piece[0]=='L') ? +1 :
                            (piece[0]=='D' || piece[0]=='B' || piece[0]=='R') ? -1 : 0;

                    var idx = temp_axis.indexOf(piece[1]);
                    var opp = idx+2;
                    var nxt = idx+dir+(dir*2);

                    if(opp>=temp_axis.length) opp -= temp_axis.length;
                    if(nxt>=temp_axis.length) nxt -= temp_axis.length;
                    if(nxt<0)                 nxt  = temp_axis.length+nxt;

                    disabled.push(piece[1]);
                    disabled.push(temp_axis[opp]);
                    disabled.push(temp_axis[nxt]);
                }
                if(piece.length==3){
                    disabled.push(piece[2]);
                }

                return disabled;
            }

        },

        /**
         * Group of methods which have kind of mathematical purposes (in rubik world)
         */
        math: {

            /**
             * Returns a sequence of moves repeated N times
             *
             * @param moves {Array}  the moves to be repeated
             * @param times {Number} the amount of repeat
             * @returns {Array}      final sequence array of moves
             */
            multiply: function(moves, times) {
                var m,ret=[];
                for(m=0;m<times;m++) ret=ret.concat(moves);
                return ret;
            },

            /**
             * Returns the negative of move
             *
             * @param move {String} the single move to get its negative (eg. 'R' | 'F+' | 'U-' )
             * @returns {String}    the single move with negative sign (eg. 'R-' | 'F-' | 'U+' )
             */
            negative: function(move) {
                var p,d,ret=move;
                if (RubikUtils.canbe.negative(move)) {
                    p = move.charAt(0);
                    d = move.length==1 ? '+' : move.charAt(1);
                    d = RubikUtils.math.signInverse(d);
                    ret = p+d;
                }
                return ret;
            },

            /**
             * Returns the negative of move
             * Note: if move is a corner orientation pattern, it will return the opposite pattern
             *
             * @param move {String} the single move to get its negative (eg. 'R' | 'F+' | 'U-' | 'CC3' )
             * @returns {String}    the single move with negative sign (eg. 'R-' | 'F-' | 'U+' | 'CW3' )
             */
            inverse: function(move) {
                var ret=move;
                if(RubikUtils.canbe.negative(move)) ret = RubikUtils.math.negative(move);
                return ret;
            },

            /**
             * Returns the mirror of move based on mirrorSlice
             *
             * @param move {String}  the move to get the mirror of
             * @param slice {String} the slice used as mirror (default='M')
             * @returns {String}     the mirrored move
             */
            mirror: function(move, slice) {
                slice || (slice='M');
                var p,d,ret=move;
                if (RubikUtils.canbe.mirror(move)) {
                    p = move.charAt(0);
                    p = slice=='M' ? ((p=='L')?'R' :(p=='R')?'L' :p) : p;
                    p = slice=='E' ? ((p=='U')?'D' :(p=='D')?'U' :p) : p;
                    p = slice=='S' ? ((p=='F')?'B' :(p=='B')?'F' :p) : p;
                    d = move.length==1 ? '+' : move.charAt(1);
                    ret = RubikUtils.math.negative(p+d);
                }
                return ret;
            },

            /**
             * Returns a pattern with all negative signs
             *
             * @param moves {Array}       the pattern array to convert in negative
             * @param only {String|Array} a string or array containing the only face/faces that should be converted in negative moves
             * @param but {String|Array}  a string or array containing the face/faces that should NOT be converted in negative moves
             * @returns {Array}           the negative pattern
             */
            negativePattern: function(moves, only, but) {
                var m,ret=[];
                for(m=0; m<moves.length; m++) ret.push( RubikUtils.canbe.accepted(moves[m],only,but) ? RubikUtils.math.negative(moves[m]) : moves[m] );
                return ret;
            },

            /**
             * Returns an inverse pattern from the one passed as moves (it goes backward, and with negative signs)
             *
             * @param moves {Array}       the pattern array to be inverted
             * @param only {String|Array} a string or array containing the only face/faces that should be converted in negative moves
             * @param but {String|Array}  a string or array containing the face/faces that should NOT be converted in negative moves
             * @returns {Array}           the inverted pattern
             */
            inversePattern: function(moves, only, but) {
                var m,ret=[];
                for(m=0; m<moves.length; m++) ret.unshift( RubikUtils.canbe.accepted(moves[m],only,but) ? RubikUtils.math.inverse(moves[m]) : moves[m] );
                return ret;
            },

            /**
             * Returns the mirror pattern based on mirrorSlice
             *
             * @param moves {Array}  the array of moves to get the mirror of
             * @param slice {String} the slice used as mirror (default='M')
             * @returns {Array}      the mirrored moves
             */
            mirrorPattern: function(moves, slice) {
                var m,ret=[];
                for(m=0; m<moves.length; m++) ret.push( RubikUtils.math.mirror(moves[m],slice) );
                return ret;
            },

            /**
             * Performs a sign sum
             *
             * @param sign_a {String}
             * @param sign_b {String}
             * @returns {String}
             */
            signSum: function(sign_a, sign_b) {
                var ret;
                if(sign_a=='2') ret = (sign_b=='+') ? '-' : (sign_b=='-') ? '+' : null;
                if(sign_a=='-') ret = (sign_b=='2') ? '+' : (sign_b=='-') ? '2' : null;
                if(sign_a=='+') ret = (sign_b=='2') ? '-' : (sign_b=='+') ? '2' : null;
                return ret;
            },

            /**
             * Returns the inverse of the passed sign
             *
             * @param sign {String}
             * @returns {String}
             */
            signInverse: function(sign) {
                return ( sign=='+'?'-' :sign=='-'?'+' :sign );
            }

        },

        /**
         * Group of methods which expand the given piece or pattern to a full list of moves
         */
        expand: {

            /**
             * Returns the array of moves corresponding to the setup of the given piece.
             * Note: if full is true will return the expanded pattern ( Setup + M2R2 + Unsetup )
             *
             * @param piece {String} the piece to search for
             * @param full {Boolean} whether should return the full pattern or only the setup
             * @returns {Array}      the final array of single moves
             */
            piece: function(piece, full) {
                var is_piece = RubikUtils.patterns['s_'+piece]!=null;
                var is_pattern = RubikUtils.patterns['p_'+piece]!=null;
                var MR,seq = piece;

                if(is_piece || is_pattern){
                    seq = '['+piece+']';
                    if(is_piece && full && RubikUtils.pieces.noUnsetup.indexOf(piece)==-1){
                        MR = piece.length==2?'M2':piece.length==3?'R2':'';
                        seq = seq + MR + '('+seq+')i';
                    }
                }

                return RubikUtils.parse.moves(seq);
            },

            /**
             * Returns an array of moves combining the mix of given patterns
             * (eg. ['CC3','F-','DR'] -> [] )
             *
             * @param pattern {Array} an array of patterns|pieces|moves
             * @returns {Array}       the final array of single moves
             */
            pattern: function(pattern) {
                var p,single,face,sign;
                var moves=[],bigPattern=[];

                for (p=0; p<pattern.length; p++) {

                    single = pattern[p];
                    face = single.charAt(0);
                    sign = single.length==1?'+':single.charAt(1);

                    RubikUtils.is.rotation(single) && (moves=[single]);
                    RubikUtils.is.pattern(single)  && (moves=RubikUtils.expand.piece(single));
                    RubikUtils.is.piece(single)    && (moves=RubikUtils.expand.piece(single,true));

                    bigPattern = bigPattern.concat(moves);
                }

                return bigPattern;
            }

        },

        /**
         * Group of methods for parsing purposes
         */
        parse: {

            /**
             * Returns an array of simple moves from an user typed sequence of moves
             * examples
             * parseMoves('U2FitriX')                 -> 'U2,F-,R-,x+'
             * parseMoves('U2FitriX',true)            -> 'U+,U+,F-,R-,x+'
             * parseMoves('U2FitriX',false,true)      -> 'U2,F-,R-,M+,x+'
             * parseMoves('U2FitriX',true,true,true)  -> 'U+,U+,F-,r-,x+'
             *
             * you can also use parenthesis for grouping and square brackets for pieces
             * eg. [dr] d'b (lu)' u2 (r'bu)4 [ulb]
             * eg. ((RU[BR])m)i F [LB] (F'[LB])'
             *
             * note: use (...)m to mirror, (...)i to invert and (...)' to negative the whole parenthesis content
             *
             * @param sequence {String}       the user typed sequence of moves
             * @param uncollapse {Boolean}    whether double moves should be converted in a pair of positive single moves (F2 -> F+,F+)
             * @param caseSensitive {Boolean} whether the sequence should be converted to uppercase before the parsing process
             * @param keepCase {Boolean}      whether the returned string should contains lowercase face rotations (only if caseSensitive:true)
             * @returns {Array}               the array of simple face rotations
             */
            moves: function(sequence, uncollapse, caseSensitive, keepCase) {
                var final,seq = [];
                var arr = RubikUtils.clear.all(sequence).split('');
                var last,next,move,sign;
                var group,piece;
                var groups=[],groupId=-1;

                function addMoveToList (m) { (piece ? piece : groupId>=0 ? groups[groupId] : seq).push(m); }
                function addGroupToList(g) { groupId>-1 ? groups[groupId] = groups[groupId].concat(g) : seq = seq.concat(g); }

                function addMove(){

                    // grouping
                    if(last=='(') groups[++groupId]=[];
                    if(last==')'){
                        group = groups[groupId];
                        if(move==Number(move))
                            group = RubikUtils.math.multiply(group,Number(move));
                        else if(move=='-'||move=='\'')
                            group = RubikUtils.math.negativePattern(group);
                        else if(move.toLowerCase()=='m')
                            group = RubikUtils.math.mirrorPattern(group);
                        else if(move.toLowerCase()=='i')
                            group = RubikUtils.math.inversePattern(group);

                        groupId--;
                        addGroupToList(group);

                        // reset `move` and `last` values
                        (move.toLowerCase()=='m' || move.toLowerCase()=='i') && (move='') && (last='');
                    }

                    // piece
                    if(last=='[' && !piece) piece=[];
                    if(last==']' && piece){
                        piece=piece.join('').toUpperCase();
                        if(RubikUtils.is.piece(piece)||RubikUtils.is.pattern(piece)){
                            var prefix = RubikUtils.is.piece(piece)?'s_':RubikUtils.is.pattern(piece)?'p_':'';
                            var moves = RubikUtils.patterns[prefix+piece];
                            moves && addGroupToList(RubikUtils.parse.moves(moves));
                        }

                        piece=false;
                    }

                    // process last move
                    if(piece&&last!='['){
                        addMoveToList(last);
                    }
                    else if(last && (RubikUtils.is.move(last))) {
                        if(move=='2') { sign = uncollapse? '+': move;}
                        else if(move=='+' || move=='-')  { sign=move;}
                        else if(move=='i' || move=='\'') { sign='-'; }
                        else                             { sign='+'; }

                        next = (keepCase&&!piece ? last : RubikUtils.clear.adjustCase(last)) + sign;
                        uncollapse && (move=='2') && addMoveToList(next);
                        addMoveToList(next);

                        if(!piece && !keepCase && last==last.toLowerCase()){
                            next=false;
                            if     (last=='u') next='E'+sign;
                            else if(last=='d') next='E'+RubikUtils.math.signInverse(sign);
                            else if(last=='f') next='S'+sign;
                            else if(last=='b') next='S'+RubikUtils.math.signInverse(sign);
                            else if(last=='l') next='M'+sign;
                            else if(last=='r') next='M'+RubikUtils.math.signInverse(sign);
                            next && addMoveToList(next);
                        }
                    }
                    last = move;

                }

                for(var i=0;i<arr.length;i++){
                    move = arr[i];
                    caseSensitive || (move=RubikUtils.clear.adjustCase(move));
                    addMove();
                }
                addMove();

                final = uncollapse ? RubikUtils.clear.uncollapseSequence(seq) : RubikUtils.clear.collapseSequence(seq);
                return final;
            },

            /**
             * Returns an array of simple moves from an user typed sequence of pieces or patterns (comma separated)
             *
             * @param pieces {String}      the user typed sequence of pieces or patterns
             * @param uncollapse {Boolean} whether double moves should be converted in a pair of positive single moves (F2 -> F+,F+)
             * @returns {Array}            the array of simple face rotations
             */
            pieces: function(pieces, uncollapse) {
                var final,seq = [];
                var arr = RubikUtils.clear.pieces(pieces).split(',');
                var move;

                for(var i=0;i<arr.length;i++){
                    move = arr[i];
                    if(move.length==1) move+='+';

                    move = RubikUtils.is.piece(move)||RubikUtils.is.pattern(move) ? move.toUpperCase() :
                           RubikUtils.is.rotation(move) ? RubikUtils.clear.adjustCase(move.charAt(0))+move.charAt(1) :
                           null;

                    move && seq.push(move);
                }

                seq = RubikUtils.expand.pattern(RubikUtils.clear.patterns(seq));
                final = uncollapse ? RubikUtils.clear.uncollapseSequence(seq) : RubikUtils.clear.collapseSequence(seq);

                return final;
            },
            
            rex: function(sequence){
                var p, mod, pref, seq = [];
                var g = -1, group, groups = [];
                var res, ro, rx = /(\()|(?:(([udfblrmesxyz])(?:([-i'])|(2))?)|(\[((?:(?:[ud][fb]|[fb][ud])(?:[lr]?)|(?:[fb][lr]|[lr][fb])(?:[ud]?)|(?:[ud][lr]|[lr][ud])(?:[fb]?))|(?:o[24][udfb]|o6[lr]|c[cw][23]|pt[jn]|par|prn))]))|(\)([1-9min'])?)/ig;

                function pushMove(m)    { (g>-1 ? groups[g] : seq).push(m); }
                function concatMoves(m) { (g>-1 ? groups[g]=groups[g].concat(m) : seq=seq.concat(m)); }
                
                while((res = rx.exec(sequence)) !== null){
                    ro = {
                        rotation: {
                            match: res[2],
                            move: res[3] && RubikUtils.clear.adjustCase(res[3]),
                            sign: res[4],
                            double: res[5]
                        },
                        piece: {
                            match: res[6],
                            name: res[7] && res[7].toUpperCase()
                        },
                        group: {
                            match: res[1],
                            end: res[8],
                            mod: res[9]
                        }
                    };
                    
                    //startGroup
                    if(ro.group.match){
                        groups[++g] = [];
                    }else

                    //isRotation
                    if(ro.rotation.match){
                        p = ro.rotation.move + (ro.rotation.sign?'-':'+');
                        ro.rotation.double && pushMove(p);
                        pushMove(p);
                    }else

                    //isPiece
                    if(ro.piece.match){
                        pref = RubikUtils.is.piece(ro.piece.name) ? 's_' : RubikUtils.is.pattern(ro.piece.name) ? 'p_' : null;
                        pref && concatMoves(RubikUtils.parse.rex(RubikUtils.patterns[pref+ro.piece.name]));
                    }else

                    //endGroup
                    if(ro.group.end){
                        mod = ro.group.mod;
                        group = groups[g];
                        
                        if(mod)
                        if(mod==Number(mod))
                            group = RubikUtils.math.multiply(group,Number(mod));
                        else if(mod=='-'||mod=='\''||mod=='n')
                            group = RubikUtils.math.negativePattern(group);
                        else if(mod.toLowerCase()=='m')
                            group = RubikUtils.math.mirrorPattern(group);
                        else if(mod.toLowerCase()=='i')
                            group = RubikUtils.math.inversePattern(group);
                        
                        g--;
                        concatMoves(group);
                    }
                }
                
                return RubikUtils.clear.collapseSequence(seq);
            }

        },

        /**
         * Group of methods for clear the user typed sequence
         */
        clear: {

            /**
             * Returns a string with only accepted moves (faces, slices, axis, pieces, patterns)
             *
             * @param seq {String}
             * @returns {String}
             */
            all: function(seq) {
                return seq.replace(/[^udfblrmesxyz2-9i'\-\+\(\)\[\]ocwptjna]+/ig,'');
            },

            /**
             * Returns a comma separated string with only accepted moves and patterns (faces, slices, axis, pieces, orient, parity)
             * It accepts all from clear.sequence, plus
             *      patterns: o2u, o2d, o2f, o2b, o4u, o4d, o4f, o4b, o6l, o6r, cw2, cc2, cw3, cc3, ptj, ptn, par, prn
             *
             * @param seq {String}
             * @returns {String}
             */
            pieces: function(seq) {
                seq = seq.replace(/[i']+/ig,'-');
                seq = seq.replace(/[,;\.\n\r ]+/g,',');
                seq = seq.replace(/[^udfblrmesxyz2\-\+,ocwptjna346]+/ig,'');

                return seq;
            },

            /**
             * Returns a string with only accepted moves (faces, slices, axis)
             * It accepts
             *      simple faces:   u,d,f,b,l,r
             *      slices, axis:   m,e,s,x,y,z
             *      move modifiers: i,',-,+,2
             *
             * @param seq {String}
             * @returns {String}
             */
            sequence: function(seq) {
                seq = seq.replace(/[i']+/ig,'-');
                seq = seq.replace(/[^udfblrmesxyz2\-\+]+/ig,'');
                return seq;
            },

            /**
             *
             * @param seq_arr {Array}
             * @returns {Array}
             */
            patterns: function(seq_arr) {
                var m,i,ret_arr=[];
                for(i=0;i<seq_arr.length;i++){
                    m=seq_arr[i];
                    if(RubikUtils.is.piece(m) || RubikUtils.is.rotation(m) || RubikUtils.is.pattern(m)){
                        ret_arr.push(m);
                    }
                }
                return ret_arr;
            },

            /**
             * Returns the given move with its correct case (upper for faces and slices, lower for axis)
             *
             * @param move {String}
             * @returns {String}
             */
            adjustCase: function(move) {
                return (
                    RubikUtils.is.face(move)||RubikUtils.is.slice(move) ? move.toUpperCase():
                    RubikUtils.is.axis(move)                            ? move.toLowerCase():
                    move
                );
            },

            /**
             * Returns an array of moves where all double moves are converted to move*2
             *
             * @param moves {Array}
             * @returns {Array}
             */
            collapseSequence: function(moves) {
                var face,sign;
                var lastFace,lastSign;
                var m,doit,ret=[];
                for(m=0;m<moves.length;m++) {
                    face=moves[m].charAt(0);
                    sign=moves[m].charAt(1);
                    doit=true;

                    if(m>0){
                        if(face==lastFace){
                            ret.pop();
                            if(sign==lastSign){
                                if(sign=='2') doit=false;
                                else sign='2';
                            }
                            else {
                                sign = RubikUtils.math.signSum(lastSign,sign);
                                if(!sign)
                                    doit=false;
                            }
                        }
                    }
                    if(doit)ret.push(face+sign);

                    lastFace=ret.length==0?'':ret[ret.length-1].charAt(0);
                    lastSign=ret.length==0?'':ret[ret.length-1].charAt(1);
                }

                return ret;
            },

            /**
             * Returns an array of moves where all double moves (move*2) are converted to single rotations
             *
             * @param moves {Array}
             * @returns {Array}
             */
            uncollapseSequence: function(moves) {
                var face,sign;
                var m,ret=[];
                for(m=0;m<moves.length;m++){
                    face=moves[m].charAt(0);
                    sign=moves[m].charAt(1);

                    if(sign=='2'){
                        sign='+';
                        ret.push(face+sign);
                    }
                    ret.push(face+sign);
                }

                return ret;
            }

        }

    };

}());
