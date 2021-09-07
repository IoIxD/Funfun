import * as THREE from 'https://cdn.skypack.dev/three@v0.132.2';
import * as m from './main.js';
import * as c from './controls.js';
import * as cs from './collision.js';
import {rotateAboutPoint} from './globalFunctions.js';

// Load the ball model
export let ball = 0; export let ballReady = false;

// Speed
export let speedX = 0; export let speedY = 0; export let speedZ = 0; 
export let gravity = 0; export let jumpState = 0; export let heldSpaceTicks = 0;
// Raycaster
export const raycaster = new THREE.Raycaster(ball.scene); 


export function ballInit() {
	m.gltf_loader.load('data/models/ball/ball.glb', (balltmp) => {
	    m.camera.position.x = 0; m.camera.rotation.x = THREE.Math.degToRad(180);
	    m.camera.position.y = 5; m.camera.rotation.y = THREE.Math.degToRad(0);
	    m.camera.position.z = -30; m.camera.rotation.z = THREE.Math.degToRad(180);
	    m.scene.add(balltmp.scene);
	    ball = balltmp;
	    ballReady = true;
	    console.log(m.objects);
	  },
	    // called when loading is in progresses
	    function ( xhr ) {
	        console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
	    },
	    function (error) {
	      console.log(error);
	    }
	);
	console.log(ball);
}
export function ballUpdate() {
	//NOTE:
	//jumpState: 0 = can jump, 1 = is jumping, 2 = is landing

	// Constantly increase the speed based on whether or not the player is holding buttons.
    speedX += ((c.heldRight - c.heldLeft) / 350); speedZ -= ((c.heldDown - c.heldUp) / 350);
    if (heldSpaceTicks <= 10) {heldSpaceTicks += c.heldSpace} else {jumpState = 2;}
    if(c.heldSpace == 1 && jumpState == 0) {speedY += ((c.heldSpace) / 8);}
    // If the speed is above 0, decrease it, but if it's below it, increase it.
    if(speedX >= 0.000000000001) {speedX -= 0.001;} if(speedX < -0.000000000001) {speedX += (0.001);}
    if(speedZ >= 0.000000000001) {speedZ -= 0.001;} if(speedZ < -0.000000000001) {speedZ += (0.001);}
    if(gravity <= 0.75 && jumpState <= 1) {gravity += speedY}
    if(gravity >= 0.75) {jumpState = 2;} if(jumpState == 2) {gravity -= 0.1;}
    // This function runs while the ball is still being initialized,
    // and we want to make sure it doesn't completely error out due
    // to the ball not being present.
    label: try {
    	const quaternion = new THREE.Quaternion();
    	ball.scene.position.x -= speedX; ball.scene.rotateOnWorldAxis(new THREE.Vector3(1,0,0), speedZ);
    	ball.scene.position.z += speedZ; ball.scene.rotateOnWorldAxis(new THREE.Vector3(0,0,1), speedX);
    	if(ball.scene.position.x >= 25 || ball.scene.position.x <= -25) {ball.scene.position.x *= -1;}
    	if(ball.scene.position.z >= 25 || ball.scene.position.z <= -25) {ball.scene.position.z *= -1;}
    	ball.scene.position.y += gravity;
    	document.querySelector('.debug').innerHTML = "gravity "+gravity+", speedY "+speedY+", jumpState "+jumpState+", heldSpace "+c.heldSpace;
    	cs.CollisionCheck(ball.scene);
    	break label;
    } catch {}
}