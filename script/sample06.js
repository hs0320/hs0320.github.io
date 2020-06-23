window.addEventListener('load', init);

function init() {
    // const width = 940;
    // const height = 560;
    const width = window.innerWidth;
    const height = window.innerHeight;
    const renderer = new THREE.WebGLRenderer({
        canvas: document.querySelector('#myCanvas')
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(width, height);

    const camera =　new THREE.PerspectiveCamera(45, width/height, 1, 2000);
    camera.position.set(0, 500, 1500);
    

    const scene = new THREE.Scene();

    const ambientLight = new THREE.AmbientLight( 0x888888 );
    const pointLights = [];
    pointLights[0] = new THREE.PointLight( 0xffffff, 1, 0 );
    pointLights[1] = new THREE.PointLight( 0xffffff, 1, 0 );
    pointLights[2] = new THREE.PointLight( 0xffffff, 1, 0 );
    pointLights[0].position.set( 0, 300, 1500);
    pointLights[1].position.set( 200, 300, 100);
    pointLights[2].position.set( -100, -300, -100);
    scene.add(ambientLight, pointLights[0], pointLights[1], pointLights[2]);

    // const group = new THREE.Group();
    // scene.add(group);

    // var boxes = [];
    var box = [];
    var boxnum = 300;
    const geometry = new THREE.BoxBufferGeometry(20, 20, 20);
    const edges = new THREE.EdgesGeometry(geometry);

    for( var i = 0; i < boxnum; i++ ){
        box[i] = new THREE.LineSegments( edges, new THREE.LineBasicMaterial({ color: 0x313331 }));
        // box.position.set(0, 0, 0);
        // box[i].position.set(Math.random()*800-250, Math.random()*800-250, Math.random()*1500-250);
        box[i].position.set(Math.random()*1000-700, Math.random()*1000-0, Math.random()*1500-250);
        scene.add(box[i]);
    }

    var quaternion = new THREE.Quaternion();
    quaternion.setFromAxisAngle( new THREE.Vector3(0, 1, 1), 0.001);
    
    
    tick();
    function tick() {
        requestAnimationFrame(tick);
        for( var r = 0; r < boxnum; r++ ){
            // var min = 0;
            // var max = 20;
            // var random = Math.floor( Math.random() * (max + 1 - min) ) + min ;
            
            // box[r].rotation.z += random * 0.001;
            // box[r].rotation.y += random * 0.001;
            box[r].rotation.x += Math.random() * 0.01;
            box[r].rotation.y += Math.random() * 0.01;
            box[r].position.applyQuaternion( quaternion );

        }
        renderer.render(scene, camera);
    }
}