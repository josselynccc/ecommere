import {Mesh,Clock,MeshStandardMaterial,Color, WebGLRenderer, Scene, SphereGeometry, BackSide, Vector3 } from 'three'
import { colorTextureStar,colorTextureScene,colorTexture,cloudTexture,colorTextureMercury,colorTextureVenus,colorTextureMarte,colorTextureJupiter,colorTextureSaturno,colorTextureUrano, colorTextureNeptuno, colorTextureSol } from '../../constants/Texturas.js'
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
import './Home.css'
import {CreatePlanet} from "../../helpers/CreatePlanet.js"
import LimitZoom from '../../helpers/LimitZoom.js'
import {useRef, useEffect } from 'react'
import CreateCamera from '../../helpers/CreateCamara'
// import HandleDoubleClick from '../../helpers/HandleDoubleClick.js'
import Resize from '../../helpers/Resize.js'
import {PointLightStar,AmbientLightScene, PointLightScene } from '../../helpers/Lights.js'
import {CreateOrbitPlanet} from '../../helpers/CreateOrbitaPlanet.js'
import {CreateNaveEspacial} from '../../helpers/CreateNaveEspacial.js'
import MainHeader from '../organism/MainHeader.jsx'
const Home = () =>{
    
    const planetsRef = useRef([]);
    const orbitsRef = useRef([]);
    const rendererRef = useRef(null);
    const scene = new Scene()
    const camara = CreateCamera({x:0, y:50, z:250})
    const naveRef = useRef([])
    
    useEffect(()=>{

        if (rendererRef.current) {
            rendererRef.current.dispose();
        }

        //CREANDO LA ESCENA
        scene.background = new Color( 0x404040 );

        //LIGHT A LA ESCENA
        AmbientLightScene(scene)

        //CREANDO LA ALTURA Y ANCHURA
        const width = window.innerWidth;
        const height = window.innerHeight;

        //CREANDO CAMARA
        scene.add(camara)

        //CREANDO FIGURAS
        //FONDO
        const geometryScene = new SphereGeometry(600,100)
        const materialScene = new MeshStandardMaterial({ map: colorTextureScene, side: BackSide})
        const cuboScene = new Mesh(geometryScene, materialScene)
        
        scene.add(cuboScene)

        
        const light = PointLightScene(scene,colorTextureSol)
        
        camara.lookAt(0,0,0) //camara mira a la sphera

        
        //PLANETAS
        const planetsData = [
            { texture: colorTexture, radio: 6.5, rotationSpeed: 360 / 240 , afelio: 152	, perihelio: 147, alphaMapTexture:cloudTexture, texto: "Curriculum"},
            { texture: colorTextureMercury, radio: 2 , rotationSpeed: 360 / 14080 , afelio: 69	, perihelio: 46, texto: "Proyectos"},
            { texture: colorTextureVenus, radio: 6 , rotationSpeed: 360 / 58320, afelio:108 , perihelio: 107},
            { texture: colorTextureMarte, radio: 3, rotationSpeed: 360 / 250 , afelio: 249 , perihelio: 206},
            { texture: colorTextureJupiter, radio: 12, rotationSpeed: 360 / 100 , afelio: 516, perihelio: 440},
            { texture: colorTextureSaturno, radio: 10, rotationSpeed: 360 / 110, afelio: 590	, perihelio: 550},
            { texture: colorTextureUrano, radio: 9,  rotationSpeed: 360 / 170, afelio: 700	, perihelio: 630 },
            { texture: colorTextureNeptuno, radio: 8,rotationSpeed: 360 / 160, afelio: 900 , perihelio: 780 },
        ]

        planetsData.forEach(planet =>{ 
            const planetObject = CreatePlanet(scene,planet.texture, planet.radio, planet.alphaMapTexture, planet.texto)
            const planetInfo = {
                planetObj : planetObject,
                rotationSpeed: planet.rotationSpeed,
                afelio: planet.afelio,
                perihelio: planet.perihelio
            }
            planetsRef.current.push(planetInfo)

            const orbitRef = CreateOrbitPlanet(scene, planet.afelio , planet.perihelio)
            orbitsRef.current.push(orbitRef)
        })
        
        //STARS
        const dataStar = [
            { colorTextureStar: colorTextureStar, position: { x: 50, y: 5, z: 80 }  },
            { colorTextureStar: colorTextureStar, position: { x: 70, y: 2, z: 2 }  },
            { colorTextureStar: colorTextureStar, position: { x: 88,  y: 8, z: -10 } },
            { colorTextureStar: colorTextureStar , position: { x: -80, y: 0, z: -30 } },
            { colorTextureStar: colorTextureStar, position: { x: -25, y:5, z: 10 } },
            { colorTextureStar: colorTextureStar,  position: { x: -88, y: -5, z: 4 } },
            { colorTextureStar: colorTextureStar, position: { x: -98, y: -5, z: 100 } },
            { colorTextureStar: colorTextureStar, position: { x: -108, y: -5, z: 60 } },
        ]

        dataStar.forEach(star =>{ 
            PointLightStar(scene,star.colorTextureStar, star.position)
        })


        //RENDERIZANDO
        const renderer = new WebGLRenderer()
        renderer.setSize(width, height)
        document.body.appendChild(renderer.domElement)

        renderer.setClearColor('#000000')
        renderer.setPixelRatio(Math.min(window.devicePixelRatio), 2)

        //RESIZE
        window.addEventListener("resize", Resize(camara,renderer))
        
        //CREANDO EL CONTROLS 
        const controls = new OrbitControls( camara, document.body)
        controls.update();

        const renderScene = () =>{
            renderer.render(scene, camara)
        }

        //OBJETO NAVE
        const objNave = CreateNaveEspacial(scene, {x:0,y:20,z:200})
        naveRef.current.push(objNave)
        console.log(naveRef)

        //ANIMATE
        const clock = new Clock();
        const animate = () => {
            const deltaTime = clock.getDelta();
            LimitZoom(camara,cuboScene);

            light.rotation.y += 0.05 * deltaTime

   
            planetsRef.current.forEach((planetData, index) => {
                
                    const planet = planetData.planetObj;
                    const Speed = planetData.rotationSpeed
                    const orbit = orbitsRef.current[index]
                    const currentTime = Date.now() * 0.00001 * Speed
                    const position = orbit.calculatePosition(currentTime);
                    planet.position.copy(position);
                
            })
            

            planetsRef.current.forEach((planetData) => {
                const planet = planetData.planetObj
                const planetPosition = planet.getWorldPosition(new Vector3());
                const textGroup = planet.userData.textGroup
                const cameraPosition = camara.position
                const distance = planetPosition.distanceTo(cameraPosition)
                
                if (textGroup) {
                    let scaleFactor;
                if (distance > 80) {
                    scaleFactor = 1; 
                } else if (distance < 80) {
                    scaleFactor = 0.3; 
                } else {
                    scaleFactor = 1 - (distance - 1) * 0.1;
                }
                textGroup.scale.set(scaleFactor, scaleFactor + 0.3, scaleFactor);
                    
                    const rotationSpeed = planetData.rotationSpeed * (1 + distance * 0.001);
                    planet.rotation.y += rotationSpeed * deltaTime * 0.5
                }   
            })
            renderScene()
            requestAnimationFrame(animate)
        
        }

        animate()
        // //FULLSCREEN
        // const FullScreen = () => {HandleDoubleClick(renderer.domElement)}
        // window.addEventListener('dblclick', FullScreen) 
        
        
       
        
        //REMOVER LA FUNCION AL DESMONTAR EL COMPONENTE
        return () =>{
            // window.removeEventListener('dblclick', FullScreen)
            renderer.dispose()
            document.body.removeChild(renderer.domElement)
        }
        
    },[])
    

    return <>
        {planetsRef.current && naveRef.current &&(
            <MainHeader 
                nave = {naveRef.current}
                planet={planetsRef.current}
                camara={camara}
            />
        )}
        

        {/* <div className='creditos'>
            &quot;Astronauta&quot; (https://skfb.ly/6GBvp) by Mora is licensed under Creative Commons Attribution (http://creativecommons.org/licenses/by/4.0/). <br />
            &quot;Nave Espacial/Spacecraft&quot; (https://skfb.ly/6wCFG) by MatiasG729 is licensed under Creative Commons Attribution (http://creativecommons.org/licenses/by/4.0/).
        </div> */}
    </>
}

export default Home