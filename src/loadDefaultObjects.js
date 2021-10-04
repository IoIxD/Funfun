import * as THREE from '../include/three.module.js';
import * as CANNON from '../include/cannon-es.js';
import * as m from './main.js';

// ambient light
export var ambientLight = new THREE.HemisphereLight( 0xffffbb, 0xffffbb, 10.0 );

// Add a point light to the camera
export const light = new THREE.PointLight(0xFFFFFF, 1);

// 3d axis for testing
export const axis = new THREE.AxesHelper(999999);

// test plane 
export const geometry = new THREE.PlaneGeometry( 20, 20);
export const material = new THREE.MeshToonMaterial( {side: THREE.DoubleSide} );
export const plane = new THREE.Mesh( geometry, material );
export let planec = 0; export let cyl = 0;


export function ldoInit() {
    m.camera.add(light);
    m.scene.add( ambientLight );
    m.scene.add(axis);
    plane.castShadow = true;
    m.scene.add(plane);
    planec = new CANNON.Body({ mass: 0, shape: new CANNON.Box(new CANNON.Vec3(10, .1, 10)), position: new CANNON.Vec3(0, 0, 0) });
    plane.position.copy(planec.position);
    m.world.addBody(planec);
    plane.rotation.x = THREE.Math.degToRad(90);
}
