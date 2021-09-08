import * as m from './main.js';
import * as c from './controls.js';
import * as cs from './collision.js';
import {rotateAboutPoint} from './globalFunctions.js';

// Load the ball model
export let ball = 0; export let ballReady = false;

// Movement
export let speedX = 0; export let speedY = 0; export let speedZ = 0; export let speed = 0; // Speed
export let storedSpeedX = 0; export let storedSpeedY = 0; export let storedSpeedZ = 0; export let storedSpeed = 0;  // Stored Speed
export let gravity = 0; export let jumpState = 0; export let heldSpaceTicks = 0; // Jumping
export let heldShiftTicks = 1; export let moveEnable = 1; // Charging

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
	// Constantly increase the speed based on whether or not the player is holding the arrow keys (but not shift).
    if(moveEnable) {storedSpeedX += ((c.heldShift_) * (c.heldRight - c.heldLeft) / 340); storedSpeedZ -= ((c.heldShift_) * (c.heldDown - c.heldUp) / 340);}
    // If the speed is above 0, decrease it, but if it's below it, increase it.
    let slowdown = 0.001 + (Math.abs(moveEnable-1)/500);;
    if(storedSpeedX >= 0.000000000001) {storedSpeedX -= slowdown;} if(storedSpeedX < -0.000000000001) {storedSpeedX += slowdown;}
    if(storedSpeedZ >= 0.000000000001) {storedSpeedZ -= slowdown} if(storedSpeedZ < -0.000000000001) {storedSpeedZ += slowdown;}
    // We want a general speed values
    speed = Math.abs(speedX+speedZ);
    storedSpeed = Math.abs(storedSpeedX+storedSpeedZ);
    // If the player has pressed space and they're landed, start to increase their vertical velocity.
    if(c.heldSpace == 1 && jumpState == 0) {speedY += ((c.heldSpace) / 8);}
    // The player can hold space for a maximum of 25 ticks to get higher jump speeds. 
    if (heldSpaceTicks <= 25) {heldSpaceTicks += c.heldSpace} else {jumpState = 2;}
    heldShiftTicks += (storedSpeedX)/16*Math.abs(c.heldShift-1); // The limit for shift ticks is the speed limit.
    // Increase their gravity value by that final velocity, unless it's above 0.75
    if(gravity <= 0.75 && jumpState <= 1) {gravity += speedY}
    // If it is, or if they've release spaced, then they should be put into landing mode.
    if(gravity >= 0.75 || (c.heldSpace == 0 && jumpState == 1)) {jumpState = 2;}
    // If they're in landing mode, gradually decrease their falling speed (slower depending on how long they held space)
    if(jumpState == 2) {gravity -= 0.5/heldSpaceTicks;}
    // At this speed, the player should lose control
    // Max speed achievable by charging; if this is reached, display key inputs until the player slows down.
    if(storedSpeedX >= 3) {storedSpeedX = 3; moveEnable = 0;}; if(storedSpeedX <= -3) {storedSpeedX = -3; moveEnable = 0;};
    if(storedSpeedZ >= 3) {storedSpeedZ = 3; moveEnable = 0;}; if(storedSpeedZ <= -3) {storedSpeedZ = -3; moveEnable = 0;};
    // The player will regain control when they've slowed down.
    if(storedSpeed <= 0.01 && storedSpeed >= -0.01) {moveEnable = 1;}
    // This function runs while the ball is still being initialized,
    // and we want to make sure it doesn't completely error out due
    // to the ball not being present.
    label: try {
    	speedX = (storedSpeedX * c.heldShift); speedZ = (storedSpeedZ * c.heldShift);
    	ball.scene.position.x -= speedX; ball.scene.rotateOnWorldAxis(new THREE.Vector3(1,0,0), storedSpeedZ);
    	ball.scene.position.z += speedZ; ball.scene.rotateOnWorldAxis(new THREE.Vector3(0,0,1), storedSpeedX);
    	if(ball.scene.position.x >= 25 || ball.scene.position.x <= -25) {ball.scene.position.x *= -1;}
    	if(ball.scene.position.z >= 25 || ball.scene.position.z <= -25) {ball.scene.position.z *= -1;}
    	ball.scene.position.y += gravity;
    	// Until there's a proper collision system, check if the player reachs y 0 and consider them as on the ground.
    	if(ball.scene.position.y < 0 && speedY >= 0.12 && jumpState >= 1) {
    		gravity = (speedY/1.5);
    		speedY /= 1.5;
    	} else if (ball.scene.position.y < 0 && speedY <= 0.12 && jumpState >= 1) {
    		gravity = 0; speedY = 0; ball.scene.position.y = 0; jumpState = 0; heldSpaceTicks = 0;}
        document.querySelector('.bar .fill').style.width = 21*storedSpeed+"px";
        if(!moveEnable) {document.querySelector('.bar .fill').style.filter = "saturate("+(100-(storedSpeed*33))+"%)"}
        document.querySelector('.debug').innerHTML = heldShiftTicks/350;
    	cs.CollisionCheck(ball);
    	break label;
    } catch(ex) {console.log(ex)}
}