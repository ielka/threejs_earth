import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import gsap from 'gsap'
import { LineCurve3 } from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
/**
 * Models
 */
 const dracoLoader = new DRACOLoader()
 dracoLoader.setDecoderPath('/draco/')
 
 const gltfLoader = new GLTFLoader()
 gltfLoader.setDRACOLoader(dracoLoader)
 
 
 let mixer = null
 

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')


// light

const light = new THREE.AmbientLight(0x404040, 3 ); // soft white light
const pointlight = new THREE.PointLight(0xc4c4c4,3);
pointlight.position.set( 3, 3, 3 );
pointlight.castShadow = true;

// Scene
const scene = new THREE.Scene()
scene.background = new THREE.Color("rgb(248,248,248)")

//fog 

const color = 0xFFFFFF;  // white
  const near = 2.5;
  const far = 3;
  scene.fog = new THREE.Fog(color, near, far);

/**
 * Textures
 */
const loadingManager = new THREE.LoadingManager()
loadingManager.onStart = () =>
{
    console.log('loadingManager: loading started')
}
loadingManager.onLoad = () =>
{
    console.log('loadingManager: loading finished')
}
loadingManager.onProgress = () =>
{
    console.log('loadingManager: loading progressing')
}
loadingManager.onError = () =>
{
    console.log('loadingManager: loading error')
}

const textureLoader = new THREE.TextureLoader(loadingManager)


const colorTexture = textureLoader.load(
    '/textures/earth13.jpg'
)
colorTexture.wrapS = THREE.MirroredRepeatWrapping
colorTexture.wrapT = THREE.MirroredRepeatWrapping
// colorTexture.repeat.x = 2
// colorTexture.repeat.y = 3
// colorTexture.offset.x = 0.5
// colorTexture.offset.y = 0.5
// colorTexture.rotation = Math.PI * 0.25
// colorTexture.center.x = 0.5
// colorTexture.center.y = 0.5
colorTexture.generateMipmaps = false
colorTexture.minFilter = THREE.NearestFilter
colorTexture.magFilter = THREE.NearestFilter

/**
 * Object
 */
const geometry = new THREE.SphereGeometry(1, 70, 100)
console.log(geometry.attributes)
const material = new THREE.MeshBasicMaterial({ map: colorTexture })
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

let mesh1 = new THREE.Mesh(
    new THREE.SphereBufferGeometry(0.01,20,20),
    new THREE.MeshBasicMaterial("rgb(255,255,255)")
)

let mesh2 = new THREE.Mesh(
    new THREE.SphereBufferGeometry(0.01,20,20),
    new THREE.MeshBasicMaterial("rgb(255,255,255)")
)
let mesh3 = new THREE.Mesh(
    new THREE.SphereBufferGeometry(0.01,20,20),
    new THREE.MeshBasicMaterial("rgb(255,255,255)")
)
let mesh4 = new THREE.Mesh(
    new THREE.BoxGeometry(1,1,1),
    new THREE.MeshBasicMaterial({color:0xff000})
)


function calcPosFromLatLon(lat,lng){
    var phi = (90 - lat)*(Math.PI/180);
    var theta = (lng+180)*(Math.PI/180);
    let x = -(Math.sin(phi)*Math.cos(theta));
    let z = (Math.sin(phi)*Math.sin(theta));
    let y = (Math.cos(phi));
    return {x,y,z};
}

let point1 = {
    lat: 40.7128,
    lng: -74.0060
}

let point2 = {
    lat: 51.5072,
    lng: 0.1276
}
let point3 = {
    lat: 34.0522,
    lng: -118.2437
}

let pos = calcPosFromLatLon(point1.lat,point1.lng);
let pos1 = calcPosFromLatLon(point2.lat,point2.lng);
let pos2 = calcPosFromLatLon(point3.lat,point3.lng);
console.log(pos);

mesh1.position.set(pos.x,pos.y,pos.z)
mesh2.position.set(pos1.x, pos1.y,pos1.z)
mesh3.position.set(pos2.x,pos2.y,pos2.z)
scene.add(mesh1)
scene.add(mesh2)
scene.add(mesh3)
let midx = (pos.x + pos1.x)/2
let midy = (pos.y +pos1.y)/2
let midz = (pos.z +pos1.z)/2

//curve
/*
let curve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(pos.x,pos.y,pos.z),
    new THREE.Vector3(midx,midy + 0.1,midz + 0.1),
    new THREE.Vector3(pos1.x,pos1.y,pos1.z)
],true, "chordal",);


const vertices = curve.getSpacedPoints(80);
console.log(vertices);

const lineGeometry = new THREE.BufferGeometry().setFromPoints(vertices);
const lineMaterial = new THREE.LineBasicMaterial({color:"rgb(211, 211, 211)", visible: true});
const line = new THREE.Line(lineGeometry,lineMaterial);

scene.add(line);
*/
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
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 500)
camera.position.x = -0.70
camera.position.y = 1.10
camera.position.z = 1.60
camera.lookAt(0.2,0.2,0.2)
scene.add(camera)

//const controls = new OrbitControls(camera, canvas)
//camera animation


const element = document.getElementById('button');
const element1 = document.getElementById('button1');
const element2 = document.getElementById('button2');

function myFunction() {
    var x = document.getElementById("button-5");
    if (x.style.display === "none") {
      x.style.display = "block";
    } else {
      x.style.display = "none";
    }
  }
  

//New York card click
 document.getElementById("button").addEventListener('click',function(){
     gsap.to(camera.position,{
         x:0.25,
         y:1.04,
         z:1.45,
         duration:2,
         onUpdate: function() {
            camera.lookAt(0,0,0)
            document.getElementById('button-5').style.display='block'
            document.getElementById('button-5.1').style.display='none'
            document.getElementById('button-5.2').style.display='none'
         }
     })
     
 })

//Dallas card click
 document.getElementById("button1").addEventListener('click',function(){
    gsap.to(camera.position,{
        x:1.25,
        y:1.04,
        z:1.45,
        duration:2,
        onUpdate: function() {
           camera.lookAt(0,0,0)
           document.getElementById('button-5').style.display='none'
            document.getElementById('button-5.1').style.display='block'
            document.getElementById('button-5.2').style.display='none'
           
        }
    })
    
})
//Los Angeles card click
document.getElementById("button2").addEventListener('click',function(){
    gsap.to(camera.position,{
        x:0.25,
        y:0.04,
        z:1.45,
        duration:2,
        onUpdate: function() {
           camera.lookAt(0,0,0)
           document.getElementById('button-5').style.display='none'
            document.getElementById('button-5.1').style.display='none'
            document.getElementById('button-5.2').style.display='block'
           
        }
    })
    
})

//Visit New York button click
document.getElementById("button-5").addEventListener('click',function(){
    gsap.to(camera.position,{
        x:3.33,
        y:0.73,
        z:0.28,
        duration:2,
        onUpdate: function() {
           camera.lookAt(2.622,0.288,-0.075)
           document.getElementById('button-5').style.display='none'
            document.getElementById('button-5.1').style.display='none'
            document.getElementById('button-5.2').style.display='none'
           
        }
    })
    document.getElementById('button').style.display='none'
    document.getElementById('button1').style.display='none'
    document.getElementById('button2').style.display='none'
    scene.remove(mesh,mesh1,mesh2,mesh3);
    
    gltfLoader.load(
        '/model/city.glb',
        (gltf) =>
        {
            gltf.scene.scale.set(0.05, 0.05, 0.05)
            
            scene.add(gltf.scene)
            gltf.scene.children[0].visible = true;
            gltf.scene.children[1].visible = true;
            
            
            scene.add(light);
            //scene.add(pointlight);

            

            const a = gltf.scene.children[0]
            const b = gltf.scene.children[1]
            //const c = gltf.scene.children[2]
            const d = gltf.scene.children[3]
            const e = gltf.scene.children[4]
            const f = gltf.scene.children[5]
            
            

            //floor 2 button click

            document.getElementById("button-6").addEventListener('click',function(){
                a.visible = false;
                b.visible = true;
                
                d.visible = true;
                e.visible = false;
                f.visible = false;
                
                


                gsap.to(camera.position,{
                    x:2.55,
                    y:0.467,
                    z:-0.113,
                    duration:1,
                    
                    onUpdate: function() {
                        camera.lookAt(2.34,0.311,-0.402)
                        
                        
                     }
                })

                })

            // floor 3 button click

            document.getElementById("button-6.1").addEventListener('click',function(){
                a.visible = true;
                b.visible = false;
                
                d.visible = true;
                e.visible = false;
                f.visible = true;



                gsap.to(camera.position,{
                    x:2.55,
                    y:0.69,
                    z:-0.162,
                    duration:1,
                    
                    onUpdate: function() {
                        camera.lookAt(2.34,0.311,-0.402)
                        
                        
                     }
                })


            })

            
            
        })

        document.getElementById('button-6').style.display='block'
        document.getElementById('button-6.1').style.display='block'
        
})






/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias:true
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.outputEncoding = THREE.sRGBEncoding

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update controls
    //controls.update()

    //earth position
    console.log(camera.position.x,
    camera.position.y,
    camera.position.z)
    

    



    

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()