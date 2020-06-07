async function track_body() {
    console.log("OK");
    const frame = document.getElementById("image"),
          canvas = document.getElementById("myCanvas"),
          net = await bodyPix.load();
    frame.crossOrigin = "anonymous";
    frame.onerror = myImgErrorHandler;
    console.log(net);
    const segmentation = await net.segmentPerson(frame);
        //   maskBackground = true,
        //   backgroundDarkeningMask = body.toMaskImageData(segmentation, maskBackground),
        //   opacity = 0.7;
    
    console.log(segmentation);

    // bodyPix.drawMask(
    //     canvas, frame, backgroundDarkeningMask, opacity
    // );
}

function webcam() {
    var camera = document.getElementById("camera");
    var media = navigator.mediaDevices.getUserMedia({
        video: {
            facingmode: 'user',
            width: 180,
            height: 135
        },
    });
    media.then((stream) => {
        camera.srcObject = stream;
    });
}

function main() {
    var video = document.getElementById("camera");
    if(video.readyState == 4) {
        console.log("video is ready for processing...");
        track_body();
    }
    else {
        console.log("nope, not ready yet...");
        setTimeout(main, 1000/1);
    }
}

webcam();
main();