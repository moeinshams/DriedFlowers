import * as THREE from "./three.module.js"

import{OrbitControls} from "./OrbitControls.js"

import {GLTFLoader} from "./GLTFLoader.js"


console.log(THREE)

let canvas = document.querySelector(".headerViewer")
let scene = new THREE.Scene()


//BoilerPlate
const sizes =
    {
        width: 500,
        height: 500
    }
const camera = new THREE.PerspectiveCamera(35, sizes.width/sizes.height, 0.01, 200)
scene.add(camera)




const renderer = new THREE.WebGLRenderer  ({
    alpha: true,
    canvas: canvas,
    antialias: true,
    refraction: true,


})

renderer.setSize(sizes.width, sizes.height)

let controls = new OrbitControls(camera, renderer.domElement)
controls.enableZoom = false;

let obj

let gLoader = new GLTFLoader()

gLoader.load("/Rose_Anatomy/scene.gltf", function (gltf){
    obj = gltf.scene
    scene.add(gltf.scene)
    obj.position.y = -0.5,
    obj.scale.y = 1.5


})

let light = new THREE.HemisphereLight(0xffffff, 0x000000, 5)
scene.add(light)


camera.position.set(0,0,6)

//Loop
function animate(){
    requestAnimationFrame(animate)
    controls.update()
    renderer.render(scene, camera)
    obj.rotation.y += 0.0003


}
animate()




