import * as THREE from 'https://cdn.skypack.dev/three@v0.132.2';
import * as m from './main.js';

export function CollisionCheck(obj) {
    // Raycaster
    const raycaster = new THREE.Raycaster(obj.scene); 
    // For each of the objects in our scene
    for (let i = 0; i < m.objects.length; i++) {
      let sobj = m.objects[i]; // The object we're searching
      console.log(sobj);
      let objDir = sobj.position.clone().sub(obj.scene,position).normalize(); // The direction between it and the other object.
      raycaster.set(obj.scene.position, objDir); // Set up the raycaster
      sobj.updateMatrixWorld(); // (I don't remember why this is here, however I think I remember it fixing something)
      let intersects = raycaster.intersectObjects(m.objects[i], true);
      console.log(intersects.length);
      console.log(intersects[0].distance);
    }
}