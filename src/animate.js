import * as m from './main.js';
import * as b from './ball.js';
export let lastCallTime;

  // Draw Function
  export function animate() {
    b.ballUpdate();
    requestAnimationFrame(animate);
    const timeStep = 1 / 60;
    m.renderer.render(m.scene, m.camera);
    const time = performance.now() / 1000;
    if (!lastCallTime) {
      m.world.step(timeStep);
    } else {
      m.world.step(timeStep, time - lastCallTime)
    }
    lastCallTime = time;
  }