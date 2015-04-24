/**
 * Created by fdimonte on 23/04/2015.
 */

var RubikSolver = (function(RubikUtils){

    return {

        solveArray   : [],
        explainArray : [],

        /**
         *
         * @param name
         * @param value
         */
        explainCallback: function(name, value) {
            RubikSolver.explainArray.push({n:name,v:value});
        },

        /**
         * Group of methods for various checks before the solving process begins
         */
        check: {

            /**
             * Returns TRUE if the cube is correctly oriented (F on Front, U on Up, ...), FALSE otherwise
             *
             * @param cube {Object}
             * @returns {Boolean}
             */
            orientedCube: function(cube) {
                var s,f,face;
                for(f in RubikUtils.pieces.faces) {
                    if(RubikUtils.pieces.faces.hasOwnProperty(f)){
                        face = f;
                        s = RubikUtils.service.getStickersFromPiece(face,cube);
                        if(face!=s){
                            alert('Please, correctly orient the cube before solving process.');
                            return false;
                        }
                    }
                }
                return true;
            },

            /**
             * Returns TRUE if all pieces are single instances
             *
             * @param cube {Object}
             * @returns {Boolean}
             */
            correctPieces: function(cube) {
                var p,piece,check={};
                for(p in cube){
                    if(cube.hasOwnProperty(p)){
                        piece = RubikUtils.service.targetOf(cube[p]);
                        if(!check[piece]){
                            check[piece]=p;
                        }else{
                            alert('Alert! Piece in '+check[piece]+' and '+p+' have the same stickers.\nPlease, correct one of those pieces.');
                            return false;
                        }
                    }
                }
                return true;
            }

        },

        /**
         * Group of methods used during the solving process
         */
        service: {

            /**
             * Returns the first unoriented/unpermuted piece of given cube
             * Note: type=1 : search for both edges and corners
             *       type=2 : search for edges
             *       type=3 : search for corners
             *
             * @param cube {Object}            the scrambled cube to search into
             * @param type {Number}            the type of piece to search for
             * @param medgeSafe {Boolean}      if it's true, pieces on M-slice will be considered solved regardless of their rotation
             * @param fullList {Boolean}       whether should return the first quicker piece left to solve, or the full list of pieces
             * @returns {String|Array|Boolean} the unoriented/unpermuted piece (or list of pieces) or FALSE if nothing found
             */
            freeTarget: function(cube, type, medgeSafe, fullList) {
                type || (type=1);
                var missing = fullList?[]:false;
                var isMisplaced,isNotBuffer,isShorter;

                var t,p;
                for(t in cube) {
                    if(cube.hasOwnProperty(t)){
                        if(t.length==1)continue;
                        p = cube[t];
                        if(RubikUtils.is.median(p)) p = medgeSafe ? RubikUtils.service.targetOf(p) : p;

                        isMisplaced = (p!=t && (type==1 || type==t.length));
                        isNotBuffer = !RubikUtils.is.buffer(t);
                        isShorter = (isMisplaced && isNotBuffer && (!missing || fullList || RubikUtils.expand.piece(missing,true).length>RubikUtils.expand.piece(t,true).length));

                        if(isShorter) fullList ? missing.push(t) : missing=t;
                    }
                }

                return missing;
            },

            /**
             * TODO: refactor this method!!
             * Returns the opposite piece of the one passed as argument, considering the M2/R2 pattern
             * Note: it will only return the opposite of [UF|FU], [DB|BD], [URF|RFU|FUR], [DRB|BDR|RBD]
             * Note: if is_buffer:true it will return the opposite of [DF|FD], [UB|BU], [DFR|RDF|FRD], [UBR|RUB|BRU]
             * Note: the returned piece will have the same orientation of given piece
             * Note: if the piece is not an M-slice's edge or an R-face's corner, it will return the piece itself
             *
             * @param piece {String}      the piece you are searching for
             * @param is_buffer {Boolean} will opposite pieces on buffer line ( or not )
             * @returns {String}          the opposite piece of given piece
             */
            opposite: function(piece, is_buffer) {
                var obj = is_buffer?'buffers':'normals';
                var m = RubikUtils.pieces.opposites[obj].edges.indexOf(piece);
                var r = RubikUtils.pieces.opposites[obj].corners.indexOf(piece);
                var arr=[piece],opp=0;

                //isMedian
                if(m>-1){
                    opp=m+2;
                    arr=RubikUtils.pieces.opposites[obj].edges;
                }
                //isCorner
                if(r>-1){
                    opp=r+3;
                    arr=RubikUtils.pieces.opposites[obj].corners;
                }

                //recursive search
                if(opp>=arr.length) opp-=arr.length;

                if(m>-1) is_buffer || RubikSolver.explainCallback('PIECES_CYCLE_OPPOSITE_MEDIAN_EDGES',[piece,arr[opp]]);
                if(r>-1) is_buffer || RubikSolver.explainCallback('PIECES_CYCLE_OPPOSITE_RIGHT_CORNERS',[piece,arr[opp]]);

                return arr[opp];
            }

        },

        /**
         * Group of methods for the solving process
         */
        solve: {

            /**
             * Returns an object with solve (s) and explain (e) arrays
             * Note: the explain array should be evaluated by RubikTeacher.explainAll method
             *
             * @param cube
             * @returns {{s: Array, e: Array}}
             */
            explain: function(cube) {
                RubikSolver.explainArray = [];
                RubikSolver.solveArray = RubikSolver.solve.full(cube,0);
                return {s:RubikSolver.solveArray,e:RubikSolver.explainArray};
            },

            /**
             * Returns the complete list of moves to solve the given cube
             * Note..
             *      type=0 : the list of pieces and patterns to execute in the correct order
             *      type=1 : the uncollapsed list of moves
             *      type=2 : the collapsed list of moves
             *      type=3 : the inverted list of moves (ie. the scramble list of moves)
             *
             * @param cube {Object}     the cube object to be solved
             * @param type {Number}     the type of return (default: 0)
             * @returns {Array}         depending on type param, will return the solving sequence with M2R2 method
             */
            full: function(cube, type) {
                (!type || type<0 || type>3) && (type=0);

                if(!RubikSolver.check.orientedCube(cube)) return [];
                if(!RubikSolver.check.correctPieces(cube)) return [];

                //RubikSolver.explainCallback('TITLE');
                RubikSolver.explainCallback('BEGIN');

                //TODO: implement a solveUnoriented method to solve only-unoriented pieces before everything else
                var edges = RubikSolver.solve.edgesUnoriented(cube);
                edges = edges.concat(RubikSolver.solve.pieces(cube,RubikUtils.pieces.buffers.edge,RubikUtils.pieces.M2));
                var corners = RubikSolver.solve.pieces(cube,RubikUtils.pieces.buffers.corner,RubikUtils.pieces.R2);

                var isParityE = Boolean(RubikUtils.service.moveCounter(edges,RubikUtils.pieces.M2)%2);
                var isParityC = Boolean(RubikUtils.service.moveCounter(corners,RubikUtils.pieces.R2)%2);
                if(isParityE!=isParityC) console.warn('WARNING: this case is not handled!! parity happened only on edges or corners..',cube);

                var full = edges.concat(corners);

                RubikSolver.explainCallback('END',[full.toString()]);

                var expanded    = RubikUtils.expand.pattern(full);
                var collapsed   = RubikUtils.clear.collapseSequence(expanded);
                var uncollapsed = RubikUtils.clear.uncollapseSequence(expanded);
                var inverse     = RubikUtils.math.inversePattern(collapsed);

                return type==0? full:
                    type==1? uncollapsed:
                        type==2? collapsed:
                            type==3? inverse:
                                [];
            },

            /**
             * Solve a single type of pieces (edges or corners) from a scrambled cube
             *
             * @param cube {Object}   the scrambled cube to be solved
             * @param buffer {String} the buffer piece
             * @param MR {Array}      list of moves between setup and unsetup ('M2' or 'R2')
             * @returns {Array}       ordered list of pieces to be moved
             */
            pieces: function(cube, buffer, MR) {
                var C = RubikUtils.service.cloneCube(cube);
                var target,piece=buffer,next=C[buffer];
                var done=(!next);
                var pattern=[],flipped=[];

                var is_edge = RubikUtils.is.edge(buffer);
                var is_corner = RubikUtils.is.corner(buffer);

                RubikSolver.explainCallback('PIECES_BEGIN',(is_edge?'edges':is_corner?'corners':'').toUpperCase());

                var faceSwap=false;
                var bufferFlip=false;
                var targetFree=false;
                var bufferFound=false;
                var bufferPlaceholder=false;

                function addMedianToFlipped(edge,prev,is_buffer){

                    var edge_target = RubikUtils.service.targetOf(edge);
                    if(RubikUtils.is.median(edge) && (is_buffer || edge_target!=buffer)){
                        var edge_piece = RubikUtils.service.getPieceFromStickers(edge,cube);

                        //edge_target!=buffer && RubikSolver.explainCallback('PIECES_EDGES_IS_MEDIAN',edge);
                        RubikSolver.explainCallback('PIECES_EDGES_BEGIN',edge);

                        var flipState = (edge_piece!=RubikUtils.service.targetOf(edge_piece));
                        flipState || RubikSolver.explainCallback('PIECES_EDGES_FLIPPED_STATE',[edge,flipState]);

                        // * invert the flipped state of edge IF is a flipped buffer OR the preceding piece is flipped AND is not a median
                        var prevFlip = (prev && RubikUtils.service.getRotation(prev) && !RubikUtils.is.median(prev));
                        if (prevFlip)  (flipState=!flipState);
                        if (is_buffer) (flipState=bufferFlip);

                        prevFlip && RubikSolver.explainCallback('PIECES_EDGES_PREVIOUS_FLIPPED',[edge,prev]);
                        is_buffer && bufferFlip && RubikSolver.explainCallback('PIECES_EDGES_BUFFER_FLIPPED',edge);

                        if(flipState && flipped.indexOf(edge_target)==-1){
                            flipped.push(edge_target);
                            RubikSolver.explainCallback('PIECES_EDGES_ADD_TO_FLIPPED',[edge,flipped.toString()]);
                        }

                        RubikSolver.explainCallback('END_VOID');

                    }else{
                        //RubikSolver.explainCallback((edge_target==buffer ? 'PIECES_EDGES_DONT_CHECK_BUFFER' : 'PIECES_EDGES_CHECK_ONLY_MEDIAN'), edge);
                    }

                }

                function addPieceToPattern(buffering){

                    var pieceToPush = faceSwap ? RubikSolver.service.opposite(piece) : piece;

                    if(buffering) {
                        bufferPlaceholder=target;
                        RubikSolver.explainCallback('MEMORIZE_PLACEHOLDER',target);
                    }else{
                        RubikSolver.explainCallback('MEMORIZE_PIECE',pieceToPush);
                    }
                    pattern.push(pieceToPush);

                    next = RubikUtils.service.getStickersFromPiece(piece,C);
                    faceSwap = !faceSwap;
                    C[target] = target;

                    if(piece!=next){
                        RubikSolver.explainCallback('PIECES_CYCLE_CHECK_NEXT_PIECE',[piece,next]);
                        is_edge && addMedianToFlipped.call(this,next,piece);
                    }

                }

                RubikSolver.explainCallback('PIECES_CYCLE_BEGIN');
                //RubikSolver.explainCallback('PIECES_CYCLE_CHECK_BUFFER',buffer);

                RubikSolver.explainCallback('PIECES_CYCLE_EXAMINE_BUFFER',buffer);
                RubikSolver.explainCallback('PIECES_CYCLE_CHECK_BUFFER_POSITION',next);
                //RubikUtils.is.buffer(next) && RubikSolver.explainCallback('PIECES_CYCLE_BUFFER_FOUND',[next,(next!=RubikUtils.service.targetOf(next))]);
                is_edge && addMedianToFlipped.call(this,next);
                RubikSolver.explainCallback('END_VOID');

                while(!done){

                    RubikSolver.explainCallback('PIECES_CYCLE_EXAMINE_PIECE',next);

                    piece = next;
                    target = RubikUtils.service.targetOf(piece);
                    bufferFound = RubikUtils.is.buffer(piece);

                    bufferFound && RubikSolver.explainCallback('PIECES_CYCLE_BUFFER_FOUND',[piece,(piece!=target)]);

                    bufferFlip = bufferFound ? (piece!=target) : (target==bufferPlaceholder && piece!=target && !RubikUtils.is.median(piece)) ? !bufferFlip : bufferFlip;

                    // if target is NOT buffer AND target is place holder buffer position
                    if(!bufferFound && target==bufferPlaceholder){
                        bufferPlaceholder = false;
                        bufferFound = true;

                        RubikSolver.explainCallback('PIECES_CYCLE_PLACEHOLDER_FOUND',[piece,(piece!=target && !RubikUtils.is.median(piece))]);
                        is_edge && (piece!=target) && RubikSolver.explainCallback('PIECES_CYCLE_EDGE_IS_FLIPPED',[piece,RubikUtils.is.median(piece)]);
                        //is_edge && (piece!=target) && RubikSolver.explainCallback('PIECES_CYCLE_BUFFER_FLIP_STATE',(bufferFlip?'invert':'keep'));

                        addPieceToPattern.call(this);
                    }

                    if(bufferFound){

                        // check if other pieces are ok
                        targetFree = RubikSolver.service.freeTarget(C,piece.length);//TODO: when solveUnoriented is implemented, use (piece.length==2) as third parameter!!
                        RubikSolver.explainCallback('PIECES_CYCLE_CHECK_FREE_TARGET',targetFree.toString());

                        if(targetFree!==false){
                            // the cube is not yet solved..

                            // add free space to the pattern to place hold the buffer
                            piece = targetFree;
                            target = targetFree;
                            addPieceToPattern.call(this,true);

                        }else{
                            // all the pieces of this type are in correct position
                            RubikSolver.explainCallback('PIECES_CYCLE_ALL_IS_OK');

                            // add the buffer in flipped array if it's flipped
                            if(is_edge){
                                //RubikSolver.explainCallback('PIECES_CYCLE_CHECK_BUFFER_FLIP');
                                addMedianToFlipped.call(this,buffer,false,true);
                            }

                            // restore median face to correct position if switched with M2/R2 (means that parity occurred!)
                            if(faceSwap){
                                RubikSolver.explainCallback('PIECES_PARITY_BEGIN');
                                RubikSolver.explainCallback('MEMORIZE_MIDDLE',[is_edge?'M-slice':'R-face',MR]);
                                pattern = pattern.concat(MR);
                                if(is_edge){
                                    if(flipped.length>0){
                                        for(var f in flipped) flipped[f] = RubikSolver.service.opposite(flipped[f],true);
                                        RubikSolver.explainCallback('PIECES_PARITY_SWITCH_FLIPPED_MEDIANS',flipped.toString());
                                    }
                                }else{
                                    RubikSolver.explainCallback('MEMORIZE_PARITY','PAR');
                                    pattern = pattern.concat(['PAR']);
                                }
                                RubikSolver.explainCallback('END_VOID');
                            }

                            // add the orient edges pattern, if any, to the pattern
                            if(is_edge){
                                var orient = RubikSolver.solve.mEdgesUnoriented(flipped);
                                pattern = pattern.concat(orient);
                                orient.length>0 && RubikSolver.explainCallback('MEMORIZE_ORIENT_EDGES',orient.toString());
                            }

                            // ..and exit
                            done=true;
                        }

                    }else{
                        addPieceToPattern.call(this);
                    }

                    RubikSolver.explainCallback('END_VOID');

                }
                RubikSolver.explainCallback('END_VOID');
                RubikSolver.explainCallback('PIECES_END',[(is_edge?'edges':is_corner?'corners':'').toUpperCase(),pattern.toString()]);

                return pattern;
            },

            /**
             * TODO: to be implemented in order to solve edges already permuted, but not oriented correctly
             * Returns a list of orient patterns to correctly orient all the edges
             *
             * @param cube {Object}
             * @returns {Array}
             */
            edgesUnoriented: function(cube) {
                RubikSolver.explainCallback('UNORIENTED_BEGIN');
                var ret = [];
                //for(var p in cube){
                //}
                RubikSolver.explainCallback('UNORIENTED_WIP');
                RubikSolver.explainCallback('UNORIENTED_END',[ret.toString()]);
                return ret;
            },

            /**
             * Returns an array of orient patterns to correctly orient all the M-Edges
             *
             * @param flipped {Array}
             * @returns {Array}
             */
            mEdgesUnoriented: function(flipped) {
                var seq = [];
                var f,face;
                var c1,c2;
                var p1,p2;

                if(flipped.length==1||flipped.length==3||flipped.length>4) console.error('ERROR: wrong array of flipped M-edges: ',flipped);

                if(flipped.length==4){
                    seq = ['O2U','O2D'];
                }

                if(flipped.length==2){
                    c1 = flipped[0].charAt(0);
                    c2 = flipped[0].charAt(1);
                    // * check the common letter, if any..
                    if(flipped[1].indexOf(c1)>-1) face=c1;
                    if(flipped[1].indexOf(c2)>-1) face=c2;

                    // * and use it in _O2E instead of U (or find out how many x are needed to bring em on U face)
                    if(face){
                        seq = ['O2'+face];
                    }else{
                        // * if no common letters..
                        p1 = flipped[0].indexOf('D');
                        p2 = flipped[1].indexOf('D');
                        // * find the face whose piece doesn't have the U face (ie. have the D face)..
                        if(p1>-1){
                            f = Number(!p1);
                            face = flipped[0].charAt(f);
                        }
                        if(p2>-1){
                            f = Number(!p2);
                            face = flipped[1].charAt(f);
                        }
                        // * and double rotate it, as Setup move, and do the [S],_O2U,[S'] pattern
                        if(face){
                            seq = [face+'2','O2U',face+'2'];
                        }
                    }
                }

                return seq;
            }

        }

    };

}(RubikUtils));
