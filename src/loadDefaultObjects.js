import * as THREE from 'https://cdn.skypack.dev/three@v0.132.2';
import * as m from './main.js';

// ambient light
export var ambientLight = new THREE.HemisphereLight( 0xffffbb, 0xffffbb, 10.0 );

// Add a point light to the camera
export const light = new THREE.PointLight(0xFFFFFF, 3);

export const axis = new THREE.AxesHelper(999999);

export const geometry = new THREE.BoxGeometry( 10, 10, 10);
export const material = new THREE.MeshBasicMaterial( {color: 0xffff00, side: THREE.DoubleSide} );
export const plane = new THREE.Mesh( geometry, material );

export function ldoInit() {
    m.camera.add(light);
    m.scene.add( ambientLight );
    m.scene.add(axis);
    m.scene.add(plane);
    m.objects.push(plane);
    console.log(m.objects);
    plane.position.y = -1;
    plane.rotation.x = THREE.Math.degToRad(90);
}
