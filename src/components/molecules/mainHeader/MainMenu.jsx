

import '../../organism/header.css'
import menu from '../../../assets/menu.png'
import { useCallback, useEffect,  useState } from "react"
import { useMediaQuery } from '@react-hook/media-query'
import { MoveNaveToPlanet, ZoomToPlanet } from "../../../helpers/ZoomToPlanet"
import { Raycaster, Vector2 } from 'three'
import Cv from "../../pages/Cv"
import Creditos from '../../pages/Creditos.jsx'
import { useOrbitContext } from '../../../context/UseOrbitContext.jsx'
import { Tween } from "@tweenjs/tween.js";
import { Easing } from "@tweenjs/tween.js";
import Proyectos from '../../pages/Proyectos.jsx'

const MainMenu = ({hideAboutMe, visibleAboutMe, hideProyect,hideContact, visibleContact,nave, camara, planet, isVisibleAboutMe, isVisibleContact}) =>{

    const [isVisible, setIsVisible] = useState(false)
    const [isVisibleDivPlanet0, setisVisibleDivPlanet0] = useState(false)
    const [isVisibleDivPlanet1, setisVisibleDivPlanet1] = useState(false)
    const [isVisibleDivPlanet2, setisVisibleDivPlanet2] = useState(false)
    const lessThan600px = useMediaQuery('(max-width: 600px)')
    const {setIsOrbitVisible} = useOrbitContext()
    
    // console.log(planet)

    const handlePlanetClick = useCallback((event, planet_num) => {
        if (isVisibleAboutMe || isVisibleContact) return;

        if (planet) {
            const planetObj = planet[planet_num].planetObj;
            const mouse = new Vector2();
            const raycaster = new Raycaster();
            mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
            mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
            raycaster.setFromCamera(mouse, camara);

            const intersects = raycaster.intersectObject(planetObj);

            if (intersects.length > 0) {
                switch (planet_num) {
                    case 0:
                        setisVisibleDivPlanet1(false);
                        setisVisibleDivPlanet0(prevState => !prevState);
                        setisVisibleDivPlanet2(false);
                        break;
                    case 1:
                        setisVisibleDivPlanet0(false);
                        setisVisibleDivPlanet1(prevState => !prevState);
                        setisVisibleDivPlanet2(false);
                        break;
                    case 4:
                        setisVisibleDivPlanet0(false);
                        setisVisibleDivPlanet1(false);
                        setisVisibleDivPlanet2(prevState => !prevState);
                        break;
                    default:
                        break;
                }
            }
        }
    }, [isVisibleContact,isVisibleAboutMe, camara, planet]);

    useEffect(() => {
        const handleClick0 = (event) => handlePlanetClick(event, 0);
        const handleClick1 = (event) => handlePlanetClick(event, 1);
        const handleClick2 = (event) => handlePlanetClick(event, 4);

        document.addEventListener("click", handleClick0);
        document.addEventListener("click", handleClick1);
        document.addEventListener("click", handleClick2);

        return () => {
            document.removeEventListener("click", handleClick0);
            document.removeEventListener("click", handleClick1);
            document.removeEventListener("click", handleClick2);
        };
    }, [handlePlanetClick])

    const hidecv = () =>{
        setisVisibleDivPlanet0(false)
    }
    const hidecreditos = () =>{
        setisVisibleDivPlanet2(false)
    }

    const toggleMenu = ()=>{
        setIsVisible(preState => !preState)
    }

  

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
                case 4:
                    setisVisibleDivPlanet2(true)
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

     useEffect(() => {
         if(planet && nave){handleZoomPlanet();
         }
        
     }, [nave,planet]);

     

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
                        hidecreditos()
                       
                      }}>Sobre Mi</a></li>
                    <li><a style={{ color: '#9C34C2',textDecoration: 'none' }} to="/cv"
                    onClick={() => { 
                        hideAboutMe() 
                        handleZoomPlanet(0)
                        handlePlanetOrbit() 
                        hideProyect()
                        hideContact()
                        toggleMenu()
                        hidecreditos()
                      }}>CV</a></li>
                    <li><a style={{ color: '#9C34C2',textDecoration: 'none' }} to="/aboutMe" 
                    onClick={() => { 
                        hideAboutMe() 
                        hidecv()
                        handleZoomPlanet(1)
                        handlePlanetOrbit()
                        hideContact()
                        toggleMenu()
                        hidecreditos()
                      }}>Proyectos</a></li>
                    <li><a style={{ color: '#9C34C2',textDecoration: 'none' }} to="/aboutMe"
                    onClick={() => { 
                        hideAboutMe() 
                        hidecv()
                        hideProyect()
                        visibleContact()
                        toggleMenu()
                        hidecreditos()
                      }}>Contacto</a></li>
                    <li><a style={{ color: '#9C34C2',textDecoration: 'none' }} to="/cv"
                    onClick={() => { 
                        hideAboutMe() 
                        hidecv()
                        handleZoomPlanet(4)
                        handlePlanetOrbit()
                        hideProyect()
                        hideContact()
                        toggleMenu()
                      }}>Creditos</a></li>
                </ul>
            </nav>
    </div>
   
    <div className={isVisibleDivPlanet0? "miDiv active" : "miDiv"} >
        <Cv hidecv = {hidecv}></Cv>
    </div>

    {isVisibleDivPlanet1 && (
        <div className='proyectDiv'><Proyectos></Proyectos></div>
    )}

    {isVisibleDivPlanet2 && (
        <Creditos></Creditos>
    )}
        
    </>
}
 export default MainMenu