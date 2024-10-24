import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/Addons.js';

let container, camera, scene, renderer, cube, controls;

init();

function init() {
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

  renderer = new THREE.WebGLRenderer();
  renderer.setSize( window.innerWidth, window.innerHeight );

  renderer.setAnimationLoop( animate );
  document.body.appendChild( renderer.domElement );

  // create orbit controls
  controls = new OrbitControls( camera, renderer.domElement );

  const geometry = new THREE.BoxGeometry( 1, 1, 1 );
  // const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
  const material = new THREE.MeshPhongMaterial( { color: 0x00ff00 } );
  cube = new THREE.Mesh( geometry, material );

  // object transformation
  cube.position.x = 0;
  cube.scale.set(2,2,2);
  cube.rotation.y = Math.PI / 4;
  scene.add( cube );

  const directionalLight = new THREE.DirectionalLight( 0xffffff, 0.7 );
  scene.add(directionalLight);

  const ambientLight = new THREE.AmbientLight( 0x404040 ); // soft white light
  scene.add( ambientLight );

  // Create a PointLight 
  const pointLight = new THREE.PointLight( 0xffffff, 50, 100 );
  camera.add( pointLight );
  scene.add( camera );


  //controls.update() must be called after any manual changes to the camera's transform
  camera.position.set(2,2,5);
  controls.update();

  const axesHelper = new THREE.AxesHelper( 5 );
  scene.add( axesHelper );

  camera.lookAt(axesHelper.position);
  camera.lookAt(new THREE.Vector3(0,0,0));

}


function animate() {

	cube.rotation.x += 0.01;
	cube.rotation.y += 0.01;

  // required if controls.enableDamping or controls.autoRotate are set to true
	controls.update();

	renderer.render( scene, camera );

}

window.addEventListener( 'resize', resize, false);


function resize(){
camera.aspect = window.innerWidth / window.innerHeight;
camera.updateProjectionMatrix();
renderer.setSize( window.innerWidth, window.innerHeight );
}
