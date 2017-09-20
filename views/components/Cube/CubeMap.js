import { Promise } from 'es6-promise';
import * as THREE from 'three';

function CubeMap(){
};

CubeMap.prototype.renderMap = function(urls) {
    let scene = new THREE.Scene();

    /* camera */
    let camera = new THREE.PerspectiveCamera( 50, window.innerWidth / window.innerHeight, 1, 100000 );
    camera.position.x = 0;
    camera.position.y = 800;
    camera.position.z = -800;
    camera.lookAt(new THREE.Vector3(0, 0, 0))

    /* cube */
    let textureLoader = new THREE.TextureLoader();
    let materials =
        urls.map((url) => {
            return textureLoader.load(url);
        }).map((texture) => {
            return new THREE.MeshPhongMaterial({
                map: texture, 
                shininess: 150,
                specular: 0x222222
            })
        });
    let cube = new THREE.Mesh(new THREE.BoxGeometry(256, 256, 256), materials);
    cube.position.set(0, 0, 0);
    // cube.rotation.x = 0.6 * Math.PI;
    cube.rotation.y = -.5 * Math.PI;
    // cube.rotation.z = -0.25 * Math.PI;
    // cube.castShadow = true;
    cube.castShadow = true;
    scene.add(cube);

    /* ground plane */
    var planeMaterial = new THREE.MeshPhongMaterial({color: 0xF5F3EE});
    var plane = new THREE.Mesh( new THREE.CubeGeometry( 1024, 1024, 80 ), planeMaterial );
    plane.receiveShadow = true;
    plane.rotation.x = -0.35 * Math.PI;
    plane.rotation.z = -0.25 * Math.PI;
    plane.position.x = 0;
    plane.position.y = -512;
    plane.position.z = 0;
    scene.add(plane);

    /* lighting */
    scene.add(new THREE.AmbientLight(0x666666));
    let spotLight = new THREE.SpotLight();
    spotLight.target.position.set( 0,0,0);
    spotLight.angle = Math.PI / 5;
    spotLight.castShadow = true;
    spotLight.position.set( 0, 800, -0.35 * Math.PI );
    spotLight.shadow.camera.near = 30;
    spotLight.shadow.camera.far = 2000;
    spotLight.shadow.mapSize.width = 1024;
    spotLight.shadow.mapSize.height = 1024;
    spotLight.intensity = 0.2;
    spotLight.penumbra = 0.8
    scene.add(spotLight);
    let light = new THREE.PointLight( 0xffffff, 1, 1000, 1);
    light.position.set( 0, 450, -250 );
    scene.add(light);

    /* text */
    var loader = new THREE.FontLoader();

    loader.load( 'gentilis_bold.typeface.json',( font ) => {

        var geometry = new THREE.TextGeometry( 'Ron Marks', {
            font: font,
            size: 50,
            height: 5,
            curveSegments: 12,
            bevelEnabled: true,
            bevelThickness: 4,
            bevelSize: 2,
            bevelSegments: 2
        } );

        var textMaterial = new THREE.MeshPhongMaterial( 
          { color: 0xE5DBCF, specular: 0xffffff }
        );

        var mesh = new THREE.Mesh( geometry, textMaterial );

        mesh.position.set(150, 400, -100);
        mesh.rotation.y = Math.PI;
        // mesh.rotation.x = Math.PI;

        scene.add( mesh );

    } );


    return { cube: cube, plane: plane, scene: scene, camera: camera };
};

export default CubeMap;