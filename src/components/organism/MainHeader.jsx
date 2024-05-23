import Logo from '../molecules/mainHeader/Logo'
import MainMenu from '../molecules/mainHeader/MainMenu'
import AboutMe from '../molecules/mainHeader/AboutMe'
import './header.css'
import '../pages/Proyectos.css'
import {  useState } from 'react'
import Proyectos from '../pages/Proyectos'
import Contacto from '../pages/Contacto'

const MainHeader = ({nave, planet,camara,scene}) =>{
    if(planet){
        console.log(planet)
    }

    const [isVisibleAboutMe, setIsVisibleAboutMe] = useState(false)

    const hideAboutMe = ()=>{
        setIsVisibleAboutMe(false)
    }
    
    const VisibleAboutMe = ()=>{
        setIsVisibleAboutMe(true)
    }

    const [isVisibleProyect, setIsVisibleProyect] = useState(false)
    
    const hideProyect = ()=>{
        setIsVisibleProyect(false)
    }
    
    const visibleproyect = ()=>{
        setIsVisibleProyect(true)
    }

    const [isVisibleContact, setIsVisibleContact] = useState(false)
    
    const hideContact = ()=>{
        setIsVisibleContact(false)
    }
    
    const visibleContact = ()=>{
        setIsVisibleContact(true)
    }



    return <>
        <div className='mainHeader'>
            <div className='logoAndMenu'>
                
                <Logo 
                hideAboutMe={hideAboutMe}
                hideProyect ={hideProyect}
                hideContact = {hideContact}></Logo>
                <MainMenu 
                hideAboutMe={hideAboutMe}
                visibleAboutMe={VisibleAboutMe}
                isVisibleAboutMe={isVisibleAboutMe}
                hideProyect ={hideProyect}
                visibleproyect={visibleproyect}
                hideContact = {hideContact}
                visibleContact={visibleContact}
                nave = {nave}
                camara = {camara}
                planet = {planet}
                scene = {scene}></MainMenu>
        
            </div>
            
            <div className={ isVisibleAboutMe ? 'aboutMe VisibleAboutMeContainer' : 'aboutMe OcultoAboutMeContainer'}>
                <AboutMe isVisibleAboutMe={isVisibleAboutMe}></AboutMe>
            </div>

            <div className={isVisibleProyect? 'proyect visibleProyect': 'proyect ocultoProyect'}>
                <Proyectos></Proyectos>
            </div>

            <div className={isVisibleContact? 'Contacto visibleProyect': 'proyect ocultoProyect'}>
                <Contacto isVisibleContact={isVisibleContact}></Contacto>
            </div>
        </div>
    </>
}

export default MainHeader