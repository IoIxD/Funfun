export let heldLeft = 0; export let heldRight = 0; export let heldUp = 0; export let heldDown = 0; 
export let heldSpace = 0; export let heldSpaceTicks = 0; export let heldShift = 1; export let heldShift_ = 1;
document.addEventListener('keydown', function(e) {
  switch(e.key) {
    case 'ArrowRight':
    case 'd':
    case 'D':
      heldRight = 1;
      break;
    case 'ArrowLeft':
    case 'a':
    case 'A':
      heldLeft = 1;
      break;
    case 'ArrowUp':
    case 'w':
    case 'W':
      heldUp = 1;
      break;
    case 'ArrowDown':
    case 's':
    case 'S':
      heldDown = 1;
      break;
    case ' ':
      heldSpace = 1;
      break;
    case 'Shift':
      heldShift = 0;
      heldShift_ = 3;
      break;
  }
})
document.addEventListener('keyup', function(e) {
  switch(e.key) {
    case 'ArrowRight':
    case 'd':
    case 'D':
      heldRight = 0;
      break;
    case 'ArrowLeft':
    case 'a':
    case 'A':
      heldLeft = 0;
      break;
    case 'ArrowUp':
    case 'w':
    case 'W':
      heldUp = 0;
      break;
    case 'ArrowDown':
    case 's':
    case 'S':
      heldDown = 0;
      break;
    case ' ':
      heldSpace = 0;
      break;
    case 'Shift':
      heldShift = 1;
      heldShift_ = 1;
      break;
  }
})