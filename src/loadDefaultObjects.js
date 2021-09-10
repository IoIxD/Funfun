import * as THREE from '../include/three.module.js';
import * as CANNON from '../include/cannon-es.js';
import * as m from './main.js';

// ambient light
export var ambientLight = new THREE.HemisphereLight( 0xffffbb, 0xffffbb, 10.0 );

// Add a point light to the camera
export const light = new THREE.PointLight(0xFFFFFF, 3);

// 3d axis for testing
export const axis = new THREE.AxesHelper(999999);

// test plane 
export const geometry = new THREE.PlaneGeometry( 1, 1);
export const material = new THREE.MeshBasicMaterial( {color: 0xffff00, side: THREE.DoubleSide} );
export const plane = new THREE.Mesh( geometry, material );
export const planecshape = new CANNON.Plane(5);
export const planecmass = 0; export let planec = 0;


export function ldoInit() {
    m.camera.add(light);
    m.scene.add( ambientLight );
    m.scene.add(axis);
    m.scene.add(plane);
    planec = new CANNON.Body({ type: 0, planecshape });
    planec.collisionResponse = 1;
    planec.linearDamping = 0;
    planec.position.y = 2;
    plane.position.copy(planec.position);
    m.world.addBody(planec);
    console.log(planec);
    console.log(plane.scale);
    plane.rotation.x = THREE.Math.degToRad(90);
}
