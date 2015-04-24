/*! RubikHelper - v0.1.0 - 2015-04-24 */
var RubikHelper = (function(){
var pkgVersion = "v0.1.0";
/*! GraphicEngine Package - v0.1.0 - 2015-04-24 */
var GraphicEngine=function(){var a=function(){function a(){this._attributes={}}return a.prototype={set:function(a,b){return this._attributes[a]=b,this},get:function(a){return this._attributes[a]},_extend:function(a,b){if(b)for(var c in b)b.hasOwnProperty(c)&&(a[c]&&a[c]instanceof Object&&!(a[c]instanceof Array)?this._extend(a[c],b[c]):a[c]=b[c])}},a}(),b=function(){function a(a,b,c){this.x=parseFloat(a)||0,this.y=parseFloat(b)||0,this.z=parseFloat(c)||0}return a.prototype={toOrtho:function(){return new a(this.x-this.y,(this.x+this.y)/2-1.25*this.z,0)},toIso:function(){return new a(this.y+this.x/2,this.y-this.x/2,0)},toString:function(){return"{x:"+this.x+", y:"+this.y+", z:"+this.z+"}"},toObject:function(){return{x:this.x,y:this.y,z:this.z}},toArray:function(){return[this.x,this.y,this.z]},add:function(b){return new a(this.x+b.x,this.y+b.y,this.z+b.z)},subtract:function(b){return new a(this.x-b.x,this.y-b.y,this.z-b.z)},multiply:function(b){return new a(this.x*b.x,this.y*b.y,this.z*b.z)},distance:function(a){var b=Math.abs(this.x-a.x),c=Math.abs(this.y-a.y),d=Math.abs(this.z-a.z),e=Math.sqrt(Math.pow(b,2)+Math.pow(c,2));return Math.sqrt(Math.pow(e,2)+Math.pow(d,2))}},a}(),c=function(){function a(a){this._stepCallback=null,this._animation=null,this._startTime=0,a&&this.setCallback(a),window.requestAnimFrame=function(){return window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame||function(a){return window.setTimeout(a,1e3/60)}}(),window.cancelRequestAnimFrame=function(){return window.cancelAnimationFrame||window.cancelRequestAnimationFrame||window.webkitCancelRequestAnimationFrame||window.mozCancelRequestAnimationFrame||window.oCancelRequestAnimationFrame||window.msCancelRequestAnimationFrame||clearTimeout}()}return a.prototype={setCallback:function(a){this._stepCallback=a},start:function(a){this._startTime=(new Date).getTime(),this._animate(),a&&setTimeout(function(){this.stop()}.bind(this),a)},stop:function(){cancelRequestAnimFrame(this._animation),this._animation=null},_animate:function(){this._stepRender(),this._animation=requestAnimFrame(this._animate.bind(this))},_stepRender:function(){var a=(new Date).getTime()-this._startTime;this._stepCallback&&this._stepCallback(a)}},a}(),d=function(){function a(a){this.context=a,this.message=null,this.messageOrigin={x:0,y:0},this.isPath=!1,this.isStroke=!1}return a.prototype={setup:function(a){a||(a={});var b=null==a.fillColor?null:this.castToColor(a.fillColor),c=null==a.strokeColor?null:this.castToColor(a.strokeColor),d=a.strokeSize;this.context.restore(),this.context.fillStyle=b,this.context.strokeStyle=c,this.context.lineWidth=d,this.context.globalAlpha=a.alpha||1,this.context.font=a.font||"20px Open Sans",this.context.save(),this.isStroke=null!=c,this.isPath=null!=b,this.isPath&&this.context.beginPath()},render:function(){this.message&&(this.isPath&&this.context.fillText(this.message,this.messageOrigin.x,this.messageOrigin.y),this.isStroke&&this.context.strokeText(this.message,this.messageOrigin.x,this.messageOrigin.y),this.message=null),this.isPath&&this.context.closePath(),this.isPath&&this.context.fill(),this.isPath=!1,this.isStroke&&this.context.stroke(),this.isStroke=!1},moveTo:function(a,b){var c=this.isPath||this.isStroke;return c&&this.context.moveTo(a,b),c},lineTo:function(a,b){var c=this.isPath||this.isStroke;return c&&this.context.lineTo(a,b),c},text:function(a,b){if(!a)return[];b||(b=[0,0]),b=this.castToPoint(b),this.messageOrigin=b,this.message=a;var c=this.context.measureText(a),d=this.context.font,e=Math.ceil(c.width),f=parseInt(d);return isNaN(f)&&(d=d.substr(d.indexOf(" ")),f=parseInt(d)),[b.add([0,0]),b.add([e,0]),b.add([e,-f]),b.add([0,-f])]},line:function(a,b,c){return a&&b?(a=this.castToPoint(a),b=this.castToPoint(b),c&&(a=a.toOrtho(),b=b.toOrtho()),this.moveTo(a.x,a.y)&&this.lineTo(b.x,b.y)):!1},polygon:function(a,b,c){if(!a)return[];b||(b=[0,0,0]),b=this.castToPoint(b),a=a.map(function(a){return this.castToPoint(a)}.bind(this)),c&&(b=b.toOrtho()),c&&(a=a.map(function(a){return a.toOrtho()}));var d,e,f=b.add(a[0]),g=[];for(this.moveTo(f.x,f.y)&&g.push(f),d=1;d<a.length;d++)e=b.add(a[d]),this.lineTo(e.x,e.y)&&g.push(e);return this.lineTo(f.x,f.y),g},image:function(){},castToColor:function(a){var b="string"==typeof a?a:"number"==typeof a?a.toString(16):null;return null!=b&&"#"==b.substr(0,1)&&(b=b.substr(1)),null!=b&&(b="#"+("00000"+b).substr(-6)),b},castToPoint:function(a){var c;return a instanceof b?c=a:"object"==typeof a&&null!=a.x&&null!=a.y?c=new b(parseFloat(a.x),parseFloat(a.y),parseFloat(a.z)):"object"==typeof a&&a.length>1&&a.length<4&&(c=new b(parseFloat(a[0]),parseFloat(a[1]),parseFloat(a[2]))),c}},a}(),e=function(a,b){function c(c){if(!c)throw new Error('no "name" provided for this displayObject:',this);if(a.call(this),this._name=c,this._parent=null,this._zIndex=0,this._position=new b,this._shape=null,this._info={stepCallback:null,renderMethod:null,renderInfo:null},this._options={strokeColor:0,fillColor:0,strokeSize:1,alpha:1,font:"14px Arial"},this[c])throw new Error('property "%s" already exists on',c,this)}return c.prototype=Object.create(a.prototype),c.prototype.setOptions=function(a){return a?(this._extend(this._options,a),!0):!1},c.prototype.setRenderInfo=function(a,b){b&&this.setOptions(b),this._info.renderInfo=a},c.prototype.setAnimationStep=function(a){this._info.stepCallback=a},c.prototype._addTo=function(a,b){this._zIndex=b||0,this._parent=a},c.prototype._remove=function(){delete this},c.prototype._render=function(a,b){if(!this._info.renderMethod)throw new Error("no renderMethod set for this instance of DisplayObject: ",this);return this._info.renderInfo?(a._info.draw.setup(this._options),this._shape=a._info.draw[this._info.renderMethod](this._info.renderInfo,this._position,b),a._info.draw.render(),!0):!1},c.prototype._step=function(a){return this._info.stepCallback&&this._info.stepCallback(a),!0},c}(a,b),f=function(a){function b(b){a.call(this,b),this._info.renderMethod="image"}return b.prototype=Object.create(a.prototype),b.prototype.render=function(){},b}(e),g=function(a){function b(b){a.call(this,b),this._options.font=this.getFont("Verdana",14),this._options.fillColor=0,this._options.strokeColor=null,this._info.renderMethod="text"}return b.prototype=Object.create(a.prototype),b.prototype.getFont=function(a,b,c){return a?(c||(c=""),b||(b=""),"number"==typeof b&&(b+="px"),[c,b,a].join(" ")):""},b.prototype.setFont=function(a,b,c){return a?(this._options.font=this.getFont(a,b,c),!0):!1},b}(e),h=function(a){function b(b){a.call(this,b),this._options.fillColor=null,this._options.strokeColor=0,this._info.renderMethod="polygon"}return b.prototype=Object.create(a.prototype),b}(e),i=function(a){function b(b){a.call(this,b),this._children={},this._childrenLength=function(){var a=0;return c(this,function(){a++}),a}.bind(this._children),this._childrenArray=function(){var a=[];return c(this,function(b){a.push(b)}),a.sort(function(a,b){return a._zIndex-b._zIndex})}.bind(this._children)}function c(a,b){if(a&&b)for(var c in a)a.hasOwnProperty(c)&&b(a[c])}return b.prototype=Object.create(a.prototype),b.prototype._render=function(a,b){this._childrenArray().forEach(function(c){c._render(a,b)})},b.prototype._step=function(b){return this._childrenArray().forEach(function(a){a._step(b)}),a.prototype._step.call(this,b),!0},b.prototype.addChild=function(b,c){if(!(b instanceof a))throw new Error("adding child with unsupported type:",typeof b);if(this[b._name])throw new Error('property "',b._name,'" already exists on',this);return c||(c=this._childrenLength()),this._children[b._name]=b,this[b._name]=b,b._addTo(this,c),this._reorderChildren(),b},b.prototype.removeChild=function(b){b instanceof String&&(b=this[b]),b&&this[b._name]&&this[b._name]instanceof a&&(delete this._children[b._name],delete this[b._name],b._remove())},b.prototype._reorderChildren=function(){this._childrenArray().forEach(function(a,b){a._info.index=b})},b.prototype._getShapes=function(){for(var a,c=[],d=0;d<this._children.length;d++)a=this._children[d],a._shape&&c.push(a._shape),a instanceof b&&(c=c.concat(a._getShapes()));return c},b.prototype._getShapesWithObjects=function(){for(var a,c=[],d=0;d<this._children.length;d++)a=this._children[d],a._shape&&c.push(a),a instanceof b&&(c=c.concat(a._getShapesWithObjects()));return c},b}(e),j=function(a,b){function e(e,f){b.call(this,"_stage_"+e),this._engine=null,this._info.size={w:0,h:0},this._info.canvas=document.createElement("canvas"),this._info.context=this._info.canvas.getContext("2d"),this._info.draw=new d(this._info.context),this._info.animator=new c(this.renderTime.bind(this)),this._info.modes={ORTHOGONAL:"ORTHOGONAL",ISOMETRIC:"ISOMETRIC"},this._info.mode=f?this._info.modes.ISOMETRIC:this._info.modes.ORTHOGONAL,this.$el=a("<div/>").addClass("iso-layer").css({position:"absolute",top:0,left:0}).append(this._info.canvas)}return e.prototype=Object.create(b.prototype),e.prototype._render=function(){this.clear(),b.prototype._render.call(this,this,this._info.mode==this._info.modes.ISOMETRIC)},e.prototype._remove=function(){this.$el.remove()},e.prototype._addTo=function(a){if(a){var b=a.worldSize();this.setSize(b.w,b.h),this.$el.appendTo(a.$el),this._engine=a}},e.prototype.toggleMode=function(a){this._info.modes[a]&&this.mode!=a&&(this.mode=a,this._render())},e.prototype.clear=function(){this._info.context.clearRect(-this._info.size.w/2,-this._info.size.h/2,this._info.size.w,this._info.size.h)},e.prototype.getCanvas=function(){return this._info.canvas},e.prototype.renderTime=function(a){this._step(a)&&this._render()},e.prototype.startAnimation=function(a){this._info.animator.start(a)},e.prototype.stopAnimation=function(){this._info.animator.stop()},e.prototype.setSize=function(a,b){this._info.size={w:a,h:b},this._info.canvas.width=a.toString(),this._info.canvas.height=b.toString(),this._info.context.translate(a/2,b/2)},e.prototype.setShadow=function(a,b,c,d){this._info.context.shadowColor=a||"#999",this._info.context.shadowBlur=b||20,this._info.context.shadowOffsetX=c||15,this._info.context.shadowOffsetY=d||c||15},e}(jQuery,i),k=function(a){function b(b){a.call(this,b)}return b.prototype=Object.create(a.prototype),b}(i),l=function(a,b){function c(){this.$el=a("<div/>"),this.layers={},this.fpsInterval=null,this.fpsLogInterval=null,this.utils={worldSizeWidth:400,worldSizeHeight:400}}function d(a,b){for(var c=!1,d=-1,e=a.length,f=e-1;++d<e;f=d)(a[d].y<=b.y&&b.y<a[f].y||a[f].y<=b.y&&b.y<a[d].y)&&b.x<(a[f].x-a[d].x)*(b.y-a[d].y)/(a[f].y-a[d].y)+a[d].x&&(c=!c);return c}return c.prototype={init:function(b,c){if(!b)throw new Error('no "elem" param passed to new Engine instance');c&&a.extend(!0,this.utils,c),this.setWorld(b)},setWorld:function(b){if(this.$el){var c=this.worldSize();this.$el.css("position","relative").width(c.w).height(c.h).appendTo(a(b))}},worldSize:function(){return{w:this.utils.worldSizeWidth,h:this.utils.worldSizeHeight}},render:function(){for(var a in this.layers)this.layers.hasOwnProperty(a)&&this.layers[a]._render()},addLayer:function(a,c){var d=new b(a,c);return d._addTo(this),this.layers[a]=d,d},removeLayer:function(a){var b=this.layers[a];return b?(b.remove(),delete this.layers[a],!0):!1},showFPS:function(a){a||(a=console.log);var b=0;this.fpsInterval=setInterval(function(){b++},1),this.fpsLogInterval=setInterval(function(){a(b/10),b=0},1e3)},hideFPS:function(){clearInterval(this.fpsInterval),clearInterval(this.fpsLogInterval)},screenToWorld:function(a,b){var c=this.worldSize(),d=this.$el.offset();return{x:a-(d.left+c.w/2),y:b-(d.top+c.h/2)}},getObjectsAtScreenCoord:function(a){var b=this.screenToWorld(a.x,a.y),c=[];for(var e in this.layers)this.layers.hasOwnProperty(e)&&(c=c.concat(this.layers[e].getShapesWithObjects()));for(var f=[],g=0;g<c.length;g++)c[g].shape&&d(c[g].shape,b)&&f.push(c[g]);return f.sort(function(a,b){return b.zindex-a.zindex}),f},drawUtils:{grid:function(a,b,c,d,e){if(!a)throw new Error("calling draw method without providing a Stage instance");b||(b=[10,10]),c||(c=10),d||(d={}),d.strokeSize||(d.strokeSize=1),d.strokeColor||(d.strokeColor=0),d.alpha||(d.alpha=.8),a._info.draw.setup(d);for(var f=0;f<=b[0];f++)a._info.draw.line([f*c,0],[f*c,b[0]*c],e);for(var g=0;g<=b[1];g++)a._info.draw.line([0,g*c],[b[1]*c,g*c],e);a._info.draw.render()},line:function(a,b,c,d,e){if(!a)throw new Error("calling draw method without providing a Stage instance");null!=b&&null!=c&&(d&&a._info.draw.setup(d),a._info.draw.line(b,c,e),a._info.draw.render())},axis:function(a,b,c){if(!a)throw new Error("calling draw method without providing a Stage instance");b||(b=100);var d=[b,0,0],e=[0,b,0],f=[0,0,b];a._info.draw.setup({strokeColor:0}),a._info.draw.line([0,0,0],d,c),a._info.draw.line([0,0,0],e,c),a._info.draw.line([0,0,0],f,c),a._info.draw.render()},get3DPolygonSquare:function(a){return[[0,0,0],[a,0,0],[a,a,0],[0,a,0]]},get3DPolygonSquareRight:function(a){return[[0,0,0],[0,a,0],[0,a,a],[0,0,a]]},get3DPolygonSquareLeft:function(a){return[[0,0,0],[0,0,a],[a,0,a],[a,0,0]]}}},c}(jQuery,j),m=function(a,b,c,d,e,f,g,h,i,j,k,l){var m={};return m.core={},m.core.Engine=a,m.core.ObjectModel=b,m.core.Point=c,m.display={},m.display.Bitmap=d,m.display.DisplayObject=e,m.display.DisplayObjectContainer=f,m.display.Shape=g,m.display.Sprite=h,m.display.Stage=i,m.display.Text=j,m.utils={},m.utils.Animator=k,m.utils.Draw=l,m}(l,a,b,f,e,i,h,k,j,g,c,d);return m}();
/*! PanelUI Package - v0.1.0 - 2015-04-24 */
var PanelUI=function(){var a=function(){function a(a,b){this.name=a,this.title=b||a,this.parent=null,this.mainUI=null,this.enabled=!0,this.elements=[],this.elementsMap={},this.listeners={},this.$el=this.getElement(),this.initEvents()}return a.prototype={getElement:function(){return null},initEvents:function(){},setValue:function(){},getValue:function(){},addTo:function(a){this.parent=a,this.mainUI=a.mainUI||a,this.updateChildrenHierarchy()},addChild:function(a){this.elements.push(a);var b;if(a.components)for(var c=0;c<a.components.length;c++)b=a.components[c],b.addTo(this),this.elementsMap[b.name]=b;else a.addTo(this),this.elementsMap[a.name]=a},updateChildrenHierarchy:function(){for(var a,b=this.components?this.components:this.elements,c=0;c<b.length;c++)a=b[c],a.mainUI=this.mainUI,a.updateChildrenHierarchy()},toDom:function(){for(var a=0;a<this.elements.length;a++)this.$el.append(this.elements[a].toDom());return this.$el},enable:function(){this.enabled=!0,this.$el.addClass("enabled"),this.$el.removeClass("disabled")},disable:function(){this.enabled=!1,this.$el.addClass("disabled"),this.$el.removeClass("enabled")},toggle:function(){this.enabled?this.disable():this.enable()},setEvent:function(a,b,c){"function"==typeof b?this.$el.on(a,b.bind(this)):"string"==typeof b&&this.$el.on(a,b,c.bind(this))},on:function(a,b){this.listeners[a]||(this.listeners[a]=[]),this.listeners[a].push(b)},off:function(a){this.listeners[a]=null},trigger:function(a,b){if(this.listeners[a]){this.mainUI&&this.mainUI.eventlog&&console.log("trigger: ",this.name,a,b);for(var c=0;c<this.listeners[a].length;c++)this.listeners[a][c](b,a)}}},a}(),b=function(a,b){function c(a,c,d){this.type=d,b.call(this,a,c)}return c.prototype=Object.create(b.prototype),c.prototype.getElement=function(){return a("<div/>").attr("id","ic-"+this.name).addClass("ic-"+this.type).append(a("<p/>").text(this.title))},c}(a),c=function(a){function b(b,c){a.call(this,b,c,"panel"),this.addComponents()}return b.prototype=Object.create(a.prototype),b.prototype.addComponents=function(){},b}(b),d=function(a){function b(b,c,d){a.call(this,b+"-"+c,d,"panel-component")}return b.prototype=Object.create(a.prototype),b}(b),e=function(a,b){function c(a){this.components=a,b.call(this,"group")}return c.prototype=Object.create(b.prototype),c.prototype.getElement=function(){for(var b=a("<div/>").addClass("block"),c=0;c<this.components.length;c++)b.append(this.components[c].toDom());return b},c}(jQuery,a),f=function(a){function b(){a.call(this,"navigation","navigation","navigation")}return b.prototype=Object.create(a.prototype),b.prototype.getElement=function(){return $("<nav/>").append("<ul/>")},b.prototype.initEvents=function(){this.setEvent("click","a",function(a){this.trigger("click",$(a.currentTarget).data("panel"))})},b.prototype.addTab=function(a,b){this.$el.find("ul").append($("<li/>").append($("<a/>").data("panel",a).text(b)))},b}(b),g=function(a,b){function c(b){if(this.ID=b,this.$el=a("#"+b),0==this.$el.length)throw new Error("main UI not initialized: probably given ID does not exists in dom");this.panels=[],this.panelsMap={},this.currentPanel=null,this.eventlog=!1,this.nav=null}return c.prototype={init:function(){this.initNavigation()},initNavigation:function(){this.nav=new b,this.nav.on("click",function(a){this.changePanel(a,200)}.bind(this)),this.addPanel(this.nav)},logEvents:function(a){this.eventlog=a},changePanel:function(b,c){var d=a("#"+b),e=null==this.currentPanel||this.currentPanel.attr("id")!=b;e&&(this.currentPanel&&this.currentPanel.fadeOut(c),this.currentPanel=d,c?this.currentPanel.fadeIn(c):this.currentPanel.show())},addPanel:function(a,c){return c||(c=a.name),!(a instanceof b)&&this.nav&&this.nav.addTab(a.name,c),this.panels.push(a),this.panelsMap[a.name]=a,a.addTo(this),this.$el.append(a.toDom()),a}},c}(jQuery,f),h=function(a,b,c,d,e,f,g){var h={};return h.core={},h.core.PUIElement=a,h.core.PUIElementContainer=b,h.core.PUIMain=c,h.panels={},h.panels.PUINavigation=d,h.panels.PUIPanel=e,h.panels.PUIPanelComponent=f,h.panels.PUIPanelComponentGroup=g,h}(a,b,g,f,c,d,e);return h}();
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
            p_O4E: " (M'U)4   (MU)4 ",
            p_O2U: " (M'U)3 U (MU)3 U ",
            p_O2D: " (M'D)3 D (MD)3 D ",
            p_O2F: " (M'F)3 F (MF)3 F ",
            p_O2B: " (M'B)3 B (MB)3 B ",
            p_O6L: " (R'FRU)5 ",
            p_O6R: " ([O6L])m ",

            /* -- orient corners -- */
            p_CW2: " (U'RU) R' (U'RU) ",
            p_CC2: " ([CW2])i ",
            p_CW3: " ((UR)'UR)2 ",
            p_CC3: " ([CW3])i ",

            /* -- parity -- */
            p_PTJ: " (L'U2) LU (L'U2) (RU') L (RU')i ",
            p_PAR: " (U'F2) [PTJ] (U'F2)i ",

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
             * Returns TRUE if the given string is actually a single rotation
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
            pattern  : function(m) { return (/^(o2[udfb]|o4e|o6[lr]|c[cw][23]|ptj|par)$/i).test(m); },

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
            accepted : function(move, but, only) {
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
                return seq.replace(/[^udfblrmesxyz2-9i'\-\+\(\)\[\]_oecwptja]+/ig,'');
            },

            /**
             * Returns a comma separated string with only accepted moves and patterns (faces, slices, axis, pieces, orient, parity)
             * It accepts all from clear.sequence, plus
             *      patterns: _o2u,_o2d,_o2f,_o2b,_o4e,_o6l,_o6r,_cw2,_cc2,_cw3,_cc3,_ptj,_par
             *
             * @param seq {String}
             * @returns {String}
             */
            pieces: function(seq) {
                seq = seq.replace(/[i']+/ig,'-');
                seq = seq.replace(/[,;\.\n\r ]+/g,',');
                seq = seq.replace(/[^udfblrmesxyz2\-\+,_oecwptja346]+/ig,'');

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
                seq = seq.replace(/[^udfblrmesxyz2i'\-\+]+/ig,'');
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
            name=='BEGIN' && this.willExplain();

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

            name=='END' && this.didExplain();

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

        this.renderOrder = ['DBL','DB','DRB','DL','D','DR','DLF','DF','DFR','BL','B','BR','L','R','FL','F','FR','ULB','UB','UBR','UL','U','UR','UFL','UF','URF'];
        this.renderOptions = {
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
        this.options.showAxis && this.iso.engine.drawUtils.axis(this.iso.layer,200);
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
            this.addCube(position, origin.add(new Point(size*px,size*py,size*pz)), size, isFull);

        this.drawCube(position, stickers, size, {fills:fills,stroke:RubikUtils.colors.core}, isFull);
    };
    RubikCubeISO.prototype.addCube = function(name, origin, size, full_cube) {

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
            child.setRenderInfo( this.iso.engine.drawUtils[squareType](size), {strokeColor:fill==null?null:stroke, fillColor:fill, strokeSize:1} );

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

/**
 * Created by fdimonte on 24/04/2015.
 */

var RHAnalyze = (function($, PUIElement){

    /**
     * RHAnalyze Class
     *
     * @constructor
     */
    function RHAnalyze() {
        PUIElement.call(this,'analyze');
    }

    /**
     * RHAnalyze prototype
     *
     * @type {PUIElement}
     */
    RHAnalyze.prototype = Object.create(PUIElement.prototype);

    /* *******************************
     * OVERRIDE SUPER CLASS METHODS
     * *******************************/

    RHAnalyze.prototype.getElement = function() {
        return $('<div/>')
            .append($('<label/>')
                .append($('<button/>').attr('type','button').attr('id','ic-solve-analyze')
                    .append($('<span/>').text('get pattern'))
            )
        );
    };

    RHAnalyze.prototype.initEvents = function() {
        this.setEvent('click','#ic-solve-analyze',function(e){
            this.trigger('get_pattern');
        });
    };

    /* *******************************
     * IMPLEMENT CUSTOM METHODS
     * *******************************/

    return RHAnalyze;

}(jQuery, PUIElement));

/**
 * Created by fdimonte on 24/04/2015.
 */

var RHCubeColors = (function($, PUIElement, RubikUtils){

    /**
     * RHCubeColors Class
     *
     * @constructor
     */
    function RHCubeColors() {
        this.colorsData = null;
        this.canvasWidth = 220;
        this.canvasHeight = 100;

        PUIElement.call(this,'cubecolors');
    }

    /**
     * RHCubeColors prototype
     *
     * @type {PUIElement}
     */
    RHCubeColors.prototype = Object.create(PUIElement.prototype);

    /* *******************************
     * OVERRIDE SUPER CLASS METHODS
     * *******************************/

    RHCubeColors.prototype.getElement = function() {
        var canvas = document.createElement('canvas');
        canvas.width = this.canvasWidth;
        canvas.height = this.canvasHeight;
        drawPicker(canvas);

        var ctx = canvas.getContext('2d');
        var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        this.colorsData = imageData.data;

        return $(canvas).attr('id','ColorPicker');
    };

    RHCubeColors.prototype.initEvents = function() {
        this.setEvent('click',function(e){
            var elPos = $(e.currentTarget).offset(),
                msPos = {top: e.pageY, left: e.pageX};

            var pos = {
                left : msPos.left - elPos.left,
                top  : msPos.top  - elPos.top
            };

            var idx = Math.round(pos.top * this.canvasWidth + pos.left) * 4;

            var colR = this.colorsData[idx+0],
                colG = this.colorsData[idx+1],
                colB = this.colorsData[idx+2];
            var hexR = ('00'+colR.toString(16)).substr(-2),
                hexG = ('00'+colG.toString(16)).substr(-2),
                hexB = ('00'+colB.toString(16)).substr(-2);

            var colStr = '#' + hexR + hexG + hexB;
            this.trigger('change_colors',colStr);
        });
    };

    /* *******************************
     * PRIVATE METHODS
     * *******************************/

    function drawPicker(canvas) {
        var ctx = canvas.getContext('2d');
        ctx.rect(0, 0, canvas.width, canvas.height);

        var w = canvas.width,
            h = canvas.height;

        var qx = 0,
            qy = 0,
            qw = w/6,
            qh = qw/2;

        var colpikX = 0,
            colpikY = qh,
            colpikW = w,
            colpikH = h-qh;

        var arr = ['#FF0000','#FFFF00','#00FF00','#00FFFF','#0000FF','#FF00FF','#FF0000'];
        var grd1 = ctx.createLinearGradient(colpikX, colpikY+colpikH, colpikX+colpikW, colpikY+colpikH);
        for(var c=0;c<arr.length;c++) grd1.addColorStop(Math.floor(100/6*c)/100,arr[c]);

        var grd2 = ctx.createLinearGradient(colpikX+colpikW, colpikY, colpikX+colpikW, colpikY+colpikH/2);
        grd2.addColorStop(0, 'rgba(255,255,255,0.9)');
        grd2.addColorStop(1, 'rgba(255,255,255,0)');

        var grd3 = ctx.createLinearGradient(colpikX+colpikW, colpikY+colpikH/2, colpikX+colpikW, colpikY+colpikH);
        grd3.addColorStop(0, 'rgba(0,0,0,0)');
        grd3.addColorStop(1, 'rgba(0,0,0,0.9)');

        ctx.fillStyle = grd1;
        ctx.fill();
        ctx.fillStyle = grd2;
        ctx.fill();
        ctx.fillStyle = grd3;
        ctx.fill();

        var fills = [RubikUtils.colors.U,RubikUtils.colors.D,RubikUtils.colors.F,RubikUtils.colors.B,RubikUtils.colors.L,RubikUtils.colors.R];
        for(var f=0;f<fills.length;f++){
            ctx.fillStyle = fills[f];
            ctx.fillRect(qw*f,qy,qw,qy+qh);
        }

        ctx.strokeStyle = '#222222';
        ctx.stroke();
    }

    return RHCubeColors;

}(jQuery, PUIElement, RubikUtils));

/**
 * Created by fdimonte on 24/04/2015.
 */

var RHCubeSetup = (function($, PUIElement){

    /**
     * RHCubeSetup Class
     *
     * @constructor
     */
    function RHCubeSetup() {
        PUIElement.call(this,'cubesetup')
    }

    /**
     * RHCubeSetup prototype
     *
     * @type {PUIElement}
     */
    RHCubeSetup.prototype = Object.create(PUIElement.prototype);

    /* *******************************
     * OVERRIDE SUPER CLASS METHODS
     * *******************************/

    RHCubeSetup.prototype.getElement = function() {
        return $('<div/>')
            .append($('<div/>')
                .append($('<label/>')
                    .append( $('<button/>').attr('type','button').attr('id','ic-cubesetup-reset').append($('<span/>').text('reset cube')) )
            )
                .append($('<label/>')
                    .append( $('<button/>').attr('type','button').attr('id','ic-cubesetup-getimage').append($('<span/>').text('get image')) )
            )
        )
            .append($('<div/>')
                .append($('<label/>')
                    .append( $('<input/>').attr('type','checkbox').attr('id','ic-cubesetup-editcube') )
                    .append( $('<span/>').text('edit cube') )
            )
                .append($('<label/>')
                    .append( $('<input/>').attr('type','checkbox').attr('id','ic-cubesetup-backfaces') )
                    .append( $('<span/>').text('show back faces') )
            )
        );
    };

    RHCubeSetup.prototype.initEvents = function() {
        this.setEvent('change','input',function(e){
            var $t = $(e.currentTarget);

            if($t.attr('id').indexOf('backfaces')>-1)
                this.trigger('togglebackface',$t.is(':checked'));

            else if($t.attr('id').indexOf('editcube')>-1)
                this.trigger('toggleeditcube',$t.is(':checked'));

        });
        this.setEvent('click','button',function(e){
            var $t = $(e.currentTarget);

            if($t.attr('id').indexOf('getimage')>-1)
                this.trigger('getimage');

            else if($t.attr('id').indexOf('reset')>-1)
                this.trigger('reset');

        });
    };

    return RHCubeSetup;

}(jQuery, PUIElement));

/**
 * Created by fdimonte on 24/04/2015.
 */

var RHExplainList = (function($, PUIElement){

    /**
     * RHExplainList Class
     *
     * @constructor
     */
    function RHExplainList() {
        PUIElement.call(this,'explain-list');
        this.explainArray = null;
        this.currentGroup = 0;
        this.currentPriority = -1;
    }

    /**
     * RHExplainList prototype
     *
     * @type {PUIElement}
     */
    RHExplainList.prototype = Object.create(PUIElement.prototype);

    /* *******************************
     * OVERRIDE SUPER CLASS METHODS
     * *******************************/

    RHExplainList.prototype.getElement = function() {
        return $('<div/>');
    };

    RHExplainList.prototype.initEvents = function() {
        this.setEvent('click','strong',function(e){
            var $t = $(e.currentTarget);
            var $p = $t.parent();
            $p.find('>div').toggle();
            $p.find('>p').toggle();
            this.showCurrentPriority();
        });
    };

    RHExplainList.prototype.setValue = function(value) {
        this.explainArray = value;
        clear.call(this);
        for(var i=0;i<value.length;i++){
            addRow.call(this,value[i]);
        }
        this.collapseAll();
        this.showCurrentPriority();
    };

    RHExplainList.prototype.getValue = function() {
        return this.explainArray;
    };

    /* *******************************
     * IMPLEMENT CUSTOM METHODS
     * *******************************/

    RHExplainList.prototype.setPriority = function(priority) {
        this.currentPriority = Number(priority);
    };

    RHExplainList.prototype.showCurrentPriority = function() {
        var currentPriority = this.currentPriority;

        if(currentPriority>=0)
            this.$el.find('div').addClass('showall');
        else
            this.$el.find('div').removeClass('showall');

        this.$el.find('strong,p').each(function(i,e){
            if(currentPriority==-1 || currentPriority>=$(this).data('priority'))
                $(this).data('hidden',false).removeClass('hidden');
            else
                $(this).data('hidden',true).addClass('hidden');
        });
    };

    RHExplainList.prototype.collapseAll = function() {
        this.$el.find('div div, div p').hide();
    };

    RHExplainList.prototype.expandAll = function() {
        this.$el.find('div, p:not(.hidden)').show();
    };

    /* *******************************
     * PRIVATE METHODS
     * *******************************/

    function clear() {
        this.$el.empty();
        this.currentGroup = this.$el;
    }

    function addRow(object) {

        var $elem = $('<p/>'),
            $group = this.currentGroup,
            $group_new = $('<div/>'),
            group_open = object.g==1,
            group_close = object.g==-1;

        if(group_open){
            $elem = $('<strong/>');
            $group = $group_new;
            this.currentGroup.append($group_new);
            this.currentGroup = $group_new;
        }
        else if(group_close && this.currentGroup!=this.$el){
            this.currentGroup = this.currentGroup.parent();
        }
        $group.append($elem.data('priority',object.p).addClass('p_'+object.p).text(object.m));

    }

    return RHExplainList;

}(jQuery, PUIElement));

/**
 * Created by fdimonte on 24/04/2015.
 */

var RHExplainPriority = (function($, PUIElement){

    /**
     * RHExplainPriority Class
     *
     * @constructor
     */
    function RHExplainPriority() {
        PUIElement.call(this,'explain-priority');
    }

    /**
     * RHExplainPriority prototype
     *
     * @type {PUIElement}
     */
    RHExplainPriority.prototype = Object.create(PUIElement.prototype);

    /* *******************************
     * OVERRIDE SUPER CLASS METHODS
     * *******************************/

    RHExplainPriority.prototype.getElement = function() {
        return $('<span/>')
            .append($('<label/>')
                .append($('<input/>').attr('type','radio').attr('name','priority').val(-1).prop('checked',true))
                .append($('<span/>').text('all'))
        )
            .append($('<label/>')
                .append($('<input/>').attr('type','radio').attr('name','priority').val(0))
                .append($('<span/>').text('0'))
        )
            .append($('<label/>')
                .append($('<input/>').attr('type','radio').attr('name','priority').val(1))
                .append($('<span/>').text('1'))
        )
            .append($('<label/>')
                .append($('<input/>').attr('type','radio').attr('name','priority').val(2))
                .append($('<span/>').text('2'))
        );
    };

    RHExplainPriority.prototype.initEvents = function() {
        this.setEvent('change','input',function(e){
            this.trigger('change_priority',$(e.currentTarget).val());
        });
    };

    RHExplainPriority.prototype.setValue = function(value) {
        var $priority = this.$el.find('input[name=priority][value='+value+']');
        $priority.length>0 && $priority.prop('checked', true);
    };

    RHExplainPriority.prototype.getValue = function() {
        return this.$el.find('input:checked').val();
    };

    return RHExplainPriority;

}(jQuery, PUIElement));

/**
 * Created by fdimonte on 24/04/2015.
 */

var RHFaceButtons = (function($, PUIElement){

    /**
     * RHFaceButtons Class
     *
     * @param name
     * @param faces
     * @constructor
     */
    function RHFaceButtons(name,faces) {
        this.faces = faces;
        PUIElement.call(this,name);
    }

    /**
     * RHFaceButtons prototype
     * @type {PUIElement}
     */
    RHFaceButtons.prototype = Object.create(PUIElement.prototype);

    /* *******************************
     * OVERRIDE SUPER CLASS METHODS
     * *******************************/

    RHFaceButtons.prototype.getElement = function() {
        var $faces_ul = $('<ul/>');
        for(var f=0;f<this.faces.length;f++){
            $faces_ul.append(this.faceButton(this.faces[f],this.name,'<li/>'))
        }
        return $faces_ul;
    };

    RHFaceButtons.prototype.initEvents = function() {
        this.setEvent('click','.ic-ui-face',function(e){
            var $t = $(e.currentTarget);
            if($t.hasClass('disabled')) return;

            var face = $t.data('face');
            this.trigger('click',face);
        });
    };

    /* *******************************
     * IMPLEMENT CUSTOM METHODS
     * *******************************/

    RHFaceButtons.prototype.disableFaces = function(faces) {
        var $buttons = getButtons.call(this,faces);
        $buttons.addClass('disabled');
    };

    RHFaceButtons.prototype.enableFaces = function(faces) {
        var $buttons = getButtons.call(this,faces);
        $buttons.removeClass('disabled');
    };

    RHFaceButtons.prototype.faceButton = function(face,type,tag) {
        type || (type='face');
        return $(tag)
            .data('face',face)
            .addClass('ic-ui-face')
            .addClass('ic-ui-'+type+'-'+face);
    };

    /* *******************************
     * PRIVATE METHODS
     * *******************************/

    function getButtons(faces) {
        var $buttons = this.$el.find('.ic-ui-face');
        if(faces) $buttons = $buttons.filter(function(i,e){ return (faces.indexOf($(e).data('face'))>-1); });
        return $buttons;
    }

    return RHFaceButtons;

}(jQuery, PUIElement));

/**
 * Created by fdimonte on 24/04/2015.
 */

var RHGroupButtons = (function($, PUIElement){

    /**
     * RHGroupButtons Class
     *
     * @constructor
     */
    function RHGroupButtons() {
        PUIElement.call(this,'groupbuttons');
        this.group = 0;
    }

    /**
     * RHGroupButtons prototype
     *
     * @type {PUIElement}
     */
    RHGroupButtons.prototype = Object.create(PUIElement.prototype);

    /* *******************************
     * OVERRIDE SUPER CLASS METHODS
     * *******************************/

    RHGroupButtons.prototype.getElement = function() {
        return $('<span/>')
            .append(groupButton('open'))
            .append(groupButton('close',null,true))
            .append(groupButton('negative',null,true))
            .append(groupButton('inverse',null,true))
            .append(groupButton('mirror',null,true));
    };

    RHGroupButtons.prototype.initEvents = function() {
        this.setEvent('click','button',function(e){
            var $this = $(e.currentTarget);
            var action = $this.data('action');

            switch (action) {
                case 'open':
                    groupOpen.call(this) && this.trigger('click', "(");
                    break;
                case 'close':
                    groupClose.call(this) && this.trigger('click', ") ");
                    break;
                case 'negative':
                    groupClose.call(this) && this.trigger('click', ")' ");
                    break;
                case 'inverse':
                    groupClose.call(this) && this.trigger('click', ")i ");
                    break;
                case 'mirror':
                    groupClose.call(this) && this.trigger('click', ")m ");
                    break;
            }
        });
    };

    /* *******************************
     * IMPLEMENT CUSTOM METHODS
     * *******************************/

    RHGroupButtons.prototype.updateGroupStatus = function(value) {
        var i,p,
            group = 0,
            par = value.replace(/[^/(|/)]/g,'');
        for(i=0;i<par.length;i++){
            p = par.charAt(i);
            p=='(' && group++;
            p==')' && group--;
        }
        group>0 ? groupOpenRender.call(this) : groupCloseRender.call(this);
    };

    /* *******************************
     * PRIVATE METHODS
     * *******************************/

    function groupButton(action,label,disabled) {
        label || (label=action);
        return $('<label/>')
            .append($('<button/>').attr('type','button').attr('data-action',action)).addClass(disabled?'disabled':'')
            .append($('<span/>').text(label));
    }

    function groupOpen() {
        this.group++;
        groupOpenRender.call(this);
        return true;
    }

    function groupClose() {
        if(this.group==0) return false;
        --this.group==0 && groupCloseRender.call(this);
        return true;
    }

    function groupOpenRender() {
        this.$el.find('.disabled').removeClass('disabled');
    }

    function groupCloseRender() {
        this.$el.find('button').filter(':not([data-action=open])').addClass('disabled');
    }

    return RHGroupButtons;

}(jQuery, PUIElement));

/**
 * Created by fdimonte on 24/04/2015.
 */

var RHHighlightList = (function($, PUIElement){

    /**
     * RHHighlightList Class
     *
     * @constructor
     */
    function RHHighlightList() {
        PUIElement.call(this,'highlights-list');
    }

    /**
     * RHHighlightList prototype
     *
     * @type {PUIElement}
     */
    RHHighlightList.prototype = Object.create(PUIElement.prototype);

    /* *******************************
     * OVERRIDE SUPER CLASS METHODS
     * *******************************/

    RHHighlightList.prototype.getElement = function() {
        return $('<ul/>')
            .append(highlightChoice('render','none','none',true))
            .append(highlightChoice('highlight','face U',['ULB','UB','UBR','UL','U','UR','UFL','UF','URF']))
            .append(highlightChoice('highlight','face F',['FLU','FU','FUR','FL','F','FR','FDL','FD','FRD']))
            .append(highlightChoice('highlight','face R',['RFU','RU','RUB','RF','R','RB','RDF','RD','RBD']))
            .append(highlightChoice('highlight','face D',['DLF','DF','DFR','DL','D','DR','DBL','DB','DRB']))
            .append(highlightChoice('highlight','face B',['BRU','BU','BUL','BR','B','BL','BDR','BD','BLD']))
            .append(highlightChoice('highlight','face L',['LBU','LU','LUF','LB','L','LF','LDB','LD','LFD']))
            .append(highlightChoice('highlight','slice M',['F','U','B','D','UF','UB','DB','DF']))
            .append(highlightChoice('highlight','slice E',['F','R','B','L','FL','FR','BL','BR']))
            .append(highlightChoice('highlight','slice S',['U','R','D','L','UL','UR','DR','DL']))
            .append(highlightChoice('highlight','parity',['DF','DFR','UB','UBR']))
            .append(highlightChoice('highlight','J-perm',['ULB','UL','UFL','UF']))
            .append(highlightChoice('highlight','orient 2 edges',['UF','UB']))
            .append(highlightChoice('highlight','orient 4 edges',['UF','UB','UL','UR']))
            .append(highlightChoice('highlight','orient corner',['UFL']))
            .append(highlightChoice('highlight','custom','custom'));
    };

    RHHighlightList.prototype.initEvents = function() {
        this.setEvent('change','input',function(e){
            this.trigger('changelist',$(e.currentTarget).val());
        });
    };

    RHHighlightList.prototype.setValue = function(value) {
        var $el = this.$el.find('label').filter(function(i,e){
            return ($(e).text()==value);
        });
        if($el.length==1){
            $el.find('input').prop('checked',true);
        }
    };

    RHHighlightList.prototype.getValue = function() {
        return this.$el.find('input:checked').val();
    };

    /* *******************************
     * PRIVATE METHODS
     * *******************************/

    function highlightChoice(type,text,value,checked) {
        return $('<li/>')
            .append(
            $('<label/>').text(text).prepend(
                $('<input/>')
                    .addClass('ic-hl-'+type)
                    .attr('type','radio')
                    .attr('name','hl-choice')
                    .attr('value',value)
                    .prop('checked',checked)
            )
        );
    }

    return RHHighlightList;

}(jQuery, PUIElement));

/**
 * Created by fdimonte on 24/04/2015.
 */

var RHHighlightPieces = (function($, PUIElement, RHPieceButton, RubikUtils){

    /**
     * RHHighlightPieces Class
     *
     * @constructor
     */
    function RHHighlightPieces() {
        PUIElement.call(this,'highlights-pieces');
        this.pieces = [];
    }

    /**
     * RHHighlightPieces prototype
     *
     * @type {PUIElement}
     */
    RHHighlightPieces.prototype = Object.create(PUIElement.prototype);

    /* *******************************
     * OVERRIDE SUPER CLASS METHODS
     * *******************************/

    RHHighlightPieces.prototype.getElement = function() {
        return $('<div/>')
            .append($('<div/>').addClass('ic-highlights-pieces-container')
                .append(pieceButton('U'))
                .append(pieceButton('D'))
                .append(pieceButton('F'))
                .append(pieceButton('B'))
                .append(pieceButton('L'))
                .append(pieceButton('R'))
        )
            .append($('<div/>').addClass('ic-highlights-pieces-container')
                .append(pieceButton('UF'))
                .append(pieceButton('UB'))
                .append(pieceButton('UL'))
                .append(pieceButton('UR'))
        )
            .append($('<div/>').addClass('ic-highlights-pieces-container')
                .append(pieceButton('DF'))
                .append(pieceButton('DB'))
                .append(pieceButton('DL'))
                .append(pieceButton('DR'))
        )
            .append($('<div/>').addClass('ic-highlights-pieces-container')
                .append(pieceButton('FL'))
                .append(pieceButton('FR'))
                .append(pieceButton('BL'))
                .append(pieceButton('BR'))
        )
            .append($('<div/>').addClass('ic-highlights-pieces-container')
                .append(pieceButton('UFL'))
                .append(pieceButton('ULB'))
                .append(pieceButton('UBR'))
                .append(pieceButton('URF'))
        )
            .append($('<div/>').addClass('ic-highlights-pieces-container')
                .append(pieceButton('DFR'))
                .append(pieceButton('DRB'))
                .append(pieceButton('DBL'))
                .append(pieceButton('DLF'))
        );
    };

    RHHighlightPieces.prototype.initEvents = function() {
        this.setEvent('click','.ic-ui-piece',function(e){
            var $piece = $(e.currentTarget);
            var piece = $piece.data('piece');

            if($piece.hasClass('unselected')) {
                $piece.removeClass('unselected');
                this.pieces.push(piece);
            }
            else {
                $piece.addClass('unselected');
                var i = this.pieces.indexOf(piece);
                i>-1 && (this.pieces.splice(i,1));
            }

            this.trigger('changepiece',this.pieces.join(','));
        });
    };

    RHHighlightPieces.prototype.setValue = function(value) {
        if(typeof(value)=='array')
            this.pieces = value;
        else
            throw new Error('RHHighlightPieces.setValue() called with a wrong value');

        var p,piece,target,
            $piece,$pieces = this.$el.find('.ic-ui-piece');

        $pieces.addClass('unselected');
        for(p=0;p<this.pieces.length;p++){
            piece = this.pieces[p];
            target = RubikUtils.service.targetOf(piece);
            $piece = $pieces.filter(function(i,e){
                return $(e).data('piece') == piece;
            });
            $piece.removeClass('unselected');
        }
        this.trigger('changepiece',this.pieces.join(','));
    };

    RHHighlightPieces.prototype.getValue = function() {
        return this.pieces;
    };

    /* *******************************
     * PRIVATE METHODS
     * *******************************/

    function pieceButton(piece) {
        var btn = new RHPieceButton(piece,true);
        return btn.toDom().addClass('unselected');
    }

    return RHHighlightPieces;

}(jQuery, PUIElement, RHPieceButton, RubikUtils));

/**
 * Created by fdimonte on 24/04/2015.
 */

var RHMovesList = (function($, PUIElement){

    /**
     * RHMovesList Class
     *
     * @constructor
     */
    function RHMovesList() {
        PUIElement.call(this,'moveslist');
    }

    /**
     * RHMovesList prototype
     * @type {PUIElement}
     */
    RHMovesList.prototype = Object.create(PUIElement.prototype);

    /* *******************************
     * OVERRIDE SUPER CLASS METHODS
     * *******************************/

    RHMovesList.prototype.getElement = function() {
        return $('<p/>')
            .addClass('ic-ui-moves')
            .html('&nbsp;');
    };

    RHMovesList.prototype.setValue = function(value) {
        this.$el.html(value);
    };

    RHMovesList.prototype.getValue = function() {
        return this.$el.text();
    };

    return RHMovesList;

}(jQuery, PUIElement));

/**
 * Created by fdimonte on 24/04/2015.
 */

var RHPieceButton = (function($, PUIElement, RHFaceButtons, RubikUtils){

    /**
     * RHPieceButton Class
     *
     * @param name
     * @param avoidInteraction
     * @constructor
     */
    function RHPieceButton(name,avoidInteraction) {
        this.avoidInteraction = avoidInteraction;
        PUIElement.call(this,name||'piece');
        this.setValue(name);
        this.faces = null;
        this.axis = null;
    }

    /**
     * RHPieceButton prototype
     *
     * @type {PUIElement}
     */
    RHPieceButton.prototype = Object.create(PUIElement.prototype);

    /* *******************************
     * OVERRIDE SUPER CLASS METHODS
     * *******************************/

    RHPieceButton.prototype.getElement = function() {
        return $('<ul/>').addClass('ic-ui-piece').data('piece',this.name);
    };

    RHPieceButton.prototype.initEvents = function() {
        if(this.avoidInteraction) return;

        this.setEvent('click',function(e){
            if(!this.enabled) return false;
            if(!this.faces) {
                this.faces = [];
                this.trigger('editbegin','');//should disable sliceButtons and axisButtons
            }else{
                var piece = this.faces.join('');
                piece.length>=2 && (piece='['+piece+']');
                this.reset();
                this.trigger('editend',piece);// enableAllFaces(); addMoveToSequence(piece);
            }
            return true;
        });
    };

    RHPieceButton.prototype.setValue = function(value) {
        if(value){
            this.reset();
            for(var f=0; f<value.length; f++){
                this.addFace(value.charAt(f));
            }
        }
    };

    RHPieceButton.prototype.getValue = function() {
        return this.$el.data('piece');
    };

    /* *******************************
     * IMPLEMENT CUSTOM METHODS
     * *******************************/

    RHPieceButton.prototype.addFace = function(face,forceAdd) {

        this.$el.append(RHFaceButtons.prototype.faceButton(face,'face','<li/>'));

        if(this.faces || forceAdd){
            this.faces || (this.faces=[]);
            this.faces.push(face);
            this.$el.data('piece',this.faces.join(''));
            this.trigger('wontaccept',RubikUtils.service.notAcceptedWithPiece(this.faces));
        }

    };

    RHPieceButton.prototype.reset = function() {
        this.faces = null;
        this.$el.empty();
    };

    return RHPieceButton;

}(jQuery, PUIElement, RHFaceButtons, RubikUtils));

/**
 * Created by fdimonte on 24/04/2015.
 */

var RHReplay = (function($, PUIElement){

    /**
     * RHReplay Class
     *
     * @constructor
     */
    function RHReplay() {
        PUIElement.call(this,'replay');
        this.replaytype = 'play';
    }

    /**
     * RHReplay prototype
     *
     * @type {PUIElement}
     */
    RHReplay.prototype = Object.create(PUIElement.prototype);

    /* *******************************
     * OVERRIDE SUPER CLASS METHODS
     * *******************************/

    RHReplay.prototype.getElement = function() {
        return $('<div/>')
            .append($('<label/>').addClass('ic-solve-replay-chose')
                .append($('<input/>').attr('type','radio').attr('name','replay').val('restore').prop('checked',true))
                .append($('<span/>').text('restore the last scrambled cube'))
        )
            .append($('<label/>').addClass('ic-solve-replay-chose').addClass('disabled')
                .append($('<input/>').attr('type','radio').attr('name','replay').val('click'))
                .append($('<span/>').text('click the cube to step ahead'))
        )
            .append($('<label/>').addClass('ic-solve-replay-chose').addClass('disabled')
                .append($('<input/>').attr('type','radio').attr('name','replay').val('play'))
                .append($('<span/>').text('play each single move every'))
                .append($('<input/>').attr('type','textfield').addClass('ic-ui-textfield').attr('id','ic-solve-replay-delay').val('1.5'))
                .append($('<span/>').text('seconds'))
        )
            .append($('<label/>')
                .append($('<button/>').attr('type','button').attr('id','ic-solve-replay-execute')
                    .append($('<span/>').text('replay'))
            )
        );
    };

    RHReplay.prototype.initEvents = function() {
        this.setEvent('change','input[name=replay]',function(e){
            var $labels = this.$el.find('.ic-solve-replay-chose');
            $labels.addClass('disabled');
            var $radio = $(e.currentTarget);
            $radio.is(':checked') && $radio.closest('.ic-solve-replay-chose').removeClass('disabled');
        });
        this.setEvent('click','.ic-solve-replay-chose',function(e){
            var $radio = $(e.currentTarget).find('input[name=replay]');
            if($radio.length && !$radio.is(':checked')){
                this.replaytype = $radio.val();
                this.trigger('change', this.replaytype);
            }
        });
        this.setEvent('click','#ic-solve-replay-execute',function(e){
            var eventValue =
                this.replaytype=='play' ?
                    this.$el.find('#ic-solve-replay-delay').val() :
                    'manual';

            this.trigger('replay',eventValue);
        });
    };

    return RHReplay;

}(jQuery, PUIElement));

/**
 * Created by fdimonte on 24/04/2015.
 */

var RHSequenceInput = (function($, PUIElement){

    /**
     * RHSequenceInput Class
     *
     * @param name
     * @constructor
     */
    function RHSequenceInput(name) {
        PUIElement.call(this,name);
    }

    /**
     * RHSequenceInput prototype
     *
     * @type {PUIElement}
     */
    RHSequenceInput.prototype = Object.create(PUIElement.prototype);

    /* *******************************
     * OVERRIDE SUPER CLASS METHODS
     * *******************************/

    RHSequenceInput.prototype.getElement = function() {
        return $('<div/>')
            .append(
            $('<label/>').append(
                $('<input/>').addClass('ic-ui-sequence').attr('type','text')
            )
        )
            .append(
            $('<label/>').append(
                $('<button/>').attr('id','ic-'+this.name+'-execute').attr('type','button').append($('<span/>').text('execute'))
            )
        );
    };

    RHSequenceInput.prototype.initEvents = function() {
        this.setEvent('keyup','.ic-ui-sequence',function(e){
            // TODO: improve this handler and make it accept only accepted letters and symbols
            var event = e.keyCode==13 ? 'execute' : 'change';
            var value = this.$el.find('.ic-ui-sequence').val();
            this.trigger(event,value);
        });
        this.setEvent('click','button',function(e){
            this.trigger('execute',this.$el.find('.ic-ui-sequence').val())
        });
    };

    RHSequenceInput.prototype.setValue = function(value) {
        this.$el.find('.ic-ui-sequence').val(value);
        this.trigger('change',value);
    };

    RHSequenceInput.prototype.getValue = function() {
        return this.$el.find('.ic-ui-sequence').val();
    };

    return RHSequenceInput;

}(jQuery, PUIElement));

/**
 * Created by fdimonte on 24/04/2015.
 */

var PanelSequenceToMoves = (function(RubikUtils, PUIPanel, PUIPanelComponent, PUIPanelComponentGroup, RHSequenceInput, RHMovesList){

    /**
     * PanelSequenceToMoves Class
     *
     * @param name
     * @constructor
     */
    function PanelSequenceToMoves(name) {
        this.sequence = null;
        this.moveslist = null;
        PUIPanel.call(this,name);
        this.addCustomComponents();
    }

    /**
     * PanelSequenceToMoves prototype
     *
     * @type {PUIPanel}
     */
    PanelSequenceToMoves.prototype = Object.create(PUIPanel.prototype);

    /* *******************************
     * OVERRIDE SUPER CLASS METHODS
     * *******************************/

    PanelSequenceToMoves.prototype.addComponents = function() {

        // DON'T override this method
        // if you need so, maybe you should extend PUIPanel instead
        // otherwise, override addCustomComponents method!

        // sequence input
        var sequenceContainer = new PUIPanelComponent(this.name,'sequence','sequence');
        this.sequence = new RHSequenceInput(this.name);
        sequenceContainer.addChild(this.sequence);

        // moves output
        var moveslistContainer = new PUIPanelComponent(this.name,'moveslist','moves');
        this.moveslist = new RHMovesList();
        moveslistContainer.addChild(this.moveslist);

        // events
        this.sequence.on('change',inputHandler.bind(this));
        this.sequence.on('execute',inputHandler.bind(this));

    };

    /* *******************************
     * IMPLEMENT CUSTOM METHODS
     * *******************************/

    PanelSequenceToMoves.prototype.addCustomComponents = function() {
        // override this method to add custom components (and set their events)

        // note: don't forget to copy/paste these two lines, if needed.
        // note: if you don't need these two components, override PUIPanel instead.
        this.addChild(new PUIPanelComponentGroup([ this.sequence.parent ]));
        this.addChild(new PUIPanelComponentGroup([ this.moveslist.parent ]));
    };

    /* *******************************
     * PRIVATE METHODS
     * *******************************/

    function sequenceToMoves(string,type) {

        type=='solve' && (type='pieces');

        var func = RubikUtils.parse[type];
        var parsed = func ? func(string) : [];

        parsed.length || (parsed=['&nbsp;']);
        this.elementsMap[this.name+'-moveslist'].elementsMap['moveslist'].setValue(parsed.join(','));
    }

    function executeMoves() {
        if(!this.mainUI.isocube) return;

        var seq = this.elementsMap[this.name+'-moveslist'].elementsMap['moveslist'].getValue().split(',');
        this.mainUI.isocube.execute(RubikUtils.clear.uncollapseSequence(seq),10);
    }

    // #### HANDLERS ###

    function inputHandler(data,event) {
        switch (event) {
            case 'change':
                sequenceToMoves.call(this,data,this.name);
                break;
            case 'execute':
                executeMoves.call(this);
                break;
        }
    }

    return PanelSequenceToMoves;

}(RubikUtils, PUIPanel, PUIPanelComponent, PUIPanelComponentGroup, RHSequenceInput, RHMovesList));

/**
 * Created by fdimonte on 24/04/2015.
 */

var PanelMoves = (function(PanelSequenceToMoves, PUIPanelComponent, PUIPanelComponentGroup, RHFaceButtons, RHPieceButton, RHGroupButtons){

    /**
     * PanelMoves Class
     *
     * @constructor
     */
    function PanelMoves() {
        PanelSequenceToMoves.call(this,'moves');
        this.editpiece = false;
    }

    /**
     * PanelMoves prototype
     *
     * @type {PanelSequenceToMoves}
     */
    PanelMoves.prototype = Object.create(PanelSequenceToMoves.prototype);

    /* *******************************
     * OVERRIDE SUPER CLASS METHODS
     * *******************************/

    PanelMoves.prototype.addCustomComponents = function() {

        var moves_faces = new PUIPanelComponent(this.name,'faces','faces');
        var moves_faces_buttons = new RHFaceButtons('face',['U','D','F','B','L','R']);
        moves_faces.addChild(moves_faces_buttons);

        var moves_piece = new PUIPanelComponent(this.name,'piece','piece');
        var moves_piece_button = new RHPieceButton();
        moves_piece.addChild(moves_piece_button);

        var moves_slices = new PUIPanelComponent(this.name,'slices','slices');
        var moves_slices_buttons = new RHFaceButtons('slice',['M','E','S']);
        moves_slices.addChild(moves_slices_buttons);

        var moves_axis = new PUIPanelComponent(this.name,'axis','axis');
        var moves_axis_buttons = new RHFaceButtons('axis',['X','Y','Z']);
        moves_axis.addChild(moves_axis_buttons);

        var moves_group = new PUIPanelComponent(this.name,'group','group');
        var moves_group_buttons = new RHGroupButtons();
        moves_group.addChild(moves_group_buttons);

        moves_faces_buttons.on('click',faceHandler.bind(this));
        moves_piece_button.on('editbegin',pieceHandler.bind(this));
        moves_piece_button.on('editend',pieceHandler.bind(this));
        moves_piece_button.on('wontaccept',pieceHandler.bind(this));
        moves_slices_buttons.on('click',faceHandler.bind(this));
        moves_axis_buttons.on('click',faceHandler.bind(this));
        moves_group_buttons.on('click',groupHandler.bind(this));

        this.sequence.on('change',function(data,event){
            this.elementsMap['moves-group'].elementsMap['groupbuttons'].updateGroupStatus(data);
        }.bind(this));

        this.addChild(new PUIPanelComponentGroup([ this.sequence.parent ]));
        this.addChild(new PUIPanelComponentGroup([ moves_faces, moves_piece ]));
        this.addChild(new PUIPanelComponentGroup([ moves_slices, moves_axis ]));
        this.addChild(new PUIPanelComponentGroup([ moves_group ]));
        this.addChild(new PUIPanelComponentGroup([ this.moveslist.parent ]));

    };

    /* *******************************
     * PRIVATE METHODS
     * *******************************/

    function addMoveToSequence(move) {
        var elem = this.elementsMap[this.name+'-sequence'].elementsMap['moves'];
        var temp_val = elem.getValue();//$el.val();
        var new_val = temp_val + move;
        elem.setValue(new_val);
        //this.sequence.trigger('change',new_val);
    }

    function addMoveToPiece(move) {
        var elem = this.elementsMap[this.name+'-piece'].elementsMap['piece'];
        elem.addFace(move);
    }

    function enableAllFaces() {
        this.elementsMap[this.name+'-faces'].elementsMap['face'].enableFaces();
        this.elementsMap[this.name+'-slices'].elementsMap['slice'].enableFaces();
        this.elementsMap[this.name+'-axis'].elementsMap['axis'].enableFaces();
    }

    function disableFaces(faces) {
        this.elementsMap[this.name+'-faces'].elementsMap['face'].disableFaces(faces);
    }

    // #### HANDLERS ###

    function faceHandler(data,event) {
        if(this.editpiece)
            addMoveToPiece.call(this,data);
        else
            addMoveToSequence.call(this,(data=='X'||data=='Y'||data=='Z') ? data.toLowerCase() : data);
    }

    function pieceHandler(data,event) {
        switch (event) {
            case 'editbegin':
                this.editpiece = true;
                this.elementsMap[this.name+'-slices'].elementsMap['slice'].disableFaces();
                this.elementsMap[this.name+'-axis'].elementsMap['axis'].disableFaces();
                break;
            case 'wontaccept':
                disableFaces.call(this,data);
                break;
            case 'editend':
                this.editpiece = false;
                enableAllFaces.call(this);
                addMoveToSequence.call(this,data);
                break;
        }
    }

    function groupHandler(data,event) {
        addMoveToSequence.call(this,data);
    }

    return PanelMoves;

}(PanelSequenceToMoves, PUIPanelComponent, PUIPanelComponentGroup, RHFaceButtons, RHPieceButton, RHGroupButtons));

/**
 * Created by fdimonte on 24/04/2015.
 */

var PanelSolve = (function(RubikSolver, PanelSequenceToMoves, PUIPanelComponent, PUIPanelComponentGroup, RHAnalyze, RHReplay){

    /**
     * PanelSolve Class
     *
     * @constructor
     */
    function PanelSolve() {
        PanelSequenceToMoves.call(this,'solve');
        this.lastScramble = null;
    }

    /**
     * PanelSolve prototype
     *
     * @type {PanelSequenceToMoves}
     */
    PanelSolve.prototype = Object.create(PanelSequenceToMoves.prototype);

    /* *******************************
     * OVERRIDE SUPER CLASS METHODS
     * *******************************/

    PanelSolve.prototype.addCustomComponents = function() {

        var solve_sequence = new PUIPanelComponent('solve','pattern','analyze');
        var solve_sequence_ui = new RHAnalyze();
        solve_sequence.addChild(solve_sequence_ui);

        var solve_replay = new PUIPanelComponent('solve','replay','replay');
        var solve_replay_ui = new RHReplay();
        solve_replay.addChild(solve_replay_ui);

        solve_sequence_ui.on('get_pattern',getSolvePattern.bind(this));
        solve_replay_ui.on('replay',executeReplay.bind(this));
        solve_replay_ui.on('change',changeReplay.bind(this));

        this.sequence.on('execute',function(data,event) {
            this.lastScramble = this.mainUI.isocube.getCube();
        }.bind(this));

        this.addChild(new PUIPanelComponentGroup([ solve_sequence ]));
        this.addChild(new PUIPanelComponentGroup([ this.sequence.parent ]));
        this.addChild(new PUIPanelComponentGroup([ this.moveslist.parent ]));
        this.addChild(new PUIPanelComponentGroup([ solve_replay ]));

    };

    /* *******************************
     * PRIVATE METHODS
     * *******************************/

    // #### HANDLERS ###

    function getSolvePattern(data,event) {
        var obj = RubikSolver.solve.explain(this.mainUI.isocube.getCube());
        var seq = obj.s.join(',');
        var exp = obj.e;
        this.sequence.setValue(seq);

        this.mainUI.teacher && this.trigger('get_pattern',this.mainUI.teacher.explainAll(exp));
    }

    function executeReplay(data,event) {
        this.lastScramble && this.mainUI.isocube.setCube(this.lastScramble);
        this.trigger('replaybegin',data);
        switch(data){
            case '':
            default:
                break;
        }
    }

    function changeReplay(data,event) {

    }

    return PanelSolve;

}(RubikSolver, PanelSequenceToMoves, PUIPanelComponent, PUIPanelComponentGroup, RHAnalyze, RHReplay));

/**
 * Created by fdimonte on 24/04/2015.
 */

var PanelCubeSetup = (function(PUIPanel, PUIPanelComponent, PUIPanelComponentGroup, RHCubeSetup, RHFaceButtons, RHPieceButton, RHCubeColors){

    /**
     * PanelCubeSetup Class
     *
     * @constructor
     */
    function PanelCubeSetup() {
        PUIPanel.call(this,'cubesetup');
        this.editpiece = false;
        this.current_position = null;
        this.current_piece = null;
        this.current_face = null;
        this.disableFaces();
        this.togglePieceEnable();

        this.elementsMap[this.name+'-piece'].elementsMap['piece'].disable();
    }

    /**
     * PanelCubeSetup prototype
     *
     * @type {PUIPanel}
     */
    PanelCubeSetup.prototype = Object.create(PUIPanel.prototype);

    /* *******************************
     * OVERRIDE SUPER CLASS METHODS
     * *******************************/

    PanelCubeSetup.prototype.addComponents = function() {

        var cube_setup = new PUIPanelComponent(this.name,'setup','setup');
        var cube_setup_ui = new RHCubeSetup();
        cube_setup.addChild(cube_setup_ui);

        var cube_piece = new PUIPanelComponent(this.name,'piece','get piece');
        var cube_piece_ui = new RHPieceButton(null,true);
        cube_piece.addChild(cube_piece_ui);

        var edit_faces = new PUIPanelComponent('editcube','faces','faces');
        var edit_faces_ui = new RHFaceButtons('face',['U','D','F','B','L','R']);
        edit_faces.addChild(edit_faces_ui);

        var edit_piece = new PUIPanelComponent('editcube','piece','set piece');
        var edit_piece_ui = new RHPieceButton(null,true);
        edit_piece.addChild(edit_piece_ui);

        var change_colors = new PUIPanelComponent(this.name,'colors','colors');
        var change_faces_ui = new RHFaceButtons('face',['U','D','F','B','L','R']);
        var change_colors_ui = new RHCubeColors();
        change_colors.addChild(change_faces_ui);
        change_colors.addChild(change_colors_ui);

        cube_setup_ui.on( 'togglebackface',   toggleBackFace.bind(this)   );
        cube_setup_ui.on( 'toggleeditcube',   toggleEditCube.bind(this)   );
        cube_setup_ui.on( 'getimage',         imageHandler.bind(this)     );
        cube_setup_ui.on( 'reset',            resetHandler.bind(this)     );

        edit_faces_ui.on( 'click',            faceHandler.bind(this)      );
        edit_piece_ui.on( 'wontaccept',       pieceHandler.bind(this)     );

        change_faces_ui.on( 'click',          faceColorHandler.bind(this) );
        change_colors_ui.on( 'change_colors', colorsHandler.bind(this)    );

        this.addChild(new PUIPanelComponentGroup([ cube_setup ]));
        this.addChild(new PUIPanelComponentGroup([ cube_piece ]));
        this.addChild(new PUIPanelComponentGroup([ edit_piece, edit_faces ]));
        this.addChild(new PUIPanelComponentGroup([ change_colors ]));

    };

    /* *******************************
     * IMPLEMENT CUSTOM METHODS
     * *******************************/

    PanelCubeSetup.prototype.addMoveToPiece = function(move) {
        var elem = this.elementsMap['editcube-piece'].elementsMap['piece'];
        elem.addFace(move,true);

        var value = elem.getValue();
        if(value.length==this.current_position.length){
            this.current_piece = value;
            this.mainUI.isocube.setPiece(this.current_position,this.current_piece);
            this.unsetPiece();
            elem.reset();
        }
    };

    PanelCubeSetup.prototype.enableAllFaces = function() {
        this.elementsMap['editcube-faces'].elementsMap['face'].enableFaces();
    };

    PanelCubeSetup.prototype.disableFaces = function(faces) {
        this.elementsMap['editcube-faces'].elementsMap['face'].disableFaces(faces);
    };

    PanelCubeSetup.prototype.togglePieceEnable = function(enabled) {
        var elem = this.elementsMap['editcube-piece'].elementsMap['piece'];
        if(enabled) elem.enable();
        else elem.disable();
    };

    PanelCubeSetup.prototype.setPiece = function(stickers,position) {

        this.mainUI.isocube.iso.console.childrenMap['cubeletInfo'].setRenderInfo(position + ' : ' + stickers);
        this.mainUI.isocube.iso.console.render();

        // animation testing purposes
        this.mainUI.isocube.iso.console.childrenMap['cubeletInfo'].setAnimationStep(function(time){
            this.setOptions({alpha:1-(time/1000)});
        });
        this.mainUI.isocube.iso.console.startAnimation(1000);
        // (end of animation testing)

        if(position.length==1) {
            this.unsetPiece();
            return;
        }

        this.current_piece = stickers;
        this.current_position = position;

        this.elementsMap[this.name+'-piece'].elementsMap['piece'].setValue(stickers);
        this.elementsMap['editcube-piece'].elementsMap['piece'].enable();
        this.elementsMap['editcube-piece'].elementsMap['piece'].reset();

        this.editpiece = true;
        this.enableAllFaces();

    };
    PanelCubeSetup.prototype.unsetPiece = function() {

        this.current_piece = null;
        this.current_position = null;

        this.mainUI.isocube.iso.console.clear();

        this.elementsMap[this.name+'-piece'].elementsMap['piece'].reset();
        this.elementsMap['editcube-piece'].elementsMap['piece'].disable();
        this.elementsMap['editcube-piece'].elementsMap['piece'].reset();

        this.editpiece = false;
        this.disableFaces();

    };

    /* *******************************
     * PRIVATE METHODS
     * *******************************/

    function getPieceName(pname,fname) {
        if(!pname||!fname) return null;
        var name = '', idx = pname.indexOf(fname);
        if(idx==-1) return null;

        for(var n=0;n<pname.length;n++){
            name+=pname.charAt(idx);
            (++idx == pname.length) && (idx = 0);
        }
        return name;
    }

    // #### HANDLERS ###

    function cubeClickHandler(e) {
        if(!this.mainUI.isocube) return;

        var poly = this.mainUI.isocube.iso.engine.getObjectsAtScreenCoord({x: e.pageX, y: e.pageY});

        if(poly.length>0) {

            if(this.mainUI.isocube.backfaceState()) {
                poly.sort(function(a, b) {return (a.zindex - b.zindex);});//ASCENDING
            } else {
                poly.sort(function(a, b) {return (b.zindex - a.zindex);});//DESCENDING
            }

            var face = poly[0];
            var piece = face.parent;
            var stickers = getPieceName(piece.get('sticker'), face.get('sticker'));
            var position = getPieceName(piece.get('position'), face.get('position'));

            if(stickers && position)
                this.setPiece(stickers, position);
            else
                this.unsetPiece();
        }
        else
            this.unsetPiece();

    }

    function toggleBackFace(data,event) {
        if(!this.mainUI || !this.mainUI.isocube) return;
        this.mainUI.isocube.backfaceToggle(data);

    }

    function toggleEditCube(data,event) {
        if(!this.mainUI || !this.mainUI.isocube) return;

        var elem = this.elementsMap[this.name+'-piece'].elementsMap['piece'];
        var container = this.mainUI.isocube.iso.container;
        if(data) {
            $(container).on('click',cubeClickHandler.bind(this));
            elem.enable();
        }
        else {
            $(container).off('click');
            this.unsetPiece();
            elem.disable();
            elem.reset();
        }
    }

    function imageHandler(data,event) {
        var img = this.mainUI.isocube.getImage();
        window.open(img);
    }

    function resetHandler(data,event) {
        this.mainUI.isocube.setCube();
    }

    function faceHandler(data,event) {
        this.editpiece && this.addMoveToPiece(data);
    }

    function pieceHandler(data,event) {
        this.disableFaces(data);
    }

    function colorsHandler(data,event) {
        if(!this.current_face) return;
        var obj = {};
        obj[this.current_face] = data;
        this.trigger('change_colors',obj);
    }

    function faceColorHandler(data,event) {
        this.current_face = data;
        var $btn = this.$el.find('.ic-ui-face-'+data);
        if($btn.length>0) {
            this.$el.find('.ic-ui-face.active').removeClass('active');
            $btn.addClass('active');
        }
    }

    return PanelCubeSetup;

}(PUIPanel, PUIPanelComponent, PUIPanelComponentGroup, RHCubeSetup, RHFaceButtons, RHPieceButton, RHCubeColors));

/**
 * Created by fdimonte on 24/04/2015.
 */

var PanelExplain = (function(PUIPanel, PUIPanelComponent, PUIPanelComponentGroup, RHExplainPriority, RHExplainList){

    /**
     * PanelExplain Class
     *
     * @constructor
     */
    function PanelExplain() {
        PUIPanel.call(this,'explain');
    }

    /**
     * PanelExplain prototype
     *
     * @type {PUIPanel}
     */
    PanelExplain.prototype = Object.create(PUIPanel.prototype);

    /* *******************************
     * OVERRIDE SUPER CLASS METHODS
     * *******************************/

    PanelExplain.prototype.addComponents = function() {

        var explain_priority = new PUIPanelComponent('explain','priority','verbosity');
        var explain_priority_ui = new RHExplainPriority();
        explain_priority.addChild(explain_priority_ui);

        var explain_list = new PUIPanelComponent('explain','list','solving process');
        var explain_list_ui = new RHExplainList();
        explain_list.addChild(explain_list_ui);

        explain_priority_ui.on('change_priority',priorityHandler.bind(this));

        this.addChild(new PUIPanelComponentGroup([ explain_priority ]));
        this.addChild(new PUIPanelComponentGroup([ explain_list ]));

    };

    /* *******************************
     * IMPLEMENT CUSTOM METHODS
     * *******************************/

    PanelExplain.prototype.setExplain = function(arr) {

        var explain_list = this.elementsMap['explain-list'].elementsMap['explain-list'];
        explain_list.setValue(arr);

    };

    /* *******************************
     * PRIVATE METHODS
     * *******************************/

    // #### HANDLERS ###

    function priorityHandler(data,event) {
        var explain_list = this.elementsMap['explain-list'].elementsMap['explain-list'];
        explain_list.setPriority(data);
        explain_list.showCurrentPriority();
    }

    return PanelExplain;

}(PUIPanel, PUIPanelComponent, PUIPanelComponentGroup, RHExplainPriority, RHExplainList));

var RubikHelperPackage = (function(RubikCube,RubikCubeIso,RubikSolver,RubikTeacher,RubikUtils,RHMainUI,RHAnalyze,RHCubeColors,RHCubeSetup,RHExplainList,RHExplainPriority,RHFaceButtons,RHGroupButtons,RHHighlightList,RHHighlightPieces,RHMovesList,RHPieceButton,RHReplay,RHSequenceInput,PanelCubeSetup,PanelExplain,PanelHighlights,PanelMoves,PanelSequenceToMoves,PanelSolve){
var pkg={};
pkg["cube"]={};
pkg["cube"]["RubikCube"]=RubikCube;
pkg["cube"]["RubikCubeIso"]=RubikCubeIso;
pkg["static"]={};
pkg["static"]["RubikSolver"]=RubikSolver;
pkg["static"]["RubikTeacher"]=RubikTeacher;
pkg["static"]["RubikUtils"]=RubikUtils;
pkg["ui"]={};
pkg["ui"]["RHMainUI"]=RHMainUI;
pkg["ui"]["elements"]={};
pkg["ui"]["elements"]["RHAnalyze"]=RHAnalyze;
pkg["ui"]["elements"]["RHCubeColors"]=RHCubeColors;
pkg["ui"]["elements"]["RHCubeSetup"]=RHCubeSetup;
pkg["ui"]["elements"]["RHExplainList"]=RHExplainList;
pkg["ui"]["elements"]["RHExplainPriority"]=RHExplainPriority;
pkg["ui"]["elements"]["RHFaceButtons"]=RHFaceButtons;
pkg["ui"]["elements"]["RHGroupButtons"]=RHGroupButtons;
pkg["ui"]["elements"]["RHHighlightList"]=RHHighlightList;
pkg["ui"]["elements"]["RHHighlightPieces"]=RHHighlightPieces;
pkg["ui"]["elements"]["RHMovesList"]=RHMovesList;
pkg["ui"]["elements"]["RHPieceButton"]=RHPieceButton;
pkg["ui"]["elements"]["RHReplay"]=RHReplay;
pkg["ui"]["elements"]["RHSequenceInput"]=RHSequenceInput;
pkg["ui"]["panels"]={};
pkg["ui"]["panels"]["PanelCubeSetup"]=PanelCubeSetup;
pkg["ui"]["panels"]["PanelExplain"]=PanelExplain;
pkg["ui"]["panels"]["PanelHighlights"]=PanelHighlights;
pkg["ui"]["panels"]["PanelMoves"]=PanelMoves;
pkg["ui"]["panels"]["PanelSequenceToMoves"]=PanelSequenceToMoves;
pkg["ui"]["panels"]["PanelSolve"]=PanelSolve;
return pkg;
}(RubikCube,RubikCubeIso,RubikSolver,RubikTeacher,RubikUtils,RHMainUI,RHAnalyze,RHCubeColors,RHCubeSetup,RHExplainList,RHExplainPriority,RHFaceButtons,RHGroupButtons,RHHighlightList,RHHighlightPieces,RHMovesList,RHPieceButton,RHReplay,RHSequenceInput,PanelCubeSetup,PanelExplain,PanelHighlights,PanelMoves,PanelSequenceToMoves,PanelSolve));
return RubikHelperPackage;}());