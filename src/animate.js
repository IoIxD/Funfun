import * as m from './main.js';
import * as b from './ball.js';
export let lastCallTime;

  // Draw Function
  export function animate() {
    const time = performance.now() / 1000;
    if (!lastCallTime) {
      m.world.step(1 / 60);
    } else {
      m.world.step(1 / 60, time - lastCallTime)
    }
    lastCallTime = time;
    b.ballUpdate();
    requestAnimationFrame(animate);
    m.renderer.render(m.scene, m.camera);
  }