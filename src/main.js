  import * as THREE from '../include/three.module.js';
  import * as CANNON from '../include/cannon-es.js';
  import cannonDebugger from '../include/cannon-es-debugger.js';

  import { GLTFLoader } from '../include/GLTFLoader.js';

  export const scene = new THREE.Scene();
  export const world = new CANNON.World({gravity: new CANNON.Vec3(0, -9.82, 0)});
  //cannonDebugger(scene, world.bodies, {color: 0xff0000, scale: 2});
  
  export const camera = new THREE.PerspectiveCamera( 45, 640 / 480, 0.1, 1000 );
  scene.add(camera);
  export const renderer = new THREE.WebGLRenderer();
  export const gltf_loader = new GLTFLoader();
  export var objects = [];
  //export var controls = new OrbitControls( camera, renderer.domElement );

  // Initialize the renderer
  renderer.setSize(640,480);
  document.querySelector(".wrapper").appendChild(renderer.domElement);