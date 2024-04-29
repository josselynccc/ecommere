import { useEffect, useRef, useState } from "react";
import { Color, Scene } from "three";
import CreateCamera from '../../helpers/CreateCamara'
import {AmbientLightScene, PointLightScene } from '../../helpers/Lights.js'
import {Mesh,Clock,MeshStandardMaterial, WebGLRenderer, SphereGeometry, BackSide } from 'three'
import { colorTextureScene} from '../../constants/Texturas.js'
import LimitZoom from '../../helpers/LimitZoom.js'
import Resize from '../../helpers/Resize.js'
import { CreateNaveEspacial } from "../../helpers/CreateNaveEspacial.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
import { colorTextureLuna } from "../../constants/Texturas.js";
import './Home.css'
const Cargando = ()=>{
    
    const [count, setcount] = useState(10)
    const rendererRef = useRef(null);
    const scene = new Scene()
    const camara = CreateCamera({x:0, y:30, z:100})
    const naveRef = useRef([])
    const date = new Date()
    const day = date.getDate()
    const month = date.getMonth() + 1
    const year = date.getFullYear()
    const formattedDate = `${day}-${month}-${year}`;
    console.log(date)
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


        const controls = new OrbitControls( camara, document.body)
        controls.update();

        
        //CREANDO CAMARA
        scene.add(camara)

        //CREANDO FIGURAS
        //FONDO
        const geometryScene = new SphereGeometry(600,100)
        const materialScene = new MeshStandardMaterial({ map: colorTextureScene, side: BackSide})
        const cuboScene = new Mesh(geometryScene, materialScene)
        
        scene.add(cuboScene)

        
        const light = PointLightScene(scene,0xcccccc,colorTextureLuna)

        light.position.x = 80
        light.position.y = 0
        light.position.z = 0
        
        camara.lookAt(0,0,0) //camara mira a la sphera

        //CONTAFOR
        const time = setInterval(()=>{setcount(prevCount =>prevCount-1)},1000)
        
        //RENDERIZANDO
        const renderer = new WebGLRenderer()
        renderer.setSize(width, height)
        document.body.appendChild(renderer.domElement)

        renderer.setClearColor('#000000')
        renderer.setPixelRatio(Math.min(window.devicePixelRatio), 2)

        //RESIZE
        window.addEventListener("resize", Resize(camara,renderer))

        const renderScene = () =>{
            renderer.render(scene, camara)
        }
        
        const objNave = CreateNaveEspacial(scene,{x:-100, y:0, z:0})
        naveRef.current.push(objNave)
        objNave.rotation.y = -Math.PI/2

        
        
        //ANIMATE
        const clock = new Clock();
        const animate = () => {
            const deltaTime = clock.getDelta();
            LimitZoom(camara,cuboScene);

            light.rotation.y += 0.05 * deltaTime

            const distancia = objNave.position.distanceTo(light.position)
            const distanciaUmbral = 15
            if (distancia > distanciaUmbral) {
                objNave.translateZ(-1 * 0.3);
            }
            // objNave.translateX(1)
            

            renderScene()
            requestAnimationFrame(animate)
        
        }

        animate()
       
        
        //REMOVER LA FUNCION AL DESMONTAR EL COMPONENTE
        return () =>{
            renderer.dispose()
            document.body.removeChild(renderer.domElement)
            clearInterval(time)
        }
        
    },[])
    

    return <>
        
        <div className="fecha">
            <p className="date">{ formattedDate }</p>
            <p className="time">00:00:{count==10? count : `0${count}`}</p>
        </div>
        
        <div className='creditos'>
            &quot;Astronauta&quot; (https://skfb.ly/6GBvp) by Mora is licensed under Creative Commons Attribution (http://creativecommons.org/licenses/by/4.0/). <br />
            &quot;Nave Espacial/Spacecraft&quot; (https://skfb.ly/6wCFG) by MatiasG729 is licensed under Creative Commons Attribution (http://creativecommons.org/licenses/by/4.0/).
        </div>
    </>
}

export default Cargando