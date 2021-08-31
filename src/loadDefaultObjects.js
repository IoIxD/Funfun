import * as THREE from 'https://cdn.skypack.dev/three@v0.132.2';
import * as m from './main.js';

// ambient light
export var ambientLight = new THREE.HemisphereLight( 0xffffbb, 0xffffbb, 10.0 );

// Add a point light to the camera
export const light = new THREE.PointLight(0xFFFFFF, 3);

export function ldoInit() {
    m.camera.add(light);
    m.scene.add( ambientLight );

}
