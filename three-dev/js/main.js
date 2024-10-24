import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/Addons.js';

let container, camera, scene, renderer, ball1, ball2, hat, snowman, controls;

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

  const directionalLight = new THREE.DirectionalLight( 0xffffff, 1 );
  scene.add(directionalLight);

  const ambientLight = new THREE.AmbientLight( 0x000000 ); 
  scene.add( ambientLight );

  // Create a PointLight 
  const pointLight = new THREE.PointLight( 0xffffff, 50, 100 );
  camera.add( pointLight );
  scene.add( camera );

  // const geometry = new THREE.BoxGeometry( 1, 1, 1 );
  // const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
  const material = new THREE.MeshPhongMaterial( { color: 0x248f6f } );

  snowman = new THREE.Group();
  scene.add(snowman);
  ball1 = new THREE.Mesh( new THREE.SphereGeometry( 3, 32, 16 ), material );
  // object transformation
  ball1.position.x = 0;
  // ball1.scale.set(2,2,2);
  ball1.rotation.y = Math.PI / 4;
  snowman.add( ball1 );

  ball2 = new THREE.Mesh( new THREE.SphereGeometry( 2, 32, 16 ), material );
  ball2.position.y = 4;
  snowman.add( ball2 );

  hat = new THREE.Mesh( new THREE.CylinderGeometry( 1, 3, 2, 32, 1 ), material );
  hat.position.y = 6;
  snowman.add( hat );

  //controls.update() must be called after any manual changes to the camera's transform
  camera.position.set(2,2,15);
  controls.update();

  const axesHelper = new THREE.AxesHelper( 5 );
  scene.add( axesHelper );

  camera.lookAt(axesHelper.position);
  camera.lookAt(new THREE.Vector3(0,0,0));

}


function animate() {

	snowman.rotation.x += 0.01;
	snowman.rotation.z += 0.01;

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
