/*! videojs-faceDetection - v0.1.0 - 2013-10-10
* https://github.com/benjipott/videojs-faceDetection
* Copyright (c) 2013 Pott Benjamin; Licensed MIT */

/**
 * Merge two objects together and return the original.
 *
 * @param {Object}
 *                obj1
 * @param {Object}
 *                obj2
 * @return {Object}
 */
vjs.plugin.merge = function(obj1, obj2) {
    var settings = vjs.obj.merge.apply(this,arguments);
    if(settings.hasOwnProperty('userAgentAllowed') && settings.enabled){
        settings.userAgentAllowed = settings.userAgentAllowed.split(',');
        for ( var a = 0, b = settings.userAgentAllowed; a < b.length; a++) {
            var ualist = new RegExp(b[a],'i');
            settings.enabled = !!vjs.USER_AGENT.match(ualist);
            if (settings.enabled){
                break;
            }
        }
    }
    return settings;
};(function() {
    var defaults = {
        enabled : true,
        src : 'images/glasses.png'
    };

    vjs.plugin('faceDetection', function(options) {
        var settings = vjs.plugin.merge(defaults, options);

        if (!settings.enabled) {
            return false;
        }

        this.faceDetectionComponent = new vjs.FaceDetectionComponent(this,settings);
    });

})();
/**
 * FaceDetection component
 *
 * @param {vjs.Player|Object} player
 * @param {Object=} options
 * @constructor
 */
var cast = cast || {};

vjs.Player.prototype.faceDetectionComponent = {};

vjs.Player.prototype.video;

vjs.FaceDetectionComponent = vjs.Component.extend({
    /** @constructor */
    init: function (player, options) {
        vjs.Component.call(this, player, options);

        this.bitmapDrawable = new Image();
        this.ctx = this.el_.getContext('2d');
        this.bitmapDrawable.src = this.options_.src;
        player.on('play',vjs.bind(this, this.startIntervall));
        player.on('ended',vjs.bind(this, this.stopIntervall));
    }

});

vjs.FaceDetectionComponent.prototype.vidInterval = 0;

vjs.FaceDetectionComponent.prototype.bitmapDrawable;

vjs.FaceDetectionComponent.prototype.startIntervall = function(){
    this.vidInterval = setInterval(vjs.bind(this, this.html5glasses),250);
};

vjs.FaceDetectionComponent.prototype.stopIntervall = function(){
    clearInterval(this.vidInterval);
};

vjs.FaceDetectionComponent.prototype.createEl = function(){
    var el = vjs.Component.prototype.createEl.call(this,'canvas', {
        width : this.player_.width(),
        height :this.player_.height(),
        className: 'vjs-faceDetection'
    });
    this.player_.el_.appendChild(el);
    return el;
};

vjs.FaceDetectionComponent.prototype.html5glasses = function() {
    // Start the clock
    var elapsed_time = (new Date()).getTime(),playerWidth =  this.player_.width(),  playerHeight =  this.player_.height()

    // Draw the video to canvas
    this.ctx.drawImage(this.player_.tech.el_, 0, 0, playerWidth, playerHeight, 0, 0, this.el_.width, this.el_.height);

    // use the face detection library to find the face
    /*var comp = ccv.detect_objects({ "canvas" : (ccv.pre(this.el_)),
        "cascade" : cascade,
        "interval" : 5,
        "min_neighbors" : 1 });

    // Draw glasses on everyone!
    for (var i = 0; i < comp.length; i++) {
        this.ctx.drawImage(this.bitmapDrawable, comp[i].x, comp[i].y,comp[i].width, comp[i].height);
    }  */
};
