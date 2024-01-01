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


/**
 * Base
 */
// Debug
// const gui = new GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Geometry
 */
// Geometry for Background Geometry
const background = new THREE.SphereGeometry(1.5, 32, 32)

//const geoArray = ["sphere", "donut", "ring", "tiny", "disc"]
//const geoKind = geoArray[Math.floor(Math.random()*geoArray.length)]
//const geoKind = "tiny" 
//console.log(geoKind)

var sphere = new THREE.SphereGeometry(0.4, 64, 64)


/*if (geoKind == "sphere"){
    var sphere = new THREE.SphereGeometry(0.6, 64, 64)
} else if ( geoKind === "donut"){
    var radius = 0.8/4500
    var tube = 0.16/4500
    var sphere = new THREE.TorusGeometry(radius * window.innerHeight, tube * window.innerHeight,16,100)
} else if (geoKind == "ring"){
    var radius = 0.8/1000
    var tube = 0.025/1000
    var sphere = new THREE.TorusGeometry(radius * window.innerHeight, tube * window.innerHeight,16,100)
} else if (geoKind == "disc"){
    var radius = 0.6/4500
    var tube = 0.55*(0.4/0.6)/4500
    var sphere = new THREE.TorusGeometry(radius * window.innerHeight, tube * window.innerHeight,16,100)
}
else {
    var sphere = new THREE.SphereGeometry(0.4, 64, 64)
}*/



/**
 * Material
 */
// Material for Background

const HSLToRGB = (h, s, l) => {
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
const accentColor = new THREE.Vector3 (1.0, 1.0, 1.0)
console.log(firstColor)
console.log("second color is" + secondColor)


//const firstColor = HSLToRGB(111 + colorDegree%360, 18.8, 53.1)
//const secondColor = HSLToRGB(31 + colorDegree%360, 71.8, 56.9)

const bgsizeArray = [0.05]
//const bgsizeArray = [0.05, 0.1, 0.2, 0.3]
const bgsize = bgsizeArray[Math.floor(Math.random()*bgsizeArray.length)]

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
        uPosition: {value: Math.random()*10}   
    }
})



// gui.add(myObject, 'myVariable').min(0).max(360).step(1).name('Degree')
//gui.add(bgdmaterial.uniforms.uFirstColor.value, 'x').min(0).max(20).step(0.01).name('frequencyX')
// gui.add(bgdmaterial.uniforms.uSecondColor.value, 'y').min(0).max(20).step(0.01).name('frequencyY')

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


// Mesh
const backgroundMesh = new THREE.Mesh(background, bgdmaterial)
const sphereMesh = new THREE.Mesh(sphere, sphereMaterial)

sphereMesh.position.x =0
sphereMesh.position.y =0
sphereMesh.position.z =0
sphereMesh.rotation.y = 0

scene.add(backgroundMesh)
scene.add(sphereMesh)


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

    // Update Torus
    sphereMesh.raius = radius * sizes.width
    sphereMesh.tube =  tube * sizes.width

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
controls.enableDamping = true
controls.dampingFactor = 0.5;
controls.maxDistance = 1.5;
controls.minDistance = 0.6;
controls.panSpeed = 0;
//controls.enableZoom = false;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
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


const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()
    //sphereMesh.position.x += elapsedTime *0.0001

    // Update meterial (uniforms)
    bgdmaterial.uniforms.uTime.value = elapsedTime

    sphereMaterial.uniforms.tCube.value = cubeRenderTarget.texture

    // Update controls
    // controls.update()

    // Render
    // renderer.render(scene, camera)
    composer.render(scene, camera)
    cubeCamera.update(renderer, scene)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()