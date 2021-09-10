import * as m from './main.js';
import * as b from './ball.js';

  // Draw Function
  export function animate() {
    m.world.step(1 / 60);
    b.ballUpdate();
    requestAnimationFrame(animate);
    m.renderer.render(m.scene, m.camera);
  }