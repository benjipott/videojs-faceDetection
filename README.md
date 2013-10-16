# videojs-faceDetection

Display a faceDetection with video.js players.

![videojs-faceDetection](http://benjipott.fr/images/video.js-faceDetection.jpg)

## HTML5-Face-Detection Reference
http://wesbos.com/html5-video-face-detection-canvas-javascript/
https://github.com/wesbos/HTML5-Face-Detection

This plugin was tested on video.js 4.1.0 4.2.0 and 4.2.1.

https://github.com/liuliu/ccv/tree/stable/js

## Getting Started
Download [videojs](http://www.videojs.com/) and [videojs.ga](https://github.com/benjipott/videojs-faceDetection)

In your web page:
```html
<html data-cast-api-enabled="true">
<script src="video.js"></script>
<script src="dist/videojs.chromeCast.min.js"></script>
<link rel="stylesheet" href="dist/videojs.chromeCast.css" type="text/css" />
<video id="video" src="movie.mp4" controls></video>
<script>

    videojs('video', {
        'plugins': {
               'faceDetection': {
                    enabled : true,
                    appId : 'your-faceDetection-app-id',
                    namespace : 'your-faceDetection-namespace',
                    title : 'video title',
                    description : 'video desc'
                    }
               }
        }
    );
</script>
```

## Options

    enabled : true,