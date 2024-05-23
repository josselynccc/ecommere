

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
import Proyectos from '../../pages/Proyectos.jsx'

const MainMenu = ({hideAboutMe, visibleAboutMe, hideProyect,hideContact, visibleContact,nave, camara, planet, scene}) =>{

    const divRef = useRef(null)
    const [isVisible, setIsVisible] = useState(false)
    const [isVisibleDivPlanet0, setisVisibleDivPlanet0] = useState(false)
    const [isVisibleDivPlanet1, setisVisibleDivPlanet1] = useState(false)
    const lessThan600px = useMediaQuery('(max-width: 600px)')
    const {setIsOrbitVisible} = useOrbitContext()
    
    // console.log(planet)

    useEffect(()=>{
        
        const handlePlanetClick = (event, planet_num) => {

            const planetObj = planet[planet_num].planetObj
            
            if(planet[0]){
                const mouse = new Vector2();
                const raycaster = new Raycaster();
                mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
                mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
                raycaster.setFromCamera(mouse, camara);
    
                const intersects = raycaster.intersectObject(planetObj);
    
                if (intersects.length > 0) {
                    switch (planet_num) {
                        case 0:
                            setisVisibleDivPlanet1(false)
                            setisVisibleDivPlanet0(preState => !preState)
                            break;

                        case 1:
                            setisVisibleDivPlanet0(false)
                            setisVisibleDivPlanet1(preState => !preState)
                            break;
                    
                        default:
                            break;
                    }
                }
            }
            
        }
        const createClickHandler = (planet_num) => (event) => handlePlanetClick(event, planet_num);
        
        document.addEventListener("click", createClickHandler(0));
        document.addEventListener("click", createClickHandler(1));
        document.addEventListener("click", createClickHandler(2));
        return () => {
            document.removeEventListener("click", createClickHandler(0));
            document.removeEventListener("click", createClickHandler(1));
            document.removeEventListener("click", createClickHandler(2));
        };
        
    },[])
    
    const hidecv = () =>{
        setisVisibleDivPlanet0(false)
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

     const handleZoomPlanet = async (num)=>{
        
        try {
            if(planet[num] && nave){
                const initialNavePosition = await MoveNaveToPlanet(nave, planet, num)
            const initialZoomPosition = await ZoomToPlanet(camara, planet, num)

            await new Promise(resolve => setTimeout(resolve, 1500))
            switch (num) {
                case 0:
                    setisVisibleDivPlanet0(true)
                    break;
                case 1:
                    setisVisibleDivPlanet1(true)
                    break;
                default:
                    break;
            }
            
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
            }
             
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
                        setisVisibleDivPlanet1(false)
                        setisVisibleDivPlanet0(false)
                        scene.classList.add('disable-pointer-events')
                       
                      }}>Sobre Mi</a></li>
                    <li><a style={{ color: '#9C34C2',textDecoration: 'none' }} to="/cv"
                    onClick={() => { 
                        hideAboutMe() 
                        handleZoomPlanet(0)
                        handlePlanetOrbit() 
                        handleClick()
                        hideProyect()
                        hideContact()
                        toggleMenu()
                        setisVisibleDivPlanet1(false)
                        setisVisibleDivPlanet0(false)
                      }}>CV</a></li>
                    <li><a style={{ color: '#9C34C2',textDecoration: 'none' }} to="/aboutMe" 
                    onClick={() => { 
                        hideAboutMe() 
                        hidecv()
                        handleZoomPlanet(1)
                        hideContact()
                        toggleMenu()
                        setisVisibleDivPlanet1(false)
                        setisVisibleDivPlanet0(false)
                      }}>Proyectos</a></li>
                    <li><a style={{ color: '#9C34C2',textDecoration: 'none' }} to="/aboutMe"
                    onClick={() => { 
                        hideAboutMe() 
                        hidecv()
                        hideProyect()
                        visibleContact()
                        toggleMenu()
                        setisVisibleDivPlanet1(false)
                        setisVisibleDivPlanet0(false)
                      }}>Contacto</a></li>
                </ul>
            </nav>
    </div>
    <div ref={divRef} className="miDiv"><p>Aterriza en el planeta</p></div>
   
    <div className={isVisibleDivPlanet0? "miDiv active" : "miDiv"} >
        <Cv hidecv = {hidecv}></Cv>
    </div>

    {isVisibleDivPlanet1 && (
        <div className='proyectDiv'><Proyectos></Proyectos></div>
    )}
        
    </>
}
 export default MainMenu