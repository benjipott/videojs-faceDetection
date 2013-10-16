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
        this.detectorCtx = this.detector.getContext('2d');

        this.bitmapDrawable.src = this.options_.src;
        player.on('play', vjs.bind(this, this.startIntervall));
        player.on('ended', vjs.bind(this, this.stopIntervall));

         /*var videoCamera = new tracking.VideoCamera().hide().render().renderVideoCanvas(),
            ctx = videoCamera.canvas.context;

        videoCamera.track({
            type: 'human',
            data: 'eye',
            onFound: function(track) {
                for (var i = 0, len = track.length; i < len; i++) {
                    var rect = track[i];
                    ctx.strokeStyle = "rgb(0,255,0)";
                    ctx.strokeRect(rect.x, rect.y, rect.size, rect.size);
                }
            }
        });*/
    }

});

vjs.FaceDetectionComponent.prototype.vidInterval = 0;

vjs.FaceDetectionComponent.prototype.bitmapDrawable;

vjs.FaceDetectionComponent.prototype.startIntervall = function () {
    this.vidInterval = setInterval(vjs.bind(this, this.html5glasses), 350);
};

vjs.FaceDetectionComponent.prototype.stopIntervall = function () {
    clearInterval(this.vidInterval);
};
vjs.FaceDetectionComponent.prototype.detectorCtx;
vjs.FaceDetectionComponent.prototype.detector;
vjs.FaceDetectionComponent.prototype.createEl = function () {

    var el = vjs.Component.prototype.createEl.call(this, 'canvas', {
        width: this.player_.width(),
        height: this.player_.height(),
        className: 'vjs-faceDetection'
    });
    this.detector = vjs.Component.prototype.createEl.call(this, 'canvas', {
        width: this.player_.width(),
        height: this.player_.height(),
    });
    this.detector.style.display = "none";
    this.player_.el_.appendChild(el);
    this.player_.el_.appendChild(this.detector);
    return el;
};

vjs.FaceDetectionComponent.prototype.html5glasses = function () {
    // Start the clock
    var elapsed_time = (new Date()).getTime(), playerWidth = this.player_.width(), playerHeight = this.player_.height()
    this.ctx.clearRect(0, 0, playerWidth, playerHeight);
    // Draw the video to canvas
    this.ctx.drawImage(this.player_.tech.el_, 0, 0, playerWidth, playerHeight, 0, 0, this.width(), this.height());
    // use the face detection library to find the face
    /*var comp = ccv.detect_objects({ "canvas": (ccv.pre(this.detector)),
        "cascade": cascade,
        "interval": 1,
        "min_neighbors": 1,
        "worker": 1
    });  */

    // Draw glasses on everyone!
    /*for (var i = 0; i < comp.length; i++) {
        // highlight
        this.ctx.strokeRect( comp[i].x, comp[i].y, comp[i].width, comp[i].height);
        //this.ctx.drawImage(this.bitmapDrawable, comp[i].x, comp[i].y, comp[i].width, comp[i].height);
    } */
    var image_data = this.ctx.getImageData(0, 0, playerWidth, playerHeight);
    var gray_img = new jsfeat.matrix_t(playerWidth, playerHeight, jsfeat.U8_t | jsfeat.C1_t);
    jsfeat.imgproc.grayscale(image_data.data, gray_img.data);
};
