async function track_body() {
    console.log("OK");
    const frame = document.getElementById("camera"),
          canvas = document.getElementById("myCanvas"),
          net = await bodyPix.load();

          frame.width = canvas.width = frame.videoWidth;
          frame.height = canvas.height = frame.videoHeight;

    console.log(net);
    while(1) {

        // const segmentation = await net.segmentPerson(frame, {
        //     flipHorizontal: true,
        //     internalResolution: 'medium',
        //     segmentationThreshold: 0.5
        //    });
        // console.log(segmentation);
        const partSegmentation = await net.segmentPersonParts(frame);
        const coloredPartImage = bodyPix.toColoredPartMask(partSegmentation);

        // const foregroundColor = {r: 0, g: 0, b: 0, a: 255},
        //       backgroundColor = {r: 0, g: 0, b: 0, a: 0},
        //       maskBackground = true,
        //       backgroundDarkeningMask = bodyPix.toMask(segmentation, foregroundColor, backgroundColor),
        //       opacity = 0.9;
        // console.log(backgroundDarkeningMask);
        
        
        bodyPix.drawPixelatedMask(
            canvas, frame, coloredPartImage, maskOpacity = 0.7, maskBlurAmount = 0, flipHorizontal = true
            );
            
        console.log("complete");
        await tf.nextFrame();
    }
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