import * as m from './main.js';

// ambient light
export var ambientLight = new THREE.HemisphereLight( 0xffffbb, 0xffffbb, 10.0 );

// Add a point light to the camera
export const light = new THREE.PointLight(0xFFFFFF, 3);

// 3d axis for testing
export const axis = new THREE.AxesHelper(999999);

// test plane 
export const geometry = new THREE.PlaneGeometry( 50, 50);
export const material = new THREE.MeshBasicMaterial( {color: 0xffff00, side: THREE.DoubleSide} );
export const plane = new THREE.Mesh( geometry, material );
export const planecshape = new CANNON.Plane(50);
export const planecmass = 30; export let planec = 0;


export function ldoInit() {
    m.world.gravity.set(0, -10, 0);
    m.world.broadphase = new CANNON.NaiveBroadphase();
    m.world.solver.iterations = 5;
    m.world.defaultContactMaterial.contactEquationStiffness = 1e6;
    m.world.defaultContactMaterial.contactEquationRelaxation = 10;
    m.scene.add(m.camera);
    m.camera.position.x = 0; m.camera.rotation.x = THREE.Math.degToRad(180);
    m.camera.position.y = 5; m.camera.rotation.y = THREE.Math.degToRad(0);
    m.camera.position.z = -30; m.camera.rotation.z = THREE.Math.degToRad(180);
    m.camera.add(light);
    m.scene.add( ambientLight );
    m.scene.add(axis);
    m.scene.add(plane);
    planec = new CANNON.Body({ planecmass, planecshape });
    planec.collisionResponse = 1;
    plane.position.copy(planec.position);
    m.world.addBody(planec);
    //m.objects.push(plane);
    console.log(m.objects);
    plane.rotation.x = THREE.Math.degToRad(90);
    plane.position.y = -1;
}
