  import * as THREE from 'https://cdn.skypack.dev/three@v0.132.2';
  import { OrbitControls }from 'https://cdn.skypack.dev/three/examples/jsm/controls/OrbitControls.js';
  import { GLTFLoader } from 'https://cdn.skypack.dev/three/examples/jsm/loaders/GLTFLoader.js';

  export const scene = new THREE.Scene();
  export const camera = new THREE.PerspectiveCamera( 50, 640 / 480, 0.1, 1000 );
  scene.add(camera);
  export const renderer = new THREE.WebGLRenderer({alpha:true});
  export const gltf_loader = new GLTFLoader();
  export let objects = [];
  //export var controls = new OrbitControls( camera, renderer.domElement );

  // Initialize the renderer
  renderer.setSize(640,480);
  document.body.appendChild(renderer.domElement);
  
