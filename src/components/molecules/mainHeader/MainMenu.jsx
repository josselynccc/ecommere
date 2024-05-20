

import '../../organism/header.css'
import menu from '../../../assets/menu.png'
import { useEffect, useRef, useState } from "react"
import { useMediaQuery } from '@react-hook/media-query'
import { MoveNaveToPlanet, ZoomToPlanet } from "../../../helpers/ZoomToPlanet"
import { Raycaster, Vector2 } from 'three'
import Cv from "../../pages/Cv"
import { useOrbitContext } from '../../../context/UseOrbitContext.jsx'
import { Tween } from "@tweenjs/tween.js";
import { Easing } from "@tweenjs/tween.js";

const MainMenu = ({hideAboutMe, visibleAboutMe, hideProyect, visibleproyect,hideContact, visibleContact,nave, camara, planet}) =>{

    const divRef = useRef(null)
    const divPlanetRef = useRef(null)
    const [isVisible, setIsVisible] = useState(false)
    const [isVisibleDivPlanet, setisVisibleDivPlanet] = useState(false)
    const lessThan600px = useMediaQuery('(max-width: 600px)')
    const {setIsOrbitVisible} = useOrbitContext()
    
    // console.log(planet)

    useEffect(()=>{
        
        const handlePlanetClick = (event) => {

            const planetObj = planet[0].planetObj
            
            if(planet[0]){
                const mouse = new Vector2();
                const raycaster = new Raycaster();
                mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
                mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
                raycaster.setFromCamera(mouse, camara);
    
                const intersects = raycaster.intersectObject(planetObj);
    
                if (intersects.length > 0) {
                    setisVisibleDivPlanet(preState => !preState)
                    console.log(isVisibleDivPlanet)
                }
            }
            
        }

        document.addEventListener("click", handlePlanetClick);
        return () => {
            document.removeEventListener("click", handlePlanetClick);
        };
        
    },[])
    
    const hidecv = () =>{
        setisVisibleDivPlanet(false)
    }

    const toggleMenu = ()=>{
        setIsVisible(preState => !preState)
    }

    const handleClick = () => {
        if (divRef.current) {
            divRef.current.classList.add('active');
            setTimeout(() => {
                divRef.current.classList.remove('active');
            }, 3000)
        }
    };

     useEffect(() => {
         if(planet && nave){handleZoomPlanet();
         }
        
     }, []);

     const handleZoomPlanet = async ()=>{
        
        try {
            const initialNavePosition = await MoveNaveToPlanet(nave, planet)
            const initialZoomPosition = await ZoomToPlanet(camara, planet)

            await new Promise(resolve => setTimeout(resolve, 2000))
            setisVisibleDivPlanet(true)
            await new Promise(resolve => setTimeout(resolve, 700))
            new Tween(nave[0].position)
            .to({
                x: initialNavePosition.x,
                y: initialNavePosition.y,
                z: initialNavePosition.z
            }, 1000)
            .easing(Easing.Quadratic.InOut)
            .start();

        // Regresar la cámara a su posición inicial
            new Tween(camara.position) 
                .to({
                    x: initialZoomPosition.x, 
                    y: initialZoomPosition.y,
                    z: initialZoomPosition.z
                }, 1000)
                .easing(Easing.Quadratic.InOut)
                .onUpdate(() => {
                    camara.lookAt(0, 0, 0);
                  })
                .start(); 
            }catch (error) {
            console.error(error)
        }
        
    }

    const handlePlanetOrbit = ()=>{
        setIsOrbitVisible(false)
        setTimeout(()=>{setIsOrbitVisible(true)},5000)
        console.log('ORBIT VISIBLE',{setIsOrbitVisible})
    }

    

    return <>

    
    {lessThan600px && (<img className="menu_icon" src={menu} alt="menu" onClick={toggleMenu} />)}
    <div className={lessThan600px ? (isVisible ? 'MenuVisible': 'MenuOculto') : 'Menu'}>
            <nav>
                <ul>
                    <li><a style={{ color: '#9C34C2', textDecoration: 'none' }} to="/aboutMe" onClick={() => { 
                        visibleAboutMe()
                        hidecv()
                        hideProyect()
                        hideContact()
                        toggleMenu()
                      }}>Sobre Mi</a></li>
                    <li><a style={{ color: '#9C34C2',textDecoration: 'none' }} to="/cv"
                    onClick={() => { 
                        hideAboutMe() 
                        handleZoomPlanet()
                        handlePlanetOrbit() 
                        handleClick()
                        hideProyect()
                        hideContact()
                        toggleMenu()
                      }}>CV</a></li>
                    <li><a style={{ color: '#9C34C2',textDecoration: 'none' }} to="/aboutMe" 
                    onClick={() => { 
                        hideAboutMe() 
                        hidecv()
                        visibleproyect()
                        hideContact()
                        toggleMenu()
                      }}>Proyectos</a></li>
                    <li><a style={{ color: '#9C34C2',textDecoration: 'none' }} to="/aboutMe"
                    onClick={() => { 
                        hideAboutMe() 
                        hidecv()
                        hideProyect()
                        visibleContact()
                        toggleMenu()
                      }}>Contacto</a></li>
                </ul>
            </nav>
    </div>
    <div ref={divRef} className="miDiv"><p>Aterriza en el planeta</p></div>
   
    <div ref={divPlanetRef} className={isVisibleDivPlanet? "miDiv active" : "miDiv"} >
        <div className='DivCurriculum'>
            <Cv hidecv = {hidecv}></Cv>
        </div>

    </div>
        
    </>
}
 export default MainMenu