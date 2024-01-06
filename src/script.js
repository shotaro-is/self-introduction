import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
// Fimport GUI from 'lil-gui'
import envVertexShader from './shaders/vertex1.glsl'
import envFragmentShader from './shaders/fragment1.glsl'
import sphVertexShader from './shaders/vertex2.glsl'
import sphFragmentShader from './shaders/fragment2.glsl'
import {DotScreenShader} from './customshader.js'

import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { ShaderPass } from 'three/addons/postprocessing/ShaderPass.js';


// Base
// const gui = new GUI()
const canvas = document.querySelector('canvas.webgl')
const scene = new THREE.Scene()

// Material

// Sick Purple and Magenta
const firstColor = new THREE.Vector3( 0.14085389641915935, 0.17280660558853583, 0.5790617660022223);
const secondColor = new THREE.Vector3( 0.9042740218407768, 0.11835390023809561, 0.8929264272599726);

// Random Color Generator 
/*const HSLToRGB = (h, s, l) => {
    s /= 100;
    l /= 100;
    const k = n => (n + h / 30) % 12;
    const a = s * Math.min(l, 1 - l);
    const f = n =>
      l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
    return new THREE.Vector3 (f(0), f(8), f(4))
  };

const firstColor = HSLToRGB(360*Math.random(), 80*Math.random()+20, 60*Math.random()+30)
const secondColor = HSLToRGB(360*Math.random(), 80*Math.random()+20, 60*Math.random()+30)
console.log(firstColor);
console.log(secondColor);*/

const accentColor = new THREE.Vector3 (1.0, 1.0, 1.0)



//const bgsizeArray = [0.05, 0.1, 0.2, 0.3]
//const bgsize = bgsizeArray[Math.floor(Math.random()*bgsizeArray.length)]
const bgsize = 0.05

const bgdmaterial = new THREE.RawShaderMaterial({
    vertexShader: envVertexShader,
    fragmentShader: envFragmentShader,
    side: THREE.DoubleSide,
    uniforms:{
        uFirstColor: {value: firstColor},
        uSecondColor: {value: secondColor},
        uAccecntColor:{value: accentColor},
        uTime: {value: 0},
        uRandom: {value: bgsize},
        uPosition: {value: 3}   
    }
})

// Material for Sphere
const sphereMaterial = new THREE.RawShaderMaterial({
    vertexShader: sphVertexShader,
    fragmentShader: sphFragmentShader,
    side: THREE.DoubleSide,
    uniforms:{
        uFrequency: {value: new THREE.Vector2(10,5)},
        uTime: {value: 0},   
        tCube: {value:0}
    }
})


// Geometry
const background = new THREE.SphereGeometry(1.5, 32, 32)

const spheres = [];

const sphere = new THREE.SphereGeometry(0.03, 64, 64)

for ( let i = 0; i < 500; i++){
    const mesh = new THREE.Mesh(sphere, sphereMaterial);
    mesh.position.x = Math.random()*3 - 1.5;
    mesh.position.y = Math.random()*3 - 1.5;
    mesh.position.z = Math.random()*3 - 1.5;
    if (i%3 == 0) mesh.scale.x = mesh.scale.y = mesh.scale.z = Math.random();
    else mesh.scale.x = mesh.scale.y = mesh.scale.z = Math.random() * 6;
    scene.add(mesh);
    spheres.push(mesh);
}

const backgroundMesh = new THREE.Mesh(background, bgdmaterial)

scene.add(backgroundMesh)


// Add Cubecamera
const cubeRenderTarget = new THREE.WebGLCubeRenderTarget(256,{
    format: THREE.RGBAFormat,
    generateMipmaps: true,
    minFilter: THREE.LinearMipMapLinearFilter
})

const cubeCamera = new THREE.CubeCamera(0.1, 10 , cubeRenderTarget)



/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

    //Update PostProcessing
    composer.setSize(sizes.width, sizes.height)


})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
// camera.lookAt(sphereMesh.position)

// Normal Camera Position 
camera.position.set(0.04, 0.04, 1.3)

scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableZoom = false;
controls.enablePan = false;
controls.enableDamping = true
//controls.minPolarAngle = 0 * Math.PI; // radians
// controls.maxPolarAngle =  0.3 * Math.PI; // radians
controls.minAzimuthAngle = - 0.5 * Math.PI;; // radians
controls.maxAzimuthAngle =  0.5 * Math.PI;; // radians
controls.dampingFactor = 0.03;


/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true,
    alpha: true,
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))


// Post Processing
const composer = new EffectComposer( renderer );
composer.addPass( new RenderPass( scene, camera ) );

const effect1 = new ShaderPass( DotScreenShader );
effect1.uniforms[ 'scale' ].value = 4;
composer.addPass( effect1 );


/**
 * Animate
 */
const clock = new THREE.Clock()

const hideEle = document.getElementById("text");


const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()
    if (elapsedTime > 0.8) hideEle.classList.remove("isHidden");
    //sphereMesh.position.x += elapsedTime *0.0001

    // Update meterial (uniforms)
    bgdmaterial.uniforms.uTime.value = elapsedTime

    sphereMaterial.uniforms.tCube.value = cubeRenderTarget.texture

    for (let i = 0, il = spheres.length; i < il; i++){
        const sphere = spheres[i];
        
        // Diagonal Flow
        //sphere.position.x = Math.cos(elapsedTime*0.03 + i*10);
        //sphere.position.y = Math.cos(elapsedTime*0.03 + i*10);
        //sphere.position.z = Math.sin(elapsedTime*0.03 + i * 1.1);

        // Baloon Move 
        // sphere.position.x = Math.cos(elapsedTime*0.05 + i*10);
        sphere.position.y = Math.cos(elapsedTime*0.05 + i*1.2);
        sphere.position.z = 1.02 * Math.sin(elapsedTime*0.05 + i * 1.1);
    }

    // Update controls
    controls.update()

    // Render
    // renderer.render(scene, camera)
    composer.render(scene, camera)
    cubeCamera.update(renderer, scene)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()