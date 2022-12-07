import './style.css'

import * as THREE from 'three';

import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(80, window.innerWidth / window.innerHeight,0.5,1000);
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth,window.innerHeight);
camera.position.setZ(30);

renderer.render(scene,camera);

//tetrahedron
const normalTorus = new THREE.TextureLoader().load('torus_bumps.jpeg');
const theGeometry = new THREE.TetrahedronGeometry(10,0);
const material = new THREE.MeshStandardMaterial({
  color: 0x1E1919,
  normalMap:normalTorus
  });
const torus = new THREE.Mesh(theGeometry,material);
torus.position.z = -12;
torus.position.setX(15);

scene.add(torus);

// LIGHT
const pointLight = new THREE.PointLight(0xff0000)
pointLight.position.set(6,-6,10)

const ambientLight = new THREE.AmbientLight(0xffffff)

scene.add(pointLight,ambientLight)

// const lightHelper = new THREE.PointLightHelper(pointLight)
// const gridHelper = new THREE.GridHelper(200,50);
// scene.add(lightHelper)
const controls = new OrbitControls(camera,renderer.domElement);

// STARS
function addStars(){
  const theGeometry = new THREE.SphereGeometry(0.25,24,24);
  const material = new THREE.MeshStandardMaterial({color:0xffffff})
  const star = new THREE.Mesh(theGeometry,material);
  const [x,y,z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));
  star.position.set(x,y,z);
  scene.add(star)
}
Array(200).fill().forEach(addStars)
// BG AND PLANET
const spaceTexture = new THREE.TextureLoader().load('real_space.jpeg');
scene.background = spaceTexture;

const meTexture = new THREE.TextureLoader().load('FullSizeRender.JPG');
const me = new THREE.Mesh(
  new THREE.BoxGeometry(3,3,3),
  new THREE.MeshBasicMaterial({map:meTexture})
);
scene.add(me);

const planetTexture = new THREE.TextureLoader().load('planet_texture.jpeg');
const normalTexture = new THREE.TextureLoader().load('planet_tex.jpeg');
const planet = new THREE.Mesh(
  new THREE.SphereGeometry(3,32,32),
  new THREE.MeshStandardMaterial({map:planetTexture,normalMap:normalTexture})
);
planet.position.z = 12;
planet.position.y = -4;
planet.position.setX(-10);
scene.add(planet);

// RED PLANETS
function addPlanets(){
  const normalPlanet = new THREE.TextureLoader().load('planet_tex.jpeg');
  const planets = new THREE.Mesh(
    new THREE.SphereGeometry(4,24,24),
    new THREE.MeshStandardMaterial({color:0xAC4444,normalMap: normalPlanet})
    );
  const [x,y,z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));
  planets.position.set(x,y,z);
  scene.add(planets)
}
Array(8).fill().forEach(addPlanets)



// MOVE CAMERA 
function moveCamera(){
  const t = document.body.getBoundingClientRect().top;
  planet.rotation.x += 0.05;
  planet.rotation.y += 0.075;
  planet.rotation.z += 0.05;

  me.rotation.y += 0.05;
  me.rotation.z += 0.05;

  camera.position.z = t * -0.05;
  camera.position.x = t * -0.002;
  camera.position.y = t * -0.01;

}
document.body.onscroll = moveCamera

// LOOP RUNNING ANIMATIONS
function animation(){
  requestAnimationFrame(animation);
  torus.rotation.x += 0.005;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.005;
  planet.rotateZ(0.005);
  
  controls.update();

  renderer.render(scene,camera);
}

animation()