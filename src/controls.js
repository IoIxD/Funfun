export let heldLeft = 0; export let heldRight = 0; export let heldUp = 0; export let heldDown = 0; export let heldShift = 0;
document.addEventListener('keydown', function(e) {
  switch(e.key) {
    case 'ArrowRight':
    case 'd':
      heldRight = 1;
      break;
    case 'ArrowLeft':
    case 'a':
      heldLeft = 1;
      break;
    case 'ArrowUp':
    case 'w':
      heldUp = 1;
      break;
    case 'ArrowDown':
    case 's':
      heldDown = 1;
      break;
    case 'Shift':
      heldShift = 1;
      break;
  }
})
document.addEventListener('keyup', function(e) {
  switch(e.key) {
    case 'ArrowRight':
    case 'd':
      heldRight = 0;
      break;
    case 'ArrowLeft':
    case 'a':
      heldLeft = 0;
      break;
    case 'ArrowUp':
    case 'w':
      heldUp = 0;
      break;
    case 'ArrowDown':
    case 's':
      heldDown = 0;
      break;
    case 'Shift':
      heldShift = 0;
      break;
  }
})