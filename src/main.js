  import { OrbitControls }from '../include/threejs/examples/jsm/controls/OrbitControls.js';
  import { GLTFLoader } from '../include/threejs/examples/jsm/loaders/GLTFLoader.js';

  Physijs.scripts.worker = '../include/physijs/physijs_worker.js';
  Physijs.scripts.ammo = '../include/ammo.js';

  export const scene = new THREE.Scene();
  export const camera = new THREE.PerspectiveCamera( 45, 640 / 480, 0.1, 1000 );
  scene.add(camera);
  export const renderer = new THREE.WebGLRenderer();
  export const gltf_loader = new GLTFLoader();
  export var objects = [];
  //export var controls = new OrbitControls( camera, renderer.domElement );

  // Initialize the renderer
  renderer.setSize(640,480);
  document.querySelector(".wrapper").appendChild(renderer.domElement);
  
