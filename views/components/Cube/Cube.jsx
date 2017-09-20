import React from 'react';
import * as THREE from 'three';
import CubeMap from './CubeMap.js';
import _throttle from 'lodash.throttle';
import './cube.css';

const SPEED = .001;

class Cube extends React.Component {
    constructor() {
        super();
        this.pics = [
            '/cube_1.jpg', '/cube_5.jpg', '/cube_3.jpg',
            '/cube_6.jpg', '/cube_4.jpg', '/cube_2.jpg'
        ];
        this.redirectUrls = [
            'https://github.com/MarksCode', 
            '', 
            'https://www.facebook.com/DogLogApp',
            '',
            'https://docs.google.com/document/d/1ai6uw-8OkXm16e9mystQkqBGEkjZ3rW5cSMMqF7bBDk/edit?usp=sharing', 
            'https://www.linkedin.com/in/ron-marks-50023b76/'
        ];
        this.animate = this.animate.bind(this);
        this.clickHandler = this.clickHandler.bind(this);
        this.openUrl = this.openUrl.bind(this);
        this._throttledMouseMove = _throttle(this._throttledMouseMove.bind(this), 200);
        this._onMouseMove = this._onMouseMove.bind(this);
        this.renderer = null;
        this.scene = null;
        this.camera = null;
        this.cube = null;
        this.plane = null;
        this.isEntered = false;
        this.x = 0;
        this.y = 0;
        this.halfX = 0;
        this.halfY = 0;
        this.raycaster = new THREE.Raycaster();
    }

    animate() {
        requestAnimationFrame( this.animate );
        this.plane.rotation.z += SPEED;
        this.cube.rotation.y += this.x / 20000;
        this.cube.rotation.x += this.y / 20000;
        this.renderer.render( this.scene, this.camera );
    }

    _throttledMouseMove(ex, ey) {
        this.x = ex - this.halfX; 
        this.y = this.halfY - ey;
    }

    _onMouseMove(e) {
        this._throttledMouseMove(e.clientX, e.clientY);
    }

    componentDidMount() {
        let cubeMap = new CubeMap();
        let { scene, camera, cube, plane } = cubeMap.renderMap(this.pics);
        this.scene = scene;
        this.camera = camera;
        this.cube = cube;
        this.plane = plane;
        this.renderer = new THREE.WebGLRenderer({ alpha: true });
        this.renderer.shadowMap.enabled = true;
        this.renderer.setSize( window.innerWidth, window.innerHeight );
        this.container.appendChild(this.renderer.domElement);
        this.halfX = window.innerWidth/2;
        this.halfY = window.innerHeight/2;
        this.animate();
    }

    openUrl(index) {
        let url = this.redirectUrls[index];
        if (url && url !== '') {
            let redirectWindow = window.open(url, '_blank');
            redirectWindow.location;
        }
    }

    clickHandler(event) {
        let vector = new THREE.Vector3( 
          ( event.clientX / window.innerWidth ) * 2 - 1, 
          - ( event.clientY / window.innerHeight ) * 2 + 1, 0.5 );
        vector.unproject( this.camera );
        this.raycaster.set(this.camera.position, vector.sub(this.camera.position).normalize());

        let intersects = this.raycaster.intersectObject( this.cube );
        if (intersects.length > 0) {
            let index = Math.floor(intersects[0].faceIndex / 2 );
            this.openUrl(index);
       }
    }

	render() {
        return (
            <div 
                className="cubeContainer"
                ref={el => this.container = el}
                onClick={this.clickHandler}
                onMouseMove={this._onMouseMove}>
                <div 
                    className="pointerDiv"
                    onMouseEnter={() => this.isEntered = true}
                    onMouseLeave={() => this.isEntered = false}>
                </div>
            </div>
        );
	}
}

export default Cube;