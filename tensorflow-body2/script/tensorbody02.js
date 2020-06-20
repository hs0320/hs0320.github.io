async function track_body() {
    console.log("OK");
    const frame = document.getElementById("camera"),
          canvas = document.getElementById("myCanvas"),
          net = await bodyPix.load();
          
          frame.width = canvas.width = frame.videoWidth;
          frame.height = canvas.height = frame.videoHeight;
          canvas.style.backgroundImage = "url(./hateruma.JPG)";
          canvas.style.backgroundSize = "contain";
          
          
          const tempcanvas = document.createElement("canvas");
          tempcanvas.width = frame.videoWidth;
          tempcanvas.height = frame.videoHeight;
          const tempctx = tempcanvas.getContext("2d");
          
          const ctx = canvas.getContext("2d");
          ctx.scale(-1, 1);
          ctx.translate(-canvas.width, 0);

          console.log(net);

          while(1) {
              const segmentation = await net.segmentPerson(frame);
              console.log(segmentation);
              
              
              const foregroundColor = {r: 0, g: 0, b: 0, a: 0},
              backgroundColor = {r: 0, g: 0, b: 0, a: 255},
              backgroundDarkeningMask = bodyPix.toMask(segmentation, foregroundColor, backgroundColor);
              console.log(backgroundDarkeningMask);
              
              // globalCompositeOperationの初期値状態を保存
              ctx.save();
              // マスク用のデータを作成
              tempctx.putImageData(backgroundDarkeningMask, 0, 0);
              // 元動画をコピーする
              ctx.drawImage(frame, 0, 0, canvas.width, canvas.height);
              // 合成方法を変更。マスク部分を非表示にする
              ctx.globalCompositeOperation = "destination-out";
              // マスクを描画する
              ctx.drawImage(tempcanvas, 0, 0, canvas.width, canvas.height);
              // globalCompositeOperationの初期値状態に戻す。次処理のために。
              ctx.restore();
              
              console.log("complete");
            }
        }
        
        function webcam() {
    var camera = document.getElementById("camera");
    var media = navigator.mediaDevices.getUserMedia({
        video: {
            facingmode: 'user',
            // width: 180,
            // height: 135
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