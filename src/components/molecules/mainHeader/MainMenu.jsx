

import '../../organism/header.css'
import menu from '../../../assets/menu.png'
import { useEffect, useRef, useState } from "react"
import { useMediaQuery } from '@react-hook/media-query'
import { MoveNaveToPlanet, ZoomToPlanet } from "../../../helpers/ZoomToPlanet"
import { Raycaster, Vector2 } from 'three'
import Cv from "../../pages/Cv"
import { useOrbitContext } from '../../../context/UseOrbitContext.jsx'

const MainMenu = ({hideAboutMe, visibleAboutMe, hideProyect, visibleproyect,hideContact, visibleContact,nave, camara, planet}) =>{

    const divRef = useRef(null)
    const divPlanetRef = useRef(null)
    const [isVisible, setIsVisible] = useState(false)
    const [isVisibleDivPlanet, setisVisibleDivPlanet] = useState(false)
    const lessThan600px = useMediaQuery('(max-width: 600px)')
    const {setIsOrbitVisible} = useOrbitContext()

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
        if(planet){handleZoomPlanet();
        }
        
    }, []);

    const handleZoomPlanet = ()=>{
        ZoomToPlanet(camara, planet)
        MoveNaveToPlanet(nave,planet)
        console.log("hola")
    }

    const handlePlanetOrbit = ()=>{
        setIsOrbitVisible(false)
        setTimeout(()=>{setIsOrbitVisible(true)},20000)
        console.log({setIsOrbitVisible})
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
                      }}>Sobre Mi</a></li>
                    <li><a style={{ color: '#9C34C2',textDecoration: 'none' }} to="/cv"
                    onClick={() => { 
                        hideAboutMe() 
                        handleZoomPlanet()
                        handlePlanetOrbit() 
                        handleClick()
                        hideProyect()
                        hideContact()
                      }}>CV</a></li>
                    <li><a style={{ color: '#9C34C2',textDecoration: 'none' }} to="/aboutMe" 
                    onClick={() => { 
                        hideAboutMe() 
                        hidecv()
                        visibleproyect()
                        hideContact()
                      }}>Proyectos</a></li>
                    <li><a style={{ color: '#9C34C2',textDecoration: 'none' }} to="/aboutMe"
                    onClick={() => { 
                        hideAboutMe() 
                        hidecv()
                        hideProyect()
                        visibleContact()
                      }}>Contacto</a></li>
                </ul>
            </nav>
    </div>
    <div ref={divRef} className="miDiv"><p>Aterriza en el planeta</p></div>
   
    <div ref={divPlanetRef} className={isVisibleDivPlanet? "miDiv active" : "miDiv"} >
        <div className='DivCurriculum'>
            <Cv></Cv>
        </div>

    </div>
        
    </>
}
 export default MainMenu