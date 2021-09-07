import * as THREE from 'https://cdn.skypack.dev/three@v0.132.2';
import * as m from './main.js';
import * as c from './controls.js';
import {rotateAboutPoint} from './globalFunctions.js';

// Load the ball model
export let ball = 0; export let ballReady = false;

// Speed
export let speedX = 0; export let speedZ = 0;
// Raycaster
export const raycaster = new THREE.Raycaster(ball.scene); 


export function ballInit() {
	m.gltf_loader.load('data/models/ball/ball.glb', (balltmp) => {
	    m.camera.position.x = -20; m.camera.rotation.x = -2.45;
	    m.camera.position.y = 20; m.camera.rotation.y = -0.5;
	    m.camera.position.z = -25; m.camera.rotation.z = -2.73;
	    m.scene.add(balltmp.scene);
	    ball = balltmp;
	    ballReady = true;
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
	// Constantly increase the speed based on whether or not the player is holding buttons.
    speedX += ((c.heldRight - c.heldLeft) / 350); speedZ -= ((c.heldDown - c.heldUp) / 350);
    // If the speed is above 0, decrease it, but if it's below it, increase it.
    if(speedX >= 0.000000000001) {speedX -= 0.001;} if(speedX < -0.000000000001) {speedX += (0.001);}
    if(speedZ >= 0.000000000001) {speedZ -= 0.001;} if(speedZ < -0.000000000001) {speedZ += (0.001);}
    // This function runs while the ball is still being initialized,
    // and we want to make sure it doesn't completely error out due
    // to the ball not being present.
    label: try {
    	const quaternion = new THREE.Quaternion();
    	ball.scene.position.x -= speedX; m.camera.position.x -= speedX; ball.scene.rotateOnWorldAxis(new THREE.Vector3(1,0,0), speedZ);
    	ball.scene.position.z += speedZ; m.camera.position.z += speedZ; ball.scene.rotateOnWorldAxis(new THREE.Vector3(0,0,1), speedX);
    	break label;
    } catch {}
    // Collision
    for (let i = 0; i < m.objects.length; i++) {
      let obj = m.objects[i];
      let objDir = obj.position.clone().sub(ball.scene.position).normalize();
      raycaster.set(ball.scene.position, objDir);
      objects[i].updateMatrixWorld();
      var intersects = raycaster.intersectObject(m.objects[i], true);
      if(intersects[0].distance <= 1.1) {
          ball.scene.position.x += (objDir.x*-.1); //camera.position.x += (objDir.x*-.1); 
          ball.scene.position.z += (objDir.z*-.1); //camera.position.z += (objDir.z*-.1); 
          speedX = 0; speedZ = 0;
      }
    }
}