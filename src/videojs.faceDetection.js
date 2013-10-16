(function() {
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
