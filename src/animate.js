import * as THREE from 'https://cdn.skypack.dev/three@v0.132.2';
import * as m from './main.js';
import * as b from './ball.js';

  // Draw Function
  export function animate() {
    b.ballUpdate();
    requestAnimationFrame(animate);
    m.renderer.render(m.scene, m.camera);
  }