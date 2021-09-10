import {ballInit} from './ball.js';
import {animate} from './animate.js';
import {ldoInit} from './loadDefaultObjects.js';
import {scene, camera} from './main.js';
import {Math} from '../include/three.module.js';

export function init() {
    scene.add(camera);
    camera.position.x = 0; camera.rotation.x = Math.degToRad(180);
    camera.position.y = 5; camera.rotation.y = Math.degToRad(0);
    camera.position.z = -30; camera.rotation.z = Math.degToRad(180);
	ldoInit();
	ballInit();
	animate();
}