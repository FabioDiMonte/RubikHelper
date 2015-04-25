/**
 * Created by fdimonte on 24/04/2015.
 */

var RubikTeacher = (function(){

    var explainConstants = {
        TITLE                                   : {p:0,g: 0,m:'* SOLVE PROCESS *'},
        BEGIN                                   : {p:0,g: 1,m:'begin memorizing'},
        END                                     : {p:0,g:-1,m:'end memorizing [%s]'},

        BEGIN_VOID                              : {p:3,g: 1,m:''},
        END_VOID                                : {p:3,g:-1,m:''},
        UNORIENTED_BEGIN                        : {p:3,g: 1,m:'solve unoriented edges'},
        UNORIENTED_END                          : {p:3,g:-1,m:'unoriented pieces: [%s]'},
        UNORIENTED_WIP                          : {p:3,g: 0,m:'method not yet implemented. will return an empty array.'},

        PIECES_BEGIN                            : {p:3,g: 1,m:'solve unpermuted/unoriented %s'},
        PIECES_END                              : {p:1,g:-1,m:'done with %s: [%s]'},
        PIECES_CYCLE_BEGIN                      : {p:3,g: 1,m:'piece-finding cycle'},
        PIECES_CYCLE_EXAMINE_BUFFER             : {p:3,g: 1,m:'examine the buffer [%s]'},
        PIECES_CYCLE_EXAMINE_PIECE              : {p:3,g: 1,m:'examine the piece [%s]'},

        PIECES_CYCLE_CHECK_BUFFER               : {p:1,g: 0,m:'first thing first: examine the buffer piece: [%s]'},
        PIECES_CYCLE_BUFFER_FOUND               : {p:2,g: 0,m:'the piece [%s] is the buffer - flipState: %s'},
        PIECES_CYCLE_PLACEHOLDER_FOUND          : {p:2,g: 0,m:'the piece in [%s] position is the buffer - should invert flipState? %s'},
        PIECES_CYCLE_CHECK_FREE_TARGET          : {p:1,g: 0,m:'check for the first target to be solved: [%s]'},
        PIECES_CYCLE_ALL_IS_OK                  : {p:2,g: 0,m:'all pieces are correctly permuted'},
        PIECES_CYCLE_CHECK_BUFFER_FLIP          : {p:1,g: 0,m:'check if edge buffer is flipped after all iterations'},
        PIECES_CYCLE_EDGE_IS_FLIPPED            : {p:2,g: 0,m:'note that the edge [%s] is flipped - is median? %s'},
        PIECES_CYCLE_BUFFER_FLIP_STATE          : {p:1,g: 0,m:'remember to %s the flip state of buffer piece when edges are finished'},
        PIECES_CYCLE_OPPOSITE_MEDIAN_EDGES      : {p:2,g: 0,m:'the M-slice is rotated, so switch DB with UF or viceversa: [%s] -> [%s]'},
        PIECES_CYCLE_OPPOSITE_RIGHT_CORNERS     : {p:2,g: 0,m:'the R-face is rotated, so switch DRB with URF or viceversa: [%s] -> [%s]'},
        PIECES_CYCLE_CHECK_NEXT_PIECE           : {p:2,g: 0,m:'look at the piece in [%s] position: [%s]'},
        PIECES_CYCLE_CHECK_BUFFER_POSITION      : {p:2,g: 0,m:'look at the piece in buffer position: [%s]'},

        PIECES_EDGES_BEGIN                      : {p:3,g: 1,m:'check for flipped median edge [%s]'},
        PIECES_EDGES_FLIPPED_STATE              : {p:2,g: 0,m:'flipped state of piece [%s] : %s'},
        PIECES_EDGES_PREVIOUS_FLIPPED           : {p:1,g: 0,m:'invert flipped state of [%s] because previous piece [%s] was unoriented'},
        PIECES_EDGES_BUFFER_FLIPPED             : {p:2,g: 0,m:'invert flipped state of buffer [%s]'},
        PIECES_EDGES_ADD_TO_FLIPPED             : {p:1,g: 0,m:'edge [%s] is flipped, add it to the flipped edge list: [%s]'},

        PIECES_EDGES_DONT_CHECK_BUFFER          : {p:2,g: 0,m:'is not the time to check the buffer [%s] flip state'},
        PIECES_EDGES_IS_MEDIAN                  : {p:2,g: 0,m:'the piece [%s] is part of median slice'},
        PIECES_EDGES_CHECK_ONLY_MEDIAN          : {p:2,g: 0,m:'the piece [%s] is not part of median slice'},

        PIECES_PARITY_BEGIN                     : {p:3,g: 1,m:'parity occurred!'},
        PIECES_PARITY_SWITCH_FLIPPED_MEDIANS    : {p:2,g: 0,m:'switch DF with UB and viceversa in the list of flipped edges: [%s]'},

        MEMORIZE_MIDDLE                         : {p:0,g: 0,m:'** the %s is rotated, for now rotate it back with [%s]'},
        MEMORIZE_PARITY                         : {p:0,g: 0,m:'** finally do the parity pattern: [%s]'},
        MEMORIZE_PIECE                          : {p:0,g: 0,m:'** memorize the piece: [%s]'},
        MEMORIZE_PLACEHOLDER                    : {p:0,g: 0,m:'** memorize the buffer placeholder position: [%s]'},
        MEMORIZE_ORIENT_EDGES                   : {p:0,g: 0,m:'** memorize the sequence for correctly orient the median edges: [%s]'}
    };

    return {

        constants: explainConstants,

        explain: function(name,value){
            var priority=0,
                grouping=0,
                message=name;

            var msg_obj = this.constants[name];
            if(msg_obj){
                priority = msg_obj.p;
                grouping = msg_obj.g;
                message = msg_obj.m;
            }

            var final_msg;
            var idx,msg_arr;

            if(message){
                final_msg = message;
                if(value){
                    if(typeof(value)=='string'){
                        final_msg = message.replace(/%s/g,value);
                    }else{
                        msg_arr = message.split('%s');
                        for(idx in msg_arr){
                            if(msg_arr.hasOwnProperty(idx)){
                                value[idx]!=null && (msg_arr[idx] = msg_arr[idx] + value[idx]);
                            }
                        }
                        final_msg = msg_arr.join('');
                    }
                }
            }else{
                grouping = -1;
            }

            return {m:final_msg,g:grouping,p:priority};
        },

        explainAll: function(array,log){
            var obj, arr = [];
            for(var i=0; i<array.length; i++){
                obj = this.explain(array[i]['n'],array[i]['v']);
                log && this._speak(obj.m,obj.g,obj.p);
                arr.push(obj);
            }
            return arr;
        },

        _speak: function(message,grouping,priority){
            if(!console || !console.log || !console.group || !console.groupCollapsed || !console.groupEnd)
                return;

            if(this.options.explainPriority<0 || this.options.explainPriority>=priority){
                // note: using groupTitle like this results in a SAFARI bug!!
                var collapsed = true;
                var groupTitle = collapsed?console.groupCollapsed:console.group;

                if(grouping>0  && message) groupTitle(message);
                if(grouping<=0 && message) console.log(message);
                if(grouping<0) console.groupEnd();
            }
        }

    };

}());
