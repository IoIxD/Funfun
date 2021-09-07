import * as THREE from 'https://cdn.skypack.dev/three@v0.132.2';
import * as m from './main.js';

export function CollisionCheck(obj) {
    // Raycaster
    const raycaster = new THREE.Raycaster(obj); 
    // For each of the objects in our scene
    for (let i = 0; i < m.objects.length; i++) {
      let sobj = m.objects[i]; // The object we're searching
      label: try {
        let objDir = sobj.position.clone().sub(obj.position).normalize(); // The direction between it and the other object.
        console.log(objDir);
        sobj.updateMatrixWorld(); // (I don't remember why this is here, however I think I remember it fixing something)
        console.log(obj.position.x);
        raycaster.set(obj.position, objDir); // Set up the raycaster
        let intersects = raycaster.intersectObject(sobj, true);
        console.log(intersects);
        if(intersects[0].distance > 0) {
            console.log(intersects[0].distance);
        }
        break label;
      } catch (ex) {console.log(ex)}
    }
}