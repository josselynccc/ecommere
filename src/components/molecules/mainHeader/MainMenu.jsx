

import '../../organism/header.css'
import menu from '../../../assets/menu.png'
import { useEffect, useRef, useState } from "react"
import { useMediaQuery } from '@react-hook/media-query'
import { MoveNaveToPlanet, ZoomToPlanet } from "../../../helpers/ZoomToPlanet"
import { Raycaster, Vector2 } from 'three'
import Cv from "../../pages/Cv"

const MainMenu = ({hideAboutMe, visibleAboutMe,nave, camara, planet}) =>{

    const divRef = useRef(null)
    const divPlanetRef = useRef(null)
    const [isVisible, setIsVisible] = useState(false)
    const [isVisibleDivPlanet, setisVisibleDivPlanet] = useState(false)
    const [isvisibleDivRef, setisVisibleDivRef]= useState(true)
    const lessThan600px = useMediaQuery('(max-width: 600px)')

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
                    setTimeout(() => {
                        setisVisibleDivRef(false)
                    }, 1000)

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
        }
    };
    const NothandleClick = () => {
        if (divRef.current) {
            divRef.current.classList.remove('active');
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

    return <>

    
    {lessThan600px && (<img className="menu_icon" src={menu} alt="menu" onClick={toggleMenu} />)}
    <div className={lessThan600px ? (isVisible ? 'MenuVisible': 'MenuOculto') : 'Menu'}>
            <nav>
                <ul>
                    <li><a style={{ color: '#9C34C2', textDecoration: 'none' }} to="/aboutMe" onClick={() => { 
                        visibleAboutMe() // Invoca la función hideAboutMe
                        NothandleClick()
                        hidecv()
                      }}>Sobre Mi</a></li>
                    <li><a style={{ color: '#9C34C2',textDecoration: 'none' }} to="/cv" href="#planet" 
                    onClick={() => { 
                        hideAboutMe() // Invoca la función hideAboutMe
                        handleZoomPlanet() // Llama a la función handleZoomPlanet
                        handleClick()
                      }}>CV</a></li>
                    <li><a style={{ color: '#9C34C2',textDecoration: 'none' }} to="/aboutMe" href="#planet" 
                    onClick={() => { 
                        hideAboutMe() // Invoca la función hideAboutMe
                        hidecv()
                      }}>Proyectos</a></li>
                    <li><a style={{ color: '#9C34C2',textDecoration: 'none' }} to="/aboutMe" href="#planet" 
                    onClick={() => { 
                        hideAboutMe() // Invoca la función hideAboutMe
                        hidecv()
                      }}>Contacto</a></li>
                </ul>
            </nav>
    </div>
    {isvisibleDivRef && <div ref={divRef} className="miDiv"><p>Click en el planeta</p></div> }
    
    
   
    <div ref={divPlanetRef} className={isVisibleDivPlanet? "miDiv active" : "miDiv"} >
        <div className='DivCurriculum'>
            <Cv></Cv>
        </div>

    </div>
        
    </>
}
 export default MainMenu