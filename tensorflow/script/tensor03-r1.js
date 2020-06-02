async function track_face() {

    const frame = document.getElementById("camera");
    const model = await facemesh.load();
    
    const canvas = document.getElementById("myCanvas");
    const ctx = canvas.getContext("2d");
    
    const returnTensors = false;
    
    while(1) {
        
        const predictions = await model.estimateFaces(frame, returnTensors);
        ctx.drawImage(frame, 0, 0, 320, 240);
    
        if(predictions.length > 0) {
        
            for(let i = 1; i < predictions[0].scaledMesh.length - 1; i++) {
                ctx.clearRect

                s = i - 1
                e = i + 1
                const spoints = predictions[0].scaledMesh[s]
                const ipoints = predictions[0].scaledMesh[i]
                const epoints = predictions[0].scaledMesh[e]
                console.log(spoints);
                const sx = spoints[0]
                const sy = spoints[1]
                const ix = ipoints[0]
                const iy = ipoints[1]
                const ex = epoints[0]
                const ey = epoints[1]

                ctx.beginPath();
                ctx.moveTo(sx, sy);
                ctx.lineTo(ix, iy);
                ctx.lineTo(ex, ey);

                ctx.closePath();
                ctx.strokeStyle = 'blue';
                ctx.fillStyle = 'orange';
                ctx.stroke();
                ctx.fill();
            }
        }
        await tf.nextFrame();
    }
    
}
    
    
    function webcam() {
        var camera = document.getElementById("camera");
        var media = navigator.mediaDevices.getUserMedia({
        video: true
        // audio: false,
        });
    
        media.then((stream) => {
        camera.srcObject = stream;
        });
    }
    
    function main() {
        // check if the video is loaded and ready for processing
        var video = document.getElementById("camera");
        console.log(video);
        if(video.readyState == 4) {
            console.log("video is ready for processing..");
            track_face();
        }
        else {
            console.log("nope, not ready yet..");
            setTimeout(main, 1000/1);
        }
    }
    
    webcam();
    main();

    