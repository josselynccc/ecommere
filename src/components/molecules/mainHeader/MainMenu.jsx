
import { NavLink } from "react-router-dom"
import '../../organism/header.css'
import menu from '../../../assets/menu.png'
import { useState } from "react"
import { useMediaQuery } from '@react-hook/media-query';


const MainMenu = ({hideAboutMe, visibleAboutMe, isVisibleAboutMe}) =>{

    const [isVisible, setIsVisible] = useState(false)
    const lessThan600px = useMediaQuery('(max-width: 600px)')

    const toggleMenu = ()=>{
        setIsVisible(preState => !preState)
    }
 
    console.log(isVisibleAboutMe)

    return <>

    
    {lessThan600px && (<img className="menu_icon" src={menu} alt="menu" onClick={toggleMenu} />)}
    <div className={lessThan600px ? (isVisible ? 'MenuVisible': 'MenuOculto') : 'Menu'}>
            <nav>
                <ul>
                    <li><NavLink style={{ color: '#9C34C2', textDecoration: 'none' }} to="/aboutMe" onClick={visibleAboutMe}>Sobre Mi</NavLink></li>
                    <li><NavLink style={{ color: '#9C34C2',textDecoration: 'none' }} to="/cv" onClick={hideAboutMe}>CV</NavLink></li>
                    <li><NavLink style={{ color: '#9C34C2',textDecoration: 'none' }} to="/aboutMe" onClick={hideAboutMe}>Proyectos</NavLink></li>
                    <li><NavLink style={{ color: '#9C34C2',textDecoration: 'none' }} to="/aboutMe" onClick={hideAboutMe}>Contacto</NavLink></li>
                </ul>
            </nav>
        </div>
    
    </>
}
 export default MainMenu